#!/usr/bin/env node

/**
 * Script para crear la tabla de inquietudes en Supabase
 * Usa las variables de entorno del archivo .env
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

config({ path: join(rootDir, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error('❌ Error: VITE_SUPABASE_URL o SUPABASE_URL no está definido en .env');
  process.exit(1);
}

if (!serviceRoleKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está definido en .env');
  console.error('   Necesitas el Service Role Key (no el anon key) para crear tablas.');
  console.error('   Obténlo en: Supabase Dashboard → Settings → API → service_role key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTable() {
  console.log('🚀 Creando tabla de inquietudes en Supabase...\n');

  // SQL para crear la tabla y configurar RLS
  const sql = `
    -- Crear la tabla de inquietudes
    CREATE TABLE IF NOT EXISTS inquietudes (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      tema TEXT NOT NULL,
      mensaje TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
    );

    -- Habilitar Row Level Security (RLS)
    ALTER TABLE inquietudes ENABLE ROW LEVEL SECURITY;

    -- Eliminar políticas existentes si existen
    DROP POLICY IF EXISTS "Permitir inserción pública de inquietudes" ON inquietudes;
    DROP POLICY IF EXISTS "Permitir lectura pública de inquietudes" ON inquietudes;

    -- Política para permitir inserción pública
    CREATE POLICY "Permitir inserción pública de inquietudes"
      ON inquietudes
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);

    -- Política para permitir lectura pública
    CREATE POLICY "Permitir lectura pública de inquietudes"
      ON inquietudes
      FOR SELECT
      TO anon, authenticated
      USING (true);
  `;

  try {
    // Ejecutar SQL usando la función rpc exec_sql si existe, o usar la API REST
    console.log('📋 Ejecutando SQL...\n');

    // Intentar usar rpc exec_sql (requiere que esté habilitado en Supabase)
    const { data: rpcData, error: rpcError } = await supabase.rpc('exec_sql', { 
      sql: sql 
    });

    if (rpcError) {
      // Si rpc no está disponible, usar el método directo con fetch
      console.log('⚠️  RPC no disponible, usando método alternativo...\n');
      
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`
        },
        body: JSON.stringify({ sql })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ SQL ejecutado exitosamente!\n');
      console.log('Resultado:', result);
    } else {
      console.log('✅ Tabla creada exitosamente usando RPC!\n');
      console.log('Resultado:', rpcData);
    }

    // Verificar que la tabla se creó correctamente
    console.log('\n🔍 Verificando tabla...\n');
    const { data: tables, error: checkError } = await supabase
      .from('inquietudes')
      .select('*')
      .limit(1);

    if (checkError) {
      console.error('⚠️  Error al verificar la tabla:', checkError.message);
      console.log('\n📝 Por favor, ejecuta este SQL manualmente en Supabase SQL Editor:\n');
      console.log(sql);
    } else {
      console.log('✅ Tabla verificada correctamente!');
      console.log(`\n📊 La tabla 'inquietudes' está lista para usar.`);
      console.log(`\n💡 Puedes ver las inquietudes en: /inquietudes`);
    }

  } catch (error) {
    console.error('\n❌ Error al ejecutar SQL:', error.message);
    console.log('\n📝 Por favor, ejecuta este SQL manualmente en Supabase SQL Editor:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(sql);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📍 Ve a: Supabase Dashboard → SQL Editor → New Query');
    process.exit(1);
  }
}

createTable();


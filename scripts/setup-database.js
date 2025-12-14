#!/usr/bin/env node

/**
 * Script para configurar la base de datos de Supabase
 * Lee las variables de entorno del archivo .env
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

console.log('🔍 Verificando configuración...\n');

if (!supabaseUrl) {
  console.error('❌ Error: VITE_SUPABASE_URL o SUPABASE_URL no está definido en .env');
  process.exit(1);
}

if (!serviceRoleKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está definido en .env');
  console.error('\n📝 Para obtener el Service Role Key:');
  console.error('   1. Ve a tu proyecto en Supabase');
  console.error('   2. Settings → API');
  console.error('   3. Copia el "service_role" key (⚠️  Mantén esto secreto)');
  console.error('\n   Agrégalo a tu .env como:');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui\n');
  process.exit(1);
}

console.log('✅ Variables de entorno encontradas\n');
console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`);
console.log(`   Service Role Key: ${serviceRoleKey.substring(0, 20)}...\n`);

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// SQL para crear la tabla y configurar RLS
const sqlStatements = [
  `-- Crear la tabla de inquietudes
CREATE TABLE IF NOT EXISTS inquietudes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tema TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);`,

  `-- Habilitar Row Level Security (RLS)
ALTER TABLE inquietudes ENABLE ROW LEVEL SECURITY;`,

  `-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Permitir inserción pública de inquietudes" ON inquietudes;
DROP POLICY IF EXISTS "Permitir lectura pública de inquietudes" ON inquietudes;`,

  `-- Política para permitir inserción pública
CREATE POLICY "Permitir inserción pública de inquietudes"
  ON inquietudes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);`,

  `-- Política para permitir lectura pública
CREATE POLICY "Permitir lectura pública de inquietudes"
  ON inquietudes
  FOR SELECT
  TO anon, authenticated
  USING (true);`
];

async function executeSQL() {
  console.log('🚀 Configurando base de datos...\n');

  // Intentar ejecutar cada statement usando la API REST de Supabase
  for (let i = 0; i < sqlStatements.length; i++) {
    const sql = sqlStatements[i];
    console.log(`📋 Ejecutando statement ${i + 1}/${sqlStatements.length}...`);

    try {
      // Usar la API REST directamente para ejecutar SQL
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`
        },
        body: JSON.stringify({ query: sql })
      });

      if (!response.ok) {
        // Si exec_sql no existe, mostrar el SQL para ejecutar manualmente
        if (response.status === 404) {
          console.log('⚠️  La función exec_sql no está disponible.');
          console.log('📝 Por favor, ejecuta este SQL manualmente en Supabase SQL Editor:\n');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
          sqlStatements.forEach((stmt, idx) => {
            console.log(`-- Statement ${idx + 1}\n${stmt}\n`);
          });
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('\n📍 Ve a: Supabase Dashboard → SQL Editor → New Query');
          process.exit(0);
        }
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const result = await response.json();
      console.log('   ✅ Ejecutado correctamente\n');
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
      console.log('📝 Por favor, ejecuta este SQL manualmente en Supabase SQL Editor:\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      sqlStatements.forEach((stmt, idx) => {
        console.log(`-- Statement ${idx + 1}\n${stmt}\n`);
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      process.exit(1);
    }
  }

  // Verificar que la tabla existe
  console.log('🔍 Verificando tabla...\n');
  try {
    const { data, error } = await supabase
      .from('inquietudes')
      .select('*')
      .limit(1);

    if (error) {
      throw error;
    }

    console.log('✅ Tabla verificada correctamente!');
    console.log(`\n📊 La tabla 'inquietudes' está lista para usar.`);
    console.log(`\n💡 Puedes ver las inquietudes en: http://localhost:8080/inquietudes`);
    console.log(`\n🎉 ¡Configuración completada exitosamente!`);
  } catch (error) {
    console.error('⚠️  Error al verificar la tabla:', error.message);
    console.log('\n📝 Por favor, verifica manualmente en Supabase Dashboard → Table Editor');
  }
}

executeSQL();


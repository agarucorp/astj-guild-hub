#!/usr/bin/env node

/**
 * Script para configurar Supabase desde la línea de comandos
 * Uso: node scripts/supabase-setup.js
 */

import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupSupabase() {
  console.log('🚀 Configuración de Supabase para Lista Blanca\n');

  const supabaseUrl = await question('Ingresa tu SUPABASE_URL: ');
  const serviceRoleKey = await question('Ingresa tu SUPABASE_SERVICE_ROLE_KEY: ');

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Error: Se requieren ambas credenciales');
    rl.close();
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log('\n📋 Creando tabla de inquietudes...\n');

  // SQL para crear la tabla
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS inquietudes (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      tema TEXT NOT NULL,
      mensaje TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
    );
  `;

  // SQL para habilitar RLS
  const enableRLSSQL = `
    ALTER TABLE inquietudes ENABLE ROW LEVEL SECURITY;
  `;

  // SQL para políticas
  const policiesSQL = `
    -- Política para permitir inserción pública
    DROP POLICY IF EXISTS "Permitir inserción pública de inquietudes" ON inquietudes;
    CREATE POLICY "Permitir inserción pública de inquietudes"
      ON inquietudes
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);

    -- Política para permitir lectura pública
    DROP POLICY IF EXISTS "Permitir lectura pública de inquietudes" ON inquietudes;
    CREATE POLICY "Permitir lectura pública de inquietudes"
      ON inquietudes
      FOR SELECT
      TO anon, authenticated
      USING (true);
  `;

  try {
    // Ejecutar SQL usando rpc o directamente
    console.log('Ejecutando SQL...');
    
    // Nota: Necesitamos usar el método correcto de Supabase para ejecutar SQL
    // Esto requiere usar la API REST directamente o el cliente admin
    
    const { data, error } = await supabase.rpc('exec_sql', { 
      sql: createTableSQL + enableRLSSQL + policiesSQL 
    });

    if (error) {
      // Si rpc no funciona, intentamos con la API REST
      console.log('⚠️  RPC no disponible, usando método alternativo...');
      console.log('\n📝 Por favor, ejecuta este SQL manualmente en Supabase SQL Editor:\n');
      console.log(createTableSQL);
      console.log(enableRLSSQL);
      console.log(policiesSQL);
    } else {
      console.log('✅ Tabla creada exitosamente!');
    }

    console.log('\n✅ Configuración completada!');
    console.log('\n📝 Agrega estas variables a tu archivo .env:');
    console.log(`VITE_SUPABASE_URL=${supabaseUrl}`);
    console.log(`VITE_SUPABASE_ANON_KEY=<tu_anon_key>`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📝 Por favor, ejecuta el SQL manualmente en Supabase SQL Editor');
  }

  rl.close();
}

setupSupabase();


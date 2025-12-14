#!/usr/bin/env node

/**
 * Script para configurar la base de datos de Supabase usando la API REST directamente
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

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Variables de entorno no configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// SQL completo para ejecutar
const fullSQL = `
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

async function setupDatabase() {
  console.log('🚀 Configurando base de datos en Supabase...\n');

  try {
    // Intentar crear la tabla usando una inserción de prueba
    // Primero verificamos si la tabla existe intentando hacer un select
    const { error: selectError } = await supabase
      .from('inquietudes')
      .select('*')
      .limit(0);

    if (selectError && selectError.code === 'PGRST116') {
      // La tabla no existe, necesitamos crearla manualmente
      console.log('⚠️  La tabla no existe aún.\n');
      console.log('📝 Por favor, ejecuta este SQL en Supabase SQL Editor:\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log(fullSQL);
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('📍 Pasos:');
      console.log('   1. Ve a: https://supabase.com/dashboard');
      console.log('   2. Selecciona tu proyecto "lista-blanca"');
      console.log('   3. Ve a: SQL Editor (en el menú lateral)');
      console.log('   4. Haz clic en: "New query"');
      console.log('   5. Pega el SQL de arriba');
      console.log('   6. Haz clic en: "Run" (o presiona Ctrl+Enter)\n');
      process.exit(0);
    } else if (selectError) {
      throw selectError;
    } else {
      console.log('✅ La tabla "inquietudes" ya existe!\n');
    }

    // Verificar que podemos insertar y leer
    console.log('🔍 Verificando permisos...\n');
    
    const testData = {
      tema: 'Test',
      mensaje: 'Mensaje de prueba - puede ser eliminado'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('inquietudes')
      .insert([testData])
      .select();

    if (insertError) {
      console.error('❌ Error al insertar:', insertError.message);
      console.log('\n📝 Verifica que las políticas RLS estén configuradas correctamente.\n');
      process.exit(1);
    }

    console.log('✅ Inserción de prueba exitosa!');

    // Eliminar el dato de prueba
    if (insertData && insertData[0]) {
      await supabase
        .from('inquietudes')
        .delete()
        .eq('id', insertData[0].id);
      console.log('✅ Dato de prueba eliminado');
    }

    // Verificar lectura
    const { data: readData, error: readError } = await supabase
      .from('inquietudes')
      .select('*')
      .limit(5);

    if (readError) {
      console.error('❌ Error al leer:', readError.message);
      process.exit(1);
    }

    console.log(`✅ Lectura verificada (${readData?.length || 0} registros encontrados)\n`);

    console.log('🎉 ¡Base de datos configurada correctamente!\n');
    console.log('📊 La tabla "inquietudes" está lista para usar.');
    console.log('💡 Puedes probar el formulario en: http://localhost:8080');
    console.log('💡 Ver las inquietudes en: http://localhost:8080/inquietudes\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📝 Por favor, ejecuta el SQL manualmente en Supabase SQL Editor.\n');
    process.exit(1);
  }
}

setupDatabase();


import { createClient } from "@supabase/supabase-js";

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase no está configurado. Por favor, agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY a tu archivo .env"
  );
}

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Tipos para las inquietudes
export interface Inquietud {
  id: string;
  tema: string;
  mensaje: string;
  created_at: string;
}


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://erapzxkcacxzhbzwifhl.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYXB6eGtjYWN4emhiendpZmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4ODI5MzQsImV4cCI6MjA4NjQ1ODkzNH0.exlba7EcAZKsUgsmPY3B34j6dH_5_ZwpHFKhMShsHP8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

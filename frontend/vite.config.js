import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://erapzxkcacxzhbzwifhl.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYXB6eGtjYWN4emhiendpZmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4ODI5MzQsImV4cCI6MjA4NjQ1ODkzNH0.exlba7EcAZKsUgsmPY3B34j6dH_5_ZwpHFKhMShsHP8'),
    'import.meta.env.VITE_SITE_URL': JSON.stringify('https://rajvaibhavrai.site')
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Raj Vaibhav Rai Portfolio',
        short_name: 'RV Rai',
        description: 'Professional portfolio of Raj Vaibhav Rai, Senior Android Developer',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://erapzxkcacxzhbzwifhl.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYXB6eGtjYWN4emhiendpZmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4ODI5MzQsImV4cCI6MjA4NjQ1ODkzNH0.exlba7EcAZKsUgsmPY3B34j6dH_5_ZwpHFKhMShsHP8'),
    'import.meta.env.VITE_SITE_URL': JSON.stringify('https://rajvaibhavrai.site')
  }
})

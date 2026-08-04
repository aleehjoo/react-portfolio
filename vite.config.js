import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon-32.png', 'favicon-180.png'],
      workbox: {
        // Fonts and the bulb are part of the look, so they belong offline.
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp,woff,woff2,ttf,gif}',
        ],
        // ...but not the heavy stuff. The attack GIF is only mounted on hover
        // and the screenshots are lazy-loaded below the fold; precaching them
        // would make every visitor pay for all of it up front.
        globIgnores: [
          '**/Red_hands_attack-*',
          '**/project1-*',
          '**/project3-*',
        ],
      },
      manifest: {
        name: 'Alejandro Umila — Portfolio',
        short_name: 'PORTFOLIO',
        description: 'An OMORI-themed portfolio.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})

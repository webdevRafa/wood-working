import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'firebase',
              test: /node_modules[\\/]@firebase/,
              maxSize: 400 * 1024,
              priority: 30,
            },
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|react-router)/,
              priority: 20,
            },
            {
              name: 'icons',
              test: /node_modules[\\/]lucide-react/,
              priority: 20,
            },
          ],
        },
      },
    },
  },
})

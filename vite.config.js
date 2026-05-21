import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Ajuda o Vite a entender rotas no desenvolvimento
  },
  build: {
    outDir: 'dist', // Garante que a Vercel encontre a pasta de build
  }
})
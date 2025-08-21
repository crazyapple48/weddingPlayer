import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './192.168.0.39+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './192.168.0.39+2.pem'))
    },
    hmr: {
      protocol: 'wss',
      host: '192.168.0.39',
      port: 5000
    },
    host: '0.0.0.0'
  }
})

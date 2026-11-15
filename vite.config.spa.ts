import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Local SPA-only config — skips Cloudflare workerd (fails on this machine).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5305, strictPort: false, host: '0.0.0.0' },
})

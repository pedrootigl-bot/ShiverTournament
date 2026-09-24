import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Hostinger:
 * - raiz do domínio → BASE_PATH vazio (padrão)
 * - subpasta → BASE_PATH=/shivertournament  (ou outro path)
 */
function resolveBase() {
  const raw = (process.env.BASE_PATH ?? '').trim()
  if (!raw || raw === '/') return '/'
  return `/${raw.replace(/^\/+|\/+$/g, '')}/`
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: resolveBase(),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
})

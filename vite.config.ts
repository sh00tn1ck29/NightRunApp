import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const images: Record<string, string> = JSON.parse(readFileSync(new URL('./src/shared/assets/image-map.json', import.meta.url), 'utf8'))

export default defineConfig({
  plugins: [{
    name: 'responsive-image-sources',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer || !/\.jpe?g$/.test(source)) return
      const original = path.relative(root, path.resolve(path.dirname(importer), source)).replaceAll('\\', '/')
      if (images[original]) return path.resolve(root, images[original])
    },
  }, react()],
})

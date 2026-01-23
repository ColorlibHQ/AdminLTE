import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  compressHTML: false,
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  },
  integrations: [mdx()],
  srcDir: './src/html',
  publicDir: './src/html/public',
  cacheDir: './dist/.astro',
  outDir: './dist/html',
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    server: {
      host: '0.0.0.0',
      watch: {
        ignored: ['!**/dist/**']
      }
    }
  }
})

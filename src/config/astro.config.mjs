import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  },
  integrations: [mdx()],
  srcDir: './src/html',
  cacheDir: './dist/pages',
  outDir: './dist/pages',
  vite: {
    server: {
      watch: {
        ignored: ['!**/dist/**'],
      }
    }
  }
})

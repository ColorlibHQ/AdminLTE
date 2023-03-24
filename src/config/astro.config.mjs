import { defineConfig } from 'astro/config'

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
  // base: './dist',
  srcDir: './src/html',
  outDir: './dist/pages'
})

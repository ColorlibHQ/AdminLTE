import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'

/**
 * Wrap Markdown pipe-tables in `.table-responsive` with a tab stop.
 *
 * A bare `<table>` has no scroll container, so a reference table with more than
 * three columns pushed the whole page sideways on a phone (265px of it on the
 * Colors page). The hand-written tables in these docs are already wrapped this
 * way; `tabindex` keeps the scrollable region keyboard-reachable, which the axe
 * gate requires.
 */
function wrapTable(node, index, parent) {
  if (node.tagName !== 'table' || !parent || parent.properties?.className?.includes?.('table-responsive')) {
    return
  }

  parent.children[index] = {
    type: 'element',
    tagName: 'div',
    properties: { className: ['table-responsive'], tabIndex: 0 },
    children: [node]
  }
}

const wrapTables = tree => {
  visit(tree, 'element', wrapTable)
}

function rehypeResponsiveTables() {
  return wrapTables
}

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
    },
    // `markdown.rehypePlugins` was deprecated in Astro 7.2.4 in favour of an
    // explicit processor; `unified()` is the same remark/rehype pipeline.
    processor: unified({ rehypePlugins: [rehypeResponsiveTables] })
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

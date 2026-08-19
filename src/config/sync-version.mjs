import { globSync } from 'node:fs'
import { readFileSync, writeFileSync } from 'node:fs'
import pkg from '../../package.json' with { type: 'json' }

// Keep the hardcoded version in the source banners in sync with package.json.
// Runs automatically via the "version" npm lifecycle script (see package.json),
// so `npm version X.Y.Z` stamps the new version before the release is built.
// The JS dist banner is generated from pkg.version at build time by Rollup,
// but the SCSS/TS source banners are literals, so they are synced here instead.
const banners = [
  'src/scss/adminlte.scss',
  'src/scss/adminlte-docs.scss',
  'src/scss/adminlte-select2.scss',
  'src/scss/adminlte-colors.scss',
  'src/scss/adminlte-colors-v3.scss',
  'src/ts/adminlte.ts'
]

const versionRegex = /AdminLTE v\d+\.\d+\.\d+(?:-[\w.]+)?/

for (const file of banners) {
  try {
    const contents = readFileSync(file, 'utf8')

    if (!versionRegex.test(contents)) {
      console.warn(`sync-version: no version banner found in ${file}, skipping`)
      continue
    }

    const updated = contents.replace(versionRegex, `AdminLTE v${pkg.version}`)

    if (updated === contents) {
      console.log(`sync-version: ${file} already at v${pkg.version}`)
      continue
    }

    writeFileSync(file, updated)
    console.log(`sync-version: ${file} -> v${pkg.version}`)
  } catch (error) {
    console.error(`sync-version: failed to update ${file}`, error)
    process.exitCode = 1
  }
}

// The docs' copy-paste install snippets pin an exact version, which is the right
// advice but goes stale the moment it is typed: they still said 4.0.0 eight
// releases later. Stamp them from package.json too. A floating `admin-lte@4` is
// left alone — that one is deliberate and never goes stale.
const snippetRegex = /admin-lte@\d+\.\d+\.\d+(?:-[\w.]+)?/g

const docsFiles = globSync('src/html/components/docs/*.mdx').toSorted((a, b) => a.localeCompare(b))

for (const file of docsFiles) {
  try {
    const contents = readFileSync(file, 'utf8')

    if (!snippetRegex.test(contents)) {
      continue
    }

    const updated = contents.replaceAll(snippetRegex, `admin-lte@${pkg.version}`)

    if (updated === contents) {
      console.log(`sync-version: ${file} snippets already at v${pkg.version}`)
      continue
    }

    writeFileSync(file, updated)
    console.log(`sync-version: ${file} snippets -> v${pkg.version}`)
  } catch (error) {
    console.error(`sync-version: failed to update ${file}`, error)
    process.exitCode = 1
  }
}

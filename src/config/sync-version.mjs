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

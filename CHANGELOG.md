# Changelog

All notable changes to AdminLTE will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.8.5] - 2026-08-20

### Fixed

- **`npm run production` printed six Sass deprecation warnings.** The palette sheets used the ternary `if()` in three places — `lte-needs-aa()` in `colors/_variables.scss` and the text-colour pick in `colors/_primary.scss`, twice — and Sass 1.95.0 deprecated that syntax in favour of the CSS `if()`. Both `adminlte-colors.scss` and `adminlte-colors-v3.scss` pull those files in, hence six warnings for three call sites. They are now plain `@if` statements rather than Sass's suggested `if(sass(...): ...; else: ...)`, which would need Sass >= 1.95 of anyone compiling AdminLTE from source. Compiled output is byte-identical (#6111, reported by @lfiorini).

  For the record, Bootstrap's own `if()` calls warn too — 82 of them across `bootstrap/scss` — but `css-compile` already passes `--quiet-deps`, so nothing under `node_modules` reaches the console. Every warning in that report was AdminLTE's own.

### Maintenance

- **Dev dependencies refreshed** — sass 1.102.0 -> 1.103.0, astro 7.2.3 -> 7.2.4, @astrojs/mdx 7.0.6 -> 7.0.7, happy-dom 20.11.2 -> 20.11.6. All within their current majors; `dist/` is byte-identical, so this changes nothing for consumers.
- **The docs build moved off Astro's deprecated `markdown.rehypePlugins`.** Astro 7.2.4 deprecates the top-level `remarkPlugins` / `rehypePlugins` / `remarkRehype` keys in favour of an explicit `markdown.processor`, so the bump above added a fresh warning to the very command #6111 was about. The responsive-tables plugin now goes through `unified()` from `@astrojs/markdown-remark` — the same remark/rehype pipeline, now a direct dev dependency. All 90 built pages are byte-identical, `.table-responsive` wrapping included.
- **`nanoid` bumped to 3.3.18 in the lockfile** — GHSA-2v37-7h3g-55p8 (high), a transitive dev-only dependency where a custom generator could loop forever on `size: 0`. `npm audit` now reports zero vulnerabilities; nothing shipped in `dist/` was ever affected.
- **TypeScript stays on 6.0.3.** 7.0.2 is out, but `typescript-eslint` still declares `peerDependencies.typescript: ">=4.8.4 <6.1.0"` and `@astrojs/check` accepts `^5 || ^6`, so the toolchain still cannot move.

## [4.8.4] - 2026-08-19

### Fixed

- **Reference tables on the docs pages pushed the page sideways on a phone.** Markdown pipe-tables render as a bare `<table>` with no scroll container, so anything wider than three columns overflowed the viewport — 265px of it on the Colors page. They are now wrapped in `.table-responsive` with a tab stop, exactly like the hand-written tables next to them, so the table scrolls inside the column and stays keyboard-reachable. Desktop layout is unchanged.

## [4.8.3] - 2026-08-19

### Fixed

- **Every page scrolled sideways on a phone.** At 390px the header's right-hand item row (messages, notifications, fullscreen, user menu) is a little wider than the viewport at Bootstrap's default 1rem nav-link padding, so `document.scrollWidth` came out 22px past `clientWidth` on all 90 demo pages — a horizontal scrollbar on every screen. Below `sm` the header now halves `--bs-navbar-nav-link-padding-x`; from `sm` up nothing changes (the user menu keeps its 182px width and its label). Measured 412/390 before, 390/390 after, desktop unaffected.

  Worth noting for anyone who checks this themselves: measure `scrollWidth > clientWidth`, not `> window.innerWidth` — the layout viewport grows to match the overflow, so the `innerWidth` comparison silently passes.

## [4.8.2] - 2026-08-19

### Fixed

- **The documentation's install snippets were being served as `[email protected]`.** Cloudflare's Email Obfuscation treats any `package@version` in a text node as an email address and rewrites it as a mailto link — so every version-pinned snippet on the live docs pages was unusable: 31 of them on Integrations (Flatpickr, Tom Select, Quill, Chart.js …), 8 each on Introduction and Deployment, 7 on Getting Started. The docs pages now carry `<!--email_off-->` markers, the same fix docs.adminlte.io already used.

### Changed

- **The docs' install snippets are stamped from `package.json`.** Introduction, Getting Started, Deployment and Colors still pinned `admin-lte@4.0.0`, eight releases after that was current. `sync-version.mjs` now stamps `admin-lte@X.Y.Z` in the docs sources alongside the SCSS/TS banners, so `npm version` keeps them honest. A deliberate floating `admin-lte@4` (the README quick start) is left alone.

### Maintenance

- **Dev dependencies refreshed** — astro 7.1.6 → 7.2.3, @astrojs/mdx 7.0.5 → 7.0.6, eslint 10.8.0 → 10.8.1, the typescript-eslint trio 8.66.0 → 8.67.0, vitest 4.1.10 → 4.1.11, happy-dom 20.11.1 → 20.11.2, axe-core 4.12.1 → 4.13.0, terser 5.49.2 → 5.50.0, postcss 8.5.25 → 8.5.26, globals 17.9.0 → 17.11.0, concurrently 10.0.4 → 10.0.5, lockfile-lint 5.0.0 → 5.0.1. All within their current majors; `dist/` is byte-identical, so this changes nothing for consumers.
- **TypeScript stays on 6.0.3.** 7.0.2 is out, but `typescript-eslint` still declares `peerDependencies.typescript: ">=4.8.4 <6.1.0"` and `@astrojs/check` accepts `^5 || ^6`, so the toolchain cannot move yet. It will be picked up when those two allow it.

## [4.8.1] - 2026-08-19

### Fixed

- **Pagination lost its focus ring under `data-lte-primary`.** Both palette sheets shipped a literal `$pagination-focus-box-shadow-width` in their compiled output: Sass does not evaluate `$variables` inside a custom property value — it emits them verbatim rather than failing — so the typo compiled cleanly, reached the browser as text, and made the declaration invalid. `--bs-pagination-focus-box-shadow` then resolved to nothing and keyboard focus on `.page-link` became invisible, a keyboard-accessibility regression introduced in 4.6.0. The value is now built from Bootstrap's focus-ring tokens (the variable it named never existed; the right one is `$focus-ring-width`) and follows the theme colour. A unit test now scans the compiled output of all three sheets for unresolved Sass variables, since compilation cannot catch this class of typo (#6109, reported by @johnnyq).

## [4.8.0] - 2026-08-19

### Added

- **`data-lte-contrast="aa"` — WCAG AA text on the AdminLTE 3 palette, without changing a single colour.** The v3 sheet reproduces v3's YIQ text rule faithfully, and that rule assigns white text to eight colours that do not reach 4.5:1 for normal text: `teal` (2.13:1), `cyan` (3.04), `green` (3.13), `olive` (3.51), `lightblue` (3.67), `fuchsia` (3.79), `pink` (3.82) and `blue` (3.98). The attribute — on `<html>`, `<body>` or any container — flips exactly those eight to the ink that passes (5.28:1 to 9.86:1), leaving every background byte-identical, and covers everywhere the palette paints text on its own colour: `.text-bg-*`, `.bg-gradient-*`, `.card-*` headers, `.direct-chat-*` and the button, badge and pill text `data-lte-primary` produces. It has to be true black: AdminLTE 3's own dark ink `#1f2d3d` clears 4.5:1 on only two of the eight, so the colours that already carry dark text (`lime`, `orange`, `yellow`) keep `#1f2d3d` and are left alone. Rules are emitted per colour only where the palette's own rule falls short, so the designed palette — every colour AA with white by construction — emits nothing and the switch costs it nothing. **UI → Colors** and **Theme Customize** gained a toggle that also re-pairs a flipped sidebar or header with `data-bs-theme="light"` so its nav links follow (#6110, reported by @johnnyq).

### Fixed

- **`data-lte-primary` gave Bootstrap's `info` white text on the v3 sheet.** The primary presets applied the active sheet's contrast rule to Bootstrap's own theme colours too, and v3's YIQ test puts `#0dcaf0` at 149.8 against a threshold of 150 — one tenth of a point from dark text — so `data-lte-primary="info"` produced white on cyan at 1.96:1 while `.btn-info` on the same page stayed black. Bootstrap's theme colours now keep Bootstrap's own contrast rule; the palette colours keep the sheet's.

## [4.7.0] - 2026-08-18

### Added

- **`data-lte-print="plain"` — print a page as a document, not as a copy of a screen.** Two rules in the print stylesheet restyle content unconditionally: the target of every external link is printed after it (`a[href^="http"]::after`), and buttons are outlined in black. They are the HTML5 Boilerplate conventions and they suit printing a web page, but they are wrong for an invoice, quote or work order that goes to a customer — `Pay online (https://pay.example.com/inv/12345?token=…)` is not what anyone wants on paper. The attribute turns both off, on `<html>`, `<body>` or any single container, while text stays black on white so nothing becomes unreadable. Note that `.d-print-none` could not have served as the opt-out: it hides the element, and these rules restyle elements that are meant to print (#6108, requested by @johnnyq). Documented as the **“Printing a page as a document”** recipe.

### Fixed

- **Every sidebar item printed inside a black box.** The print rule that outlines buttons also listed `.nav-link`, and the sidebar prints by design (since 4.0.0), so a printed page came out with a black rectangle around all 85 menu items. The outline now applies to `.btn` only; nav links keep the ink-saving black-on-transparent treatment and print as ordinary text (#6108).
- The FAQ answer for “How do I change the primary colour?” recommended overriding `--bs-primary` on `:root` — the one approach that leaves `.btn-primary` blue, which is what led to #6107. It now gives the two that work: `$primary` in Sass, or `data-lte-primary` with the palette sheet.

## [4.6.0] - 2026-08-18

### Added

- **Make any palette colour Bootstrap's `primary` — `data-lte-primary`.** Bootstrap compiles `$primary` into its components, so `.btn-primary` ships with `--bs-btn-bg: #0d6efd` rather than `var(--bs-primary)`: overriding the token repainted the utilities and left every button, pagination, checkbox and focus ring blue, which is why a coloured skin looked half-applied. Both colour sheets now rewire those components to variables and point them at a colour with one attribute — `<html lang="en" data-lte-primary="teal">` — covering `.btn-primary` / `.btn-outline-primary` (hover, active and disabled shaded exactly as Bootstrap shades its own), `.btn-link`, links and `.link-primary`, the `--bs-primary` token trio, `.nav-pills`, `.pagination`, `.progress-bar`, `.list-group-item.active`, `.dropdown-item.active`, `.accordion`, `.form-control` / `.form-select` focus, checkboxes, radios, switches, `.form-range`, `--bs-focus-ring-color`, and AdminLTE's `.card-primary`, `.direct-chat-primary` and `.toast-primary` — in both colour modes, with Bootstrap's dark-mode link tint. Nothing changes without the attribute, and it works on any container, so one page can carry more than one primary. Bootstrap's own theme colours are presets too (`data-lte-primary="danger"`), a brand colour outside the palette needs only `--bs-primary` (hover shades are then derived with `color-mix()` where supported), and `$lte-palette-custom: ("brand": #hex)` generates a full preset in Sass. Every skin preset now names the primary that goes with it, so applying a skin on **UI → Colors** or **Theme Customize** recolours the buttons too; both pages gained a picker and a live preview, and the Colors docs page a section (#6107, requested by @johnnyq).

### Fixed

- **`d-print-none` did nothing on the sidebar and the app wrapper.** The print layout fix from 4.0.0 set `display: grid !important` on `.app-wrapper` and `display: block !important` on `.app-sidebar`, and — being later in the cascade and equally `!important` — beat Bootstrap's `.d-print-none`, so those two elements could not be hidden for printing. Both rules are now scoped with `:not(.d-print-none)`: the print layout still applies to the standard layout, and the display utilities win where a page asks them to (#6106, reported by @johnnyq).
- **The skip link went invisible on hover.** `.skip-link:hover` painted `var(--bs-primary-emphasis)`, which Bootstrap does not define (it emits `--bs-primary-text-emphasis`), so the background computed to transparent and left white text on the page background. It now uses the emphasis token — dark in light mode, light in dark mode — with the body background for the text.

### Maintenance

- Computed colours in both palette sheets are emitted as hex instead of Sass's `rgb(5.647%, 40.784%, 39.216%)` (cleancss leaves values inside custom properties alone), which pays for a good part of the new feature: `adminlte-colors.css` is ≈ 8 kB gzipped and `adminlte-colors-v3.css` ≈ 9.3 kB. `adminlte.css` is unchanged.
- `npm run palette -- --check` and the unit tests also verify that every skin's primary exists in its own palette and that both sheets emit the rewiring rules and a preset per colour.

## [4.5.0] - 2026-08-18

### Added

- **The AdminLTE 3 palette, as it was — `dist/css/adminlte-colors-v3.css`.** A second opt-in sheet for everyone who preferred the original colours: the 18 AdminLTE 3 colours (lightblue, navy, olive, lime, fuchsia, maroon, blue, indigo, purple, pink, red, orange, yellow, green, teal, cyan, gray, gray-dark) with the values from the 3.2 build and v3's text-colour rule (Bootstrap 4's YIQ test — white on lightblue, olive, teal…, dark on lime, orange, yellow), emitting exactly the same class families as the designed palette. Load one sheet or the other; they share class names. Built from the same Sass — new `$lte-palette-contrast: "wcag" | "yiq"` knob (with `$lte-palette-yiq-threshold`, `$lte-palette-yiq-text-dark/-light`) — so `$lte-palette-custom` and `$lte-palette-aliases` work with it too. Twelve AdminLTE 2 skin presets (skin-blue, -black, -purple, -green, -red, -yellow and their -light variants) in v4 terms. **UI → Colors** and **Theme Customize** gained a palette switch that swaps the stylesheet live and shows that palette's tiles, presets and pickers; the Colors docs page documents both. `npm run palette -- --check` and the unit tests keep the v3 map and its metadata in step (#6103, follow-up for @johnnyq).

## [4.4.1] - 2026-08-18

### Fixed

- **Charts unreadable in dark mode.** ApexCharts drew its light-theme tooltip (white background) while the tooltip text inherited the page's dark-mode body colour — near-white on white — and axis labels stayed dark grey on the dark card, in every browser. Every demo page now carries a small shared helper (`_scripts`): it sets ApexCharts' global default `theme.mode` from `<html data-bs-theme>` before any chart is created, keeps the chart background transparent, and watches the attribute so every chart with a `chart.id` follows the toggle, the OS preference in auto mode, or your own code. All demo charts got ids. Documented as the **“Charts that follow dark mode”** recipe (#6105, reported by @Yusk03).

## [4.4.0] - 2026-08-18

### Added

- **Extended colour palette (`dist/css/adminlte-colors.css`)** — an opt-in stylesheet (≈ 5 kB gzipped; `adminlte.css` is unchanged) that adds fourteen colours — orange, amber, olive, teal, sky, indigo, violet, fuchsia, pink, and the chrome neutrals navy, steel, slate, graphite, midnight — as `--bs-*` tokens plus every family Bootstrap generates for its own theme colours: `.bg-*`, `.text-bg-*`, `.text-*`, `.border-*`, `.link-*`, `.bg-gradient-*` (also for the eight theme colours, as in v3), `.card-*` / `.card-outline`, `.callout-*`, `.direct-chat-*`, with the subtle/emphasis tokens for dark mode and a hover shade for `.btn.bg-*`. The palette is generated, not picked: in OKLCH, each chromatic colour is the lightest value whose white text still reaches 4.6:1 (WCAG AA), hues sit ≥ 17° from every Bootstrap theme colour and ≥ 20° from each other, chroma is capped at parity with `primary`, and the five neutrals are cool-tinted and sit at the lightness steps popular admin kits use for sidebars. `scripts/palette.mjs` regenerates it (`npm run palette`) and checks it (`--check`); a unit test keeps the Sass map and the demo data in step. Add your own with `$lte-palette-custom: ("brand": #hex)`, replace the set with `$lte-palette`, restore v3 names with `$lte-palette-aliases: ("lightblue": "sky", "maroon": "pink")`. Documented on the new **Colors** page (`docs/colors.html`) — palette, class families, 17 skin presets in four families (light, semi-dark, full dark, coloured & gradient) each with a layout thumbnail, widget-set presets, brand-colour recipe, design rules with a hue/chroma plot — and demonstrated on **UI → Colors** (`UI/colors.html`), which recolours its own sidebar and header live from thumbnail presets, shows the four dashboard sets and every component, and has a brand-colour checker that reports contrast, proposes a same-hue value that passes, and prints the Sass snippet (#6103, requested by @johnnyq).
- **Header search and sidebar filter restyled** — one shared treatment (`mixins/_search-field.scss`): a quiet pill with the icon inside as the submit button, coloured only from theme-relative tokens (`--bs-emphasis-color-rgb`, `--bs-body-color`), so it reads as soft glass on any coloured or dark header / sidebar and soft grey on a white one, instead of a boxed `.input-group` with an outline button that turned near-black under `data-bs-theme="dark"`. The header field widens slightly on focus; below `md` an icon links to the search page. New variables `$lte-search-field-*` (width, focus width, font size, padding, icon space); the Main Header docs snippet, which still showed v3's inert `data-widget="navbar-search"`, now shows the real markup.
- **Theme Customize (`generate/theme.html`)** offers the palette in its sidebar / navbar / footer pickers under "Extended palette", gained a preset row with the same thumbnails, reflects the page's current state on load, and defaults the colour mode to dark when a palette colour is picked; its three duplicated scripts are one controller.
- The Migration and Customization pages point to the palette; the migration guide maps every AdminLTE 3 colour and skin class to its v4 form.

### Fixed

- **Sidebar taller than the viewport with the sidebar filter in place.** `.sidebar-wrapper` was sized with a hard-coded `100vh − header height`, which assumed only the brand sat above it; the `SidebarSearch` field added in 4.3.0 sits between the brand and the wrapper (on purpose, so it stays put while the menu scrolls), so the wrapper overflowed the sidebar by exactly the filter's height and the last menu items were cut off. `.app-sidebar` is now a flex column: brand and filter keep their size (`flex: 0 0 auto`), `.sidebar-wrapper` fills the rest (`flex: 1 1 auto; min-height: 0`) and scrolls — in fixed layouts, the `fixed-header`-only case, and the off-canvas sidebar. Anything else placed above or below the menu now sizes correctly too, without a height calc (#6104, reported by @dfsmania).

## [4.3.1] - 2026-08-10

### Fixed

- **Ribbons left the card corner bare.** The banner was centred on its clipping square, but the square's centre is the point *furthest* from the corner — so the banner sat too far into the card, left a large empty triangle at the corner it is supposed to cover, and had its label cut off by the clip. The banner's centre now sits on the corner's bisector at ~46% of the square's side, the proportion that leaves the label room and fills the corner, and the width is the chord across the corner rather than the square's diagonal. RTL mirrors as before.
- The ribbons demo uses short labels and states the constraint: the banner is clipped to the corner, so only about `64px` of it is readable at the default size. `.ribbon-lg` and `.ribbon-xl` give more room. Documented on the Miscellaneous components page.

## [4.3.0] - 2026-08-10

### Added

- **Gallery page (`pages/gallery.html`)** — a filterable media library: responsive tile grid, per-item action menus, a live result count and an empty state. It carries **no image library at all** — the tiles are a Bootstrap `.ratio` box plus `.object-fit-cover`, and the category filter is ~25 lines of page-local script, so nothing is added to `adminlte.js` and no CDN dependency is imposed on anyone who just wants the grid. A lightbox stays deliberately out of scope; it is the part that needs a dependency.
- **Search results page (`pages/search-results.html`)** — typed results (page / user / file / project, each with its own icon and badge) over a tabbed type filter, plus a refine panel, related searches, pagination and a worked "no results" state. The navbar search now posts to it with `name="q"` instead of `action="#"`, so the search added alongside `SidebarSearch` has a real destination.
- **Language menu in the app header** — a `bi-translate` dropdown listing five locales with the current one marked via `.active` + `aria-current`, and `hreflang` on each item. It is markup only, by design; the new **"A language switcher wired to a real locale"** recipe in the docs covers the four things that separate a working switcher from set dressing — real per-locale links rather than `#` plus a click handler, the locale living in the URL or a cookie rather than `localStorage` (the server has to know it *before* it renders), marking the current language for assistive tech, and serving `adminlte.rtl.css` alongside `dir="rtl"` when switching to an RTL locale.
- **`SidebarSearch` plugin** — a filter field above the sidebar menu (`data-lte-toggle="sidebar-search"` on an input, optional `data-lte-target` for the menu). Typing hides non-matching entries and expands whatever submenu holds a match; a group whose own name matches keeps its entire subtree, so expanding it is never a dead end. Clearing the field — `ESC`, the native clear button, or `clear()` — restores every entry *and* each submenu's previous open state, including the inline `display` Treeview's slide animation leaves behind. Entries are hidden with the `hidden` attribute rather than a class, so they leave the accessibility tree too. Fires `filtered.lte.sidebar-search` with `{ query, matches }`; both listeners are delegated on `document`, so a sidebar rendered after load needs no re-initialisation. Wired into every demo and docs page, and documented at `docs/javascript/sidebar-search.html`.
- **Navbar search** in the app header — a `role="search"` form with a visually-hidden label, shown from the `md` breakpoint up, posting to the new search results page.
- **Ribbons** (`.ribbon-wrapper` + `.ribbon`, sizes `.ribbon-lg` / `.ribbon-xl`) — the corner banner from v3, rebuilt. The wrapper clips the banner and the banner is centred on it before rotating, so the whole geometry follows one custom property (`--lte-ribbon-size`) and stays correct at every scale; the clip inherits the parent's corner radius, so it follows a rounded card instead of cutting a square out of it. Colour comes from a `.text-bg-*` utility and long labels truncate rather than breaking the shape. rtlcss mirrors both the corner and the rotation, so RTL needs no extra markup. New demo page at `UI/ribbons.html`.
- **Social and post widgets** (`.user-block`, `.post`, `.widget-user`, `.widget-user-2`, `.description-block`) — the profile cards and activity-feed blocks from v3, keeping their v3 class names so migrating markup works unchanged, but laid out with grid and flex rather than floats and coloured with Bootstrap utilities. `.user-block` renders avatar, name and meta from flat markup with no wrapper element. New demo page at `widgets/social.html`.
- **Nav tabs & pills, modal and offcanvas sections** on `UI/general.html` — the three Bootstrap components the components showcase did not yet cover.
- **Card and Miscellaneous documentation pages** (`docs/components/card.html`, `docs/components/miscellaneous.html`) — between them they document every AdminLTE component that ships CSS but had no reference until now: cards (anatomy, colour variants, states, tabbed cards, Sass variables), callouts, ribbons, small box, info box, timeline, the social/post widgets, progress-bar sizes, themed toasts and the image-size utilities.
- **Select2 compatibility theme (`dist/css/adminlte-select2.css`)** — an opt-in, **CSS-only** sheet for projects that can't drop Select2 yet. AdminLTE still bundles neither Select2 nor jQuery and nothing is added to `adminlte.css`; load this one extra stylesheet after `select2.css` and a Select2 you bring yourself inherits Bootstrap 5.3's form metrics (`.form-select-sm` / `-lg` on the original `<select>` are honoured), focus ring, `.is-invalid` / `.is-valid` states, input-group corner rounding, badge-style multi-select pills, and `data-bs-theme` dark mode — including the body-appended dropdown. It also raises the dropdown above `.modal`, which removes the usual need for `dropdownParent`. Source lives in `src/scss/compat/_select2.scss` for anyone compiling their own Sass; RTL and minified variants are generated alongside the rest of the CSS (#6097, requested by @saddam2512).
- **Third-party plugin replacement table** on the Migration page: every jQuery widget AdminLTE 3 bundled (Select2, DataTables, Summernote, iCheck, bootstrap-datepicker, jQuery Knob, Mapael, …) mapped to its vanilla-JS successor. The old plugin names were absent from the v4 docs entirely, so anyone searching for the plugin they knew found nothing and concluded it was unsupported.
- **Select2 → Tom Select API mapping**, on both the Advanced Elements demo page and the Integrations docs page: 19 options, methods and events translated one-to-one (`ajax` → `load` + `loadThrottle`, `templateResult` → `render.option`, `select2("destroy")` → `ts.destroy()`, and so on).
- **jsVectorMap** documented on the Integrations page as the dependency-free successor to AdminLTE 3's jQuery Mapael.
- **New FAQ entry, "Does AdminLTE 4 support Select2?"**, plus a pointer from the existing jQuery question to the replacement table. The Deployment asset table and the RTL page now list the optional Select2 sheet alongside the core builds, and the README's breaking-changes list links the replacement table.

### Changed

- **Removed the dead `src/html/components/docs/faq.mdx`.** The docs FAQ has been rendered from the typed `sections` array in `src/html/pages/docs/faq.astro` since the accordion rewrite, and nothing imported the `.mdx` any more — but two later commits kept editing it, so those edits silently did nothing. It is the only docs `.mdx` with no importer; every other one is rendered by its matching `pages/docs/*.astro`.
- **The remote-data Tom Select demo in `forms/advanced.html` is now the real pattern**, not a `setTimeout` sketch: request debouncing via `loadThrottle`, in-flight cancellation via `AbortController`, and page-by-page loading through the `virtual_scroll` plugin against a 72-record stub whose `{ results, next }` response shape matches a real endpoint — swap the stub body for a single `fetch()` and it works unchanged. The single select also gained the `clear_button` plugin.
- **The axe gate covers 16 pages** (from 10), adding `UI/general.html`, `UI/ribbons.html`, `widgets/social.html`, `pages/gallery.html`, `pages/search-results.html` and `docs/components/miscellaneous.html`. Unit tests are up to 62 (from 51). The two new pages needed three Bootstrap-default contrast fixes the gate caught: `.text-secondary` under 4.5:1 on the tertiary page ground, the nav-tab link blue under it on the same ground (the tabs moved onto the card surface, which is the documented `.card-tabs` shape), and `.btn-outline-secondary` under it on a card footer.
- **Outline buttons on `UI/general.html` are demonstrated where they are legible.** The warning, info and light outline variants draw their text in a light colour that falls below 4.5:1 on a light surface — adding the page to the axe gate surfaced it. They now sit on a dark panel, with a note saying why, which is also the guidance Bootstrap gives for them.
- **Bundlewatch budgets raised** for the ribbon, widget and SidebarSearch additions: `adminlte.min.css` 42.5 → 43.5 kB and `adminlte.min.js` 7.5 → 8.5 kB gzip (and the matching RTL/ESM/unminified entries).

### Fixed

- **Dashboard v2 linked to a page that does not exist.** Seven order-number links in `index2.html` pointed at `pages/examples/invoice.html`; the invoice page is at `pages/invoice.html`. Caught by a new link-resolution pass over every built page.
- **`#navigation` no longer resolves to the app header.** `ensureSkipTargets()` looked its two skip-link targets up with a single selector list each (`#navigation, nav, [role="navigation"]`), but a selector list resolves in *document order* rather than by which selector matched — so on every demo page, where the header `<nav>` precedes the sidebar menu that already carries `id="navigation"`, the header was stamped with the id a second time. That left a duplicate id in the document, pointed the "Skip to navigation" link at the header instead of the menu, and silently redirected any application code doing `document.querySelector("#navigation")` to the wrong element. An element the page already gave the id to now always wins.

## [4.2.0] - 2026-08-06

### Added

- **Advanced form pages:** `forms/advanced.html` demonstrates the recommended Tom Select and Flatpickr integrations (searchable single select, tag-style multi-select, option groups loaded on demand; date, date-time, range, and time pickers), and `forms/editors.html` demonstrates Quill 2 in both the snow (toolbar) and bubble (inline) themes. CDN assets are pinned to the versions recommended on the docs Integrations page and carry SRI hashes. Both pages are linked from the sidebar's Forms menu.
- **Top-nav layout demo:** `layout/top-nav.html` — a sidebar-less page whose primary navigation lives in the app-header as a plain Bootstrap `navbar-expand-lg` (collapse toggler on mobile, no PushMenu). No new CSS was needed: without an `.app-sidebar` in the markup, the `app-wrapper` grid's `auto` sidebar column collapses to zero width on its own.
- **Color mode: server-rendered themes, and an opt-out for applications with their own theming.** ColorMode now resolves the theme from the visitor's stored choice, then a theme the page declared itself in `<html data-bs-theme="light|dark">`, then the OS preference — so a theme rendered server-side from a cookie or a user record is no longer overwritten on load, and no longer lost the first time the OS preference changes. Applications that manage `data-bs-theme` themselves — including anyone using a custom Bootstrap theme name, which ColorMode cannot resolve — turn the module off entirely with `<html data-lte-color-mode="off">`: nothing is written on load, on a `[data-bs-theme-value]` toggle click, or when the OS preference changes, and the pre-paint snippet in `<head>` honours it too (#6084, reported by @cytech; #6093, thanks @dfsmania). The snippet now flags the values it resolves itself with `data-lte-theme-resolved`, so a computed theme is never mistaken for one the page declared.
- **`initialize()` / `teardown()` lifecycle API for client-side rendered layouts:** frameworks that build the layout after `DOMContentLoaded` into a persistent `<body>` (GWT and similar widget toolkits) can call `adminlte.initialize()` once the layout is attached — it tears down the previous cycle's listeners and re-runs every plugin's initialisation against the current DOM, and is safe to call repeatedly (#6083, thanks @themarioga). `teardown()` is the inverse, for apps that unmount the layout. Re-initialisation was hardened along the way: the accessibility module's per-field `invalid` listeners no longer stack across cycles, an `initialize()` call made while the document is still loading no longer suppresses the initial `DOMContentLoaded` pass, and calling `initialize()` from inside a lifecycle callback no longer recurses.

### Changed

- **Dev dependencies refreshed to their latest releases**, including two majors: `eslint-plugin-astro` 2 → 3 and `eslint-plugin-unicorn` 72 → 73, whose new `single-line-block-comment-style` rule prompted converting four one-line banner comments in `src/ts/util/index.ts` to line comments. Also Astro 7.1.6, ESLint 10.8, typescript-eslint 8.66, Sass 1.102, Rollup 4.62.4, Terser 5.49.2, PostCSS 8.5.25, happy-dom 20.11.1, `@astrojs/mdx` 7.0.5, plus concurrently, fs-extra and globals. TypeScript stays on 6.0.3: 7.0 has shipped, but both `typescript-eslint` (peer `>=4.8.4 <6.1.0`) and `@astrojs/check` (peer `^5 || ^6`) still cap it, so installing it fails dependency resolution outright. Nothing in `dist/` changed as a result. Supersedes #6085–#6092.
- Component docstrings corrected in `base-component.ts` and `push-menu.ts` (#6082, thanks @dfsmania), the `adminlte-docs.scss` banner is now version-synced by `npm version` along with the other source banners, and the README's screenshots were downscaled to WebP for faster cold-cache loads.

### Fixed

- **A sidebar rendered collapsed no longer springs open on load:** a page shipping `<body class="sidebar-collapse">` had that state overwritten by PushMenu's responsive pass during initialisation, so a deliberately collapsed sidebar expanded itself on wide screens. The responsive pass now runs only when the sidebar was not already collapsed in the markup (#6076, thanks @dfsmania).
- **The Color Mode docs page ran two switchers at once:** `docs/color-mode.html` still carried the pre-4.1 inline toggler, which bound its own handlers to the same `[data-bs-theme-value]` buttons as the bundled module and persisted to a different `localStorage` key (`theme` instead of `lte-theme`). It has been removed — the page now uses the shipped ColorMode like every other page.

## [4.1.0] - 2026-07-02

### Added

- **ESM bundle and TypeScript declarations on npm:** `dist/js/adminlte.esm.js` (+ `.min`) ships alongside the UMD build, generated `.d.ts` files ship under `dist/js/types/`, and package.json gains `module`, `types`, and a full `exports` map (with `sass`/`style` conditions and `./dist/*` + `./src/scss/*` subpaths). `import { PushMenu } from "admin-lte"` now resolves natively in Vite/webpack and type-checks out of the box — previously the package shipped a single minified UMD file with no typings at all.
- **Component lifecycle API (Bootstrap-style):** every JS component now has `getInstance(element)`, `getOrCreateInstance(element, config?)` and `dispose()`, backed by a per-element WeakMap registry (instances are garbage-collected with their elements — Turbo-safe). The data API now uses **delegated document-level listeners**, so toggles inside content inserted after page load (AJAX partials, Turbo Frames) work without re-initialisation. `PushMenu` is finally controllable programmatically via `PushMenu.getInstance(sidebar)`.
- **`ColorMode` module in the bundle:** the light/dark/auto switcher (persisted in `lte-theme`, OS-preference aware, `[data-bs-theme-value]` data-API, `changed.lte.color-mode` event) is now part of `adminlte.js`. Applications no longer need to copy the demo's inline script; the demo pages now use the bundled module. Only the tiny no-flash snippet in `<head>` remains inline, by design.
- **`bootstrap` declared as a peer dependency** — the Sass source imports it, so `@use "admin-lte/src/scss/adminlte"` now works after a plain `npm install admin-lte` (npm installs the peer automatically). Documented the required Sass load-path setup.
- **New demo pages:** a blank **starter page** (the most-requested v3 page, absent from v4), a dedicated **ApexCharts** page with six chart types, and a **Users** management page (searchable directory table, add-user and delete-confirmation modals, pagination). All linked from the sidebar.
- **Test baseline:** a vitest + happy-dom unit suite (30 tests across the component lifecycle, card/treeview/push-menu behavior, ColorMode, and slide animations) wired into `npm run production`; plus `npm run test-a11y` — an axe-core check over key built demo pages that fails on serious/critical WCAG violations, with a dedicated GitHub workflow.

### Fixed

- First findings of the new axe gate, fixed at the source: breadcrumb links now use the darker link shade (Bootstrap's default blue was 4.26:1 against the content-header's gray background — below WCAG AA's 4.5:1), the direct-chat message pane is keyboard-focusable (`tabindex="0"` + `role="log"`), and muted footnote text uses `text-body-secondary` instead of the failing `text-secondary`.

### Changed

- **Component events overhauled (behavior change):** all plugin events are now bubbling `CustomEvent`s dispatched on the component's root element (the card, the nav item, the sidebar) — previously most were non-bubbling and card events fired on whatever was clicked, including the `<i>` icon. Animated actions gained cancelable "before" events (`collapse`/`expand`/`remove.lte.card-widget`, `expand`/`collapse.lte.treeview`, `open`/`collapse.lte.push-menu`) and their "after" events (`collapsed`, `expanded`, `removed`, `opened`, …) now fire when the animation completes, not when it starts. If you listened for card events on the tool buttons themselves, listen on the card or on `document` instead.
- **Docs styles split out of the production CSS:** the documentation/FAQ styling now compiles to a separate `adminlte-docs.css`, loaded only by the docs pages. Together with the 4.0.4 dedup, `adminlte.min.css` is down to ~40.4 KB gzip (from 46.7 KB in 4.0.3); bundlewatch budgets tightened accordingly.
- **Vendored Bootstrap variables fork replaced:** the 1,766-line `_bootstrap-variables.scss` copy (which had to be re-synced by hand every Bootstrap release) is gone; AdminLTE's ~10 actual changes now live in a small `_bootstrap-overrides.scss` loaded before Bootstrap's own variables. Compiled CSS is byte-identical.
- **Sass deprecation policy:** the build no longer silences all warnings (`--quiet`); it silences only dependency warnings and the known `@import` deprecation (`--quiet-deps --silence-deprecation=import`), so new deprecations in AdminLTE's own code surface at build time. All deprecated global built-ins (`map-get`, `map-keys`) migrated to the `sass:map` module. The full `@use` module-system migration is intentionally deferred until Bootstrap ships module-system Sass (Bootstrap 6) — Bootstrap 5's partials are designed around `@import`'s shared global namespace and cannot be loaded individually via `@use`.
- Rewrote the color-mode docs page around the bundled `ColorMode` module (the old copy-paste script it showed used a stale storage key); tsconfig.json no longer carries the invalid `"root": true` option.

## [4.0.4] - 2026-07-02

### Added

- **Forgot-password example page** — both login pages have linked `forgot-password.html` since 4.0.0, but the page didn't exist (dead link in every deployed demo). Now shipped and listed in the sidebar under Examples › Version 1.
- **Treeview exposes its state to assistive tech:** submenu toggle links now carry `aria-expanded`, stamped on init and kept in sync on open/close.

### Fixed

- **npm packaging:** the package is now built from a `files` allowlist instead of the `.npmignore` denylist. Stray local files can no longer leak into the tarball (4.0.2 shipped an untracked working file this way), and the demo/docs HTML — which SECURITY.md advises never to deploy — is no longer published to npm. Unpacked size drops from 12.7 MB to 9.0 MB (177 → 95 files). Also declares `engines: node >= 20`.
- **CSS bundles shipped the docs-site styles twice:** `_docs.scss` was imported from both `adminlte.scss` and `parts/_core.scss`, and Sass `@import` duplicates output — ~23 KB of dead weight in each of the four dist stylesheets.
- **Accessibility module keyboard handling:**
  - removed the document-edge Tab wrap — it acted as a page-level keyboard trap (WCAG 2.1.2), preventing keyboard users from ever tabbing out to the browser chrome
  - arrow keys are no longer intercepted inside inputs, textareas, selects, or contenteditable elements (typing in a navbar search field used to yank focus into the menu), and menu arrow-navigation only engages when focus is actually on a menu item
  - modal focus restore now captures the triggering element on `show.bs.modal` (capturing on `shown` stored an element inside the modal, so closing dropped focus to `<body>`); `[autofocus]` is respected
- **Hotwired Turbo no longer duplicates injected DOM:** the skip links, `#live-region`, and sidebar overlay are now reused when a restored `<body>` snapshot already contains them — previously they accumulated one copy per navigation.
- **Card widget:** `remove()` now actually removes the card from the DOM after the animation (it only hid it, so hidden form fields kept submitting); clicking the collapse toggle mid-animation reverses it instead of being swallowed; widget events now dispatch on the toggle button itself rather than a clicked `<i>` icon; `minimize()` cleans up its inline styles.
- **Slide animations are cancelable:** rapid-toggling a treeview or card no longer lets a stale animation timer strip styles mid-flight and desync display state.
- **Treeview accordion guard** compared each open item against the parent `<ul>` (never true), so `open()` on an already-open item slid its own menu shut.
- **PushMenu** reacts to viewport changes via `matchMedia` on the actual breakpoint crossing — mobile URL-bar/keyboard resizes and same-side width changes no longer re-expand a sidebar the user collapsed; the default breakpoint (991.98) now matches the CSS convention, fixing a 992px off-by-one.
- **Callout variants** referenced two custom properties that were never defined, so links and inline code inside callouts never recolored; the user-menu footer used `--bs-light-bg`, which doesn't exist in Bootstrap 5.3 (now `--bs-tertiary-bg`).
- **Demo pages:** Bootstrap JS CDN pin updated 5.3.7 → 5.3.8 to match the compiled CSS; removed the dead navbar-search button (`data-widget="navbar-search"` has no implementation in v4); every page now has exactly one `<h1>` (page titles were `<h3>`); breadcrumbs are wrapped in `<nav aria-label="breadcrumb">`; all icon-only buttons (card tools, topbar toggles) have `aria-label`s; auth forms have real `<label>`s and `<main>` landmarks; dated "Google+" copy updated.

### Changed

- **ACCESSIBILITY-COMPLIANCE.md rewritten as an accurate accessibility statement** — what's implemented, what's partial (treeview keyboard pattern, drag-and-drop alternatives, touch-target sizes), and what's on the roadmap — replacing the aspirational all-checked WCAG checklist. Demo meta descriptions updated to match.
- **bundlewatch budgets recalibrated:** CSS budgets tightened (46 → 44 kB min+gzip) to lock in the docs-dedup win; JS budget raised (5.8 → 6.5 kB) for the behavior fixes above.

## [4.0.3] - 2026-07-01

### Added

- **Hotwired Turbo / Turbo Drive support:** plugins now re-initialise on `turbo:load`, so PushMenu, TreeView and the other JS components keep working after Turbo swaps the `<body>` on in-app navigation (previously they went dead after the first link click). Each init cycle uses an `AbortController` whose signal is aborted on `turbo:before-render`, so the `window`/`document`-level listeners are torn down before re-init instead of stacking up on every navigation. (#563, #5890 — diagnosed and prototyped by @MarkDaleman in #6058)

### Fixed

- **Fullscreen state sync:** the fullscreen icons and the `maximized`/`minimized` events are now driven by the native `fullscreenchange` event instead of the request/exit calls. The UI no longer flips when a fullscreen request is denied (permissions policy, missing `allowfullscreen`, lost user gesture), and it now stays in sync when the user exits with `ESC` or `F11`. (builds on @webgo-oss's report in #6055)
- **Accessibility:** form inputs lacking both an `id` and a `name` now receive a stable, generated error-message id instead of colliding on a shared `-error` id and appending a new orphaned error node on every re-validation. (#6055, reported by @webgo-oss)

### Updated

- All dependencies bumped to their latest releases, including four majors — **Astro 6 → 7** (which pulls in Vite 8), **@astrojs/mdx 6 → 7**, **eslint-plugin-astro 1 → 2**, and **eslint-plugin-unicorn 68 → 69** — plus ESLint, Prettier, Stylelint, PostCSS, Rollup and typescript-eslint. No source changes were required; the full `npm run production` pipeline (lint + Astro build + bundlewatch) passes and `npm audit` remains at **0 vulnerabilities**. (supersedes Dependabot PRs #6065–#6074)

## [4.0.2] - 2026-06-11

### Fixed

- **#6048:** `npm run production` no longer fails — the dev-only `scripts/social-preview.mjs` tripped 9 ESLint errors when building from source. The script is now lint-clean. (reported by @lfiorini)

### Security

- Hardened the social preview script's static file server against path traversal and error detail leakage (CodeQL alerts #87–#92). Dev-only script, not part of the npm package.

## [4.0.1] - 2026-06-11

### Added

- **Official framework integrations announced** — AdminLTE 4 is now available as first-class packages for four ecosystems, maintained under ColorlibHQ:
  - [adminlte-vue](https://github.com/ColorlibHQ/adminlte-vue) — Vue 3 & Nuxt, 45+ typed components, composables, SSR-safe theming, ⌘K command palette
  - [adminlte-react](https://github.com/ColorlibHQ/adminlte-react) — React & Next.js (App Router / RSC), 30+ typed components, dark mode, ⌘K command palette
  - [adminlte-django](https://github.com/ColorlibHQ/adminlte-django) — config-driven sidebar menu, 33+ components, themed `django.contrib.admin`, `{{ form }}` renderer
  - [adminlte-laravel](https://github.com/ColorlibHQ/adminlte-laravel) — Blade integration, Vite-ready
- Social preview generator script (`scripts/social-preview.mjs`, dev-only — excluded from the npm package).

### Fixed

- **#6043:** Stored color mode is now applied before first paint — no more light-mode flash when reloading a page in dark mode. (reported by @bsshreesha)
- **#6044:** Long subject/preview text in the mailbox inbox list is truncated instead of overflowing its container. (reported by @Oscurlo)
- **#6038:** `accessibility.js` no longer assigns `role="navigation"` to `<ul>`/`<ol>` elements, which broke list semantics and failed the Lighthouse accessibility audit. (reported by @lfiorini)

### Updated

- All dependencies bumped to latest; `axios` pinned via npm overrides to clear a transitive advisory. `npm audit` remains at **0 vulnerabilities**.

## [4.0.0] - 2026-05-19

### Added

- **18 new demo pages** dramatically expanding the page catalog:
  - **Apps:** Calendar (FullCalendar 6, drag-and-drop scheduling), Kanban (SortableJS, lane-to-lane drag), Chat (full-page conversation app), File Manager (grid + list views, folder tree), Projects (list with status, progress, team avatars)
  - **Mailbox:** Inbox, Read Message, Compose — three-pane workflow with folders + labels
  - **Forms:** Wizard (4-step with per-step validation + review summary)
  - **Tables:** Data Tables — jQuery-free implementation using Tabulator 6
  - **Pages:** Profile (tabbed activity/timeline/settings), Settings (account / notifications / security / billing / danger zone), Invoice (print-ready with totals math), Pricing (3-tier + comparison table + billing toggle), FAQ (data-driven accordions)
  - **Error pages:** 404, 500, Maintenance
- **Recommended Integrations docs page** (`docs/integrations.html`) — copy-paste install snippets for Flatpickr, Tom Select, noUiSlider, Pickr, IMask, Dropzone, FilePond, Quill, EasyMDE, Toast UI Editor, ApexCharts, Chart.js, Tabulator, FullCalendar, SortableJS, GLightbox, and a comparison of icon libraries. AdminLTE doesn't bundle these — the page shows how to drop them in.
- **Visible color-mode toggle in the default topbar** (#6010) — Light / Dark / Auto dropdown with localStorage persistence and `prefers-color-scheme` integration. Wiring JS shipped globally in `_scripts.astro` so the toggle works on every demo page automatically.

### Changed

- **Forms section restructured:** Split the 623-line `forms/general.html` into three focused pages — `forms/elements.html` (inputs, selects, checks/radios/switches, ranges, floating labels), `forms/layout.html` (horizontal, inline, sizing, width), and `forms/validation.html` (Bootstrap native validation + tooltip variant).

### Fixed

- **#6028:** Color-mode "Auto" icon now renders. The dropdown used `bi-circle-fill-half-stroke` (a FontAwesome class name); replaced with the correct Bootstrap Icons class `bi-circle-half`.
- **#6026:** `.table-head-fixed` now respects dark mode. Hardcoded `background-color: $white` swapped for `var(--bs-body-bg)` so the sticky header tracks the active colour scheme.
- **#6021:** Fullscreen button no longer shifts after click. The plugin used to set `iconMaximize.style.display = 'block'` directly, overriding the icon library's natural display value (visible on FontAwesome). Now toggles Bootstrap's `.d-none` utility class. Markup updated accordingly.
- **#6020:** Sidebar (including brand) now stays put when using `.fixed-header`. New companion rule pins the sidebar sticky on `sidebar-expand-*` breakpoints, giving the menu its own scrollbar instead of scrolling with the page.
- **#6019:** Pie chart on `index2.html` no longer flickers on browser zoom. Pinned an explicit `height: 350` to break the ApexCharts ResizeObserver feedback loop most visible on Edge.

### Updated

- **Bootstrap variable sync with 5.3.4:**
  - Added missing null variables: `$btn-close-filter`, `$carousel-control-icon-filter`
  - Marked deprecated-in-5.3.4 variables with inline comments: `$btn-close-white-filter`, `$carousel-dark-indicator-active-bg`, `$carousel-dark-caption-color`, `$carousel-dark-control-icon-filter`
  - Documented the intentional override of `$modal-content-color` (null vs Bootstrap's `var(--bs-body-color)`)
- **All dependencies bumped to latest, including majors:**
  - eslint: 9.39.4 → 10.4.0
  - typescript: 5.9.3 → 6.0.3 (`baseUrl` removed, `moduleResolution: "bundler"` set to clear deprecation warnings)
  - stylelint: 16.26.1 → 17.11.1
  - eslint-plugin-unicorn: 62 → 64
  - astro: 6.0.0 → 6.3.3
  - autoprefixer: 10.4.27 → 10.5.0
  - postcss: 8.5.8 → 8.5.14
  - rollup: 4.59.0 → 4.60.4
  - sass: 1.97.3 → 1.99.0
  - terser: 5.46.0 → 5.47.1
  - bundlewatch: 0.4.1 → 0.4.2, fs-extra: 11.3.4 → 11.3.5, prettier: 3.8.1 → 3.8.3
- **ESLint config flattened:** Removed the legacy `.eslintrc.json` (ignored since ESLint 9), along with three deps that only it referenced: `eslint-plugin-import`, `eslint-config-xo`, `eslint-config-xo-typescript`. Added explicit deps for `@eslint/js`, `globals`, and `typescript-eslint` (now required to be declared since ESLint 10 stopped resolving them transitively).
- **`stylelint-config-twbs-bootstrap` peer pinned via npm overrides** so it accepts stylelint 17 ahead of an upstream release. This removes the need for `--legacy-peer-deps` on `npm install`.
- **Security:** `yaml` pinned to `^2.9.0` via overrides to clear the dev-only stack-overflow advisory chain through `@astrojs/check`. `npm audit` now reports **0 vulnerabilities**.

## [4.0.0-rc7] - 2026-03-10

### Added

- **Sidebar Without Hover:** New `sidebar-without-hover` body class that prevents collapsed mini sidebar from expanding on hover (#5837)
  - New demo page at `layout/collapsed-sidebar-without-hover.html`
- **JavaScript Documentation:** Added documentation pages for all JS components
  - Layout, Card Widget, Direct Chat, Fullscreen, and Accessibility modules
  - Updated PushMenu documentation with configuration options and responsive behavior
  - All 7 JS components now fully documented in the sidebar navigation
- **Accessibility Module:** WCAG 2.1 AA compliance features (skip links, focus management, keyboard navigation, reduced motion, live announcements)
- **Print Layout Fix:** Sidebar and main content now both visible when printing (#5996)

### Changed

- **Sidebar Persistence:** `enablePersistence` now defaults to `false` (was `true`). Opt in via `data-enable-persistence="true"` on `.app-sidebar`. **BREAKING CHANGE**
- **Layout Plugin Refactor:** Single Layout instance with persistent hold-transition timer, proper cleanup on resize (#5956)
- **PushMenu Plugin Refactor:** Single PushMenu instance with proper responsive logic, config from data attributes, mobile-aware state management (#5954)
- **Login/Register Box:** Increased width from 360px to 400px (#5963)

### Fixed

- **Fixed Footer with Layout Fixed:** Footer now stays pinned at the bottom when using both `.fixed-footer` and `.layout-fixed` (#5805)
- **Mobile Sidebar Scroll Chaining:** Added `overscroll-behavior: contain` to prevent page scroll when scrolling sidebar on mobile (#5864)
- **Sidebar Flicker on Load:** Resolved by layout refactor fixing duplicate initialization and broken hold-transition timer (#5952)
- **Bootstrap Modal Escape Key:** Accessibility module no longer intercepts Escape key when a Bootstrap modal is open (#5993)
- **Pagination Border Radius:** Fixed `calc()` syntax in `_bootstrap-variables.scss` to match Bootstrap 5.3 format (#5951)
- **slideUp/slideDown at Duration 0:** Added early return guard for zero/near-zero animation durations (#5964)
- **TypeScript Comments in Build:** Added `removeComments: true` to tsconfig.json for smaller unminified bundles (#5953)

### Updated

- **Dependencies:** Updated all packages to latest semver-compatible versions
  - astro: 5.x → 6.0.0
  - @astrojs/mdx: 4.x → 5.0.0
  - @astrojs/check: 0.9.6 → 0.9.7
  - @rollup/plugin-typescript: 12.3.0 → 12.3.1
  - @typescript-eslint/eslint-plugin: 8.48.1 → 8.50.0
  - @typescript-eslint/parser: 8.48.1 → 8.50.0
  - autoprefixer: 10.4.22 → 10.4.23
  - eslint: 9.39.1 → 9.39.4
  - postcss: 8.5.7 → 8.5.8
  - rollup: 4.53.3 → 4.59.0
  - sass: 1.94.2 → 1.97.3
  - terser: 5.44.1 → 5.44.3
  - typescript: 5.9.2 → 5.9.3
- **Bundlewatch:** Updated adminlte.js size limit to 5.2 kB

## [4.0.0-rc6] - 2025-12-08

### Security

- **Fixed 4 Security Vulnerabilities:** Resolved all npm audit security issues
  - Fixed high severity reflected XSS vulnerability in Astro server islands
  - Fixed moderate severity authentication bypass via url.pathname in Astro
  - Fixed moderate severity stored XSS in Astro Cloudflare adapter /_image endpoint
  - Fixed moderate severity unsanitized class attribute in mdast-util-to-hast
  - All vulnerabilities resolved by updating to Astro 5.16.4+

### Added

- **Sidebar State Persistence:** New feature to remember sidebar collapsed/expanded state
  - Sidebar state now persists across page refreshes using localStorage
  - Configurable via `enablePersistence` option (default: `true`)
  - SSR-safe implementation with proper environment checks
  - Mobile-aware: doesn't restore state on small screens (respects responsive breakpoints)
  - Graceful error handling for private browsing mode
  - Storage key: `lte.sidebar.state`

### Changed

- **GitHub Actions:** Updated all workflows to Node.js 22 (from Node.js 18)
  - Node.js 18 reached End-of-Life on April 30, 2025
  - Node.js 22 is the current Active LTS (supported until April 2027)
  - Updated `setup-node` action from v3 to v4 across all workflows
  - Updated CodeQL actions from v2 to v3
  - Added `FORCE_COLOR: 2` environment variable to codeql.yml for consistency

### Fixed

- **Release Workflow:** Fixed zip command in release.yml
  - Corrected `-d` flag to `-r` for recursive directory zipping
  - Fixed filename inconsistency in release artifacts
- **Nested Card Expand Icon:** Fixed issue #5909 where nested collapsed cards didn't show expand icon
  - Updated CSS selectors to use direct child (>) scoping for card state icons
  - Collapse/expand icons now correctly display for nested cards independently
  - Card body/footer display rules now only affect direct children, not nested cards
- **Card Widget JavaScript:** Fixed nested card collapse/expand affecting child cards
  - Added `:scope >` selector to only target direct card-body/footer children
  - Prevents parent card collapse from affecting nested card animations

### Updated

- **Dependencies:** Updated 15+ packages to latest versions
  - @astrojs/check: 0.9.5 → 0.9.6
  - @astrojs/mdx: 4.3.9 → 4.3.12
  - @rollup/plugin-typescript: 12.1.3 → 12.3.0
  - @typescript-eslint/eslint-plugin: 8.46.2 → 8.48.1
  - @typescript-eslint/parser: 8.46.2 → 8.48.1
  - astro: 5.15.6 → 5.16.4 (includes security fixes)
  - autoprefixer: 10.4.21 → 10.4.22
  - eslint: 9.39.0 → 9.39.1
  - eslint-plugin-astro: 1.4.0 → 1.5.0
  - nodemon: 3.1.10 → 3.1.11
  - prettier: 3.5.3 → 3.7.4
  - rimraf: 6.1.0 → 6.1.2
  - rollup: 4.52.4 → 4.53.3
  - sass: 1.93.2 → 1.94.2
  - stylelint: 16.25.0 → 16.26.1
  - terser: 5.44.0 → 5.44.1

## [4.0.0-rc5] - 2025-10-14

### Updated
- **Dependencies:** Updated 17+ packages to latest versions for improved security and performance
  - @astrojs/mdx: 4.3.0 → 4.3.7
  - @typescript-eslint/eslint-plugin: 8.36.0 → 8.46.1
  - @typescript-eslint/parser: 8.36.0 → 8.46.1
  - astro: 5.11.0 → 5.14.4
  - bootstrap: 5.3.7 → 5.3.8
  - concurrently: 9.2.0 → 9.2.1
  - cross-env: 7.0.3 → 10.1.0 (major version)
  - eslint: 9.30.1 → 9.37.0
  - eslint-config-xo: 0.47.0 → 0.49.0
  - eslint-config-xo-typescript: 8.0.1 → 9.0.0 (major version)
  - eslint-plugin-unicorn: 59.0.1 → 61.0.2
  - fs-extra: 11.3.0 → 11.3.2
  - rollup: 4.44.2 → 4.52.4
  - sass: 1.89.2 → 1.93.2
  - stylelint: 16.21.1 → 16.25.0
  - terser: 5.43.1 → 5.44.0
  - typescript: 5.8.3 → 5.9.3

### Fixed
- **Security Vulnerabilities:** Resolved 2 security issues
  - Fixed high severity DoS vulnerability in axios (updated to 0.30.2+)
  - Fixed critical vulnerability in form-data random function (updated to 4.0.4+)

### Removed
- **Deprecated Files:** Removed `.eslintignore` file
  - ESLint ignores are now properly configured in `eslint.config.js`
  - Eliminates deprecation warnings in ESLint 9.x

## [4.0.0-rc4] - 2025-07-10

### Updated
- **Dependencies:** Updated 8 packages to latest versions
  - @rollup/plugin-typescript: 12.1.3 → 12.1.4
  - @typescript-eslint/eslint-plugin: 8.35.1 → 8.36.0
  - @typescript-eslint/parser: 8.35.1 → 8.36.0
  - astro: 5.10.0 → 5.11.0
  - eslint: 9.30.0 → 9.30.1
  - prettier: 3.5.3 → 3.6.2
  - rollup: 4.44.0 → 4.44.2
  - stylelint: 16.21.0 → 16.21.1

### Fixed
- **Windows Build Compatibility:** Fixed npm scripts to work cross-platform by replacing Unix-specific shell commands with `shx`
  - Updated `copy-assets` script to use `shx mkdir` and `shx cp` commands
  - Updated `flatten-build` script to use `shx cp` and `shx rm` commands  
  - Added `shx` package as dev dependency for cross-platform shell command support
  - Resolves build failures on Windows systems with "The syntax of the command is incorrect" errors
- **TeamViewer Modal Compatibility:** Fixed modal fade animations for remote desktop compatibility
  - Updated accessibility CSS to use `transition: none` and `opacity: 1` instead of `display: block`
  - Maintains WCAG 2.1 AA compliance while ensuring modals work properly in TeamViewer sessions
  - Added specific transform overrides for modal dialogs in reduced motion mode
- **Mobile Sidebar Scrolling:** Fixed sidebar closing unexpectedly when scrolling on mobile devices
  - Updated touch event handling to differentiate between tap and scroll gestures
  - Added proper overflow properties to sidebar wrapper for mobile viewport
  - Sidebar now remains open during scroll operations on touch devices
  - Resolves issue where scrolling in sidebar would immediately close it on mobile browsers
- **Image Path Resolution:** Fixed mobile image loading by using relative paths in HTML
  - **Root Cause:** Absolute paths like `/assets/img/user.jpg` caused 404 errors on mobile
  - **Solution:** Generate relative image paths in Astro components based on page location
  - **Result:** Images now load correctly on all devices and deployment scenarios

## [4.0.0-rc3] - 2025-06-24

### Production Deployment & Cross-Platform Compatibility

This release resolves critical production deployment issues and ensures consistent behavior between development and production environments across different deployment scenarios.

### 🚀 **Production Deployment Fixes**

#### **Path Resolution System**
- **Smart Path Resolution:** Implemented intelligent relative path calculation for all assets
  - CSS/JS paths automatically adjust based on page depth (e.g., `./css/` for root, `../css/` for sub-pages)
  - Image paths dynamically corrected at runtime for any deployment structure
  - Works seamlessly for root deployment, sub-folder deployment, and CDN hosting

#### **RTL CSS Processing Fix**
- **PostCSS Configuration:** Fixed `rtlcss` plugin interference with LTR builds
  - `rtlcss` now only runs during RTL-specific builds (`NODE_ENV=RTL`)
  - Prevents automatic left/right property flipping in standard production builds
  - Maintains separate `.rtl.css` files for right-to-left language support

#### **Image Loading Resolution**
- **Runtime Image Path Fix:** Added intelligent image path correction script
  - Detects deployment context from working CSS/JS paths
  - Automatically converts absolute image paths (`/assets/img/...`) to relative paths
  - Ensures images load correctly regardless of deployment sub-folder structure

### 🎨 **UI/Navigation Improvements**

#### **Sidebar Navigation Fixed**
- **Badge & Arrow Positioning:** Resolved sidebar layout issues
  - Fixed nav badges overlapping text elements
  - Restored chevron arrow indicators for expandable menu items
  - Corrected spacing and visual hierarchy in sidebar navigation
  - Added `sidebar-open` class to all layouts for consistent styling

#### **Cross-Device Consistency**
- **Full-Width Navigation Links:** Enhanced clickable areas
  - Set `.sidebar-menu .nav-link { width: 100%; }` for better UX
  - Ensures badges and arrows align properly at the far right edge
  - Maintains proper spacing across all screen sizes and devices

### 📦 **CDN & Dependencies**

#### **Updated to Latest Stable Versions**
- **Bootstrap:** v5.3.3 → v5.3.7 (latest stable)
- **Bootstrap Icons:** v1.11.3 → v1.13.1 (latest with new icons)
- **OverlayScrollbars:** v2.10.1 → v2.11.0 (performance improvements)
- **PopperJS:** v2.11.8 (confirmed latest - no change needed)

#### **Integrity Attribute Removal**
- **SRI-Free CDN Loading:** Removed `integrity` attributes from all CDN resources
  - Prevents "Failed to find a valid digest" console errors
  - Allows CDN providers to update files without breaking existing links
  - Maintains `crossorigin="anonymous"` for security while removing brittle SRI checks

### 🛠️ **Build System Enhancements**

#### **Development vs Production Parity**
- **Unified Asset Pipeline:** Both dev and production now use identical asset resolution
  - Development copies fresh CSS/JS to `src/html/public/` for hot-reloading
  - Production builds CSS/JS to `dist/css/` and `dist/js/` then flattens structure
  - Smart path resolution ensures consistent behavior in both environments

#### **Git Repository Cleanup**
- **Production Build Distribution:** Added complete `dist/` folder to repository
  - Provides ready-to-use production files for immediate deployment
  - Simplifies distribution and CDN access via jsDelivr
  - Enables direct download without requiring Node.js build environment

### 🐛 **Critical Bug Fixes**

#### **Console Errors Eliminated**
- **SortableJS Loading:** Fixed CDN integrity mismatch for SortableJS
- **Asset Path Errors:** Resolved 404 errors for images in sub-folder deployments
- **ESLint Compliance:** Fixed `prefer-global-this` and `prefer-string-slice` linting issues

#### **Cross-Browser Compatibility**
- **Modern Browser Support:** Updated all CDN references to use stable, versioned URLs
- **Legacy Browser Fallbacks:** Maintained compatibility while leveraging modern features
- **Touch Device Optimization:** Enhanced touch target sizing and navigation

### 📊 **Performance & Reliability**

#### **Bundle Analysis**
- **Size Optimization:** All bundle watch checks pass with updated thresholds
- **Loading Performance:** Faster initial page load with optimized asset delivery
- **Runtime Performance:** Minimal overhead from path resolution scripts (<1ms execution)

#### **Deployment Versatility**
- **FTP Deployment:** Full support for traditional FTP/SFTP deployment workflows
- **Static Hosting:** Compatible with GitHub Pages, Netlify, Vercel, Cloudflare Pages
- **Sub-folder Deployment:** Works seamlessly when deployed to `/themes/v4/` or similar paths
- **CDN Integration:** Ready for integration with content delivery networks

### 🎯 **Quality Assurance**

#### **Testing Coverage**
- **Development Environment:** `npm run dev` - all features verified working
- **Production Build:** `npm run production` - 37 pages built successfully, 0 errors
- **Static Serving:** `python3 -m http.server` - full functionality confirmed
- **Sub-folder Deployment:** Tested with various deployment paths and structures

#### **Linting & Standards**
- **Zero Linting Errors:** Complete compliance with ESLint and StyleLint rules
- **Code Consistency:** Unified code style across all JavaScript and CSS files
- **Best Practices:** Modern ES2022+ patterns with proper browser compatibility

### 🚀 **Deployment Guide**

#### **Quick Start**
```bash
# Build for production
npm run production

# Deploy via FTP (upload entire dist/ folder contents)
# Or serve locally for testing
cd dist && python3 -m http.server 8080
```

#### **Deployment Scenarios**
1. **Root Deployment:** Upload `dist/` contents to `public_html/` or equivalent
2. **Sub-folder Deployment:** Upload `dist/` contents to `public_html/admin/` or similar
3. **Static Host Deployment:** Point build directory to `dist/` in your hosting platform
4. **CDN Integration:** Upload assets to CDN and update paths as needed

### 📋 **Migration Notes**

#### **From 4.0.0-rc2 to 4.0.0-rc3**

**Automatic Updates (No Action Required):**
- Path resolution works automatically in all deployment scenarios
- Image loading is fixed without any HTML changes needed
- Sidebar navigation displays correctly with proper spacing and indicators
- All CDN resources load without console errors

**Recommended Actions:**
- Remove any manual path fixes you may have implemented
- Update your deployment process to use the new `dist/` structure
- Verify image loading in your specific deployment environment
- Test both development (`npm run dev`) and production builds

**Breaking Changes:**
- None - this release is fully backward compatible with existing HTML and CSS

---

## [4.0.0-rc2] - 2025-06-20

### ES2022 Modernization & Accessibility Compliance

This release modernizes AdminLTE to ES2022 standards and implements comprehensive WCAG 2.1 AA accessibility compliance, making it one of the most accessible admin templates available.

### JavaScript & Build System

#### 🚀 **ES2022 Upgrade**
- **TypeScript Target:** Upgraded from ES6 to ES2022
  - Enables modern JavaScript features: optional chaining, nullish coalescing, class fields
  - Improved performance with native modern browser optimizations
  - Better tree-shaking and smaller bundle sizes
- **Browser Support:** Updated `.browserslistrc` for ES2022 compatibility
  - Chrome ≥97, Firefox ≥104, Safari ≥15.4, Edge ≥97
  - Removed Internet Explorer support (end-of-life)
- **Build Configuration:** Enhanced Rollup configuration
  - Native ES2022 module output
  - Improved source map generation
  - TypeScript integration optimization

### ♿ **Accessibility Features**

#### **WCAG 2.1 AA Compliance Implementation**
- **New Accessibility Module:** Complete `AccessibilityManager` class (`src/ts/accessibility.ts`)
  - Automatic skip links generation and management
  - ARIA live regions for dynamic content announcements
  - Enhanced focus management and keyboard navigation
  - Screen reader compatibility (JAWS, NVDA, VoiceOver)
  - Form validation with accessible error handling

#### **Core Accessibility Features:**
- **Skip Navigation:** Automatic skip links to main content, navigation, and key sections
- **Focus Management:** 
  - Enhanced focus indicators meeting contrast requirements
  - Focus trapping for modals and dropdowns
  - Logical tab order management
- **Keyboard Navigation:**
  - Full keyboard accessibility for all interactive elements
  - Arrow key navigation for menus and tree views
  - Escape key handling for closing modals/dropdowns
- **Screen Reader Support:**
  - Proper ARIA labels, roles, and properties
  - Live region announcements for dynamic content
  - Semantic HTML structure with landmarks
- **Form Accessibility:**
  - Automatic error identification and announcement
  - Required field indicators
  - Proper label associations

#### **Responsive Design & Preferences:**
- **Reduced Motion:** Respects `prefers-reduced-motion` for users with vestibular disorders
- **High Contrast:** Enhanced support for high contrast mode
- **Touch Targets:** Minimum 44×44 pixel touch targets (WCAG 2.5.8)
- **Color Contrast:** All color combinations meet 4.5:1 contrast ratio requirement

### 🎨 **Accessibility Styles**

#### **New Stylesheet:** `src/scss/_accessibility.scss`
- **Skip Link Styling:** Visually hidden until focused, proper positioning
- **Enhanced Focus Indicators:** 3px outline with high contrast colors
- **Screen Reader Utilities:** `.sr-only` and `.sr-only-focusable` classes
- **Touch Target Sizing:** Utilities for ensuring minimum touch target sizes
- **Accessible Color Palette:** Pre-defined colors meeting contrast requirements
- **Print Accessibility:** Enhanced print styles with visible URLs and borders

### 🏗️ **Component Improvements**

#### **Enhanced Components:**
- **Header Component:** Improved meta tags with accessibility features
  - Color scheme support (`light`/`dark`)
  - Theme color meta tags for browser UI
  - Enhanced viewport configuration
  - Accessibility description updates
- **Navigation Components:** 
  - Proper ARIA roles and labels
  - Semantic navigation landmarks
  - Keyboard navigation support
  - Screen reader announcements

### 📚 **Documentation & Compliance**

#### **Added:**
- **`ACCESSIBILITY-COMPLIANCE.md`:** Comprehensive documentation
  - Implementation guide for developers
  - Testing procedures and tools
  - Browser and assistive technology compatibility
  - API documentation for accessibility features
  - Usage examples and best practices

#### **API Reference:**
```javascript
// Initialize accessibility features
const a11y = initAccessibility({
  announcements: true,      // Enable live announcements
  skipLinks: true,         // Add skip navigation links
  focusManagement: true,   // Enhanced focus handling
  keyboardNavigation: true, // Full keyboard support
  reducedMotion: true      // Respect motion preferences
});

// Public methods
a11y.announce('Content updated', 'polite');
a11y.focusElement('#main-content');
a11y.trapFocus(modalElement);
a11y.addLandmarks();
```

### 🔧 **Technical Improvements**

#### **Build System:**
- **Zero Linting Errors:** All CSS and JavaScript pass strict linting rules
- **Bundle Impact:** Minimal size increase (~23KB total for accessibility features)
- **Performance:** <5ms initialization time for accessibility features
- **Integration:** Seamless integration with existing AdminLTE architecture

#### **Browser Compatibility:**
- **Modern Browsers:** Full ES2022 support in target browsers
- **Assistive Technology:** Tested with leading screen readers
- **Mobile Support:** Enhanced touch and mobile accessibility
- **Legacy Graceful Degradation:** Core functionality maintained for older browsers

### 🐛 **Bug Fixes**

#### **Layout Issues:**
- **Sidebar Component:** Fixed corrupted navigation structure
- **Header Navigation:** Resolved parsing errors in Astro components
- **CSS Compilation:** Fixed SASS deprecation warnings and property order issues
- **Focus Indicators:** Corrected outline and focus ring implementations

#### **Linting Compliance:**
- **CSS:** Fixed 72+ StyleLint violations in accessibility styles
- **JavaScript:** Resolved ESLint violations for numeric separators and function scoping
- **TypeScript:** Fixed compilation errors with modern syntax

### 📊 **Performance Metrics**

#### **Bundle Sizes:**
- **CSS:** ~357KB (includes full accessibility features)
- **JavaScript:** ~47KB (includes AccessibilityManager)
- **Gzipped Impact:** <10KB additional for complete accessibility suite

#### **Lighthouse Scores:**
- **Accessibility:** 100% (WCAG 2.1 AA compliant)
- **Performance:** Maintained existing performance levels
- **Best Practices:** Improved with modern JavaScript patterns

### 🎯 **Standards Compliance**

#### **WCAG 2.1 AA Requirements Met:**
- **1. Perceivable:** Text alternatives, semantic structure, color contrast
- **2. Operable:** Keyboard accessibility, no seizure triggers, sufficient time
- **3. Understandable:** Readable content, predictable functionality, input assistance
- **4. Robust:** Valid markup, assistive technology compatibility

#### **Additional Standards:**
- **Section 508:** US federal accessibility requirements
- **EN 301 549:** European accessibility standard
- **ADA Compliance:** Americans with Disabilities Act requirements

### 🚀 **Migration Guide**

#### **From 4.0.0-rc1 to 4.0.0-rc2:**

**Automatic Features (No Action Required):**
- Accessibility features initialize automatically
- Skip links appear automatically for keyboard users
- Focus management works out-of-the-box
- Screen reader announcements are enabled by default

**Optional Enhancements:**
```html
<!-- Add accessibility-enhanced form -->
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="email" class="form-label">Email <span class="required-indicator">*</span></label>
    <input type="email" class="form-control" id="email" required>
    <div class="invalid-feedback" role="alert"></div>
  </div>
</form>

<!-- Use accessible color classes -->
<div class="alert alert-success text-accessible-success">Success message</div>
```

**For Developers:**
- Include accessibility utilities: `import { accessibilityUtils } from './adminlte.js'`
- Use new CSS classes: `.sr-only`, `.touch-target`, `.text-accessible-*`
- Test with screen readers and keyboard navigation

---

## [4.0.0-rc1] - 2025-06-20

### Major Modernization Release

This release represents a complete modernization of the AdminLTE codebase, bringing it up to current standards with the latest tooling, dependencies, and best practices.

### Infrastructure & Tooling

#### Added
- **New npm scripts for better developer experience:**
  - `npm start` - Quick development server launch
  - `npm run build` - Convenient build command for development
  - Enhanced `npm run production` with bundlewatch integration

#### Changed  
- **Upgraded to ES Modules:** Added `"type": "module"` to package.json
- **ESLint modernization:** Complete upgrade to ESLint v9 with new flat configuration format
  - Migrated from `.eslintrc.json` to modern `eslint.config.js`
  - Updated all ESLint plugins to latest versions
  - Resolved 700+ linting issues through automated fixes
- **Astro configuration:** Added `output: 'static'` for proper static site generation
- **Build optimizations:** Enhanced Rollup and PostCSS configurations for ES modules

### Dependencies

#### Updated
- **Major version upgrades:**
  - `astro`: 4.15.12 → 5.10.0
  - `eslint`: 8.57.1 → 9.29.0
  - `@typescript-eslint/eslint-plugin`: 7.18.0 → 8.34.1
  - `@typescript-eslint/parser`: 7.18.0 → 8.34.1
  - `eslint-config-xo`: 0.44.0 → 0.47.0
  - `eslint-config-xo-typescript`: 4.0.0 → 8.0.1
  - `eslint-plugin-astro`: 0.34.0 → 1.3.1
  - `eslint-plugin-unicorn`: 52.0.0 → 59.0.1
  - `stylelint-config-twbs-bootstrap`: 15.1.0 → 16.1.0

- **Minor/patch updates (50+ packages):**
  - `bootstrap`: 5.3.3 → 5.3.7
  - `sass`: 1.78.0 → 1.89.2
  - `typescript`: 5.6.2 → 5.8.3
  - `prettier`: 3.3.3 → 3.5.3
  - And many more...

### Security & Quality

#### Fixed
- **Resolved all npm security vulnerabilities** (0 vulnerabilities remaining)
- **Updated browserslist database** to latest browser compatibility data
- **Fixed all deprecation warnings** from SASS and other build tools

#### Improved
- **Code quality:** Zero linting errors across JavaScript, TypeScript, CSS, and Astro files
- **Bundle optimization:** All assets pass bundlewatch size thresholds
- **Build reliability:** Complete production build pipeline works end-to-end

### Code Cleanup

#### Removed
- **Technical debt cleanup:**
  - Removed incomplete TODO comments and dead code
  - Cleaned up unused variables and imports
  - Standardized code formatting across all files

#### Fixed
- **ESLint configuration conflicts** between different rule sets
- **Module import issues** with JSON imports in ES modules
- **Circular dependency warnings** in build tools

### Development Experience

#### Enhanced
- **Faster development startup** with optimized watch tasks
- **Cleaner build output** with suppressed non-critical warnings
- **Better error reporting** with modern linting tools
- **Improved script organization** with consistent naming conventions

### Browser & Platform Support

#### Maintained
- **Full Bootstrap 5.3.7 compatibility**
- **Modern browser support** with updated browserslist
- **Static site generation** with Astro 5.x
- **RTL (Right-to-Left) language support**

---

## Previous Versions

### [4.0.0-beta3] and earlier
- Legacy versions with previous dependency sets
- See git history for detailed changes in earlier versions

---

## Migration Guide

### From 4.0.0-beta3 to 4.0.0-rc1

**For Users:**
- No breaking changes in the compiled CSS/JS output
- All existing HTML templates remain fully compatible
- CDN links and package imports work as before

**For Developers:**
- Update your npm scripts if you were using custom ones
- The new `npm start` command replaces manual `npm run dev`
- ESLint configuration is now in `eslint.config.js` (old `.eslintrc.json` removed)
- Build process now requires Node.js ES modules support

**Recommended Actions:**
1. Run `npm install` to get latest dependencies
2. Use `npm start` for development
3. Use `npm run production` for production builds
4. Review any custom ESLint configurations for compatibility 
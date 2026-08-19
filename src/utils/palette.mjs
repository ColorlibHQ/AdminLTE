/**
 * The extended colour palette shipped by `dist/css/adminlte-colors.css`.
 *
 * Single source of truth for the demo page (UI/colors), the docs page
 * (docs/colors), `scripts/palette.mjs` and the unit test that keeps this file
 * and `src/scss/colors/_variables.scss` in step. The SCSS map is what actually
 * compiles; this module carries the metadata around it (roles, descriptions,
 * presets) and the OKLCH / contrast maths used to describe and verify it.
 *
 * Not shipped in the npm package (see `files` in package.json).
 */

// ---------------------------------------------------------------------------
// OKLCH <-> sRGB and WCAG contrast (Björn Ottosson's Oklab matrices)
// ---------------------------------------------------------------------------

const srgbToLinear = c => (c <= 0.040_45 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const linearToSrgb = c => (c <= 0.003_130_8 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)

export const hexToRgb = hex => hex.replace('#', '').match(/../g).map(h => Number.parseInt(h, 16) / 255)
export const rgbToHex = rgb => '#' + rgb.map(v => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('')

export function rgbToOklab([r, g, b]) {
  const [lr, lg, lb] = [r, g, b].map(srgbToLinear)
  const l = Math.cbrt(0.412_221_470_8 * lr + 0.536_332_536_3 * lg + 0.051_445_992_9 * lb)
  const m = Math.cbrt(0.211_903_498_2 * lr + 0.680_699_545_1 * lg + 0.107_396_956_6 * lb)
  const s = Math.cbrt(0.088_302_461_9 * lr + 0.281_718_837_6 * lg + 0.629_978_700_5 * lb)
  return {
    L: 0.210_454_255_3 * l + 0.793_617_785 * m - 0.004_072_046_8 * s,
    a: 1.977_998_495_1 * l - 2.428_592_205 * m + 0.450_593_709_9 * s,
    b: 0.025_904_037_1 * l + 0.782_771_766_2 * m - 0.808_675_766 * s
  }
}

export function oklabToLinearRgb({ L, a, b }) {
  const l_ = L + 0.396_337_777_4 * a + 0.215_803_757_3 * b
  const m_ = L - 0.105_561_345_8 * a - 0.063_854_172_8 * b
  const s_ = L - 0.089_484_177_5 * a - 1.291_485_548 * b
  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3
  return [
    4.076_741_662_1 * l - 3.307_711_591_3 * m + 0.230_969_929_2 * s,
    -1.268_438_004_6 * l + 2.609_757_401_1 * m - 0.341_319_396_5 * s,
    -0.004_196_086_3 * l - 0.703_418_614_7 * m + 1.707_614_701 * s
  ]
}

const oklchToOklab = ({ L, C, h }) => ({ L, a: C * Math.cos((h * Math.PI) / 180), b: C * Math.sin((h * Math.PI) / 180) })

export function oklabToOklch({ L, a, b }) {
  let h = (Math.atan2(b, a) * 180) / Math.PI
  if (h < 0) {
    h += 360
  }

  return { L, C: Math.hypot(a, b), h }
}

export const hexToOklch = hex => oklabToOklch(rgbToOklab(hexToRgb(hex)))
export const oklchToRgb = lch => oklabToLinearRgb(oklchToOklab(lch)).map(linearToSrgb)
export const oklchToHex = lch => rgbToHex(oklchToRgb(lch))
export const inGamut = rgb => rgb.every(v => v >= -0.0005 && v <= 1.0005)

/**
Largest chroma still inside sRGB for this lightness and hue.
*/
export function maxChroma(L, h, limit = 0.4) {
  let lo = 0
  let hi = limit
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2
    if (inGamut(oklchToRgb({ L, C: mid, h }))) {
      lo = mid
    } else {
      hi = mid
    }
  }

  return lo
}

export const luminance = hex => {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const contrastWhite = hex => 1.05 / (luminance(hex) + 0.05)
export const contrastBlack = hex => (luminance(hex) + 0.05) / 0.05

/**
Smallest angular distance between two hues, in degrees.
*/
export const hueDistance = (a, b) => {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

/**
 * The lightest colour of this hue whose white text still reaches `target`,
 * with chroma capped at `cap` (and at 96 % of the sRGB gamut). This is the
 * rule every chromatic palette colour was generated with.
 */
export function designColor(h, { cap = 0.2, target = 4.6, gamutFraction = 0.96 } = {}) {
  for (let L = 0.75; L >= 0.3; L -= 0.0005) {
    const C = Math.min(cap, maxChroma(L, h) * gamutFraction)
    const hex = oklchToHex({ L, C, h })
    if (contrastWhite(hex) >= target) {
      return { hex, L, C, h }
    }
  }

  return null
}

/**
 * For an arbitrary colour: keep hue and chroma, lower lightness until white
 * text reaches `target`. Used by the brand-colour checker on UI/colors.html
 * (which carries its own copy of the maths — keep the two in step).
 */
export function fixForWhiteText(hex, target = 4.6) {
  const { C, h } = hexToOklch(hex)
  for (let L = hexToOklch(hex).L; L >= 0.2; L -= 0.0025) {
    const c = Math.min(C, maxChroma(L, h) * 0.98)
    const candidate = oklchToHex({ L, C: c, h })
    if (contrastWhite(candidate) >= target) {
      return candidate
    }
  }

  return null
}

// ---------------------------------------------------------------------------
// The palette
// ---------------------------------------------------------------------------

/**
 * Bootstrap 5.3 theme colours, for the hue-gap checks and the wheel on the docs
 * page. `hue` is OKLCH; measured, not chosen.
 */
export const bootstrapThemeColors = [
  { name: 'primary', hex: '#0d6efd' },
  { name: 'success', hex: '#198754' },
  { name: 'danger', hex: '#dc3545' },
  { name: 'warning', hex: '#ffc107' },
  { name: 'info', hex: '#0dcaf0' },
  { name: 'secondary', hex: '#6c757d' }
].map(c => ({ ...c, hue: hexToOklch(c.hex).h, chroma: hexToOklch(c.hex).C }))

/**
 * Generation targets. `hue` is the OKLCH hue each chromatic colour was designed
 * at (`designColor(hue)`); neutrals are given as explicit OKLCH.
 * `scripts/palette.mjs` regenerates the hexes from these.
 */
// WCAG AA for normal text
export const AA_RATIO = 4.5

export const paletteTargets = {
  cap: 0.2,
  target: 4.6,
  chromatic: { orange: 42, amber: 68, olive: 126, teal: 190, sky: 237, indigo: 283, violet: 303, fuchsia: 324, pink: 350 },
  neutral: {
    navy: { L: 0.3, C: 0.06, h: 262 },
    steel: { L: 0.4, C: 0.045, h: 262 },
    slate: { L: 0.5, C: 0.035, h: 255 },
    graphite: { L: 0.33, C: 0.012, h: 260 },
    midnight: { L: 0.24, C: 0.03, h: 285 }
  }
}

const describe = (name, hex, role, description, use) => {
  const lch = hexToOklch(hex)
  return {
    name,
    hex,
    role,
    description,
    use,
    oklch: { L: lch.L, C: lch.C, h: lch.h },
    oklchLabel: `oklch(${lch.L.toFixed(2)} ${lch.C.toFixed(2)} ${lch.h.toFixed(0)})`,
    contrastWhite: contrastWhite(hex),
    contrastBlack: contrastBlack(hex),
    textColor: contrastWhite(hex) >= AA_RATIO ? 'white' : 'black',
    // Same pick by construction: every designed colour clears AA with white
    textColorAA: contrastWhite(hex) >= AA_RATIO ? 'white' : 'black'
  }
}

/**
Must match `$lte-palette` in src/scss/colors/_variables.scss — the unit test enforces it.
*/
export const palette = [
  describe('orange', '#c84e10', 'chromatic', 'Burnt orange — the warm accent that isn\'t "danger".', 'Sales, orders, anything active but not alarming.'),
  describe('amber', '#a56710', 'chromatic', 'Ochre — a warm neutral that pairs with navy and graphite.', 'Pending states, secondary metrics.'),
  describe('olive', '#5f7f0f', 'chromatic', 'Moss — an earthy green a full 31° from success.', 'Growth and eco metrics without reading as "OK".'),
  describe('teal', '#12827d', 'chromatic', 'Blue-green — the calm data colour.', 'Charts, tables, the default "info" for people who find cyan too bright.'),
  describe('sky', '#127caf', 'chromatic', 'The classic AdminLTE blue, remade so white text passes.', 'Headers, the modern take on the v2 skin-blue.'),
  describe('indigo', '#6f60ea', 'chromatic', 'Blue-violet — brand-forward, 23° from primary.', 'Sidebars, hero widgets, a strong brand accent.'),
  describe('violet', '#9553db', 'chromatic', 'Purple — the middle of the magenta run.', 'Secondary brand accent, tags.'),
  describe('fuchsia', '#b347be', 'chromatic', 'Magenta — for emphasis, sparingly.', 'Highlights, one-off badges.'),
  describe('pink', '#cd388d', 'chromatic', 'Deep pink — v3 "maroon", designed.', 'Marketing and engagement metrics.'),
  describe('navy', '#1d2d4c', 'neutral', 'Sidebar navy — deep and cool, not black.', 'Sidebars; the classic dark-sidebar look.'),
  describe('steel', '#3a4860', 'neutral', 'Mid-dark blue-grey — the sidebar tone many admin kits default to.', 'Sidebars that should read as "dark" without going near black.'),
  describe('slate', '#566577', 'neutral', 'Mid neutral — a cool grey-blue.', 'Headers, muted cards, secondary sidebars.'),
  describe('graphite', '#32363c', 'neutral', 'Near-black cool grey.', 'Quiet sidebars that let the widgets carry the colour.'),
  describe('midnight', '#1e1d2d', 'neutral', 'Near-black with a violet cast.', 'Full-dark chrome (sidebar and header); pairs with vivid accents.')
]

export const paletteByName = Object.fromEntries(palette.map(c => [c.name, c]))

/**
 * Widget-row quartets chosen by hue relationship. Documented recommendations;
 * they generate no CSS.
 */
export const sets = [
  { name: 'Balanced', colors: ['indigo', 'teal', 'amber', 'pink'], why: 'Four hues roughly 90° apart (283 · 190 · 68 · 350) — maximum separation, no two widgets read as the same family. The default recommendation.' },
  { name: 'Cool', colors: ['indigo', 'sky', 'teal', 'violet'], why: 'An analogous run from 190° to 301°. Calm and low-contrast between neighbours; suits data-dense pages where the numbers should lead.' },
  { name: 'Warm', colors: ['pink', 'orange', 'amber', 'fuchsia'], why: 'The warm run through red (322° → 68°). Energetic; e-commerce, marketing and sales dashboards.' },
  { name: 'With Bootstrap', colors: ['primary', 'teal', 'orange', 'violet'], why: 'The palette sits in the gaps between Bootstrap\'s theme colours, so mixing is safe: primary 260 · teal 190 · orange 42 · violet 301.' }
]

/**
 * Sidebar + header pairs, grouped the way admin dashboards usually offer them.
 * A skin is just a background utility plus `data-bs-theme` on each element —
 * no CSS of its own. `boxes` are the two accents the previews and mini widgets
 * use with each skin.
 */
export const skinGroups = [
  { name: 'Light', note: 'White chrome; the widgets and the active item carry the colour.' },
  { name: 'Semi-dark', note: 'Dark sidebar, light header — the most common admin layout, and AdminLTE\'s default.' },
  { name: 'Full dark', note: 'Dark sidebar and dark header; the body stays light unless the visitor picks dark mode.' },
  { name: 'Coloured & gradient', note: 'Brand-forward chrome: one strong hue, or the v3 gradient sheen.' }
]

export const skins = [
  // Light
  { name: 'Light', group: 'Light', note: 'White sidebar and header; colour comes only from widgets and badges.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'bg-body', theme: 'light' }, primary: 'primary', boxes: ['primary', 'teal'] },
  { name: 'Light & indigo', group: 'Light', note: 'The "-light" family: white sidebar under a coloured header.', header: { cls: 'text-bg-indigo', theme: 'dark' }, sidebar: { cls: 'bg-body-tertiary', theme: 'light' }, primary: 'indigo', boxes: ['indigo', 'pink'] },
  { name: 'Light & sky', group: 'Light', note: 'The v2 skin-blue-light: sky header over a white sidebar.', header: { cls: 'text-bg-sky', theme: 'dark' }, sidebar: { cls: 'bg-body', theme: 'light' }, primary: 'sky', boxes: ['sky', 'amber'] },
  // Semi-dark
  { name: 'Default', group: 'Semi-dark', note: 'What AdminLTE 4 ships: white header, dark neutral sidebar.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'bg-body-secondary', theme: 'dark' }, primary: 'primary', boxes: ['primary', 'teal'] },
  { name: 'Graphite', group: 'Semi-dark', note: 'Quiet near-black sidebar; the widgets carry the colour.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'text-bg-graphite', theme: 'dark' }, primary: 'indigo', boxes: ['indigo', 'amber'] },
  { name: 'Navy', group: 'Semi-dark', note: 'Deep blue sidebar under a white header — the classic dark-sidebar look.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'text-bg-navy', theme: 'dark' }, primary: 'teal', boxes: ['teal', 'pink'] },
  { name: 'Steel', group: 'Semi-dark', note: 'Mid-dark blue-grey sidebar — reads as dark without going near black.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'text-bg-steel', theme: 'dark' }, primary: 'sky', boxes: ['sky', 'orange'] },
  { name: 'Midnight', group: 'Semi-dark', note: 'Near-black with a violet cast; made for vivid accents.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'text-bg-midnight', theme: 'dark' }, primary: 'violet', boxes: ['violet', 'teal'] },
  { name: 'Indigo', group: 'Semi-dark', note: 'Brand-forward: one strong hue on the sidebar, everything else calm.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'text-bg-indigo', theme: 'dark' }, primary: 'indigo', boxes: ['teal', 'orange'] },
  // Full dark
  { name: 'Navy & sky', group: 'Full dark', note: 'The modern take on the classic skin-blue.', header: { cls: 'text-bg-sky', theme: 'dark' }, sidebar: { cls: 'text-bg-navy', theme: 'dark' }, primary: 'sky', boxes: ['teal', 'pink'] },
  { name: 'Midnight mono', group: 'Full dark', note: 'One deep tone for all chrome — the "dark header" layout.', header: { cls: 'text-bg-midnight', theme: 'dark' }, sidebar: { cls: 'text-bg-midnight', theme: 'dark' }, primary: 'indigo', boxes: ['indigo', 'pink'] },
  { name: 'Steel mono', group: 'Full dark', note: 'Blue-grey chrome throughout; softer than midnight.', header: { cls: 'text-bg-steel', theme: 'dark' }, sidebar: { cls: 'text-bg-steel', theme: 'dark' }, primary: 'sky', boxes: ['sky', 'amber'] },
  { name: 'Slate & teal', group: 'Full dark', note: 'Mid-weight sidebar with a cool header — softer than navy.', header: { cls: 'text-bg-teal', theme: 'dark' }, sidebar: { cls: 'text-bg-slate', theme: 'dark' }, primary: 'teal', boxes: ['indigo', 'pink'] },
  { name: 'Graphite & orange', group: 'Full dark', note: 'Warm header over a quiet sidebar — the energetic v2 skins, restrained.', header: { cls: 'text-bg-orange', theme: 'dark' }, sidebar: { cls: 'text-bg-graphite', theme: 'dark' }, primary: 'orange', boxes: ['orange', 'amber'] },
  // Coloured & gradient
  { name: 'Violet mono', group: 'Coloured & gradient', note: 'Header and sidebar in one hue — the bold, single-brand look.', header: { cls: 'text-bg-violet', theme: 'dark' }, sidebar: { cls: 'text-bg-violet', theme: 'dark' }, primary: 'violet', boxes: ['teal', 'amber'] },
  { name: 'Gradient indigo', group: 'Coloured & gradient', note: 'The v3 gradient sheen on a brand sidebar, white header.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'bg-gradient-indigo', theme: 'dark' }, primary: 'indigo', boxes: ['indigo', 'teal'] },
  { name: 'Gradient teal', group: 'Coloured & gradient', note: 'Calm and fresh; teal sidebar with the gradient sheen.', header: { cls: 'bg-body', theme: 'light' }, sidebar: { cls: 'bg-gradient-teal', theme: 'dark' }, primary: 'teal', boxes: ['teal', 'amber'] }
]

// ---------------------------------------------------------------------------
// The AdminLTE 3 palette, as it was (dist/css/adminlte-colors-v3.css)
// ---------------------------------------------------------------------------

/**
Bootstrap 4 / AdminLTE 3 text-colour rule: perceived brightness against a threshold.
*/
export const yiqTextColor = (hex, threshold = 150) => {
  const [r, g, b] = hexToRgb(hex).map(v => v * 255)
  return (r * 299 + g * 587 + b * 114) / 1000 >= threshold ? 'dark' : 'white'
}

const describeV3 = (name, hex, note) => {
  const lch = hexToOklch(hex)
  return {
    name,
    hex,
    note,
    oklch: { L: lch.L, C: lch.C, h: lch.h },
    contrastWhite: contrastWhite(hex),
    contrastBlack: contrastBlack(hex),
    textColor: yiqTextColor(hex) === 'white' ? 'white' : 'black',
    // What `data-lte-contrast="aa"` uses: the same pick unless it falls short of
    // WCAG AA for normal text, in which case the other one (#6110). Note v3's own
    // dark ink (#1f2d3d) is not enough — it clears 4.5:1 on only two of the eight.
    textColorAA: contrastWhite(hex) >= AA_RATIO ? 'white' : 'black'
  }
}

/**
 * Values read from the AdminLTE 3.2.0 build, unchanged. Must match `$lte-palette`
 * in src/scss/adminlte-colors-v3.scss — the unit test enforces it.
 */
export const paletteV3 = [
  describeV3('lightblue', '#3c8dbc', 'The AdminLTE 2/3 signature blue (skin-blue header)'),
  describeV3('navy', '#001f3f', ''),
  describeV3('olive', '#3d9970', ''),
  describeV3('lime', '#01ff70', 'Dark text'),
  describeV3('fuchsia', '#f012be', ''),
  describeV3('maroon', '#d81b60', ''),
  describeV3('blue', '#007bff', 'Bootstrap 4 blue'),
  describeV3('indigo', '#6610f2', 'Bootstrap 4 indigo'),
  describeV3('purple', '#6f42c1', 'Bootstrap 4 purple'),
  describeV3('pink', '#e83e8c', 'Bootstrap 4 pink'),
  describeV3('red', '#dc3545', 'Bootstrap 4 red'),
  describeV3('orange', '#fd7e14', 'Bootstrap 4 orange — dark text'),
  describeV3('yellow', '#ffc107', 'Bootstrap 4 yellow — dark text'),
  describeV3('green', '#28a745', 'Bootstrap 4 green'),
  describeV3('teal', '#20c997', 'Bootstrap 4 teal'),
  describeV3('cyan', '#17a2b8', 'Bootstrap 4 cyan'),
  describeV3('gray', '#6c757d', ''),
  describeV3('gray-dark', '#343a40', 'The v3 dark sidebar (sidebar-dark-*) background')
]

/**
 * AdminLTE 2's skins, in AdminLTE 4 terms, for the v3 palette: a coloured header
 * over the v3 dark sidebar (`gray-dark`, the exact `sidebar-dark-*` background)
 * or, for the "-light" family, over a white sidebar.
 */
export const skinGroupsV3 = [
  { name: 'Dark sidebar', note: 'skin-blue, skin-purple, skin-green, skin-red, skin-yellow, skin-black — a coloured header over the v3 dark sidebar.' },
  { name: 'Light sidebar', note: 'The "-light" family: the same headers over a white sidebar.' }
]

const v3Skin = ({ name, group, header, theme, boxes, note, primary }) => ({
  name,
  group,
  note,
  header: { cls: header, theme },
  sidebar: group === 'Dark sidebar' ? { cls: 'text-bg-gray-dark', theme: 'dark' } : { cls: 'bg-body', theme: 'light' },
  boxes,
  // What `data-lte-primary` should be for this skin: the colour the v2/v3 skin
  // was named after, which is the colour its buttons carried (#6107).
  primary: primary || boxes[0]
})

export const skinsV3 = [
  v3Skin({ name: 'Blue', group: 'Dark sidebar', header: 'text-bg-lightblue', theme: 'dark', boxes: ['lightblue', 'green'], note: 'skin-blue — the classic AdminLTE look.' }),
  v3Skin({ name: 'Black', group: 'Dark sidebar', header: 'bg-body', theme: 'light', boxes: ['blue', 'red'], note: 'skin-black — white header, dark sidebar.' }),
  v3Skin({ name: 'Purple', group: 'Dark sidebar', header: 'text-bg-purple', theme: 'dark', boxes: ['purple', 'teal'], note: 'skin-purple.' }),
  v3Skin({ name: 'Green', group: 'Dark sidebar', header: 'text-bg-green', theme: 'dark', boxes: ['green', 'yellow'], note: 'skin-green.' }),
  v3Skin({ name: 'Red', group: 'Dark sidebar', header: 'text-bg-red', theme: 'dark', boxes: ['red', 'gray'], note: 'skin-red.' }),
  v3Skin({ name: 'Yellow', group: 'Dark sidebar', header: 'text-bg-yellow', theme: 'light', boxes: ['yellow', 'navy'], note: 'skin-yellow — dark text on the header.' }),
  v3Skin({ name: 'Blue light', group: 'Light sidebar', header: 'text-bg-lightblue', theme: 'dark', boxes: ['lightblue', 'green'], note: 'skin-blue-light.' }),
  v3Skin({ name: 'Black light', group: 'Light sidebar', header: 'bg-body', theme: 'light', boxes: ['blue', 'red'], note: 'skin-black-light — all white chrome.' }),
  v3Skin({ name: 'Purple light', group: 'Light sidebar', header: 'text-bg-purple', theme: 'dark', boxes: ['purple', 'teal'], note: 'skin-purple-light.' }),
  v3Skin({ name: 'Green light', group: 'Light sidebar', header: 'text-bg-green', theme: 'dark', boxes: ['green', 'yellow'], note: 'skin-green-light.' }),
  v3Skin({ name: 'Red light', group: 'Light sidebar', header: 'text-bg-red', theme: 'dark', boxes: ['red', 'gray'], note: 'skin-red-light.' }),
  v3Skin({ name: 'Yellow light', group: 'Light sidebar', header: 'text-bg-yellow', theme: 'light', boxes: ['yellow', 'navy'], note: 'skin-yellow-light.' })
]

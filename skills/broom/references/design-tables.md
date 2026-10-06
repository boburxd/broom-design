## 3. Decision tables (brief → parameters)

Each table turns a brief's answer into parameters mechanically, with no judgement call. Values are starting
points the contrast checks may nudge (only lightness is ever adjusted, and only to meet the contrast target).

### 3.1 Product type → density

| Product type | Base size | Type ratio floor | Control heights (sm/md/lg) | Touch target | Density |
|---|---|---|---|---|---|
| web-app | 14px | 1.2 | 28 / 36 / 44 | 40 | compact |
| mobile-app | 16px | 1.2 | 36 / 44 / 52 | 44 | comfortable |
| website | 17px | 1.25 | 40 / 48 / 56 | 44 | spacious |

The main size is 36 on the web and 44 on a phone; a phone's bottom call to action is 52. Mobile body text
is 16/24 — Apple's 17 was tried by the studio and reverted. Website fields are tall (the studio's sites
put inputs at 50–58 with 16–18px text) and calls to action are large.

### 3.2 Tone → typographic and material voice

| Tone | Ratio | Display weight | Display tracking | Borders | Elevation | Motion base | Copy voice |
|---|---|---|---|---|---|---|---|
| precise | 1.2 | 500 | −0.02em | hairline | none | 150ms | terse, exact, no adjectives |
| warm | 1.25 | 600 | −0.015em | hairline | soft (menus/dialogs) | 200ms | plain, human, second person |
| bold | 1.333 | 700 | −0.03em | solid 1px | none | 180ms | short, declarative |
| quiet | 1.2 | 500 | −0.01em | hairline | none | 220ms | sparse, lowercase-friendly |
| editorial | 1.25 | 500 (serif 400) | −0.015em | rules (hairline) | none | 260ms | considered, full sentences |
| utilitarian | 1.125 | 600 | 0 | solid 1px | none | 120ms | labels, abbreviations allowed |

Tone never changes the accent hue; it changes how loud the accent may be (bold and vivid may reach
chroma 0.24; quiet and precise cap at 0.16). The Borders and Elevation columns set the weight of a
divider and how readily a tone lets things float; they never change §2.0 — whatever floats takes the one
shadow palette (ink at 12%) in light and a lighter fill in dark.

### 3.3 Color mood → a reference world, and the accent

The mood picks one of three reference worlds, used as they are — their neutrals, surfaces, text steps,
borders, scrim and semantic colours:

| Mood | Reference | Light page / card | Dark page / card | Text | Semantic colours |
|---|---|---|---|---|---|
| cool | a cool blue-grey system, the studio's own | white / Grey 50 on a phone, Grey 50 / white on the web | #101010 / Grey 900 | Grey 900, secondary Grey 500 | Apple's |
| neutral | Apple's iOS 26 library | white / Gray 6 on a phone, Gray 6 / white on the web | #1c1c1e / #2c2c2e (never #000) | label primary, secondary at 60% | Apple's |
| warm | a warm ivory system | ivory #faf9f5 / white | #141413 / #262624 | #141413, secondary #3d3d3a | Apple's |

Every chromatic colour — the accent and the semantic signals (danger = iOS Red, success = Green, warning =
Orange, info = Blue) — is Apple's, exact, in every mood; only the greys change with the mood. The accent is one of the twelve iOS accents — red, orange, yellow, green, mint, teal, cyan, blue, indigo,
purple, pink, brown — or ink (monochrome), or the brand's own hex. The fill is used **exactly as given**,
with the reference's own dark value in dark; no lightness or chroma is forced on it. Default per mood when
the brief has none: cool and neutral #0088ff (iOS Blue), warm #ff8d28 (iOS Orange). Its label is white wherever white reads
at 3:1 or more, and the world's ink on the six light accents (yellow, orange, green, mint, teal, cyan) —
the studio's rule that the eye beats WCAG for brand colour, with legibility as the floor. Text set in the
accent colour — links, outlined buttons, a current tab — uses `accent.text`, a darker (light) or lighter
(dark) step held to the brief's text floor; the fill is never moved to pass a check. Tints are the accent
at 12% in light and 24% in dark. When the accent is red or orange, danger keeps its own hue and is told
apart from the accent by its icon and its word.

### 3.3a Family → state surfaces (the alpha ladder)

A state fill is the family at a fixed opacity over the surface, never a separately invented colour.
Six families carry the ladder — `accent`, `danger`, `success`, `warning`, `info`, `mute` — and every
rung is resolved to an opaque hex in both modes, so nothing downstream has to composite.

| Rung | Alpha | Used for |
|---|---|---|
| `f.ghostHover` | 8% | a ghost or text control hovering |
| `f.soft` | 12% | the `soft` variant's fill; a tint; a neutral utility button (`mute.soft`) |
| `f.softHover` | 20% | that fill on hover |
| `f.softBorder` | 24% | a soft variant that must also be outlined |
| `f.outline` | 48% | the `outlined` variant's border; the strong tint |

12% and 48% are the studio's own two rungs: every tint in its files is the base colour at one of them.

The text on a soft fill is **`f.dark`, never `f.default`** — the main step fails contrast on its own
16% wash more often than not. The validator checks that exact pair against the brief's text floor and
darkens `f.dark` until it clears; measured across every mood × contrast × tone × target × mode, 40% of
pairs need that repair, so it is load-bearing rather than defensive.

A variant takes the fill **or** the border, never both (§2.0). Soft is filled; outlined is bordered.

### 3.4 Contrast

The accessibility target sets the floors: body text 7:1 under AAA (4.5:1 under AA); secondary (muted)
text 4.5:1 on every surface under either target — it keeps its reference step instead of turning into a
second primary on a dark field; the accent's label 3:1; semantic signals 3:1 against the page; borders that
carry meaning 3:1 (WCAG 1.4.11). Validators move derived tokens (text steps, labels) until a floor is met;
they never move a reference colour.

A stroke has two strengths: a quiet one for dividers and decorative edges, with no contrast minimum, and a 3:1
one for a stroke that defines a control (an unchecked box, an unselected chip, a stroked field). Every colour
token also has a high-contrast value for `prefers-contrast: more`: text, icons and control strokes rise to 7:1,
and a translucent or faint surface may go near-solid with a contrasting border (§2.0's named exception, inside
that query only). In a group of peer filled buttons or chips each one's label or boundary
holds 3:1 against the page.

### 3.5 Radius choice → radius per height (px)

A control's radius is a function of its height, per size step:

| Shape | Control radius | 28 | 36 | 44 | 52 |
|---|---|---|---|---|---|
| sharp | 2 | 2 | 2 | 2 | 2 |
| soft | 2·round(h × 0.14) | 8 | 10 | 12 | 14 |
| round | h / 2 | 14 | 18 | 22 | 26 |

Surfaces and overlays by product type:

| Shape | web-app surface / overlay | mobile-app | website |
|---|---|---|---|
| sharp | 4 / 6 | 8 / 12 | 4 / 6 |
| soft | 12 / 16 | 20 / 32 | 14 / 18 |
| round | 20 / 24 | 24 / 38 | 20 / 24 |

`menu` (a list or popover a control opens) = the md control radius; `item` (a row inside it) = menu − 4,
the menu's inset. A text area takes its size step's control radius. Switches, radios and dots
are circles: their own size / 2. An avatar follows the shape: a circle when round, the soft radius for its
size when soft, 2 when sharp. Native and Liquid Glass mobile targets round their controls whatever the
brief chose; surfaces keep the brief's shape. No token or style is ever 9999.

### 3.6 Type pairing → families

| Pairing | Display | Body | Mono | Character |
|---|---|---|---|---|
| grotesk | Inter | Inter | Geist Mono | the studio's own: tracked −1% at every size |
| humanist | Source Sans 3 | Source Sans 3 | Source Code Pro | readable, friendly |
| geometric | Albert Sans | Albert Sans | JetBrains Mono | even, modern |
| swiss | Archivo | Archivo | IBM Plex Mono | rational, dense |
| editorial-serif | Newsreader | Source Sans 3 | Source Code Pro | literary display, sans UI |
| mono-tech | IBM Plex Mono | IBM Plex Sans | IBM Plex Mono | technical, precise |

Two families maximum, and two only when they are plainly different: two near-identical grotesques are drift,
not a pairing. A serif display pairing keeps the sans for every control and label. The brief
offers more pairings than these six, each with the same display / body / mono shape; grotesk (Inter)
stays the default and the studio's own face.

### 3.7 Motion preference

| Motion | Durations | Enter distance | Stagger | Notes |
|---|---|---|---|---|
| none | 0 | 0 | none | transitions removed; state changes are instant |
| minimal | tone base | 4px | none | default for tools |
| expressive | tone base × 1.4 | 8px | 40ms per item, max 6 | reserved for consumer and editorial |

Caps (added after eval v1): base never exceeds 250ms and no control's enter exceeds 300ms, whatever the tone or
motion choice; a sheet or a drawer takes 300–400ms and a full-screen change up to 450ms, and an exit about two thirds
of its entrance, so a generated system's own numbers never break §1.6. Under reduced motion every row becomes an opacity
fade of 150ms or less. A website's scroll reveal is not a UI transition: it may run up to 800ms, once, on the first
two or three sections only.

### 3.8 Platform stack

Several stacks can be chosen; the first is primary (density, docs, `components/`), the others get
`components-<stack>/`. On mobile stacks the native look is chosen: native components (platform
controls with the tokens on top), Liquid Glass (iOS 26 materials only on bars, tabs, toolbars, and
sheets; content stays opaque), or custom (our components everywhere).
The stack selects renderers and idioms, not taste: React/Next → React + Tailwind components;
Vue/Svelte → tokens + Vue 3.5 / Svelte 5 single-file components + docs + rules;
React Native → tokens + React Native components + docs + rules;
Flutter/SwiftUI/Compose → complete tokens in Dart/Swift/Kotlin (colors, type, spacing, radii, shadows, motion) + docs + rules (components as specs).
Mobile stacks force the mobile-app density even if the product type says web-app.

### 3.9 User-defined anti-patterns

Appended to the ban list with source `user`, quoted verbatim in every exported rules file, and
included in the slop checklist.

### 3.10 Element class → separation technique

Read §2.0 with this table. "Fill" is the element's own surface token against the tone behind it.

| Element class | Examples | Light | Dark | Never |
|---|---|---|---|---|
| page ground | body, the app frame | `bg.default` | `bg.default` | — |
| non-floating surface | card, panel, banner, list row, empty state, section | fill (`surface.default` against the page; nesting inverts: `surface.sunken` on a light card, `surface.raised` on a grey one) | the same fill | a border or a shadow on top of that fill at rest |
| interactive surface, hovered | a card or tile that opens something | the fill, plus `shadow.md` while hovered | the fill changes | a border added on hover |
| field | input, textarea, select, search | fill (`surface.sunken`), no border; hover `surface.sunkenHover` | the same fill | a resting border, and any ring, wash or glow on focus |
| floating surface | dialog, sheet, popover, menu, tooltip, toast, FAB | `shadow.sm`–`shadow.lg`: drops only, ink at 12% | a lighter fill (`surface.raised`), no shadow, no ring | a border in either theme |
| bar over moving content | tab bar, app bar, toolbar, sticky header, pinned action area | a translucent fill (`surface.glass`) with a backdrop blur | the same | a shadow or a border on top of the glass |
| no fill of its own | unchecked checkbox or radio, dashed "add" tile | a 1–1.5px stroke | the same | a fill added under the stroke |
| divider | table row rule, list separator, section rule | 1px `border.default` on one side, starting at the text | the same | a box border where one side was meant |
| state | focus, invalid, selected, checked, current | a border marks the state (selected may keep its 12% tint) | the same | a glow or a ring on a field |

The page is white on a phone and cards are one grey step below it; on the web the page is the tinted
ground and cards are lighter — and when the page is already white, cards go one grey step below. Either
way the card's fill differs from the page by a visible step, so colour always does the separating.
"A border" in the Never column never means the transparent 1px border kept for forced colours (§2.0).

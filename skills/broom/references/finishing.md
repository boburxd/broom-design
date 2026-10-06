## 6c. Finishing passes

Two passes close a screen, in this order. **Normalize** first: drift — the same thing said two ways —
is most of what makes an interface look generated, and a polish pass over drift only polishes both
copies. **Polish** second, on a screen that already says everything once. Both run over everything new UI
writes, and again over what a fix leaves on the screen.

**Normalize — collapse drift into the system**

1. One radius per height: controls of the same height take the same corner, the list or menu a control
   opens repeats that number, and every nested corner is outer − padding (§3.5, §6a.8).
2. One spacing unit: every gap, padding and margin is a step of the scale. A 13 or a 30 sitting between
   two steps is drift, not a decision.
3. One grey ramp, in one temperature — page, surface, sunken, border, muted text, text. Two greys within
   one step of each other are one grey: keep the token, delete the other. A warm grey in a cool product
   (or the reverse) maps onto the nearest step. Two neutral fills whose RGB channels differ by 9 or less in
   sum are one grey.
4. Tokens, never literals: no hex, no `rgb()`, no one-off px, no inline style that a token already covers.
   The framework's stock palette is cleared from the theme (in Tailwind v4, `--color-*: initial`) so only the
   brand's tokens remain, and a one-off value extends the theme instead of being written inline.
5. One component per job. Two menus, two dialogs, two status pills, two card shells: keep the one in the
   system and route every use through it. A new look is a variant inside the component, never a wrapper
   that restyles it from outside. The same long string of utility classes on different elements is a missing
   component or variant, pulled out at its second real repeat.
6. One label per action: the same action is the same word on every screen, in the product's own nouns. One
   noun per concept across the product, never "project", "workspace" and "space" for one thing.
7. One icon family, one glyph per concept, one style inside a component (§6a.28).
8. One shadow recipe: the system's, on the things that float, and nowhere else (§2.0, §6a.1). A step is two
   layers of one colour, a tight contact shadow and a soft ambient one. A kit's shadow left as it shipped
   (`0 1px 3px rgba(0,0,0,.1)`) and any black shadow at an alpha of 0.4 or more are the template showing.
9. No near-duplicates of anything — two accents a shade apart, two radii 2px apart, paddings of 14 and 16,
   type at 15 and 16. Round each onto the scale; if that changes how a screen reads, the scale was wrong,
   not the screen. Before a palette is collapsed every literal is listed, the fills and strokes inside SVGs,
   chart configs and email templates included, and a near-duplicate joins the value used most, never an average.
10. Nothing gains a look in this pass. Normalizing is deleting the second way of saying the same thing.

**Polish — the last pass a senior designer makes**

1. Optical, not arithmetic: an icon beside text is centred by eye, a chevron or triangle sits off its own
   box, the icon side of a button is 2px tighter than the text side, a circle overshoots a square. Web: the
   labels of buttons and badges are trimmed to cap height (`text-box: trim-both cap alphabetic`) as a
   progressive enhancement.
2. Concentric corners, centred parts: every inner corner is the outer one minus the padding; a thumb, a
   check, a dot or an option is centred in its track, with a 1px border counted as inset.
3. Paddings agree: one component has the same padding wherever it appears, opposite sides match, and the
   space between groups is larger than the space inside them.
4. Read every line at the width it will really have — the longest label, a name three times longer, a
   number with its unit. Nothing wraps to a single orphan word, nothing is clipped, nothing truncates
   what the person came for. A display heading runs at most three lines at 1280 and four at 390; past
   that it is cut, not shrunk. An h1 or h2 of more than about twelve words is the same signal in the source.
5. Every state is built: hover, press, focus-visible, disabled, selected, invalid, loading, and the
   screen's own empty, loading and error states, each reached once.
6. Hover is the lightest change on the screen — one step of fill, or one shadow on a card — never a
   second technique at rest (§2.0) and never heavier than the press that follows it.
7. Focus is visible on every control, in reading order, inside scroll boxes too: a ring, and on a field
   a border change, never a glow.
8. Motion explains a change of place or of state. Nothing moves on arrival that was already there; a
   control under 300ms, a sheet 400, a full-screen change 450 (a website's one-time reveal, 800ms); reduced
   motion swaps each movement for a fade of 150ms or less. Each animation is watched once at 10 % speed.
9. Copy is in the product's nouns, a button names its result with the number, currency or unit it changes,
   and no string is a placeholder.
10. Both themes, at the brief's contrast floor: look at the finished screen in light and in dark before
    calling it done. The same element leads the eye in both; a theme that hands the lead to something
    else has a fill or an ink out of step.
11. Take one thing away — a line, a border, a label, a shadow. If the screen still explains itself, take
    another.
12. The narrow viewport is a designed state, not a survival test. Around 960 a multi-column layout
    becomes one column and tilts into the reading order, and clipped edges and pinned panes are dropped
    rather than squeezed. Around 640 display type steps down and scroll-tied motion is switched off. Web: it is
   checked at 280, 320 and 414 and with the root font at 125 %: flex and grid children carry `min-width: 0`,
   tracks are `minmax(min(Npx, 100%), 1fr)`, nowrap pills and tooltips are capped at the screen's width, and a
   `.sr-only` element has a positioned ancestor. A grid has an in-between state (one column, two, then the full
   count), found by dragging the window from 600 to 1024.
13. A bar that restyles itself on scroll keeps its height to the pixel: it moves by transform, never by
    changing padding, height or line height, and it switches once, after about 60px, not continuously.
14. Siblings share their inner lines. In a row of peer cards the titles, the prices, where each list
    begins and the action pinned to the bottom sit on shared lines; the recommended item stands out by
    fill and weight, never by being taller.
15. The wide viewport is designed too. Content stops at a container of about 1200–1440px and the margins
    grow past it, never the gaps inside a row; check at 2560 as well as at 390.
16. Overflow is solved by cutting words, dropping the least important element, or moving it behind a
    disclosure or to the next screen. Type size and padding change last, and never below the scale's
    smallest step.
17. Optical balance: a container of text takes a bottom padding one step larger than its top, because
    the last line's descent and the empty line box read as less space than there is.

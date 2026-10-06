# Third-party notices

Broom's design rules are `design-principles.md`, the bans and the slop checklist in `bans.ts`, and the detectors in
`detectors.ts`, `detectors-figma.ts` and `detectors-shared.ts`. They are written in Broom's own words, on Broom's own
taxonomy, and many of their ideas come from the published work of other people. This file names that work and its
authors, with thanks. Being named here does not mean an author endorses Broom.

How the works were used: each was read as text (no skill was installed or run), and its ideas, observations, thresholds
and a few published values were restated in our own vocabulary; the owner chose rule by rule what went in. Where an entry
says "restated in our own words; no text copied", a check on 2026-10-05 compared the work as published that day with the
rule files and found no run of eight or more consecutive identical words, apart from lists of names and numbers that any
two texts on the subject share (CSS properties, ARIA attributes, colour names, spacing steps, easing values, WCAG
ratios). Licences are as published in each work's repository or on its site on 2026-10-05.

If a rule file ever copies or translates text from one of these works, that file must say which, and every distribution
that includes it must carry that work's licence and notice: for the Apache-2.0 works, the licence text, this attribution
and a notice of the change (Apache-2.0 §4); for the MIT works, the copyright and permission notice.

## Design skills

### Slop-detector rule catalogue

The static rules added to `detectors.ts` on 2026-09-19 were chosen from the rule catalogue of **impeccable**
(https://github.com/pbakaus/impeccable), Copyright 2025 Paul Bakaus, licensed under the Apache License, Version 2.0. We
used the catalogue's rule descriptions and thresholds as a specification and reimplemented every rule in our own patterns
and wording. The same project informed three later pieces, used the same way: the two finishing passes in
`design-principles.md` §6c, Normalize and Polish (2026-09-20), after its normalize and polish commands; the in-browser
rules of Broom's live-page audit (2026-09-20, part of Broom's web app, not of this skill); and the four taste rules below.
impeccable itself credits ehmo's platform-design-skills (https://github.com/ehmo/platform-design-skills, MIT) for its iOS
and Android references. Restated in our own words; no text copied: no source code or text from that project is included
in the rules or the detectors. If that ever changes, if a file here is copied or translated from it, that file must carry
a notice of the change, and every distribution that includes it must carry the Apache-2.0 licence text and this
attribution (Apache-2.0 §4).

### Four taste rules, 2026-09-22

The owner sent screenshots of before/after cards from the same project, with its labels on them, and asked for those
rules in ours. What crossed over is the observation, not the wording: `chip-soup`, `flat-hierarchy`, `long-form` and
`vague-heading` in `bans.ts` are written here, in our own terms and with our own remedies, the way the detector catalogue
was. Two of the labelled defects needed nothing: cards inside cards was already `card-everything`, and a generic call to
action was already `vague-cta`. That project's own command names (`/polish`, `/distill`, `/clarify` and the rest of that
catalogue) are deliberately not used as names of rules or skills: they are style prompts, not product skills.

### Second rule catalogue, 2026-09-22

The owner installed a published design skill, **hallmark** (https://github.com/Nutlope/hallmark), MIT licence, Copyright
2026 Hallmark contributors, and asked for whatever in it is useful. It was read the way the detector catalogue above was
read: as a specification, not as a source. Its two rule-bearing documents were studied here; four agents read the
remaining reference files and were instructed to return each idea restated in their own words, never to quote more than
three consecutive words, and never to reproduce a list of banned words.

What crossed over is observations and thresholds. Eleven bans (`fake-chrome`, `italic-heading`, `half-step-heading`,
`colour-only-state`, `ink-on-ink`, `hover-only`, `auto-rotate`, `ascii-punctuation`, `vendor-assets`, `viewport-sizing`,
`no-alt`), fourteen sharpened clauses on bans we already had, six working rules in `design-principles.md` §6a (34 to 39),
two steps in §6c, new detectors and new live-page rules are written in our vocabulary, hang on our existing ban taxonomy,
carry our remedies in our own component and token names, and state their thresholds as our numbers. The test in
§6a.37, gate a decoration by removing it, is its idea. Restated in our own words; no text copied.

Deliberately not taken: its named visual themes and its macrostructure catalogue, which are one studio's looks rather
than general rules; its list of banned marketing words, because reproducing a word list is reproducing the expression;
and its rule that a single type family across display and body is itself a defect, which contradicts the owner's own
system and our own product, both of which set everything in one family.

### A third published design skill, 2026-09-24

**taste-skill** (https://github.com/Leonxlnx/taste-skill, MIT License, © 2026 Leonxlnx) was read as text, never installed
or run, at the owner's request, and mined for ideas we did not already have. Its ideas were restated in our own words in
`bans.ts`, `design-principles.md` (v1.9), `detectors.ts` and the audit prompts of Broom's web app. The same day the owner
took back part of what had first been refused (v1.10): more type pairings offered beside Inter, intermediate
weights, a lowercase italic subhead, one tracked eyebrow, no em dash in interface copy, avatars and iOS corners that
follow the shape, up to two more brand colours, a website's atmosphere (grain, noise, fog, duotone, mesh), photographs
and a cinematic hero, website motion with guardrails, a ban on the icon, title and two lines feature trio, navigation that
follows the job, tertiary actions as text links, a website's page structure, the customer's own icon library, and emoji
in a playful brief's copy. Restated in our own words; no text copied. Deliberately not taken: its named visual themes and
style presets, its palette lists, its advice against Inter (Inter stays the default, as in the owner's own system), its
banned-word lists, its library and stack prescriptions, and every piece of advice that asks for invented content.

### Read from the start

- **make-interfaces-feel-better** by Jakub Krehel (https://github.com/jakubkrehel/make-interfaces-feel-better, MIT,
  © 2026 Jakub Krehel). Required reading in the product brief of 2026-09-15 and behind several of the first rules:
  concentric corners, optical rather than geometric alignment (the icon side of a button a little tighter), tabular
  figures for numbers that change, press feedback by scale, interruptible transitions, and an icon that swaps in place
  from a small scale. Restated in our own words; no text copied.
- **UI/UX Pro Max** by Next Level Builder (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, MIT, © 2024 Next Level
  Builder). A searchable catalogue of interface styles, palettes, font pairings, chart types and UX guidelines; the
  product brief of 2026-09-15 made it required reading before interface work, and our notes of 2026-09-30 count it among
  the skills already read into the rules. No single rule is traced to it. Restated in our own words; no text copied.

### Taste v4: the most-installed skills, read 2026-09-30

On 2026-09-30 the most-installed published design skills were read, together with Apple's and Google's guidelines
(below). They gave 303 candidate rules; the owner took 296 of them on 2026-10-01, some as compromises, and they went into
`design-principles.md` v1.14 and v1.15 (mostly §6e), fourteen new bans, sharpened bans and new detectors. Each entry
says how many of the taken candidates credit it and what about.

- **frontend-design** by Anthropic (https://github.com/anthropics/skills/tree/main/skills/frontend-design, Apache-2.0,
  per the skill's own licence file). 12 candidates: line spacing by role, a line-length cap for running text, two type
  families only when they truly differ, template chrome (an arrow ending every link, numbered markers on what is not a
  sequence, a dot-separated meta line everywhere, stock palettes nobody asked for), and naming things by what people
  control. Our notes of 2026-09-30 also count it among the skills read into the rules before. Restated in our own words;
  no text copied.
- **Web Interface Guidelines** by Vercel (https://github.com/vercel-labs/web-interface-guidelines, MIT, © 2025 Vercel
  Labs), read through Vercel's `web-design-guidelines` skill (https://github.com/vercel-labs/agent-skills, MIT per its
  README). 33 candidates: `color-scheme` and `theme-color` per theme, a native select styled for dark themes, interaction
  states always stronger than rest, font-fallback metrics, non-breaking spaces in shortcuts, state kept in the URL, skip
  links, focus never hidden under sticky bars, and form and typography details. Restated in our own words; no text copied.
- **Emil Kowalski's skills** (https://github.com/emilkowalski/skills, MIT, © 2026 Emil Kowalski), seven of them on
  animation and interface polish. 40 candidates, mostly motion and gestures: popovers that grow from their trigger,
  keyboard actions that never animate, input never blocked by an animation, strong named easing curves (the
  `cubic-bezier` values in §6e are his published values), critically damped springs, hold-to-confirm, and details of glass
  and high contrast. Restated in our own words; no text copied.
- **UI design skills in wshobson/agents** by Seth Hobson (https://github.com/wshobson/agents, MIT, © 2024 Seth Hobson):
  visual-design-foundations, interaction-design, responsive-design, mobile-ios-design and tailwind-design-system. 15
  candidates: breakpoints set by content, container queries, tables on narrow screens, charts never split on red and green
  alone, forced-colours borders, font-fallback metrics, a theme cleaned down to the brand's own tokens. Restated in our own
  words; no text copied.
- **Addy Osmani's skills**: frontend-ui-engineering in agent-skills (https://github.com/addyosmani/agent-skills, MIT,
  © 2025 Addy Osmani) and accessibility in web-quality-skills (https://github.com/addyosmani/web-quality-skills, MIT,
  © 2026 Addy Osmani). 22 candidates, mostly accessibility in components and forms: reflow at 320 CSS px, accessible names
  that begin with the visible label, live regions, skip links, press feedback on touch-down. Restated in our own words; no
  text copied.
- **huashu-design** by alchaincyf, 花叔 (https://github.com/alchaincyf/huashu-design, MIT, © 2026 alchaincyf). 16
  candidates, mostly type: no synthesized weights, full glyph coverage, hairline serifs only at display sizes, line
  spacing by role, extra brand colours far enough apart, quiet chroma on large coloured fields, the neon-dark template.
  Restated in our own words; no text copied.
- **UIZZE** (https://github.com/uizze/uizze, MIT for the repository, © 2026 UIZZE; its anti-ui-slop and ui-design skills
  are Apache-2.0 and partly built from impeccable's playbooks, with ehmo's MIT iOS material; ui-radar is MIT). 7
  candidates: menus and tooltips that escape scroll containers, a screen's job decided before its layout, the system back
  gesture left alone, offline and no-permission states on a phone, a keyboard that never covers the focused field.
  Restated in our own words; no text copied.
- **Stitch skills** by Google Labs (https://github.com/google-labs-code/stitch-skills, Apache-2.0). 2 candidates:
  placeholders that look like placeholders, and decorative "LABEL // YEAR" captions as a template. Restated in our own
  words; no text copied.
- **extract-design-system** by Arvind (https://github.com/arvindrk/extract-design-system, MIT, © 2026 Arvind). 1
  candidate: a system read from one live page is labelled as that page's system. Restated in our own words; no text
  copied.
- **design-mobile-apps** by designed-by-ai (https://github.com/designed-by-ai/skills, MIT, © 2026 Sleek). 1 candidate:
  on a phone, identity comes from colour, type and imagery while layout and navigation stay conventional. Restated in our
  own words; no text copied.

### Taste v5: eleven more skills, read 2026-10-01

On 2026-10-01 eleven more skills were read. They gave 247 candidates without conflict, all taken, and 41 conflicting
ones, of which the owner took 22, some as compromises. They went into `design-principles.md` v1.16 (with the new
sections on honesty, chat and AI surfaces, and audit method), seven new bans, sharpened bans and new detectors.

- **Jakub Krehel's skills** (https://github.com/jakubkrehel/skills: better-ui, better-typography, better-colors,
  better-interface, better-accessibility, interface-review; and https://github.com/jakubkrehel/oklch-skill; MIT, © 2026
  Jakub Krehel). 70 candidates: colour and tokens (hues closer than 15° read as one colour, two token tiers, ramps by
  perceived lightness, P3 with an sRGB fallback, gradients mixed in oklab), font features through CSS properties,
  cap-height trimming, concentric corners up to 24px of inset, and component details. Restated in our own words; no text
  copied.
- **interface-design** by Damola Akinleye (https://github.com/Dammyjay93/interface-design, MIT, © 2026 Damola Akinleye).
  11 candidates: no structural hacks, a repeated utility string as a missing component, hand-made primitives beside
  installed ones, hit areas drawn by a pseudo-element, separate tokens for dividers and control borders. Restated in our
  own words; no text copied.
- **ui-skills** by Julien Thibeaut (https://github.com/ibelick/ui-skills, MIT, © 2026 Julien Thibeaut). 18 candidates:
  one primitive system per surface, dialogs that never scroll the page, `aria-disabled` with a visible reason, links that
  navigate and buttons that act, `will-change` only while animating, layout read and written in separate frames, page
  titles and share metadata. Restated in our own words; no text copied.
- **transitions.dev** by Jakub Antalik (https://github.com/Jakubantalik/transitions.dev, Transitions.dev License, © 2026
  Jakub Antalik / Transitions.dev: its transitions and skills are free for personal and commercial use but may not be
  redistributed as a competing transitions library; its tooling is MIT). 11 candidates, all motion: motion values as
  tokens named by purpose, one duration and curve both ways for a reversible move, entrance scale by surface size, travel
  distance by frequency, never delaying a close, one tooltip moving between triggers. Restated in our own words; no
  transition or snippet of it is included.
- **Wondelai skills** by Wondel.ai (https://github.com/wondelai/skills, MIT, © 2025 Wondel.ai sp. z o.o.). Its skills
  summarise published books; those we read draw on Refactoring UI (Adam Wathan and Steve Schoger), The Design of Everyday
  Things (Don Norman), On Web Typography (Jason Santa Maria), Microinteractions (Dan Saffer), Don't Make Me Think (Steve
  Krug) and Jakob Nielsen's usability heuristics, whose ideas reached us only through the skills. 64 candidates: hierarchy
  that survives greyscale, one-column forms, constraints shown before the action, honest urgency and no double negatives,
  charts and number formats, navigation and the browser's back button. Restated in our own words; no text copied.
- **web-design-engineer** by ConardLi (https://github.com/ConardLi/garden-skills/tree/main/skills/web-design-engineer,
  MIT, © 2026 ConardLi). 7 candidates: the accent's share of the screen, centred text of two lines at most, counting
  shown to people from one, an audit report of about seven grouped fixes. Restated in our own words; no text copied.
- **Uncodixfy** by cyxzdev (https://github.com/cyxzdev/Uncodixfy, MIT, © 2026 cyxzdev). 4 candidates: sidebar width by
  role, a web app that opens on its content, plain-text status in tables, navigation hover without movement. Restated in
  our own words; no text copied.
- **anti-slop** by Miqdad Badjuber (https://github.com/miqdadbadjuber/anti-slop, MIT, © 2026 Miqdad Badjuber). 29
  candidates: copy (no capitals for emphasis, bold used rarely), a website's page structure, narrow-screen checks, section
  spacing on a phone, cliché glyphs. Restated in our own words; no text copied.
- **designer-skills** by MC Dean (https://github.com/Owl-Listener/designer-skills, MIT, © 2026 MC Dean). 47 candidates:
  forms and errors, two-tier tokens, search results and empty states, chat and AI surfaces, the dark-theme scrim, long
  codes grouped, multi-step flows. Restated in our own words; no text copied.
- **Claude Design System Prompt** by Trystan Sarrade (https://github.com/Trystan-SA/claude-design-system-prompt, MIT,
  © 2026 Trystan Sarrade), which describes itself as a reverse-engineered system prompt of Anthropic's Claude Design. 31
  candidates: reversed hierarchy, primary content where the eye starts, one way of dividing sections, a lightness
  difference between colours that must be told apart, two-stop brand gradients, and the audit and generation method.
  Restated in our own words; no text copied.
- **ux-ui-agent-skills** by Thientan Soparat (https://github.com/plugin87/ux-ui-agent-skills, MIT, © 2026 Thientan
  Soparat). 57 candidates: render artefacts (NaN, undefined) in shown text, busy controls that ignore repeats, inert
  carousel slides, a hint between label and field, no justified interface text, web-vitals targets, mixed text
  directions. Restated in our own words; no text copied.

## Platform guidelines and standards

- **Apple Human Interface Guidelines** (https://developer.apple.com/design/human-interface-guidelines, © 2026 Apple Inc.,
  under Apple's site terms). Read for the mobile rules (2026-09-16), for spacing (§6d, 2026-09-30) and for taste v4, where
  135 of the taken candidates credit it: components and states, overlays, feedback and loading, layout, forms, colour,
  motion. What we took are guidelines and numbers (44pt targets, contrast floors, control sizes, materials, three to five
  tabs), restated as our rules. Restated in our own words; no text copied (172 pages checked; only the list of system
  colour names is shared).
- **Material Design 3** by Google (https://m3.material.io, under Google's site terms). Read for the mobile rules
  (2026-09-16), for spacing (§6d: the 8dp scale, density, breakpoints, margins, component insets; 2026-09-30) and for
  taste v4, where 103 of the taken candidates credit it: components and states, overlays, type, layout, forms, motion,
  state layers. Restated in our own words; no text copied (91 pages checked).
- **WCAG 2.2** by the W3C (https://www.w3.org/TR/WCAG22/, a W3C Recommendation). The contrast floors (4.5:1, 3:1,
  7:1), non-text contrast (1.4.11) and target spacing (2.5.8) in the rules are its thresholds.

## Design systems and Figma files

- **iOS and iPadOS 26**, Apple's Design Resources library on Figma Community (https://developer.apple.com/design/resources/,
  under the licence included in the library, © 2026 Apple Inc.). Read on 2026-09-16 and 2026-09-19 through the Figma API.
  Taken as measured values: the iOS type ramp, control and bar sizes, sheet and menu radii, the greys of the neutral
  colour mood, and the system accent and semantic colours, which generated systems use exactly. Values only; nothing of
  the library is redistributed.
- **MCP Apps for Claude**, Anthropic's file on Figma Community. Read on 2026-09-19 for the warm colour mood: its warm
  greys, surfaces and text steps, taken as values. Values only.
- **awesome-design-md** by VoltAgent (https://github.com/VoltAgent/awesome-design-md, MIT, © 2026 VoltAgent), a corpus of
  DESIGN.md files describing well-known websites, read on 2026-09-16 as an inventory of what marketing sites are made of.
  It informed website defaults and the rule that a testimonial carries its source, and its counts backed two existing
  bans. Restated in our own words; no text copied.

## The owner's own work

Everything else in the rules comes from the owner's own design systems, products, Figma files and design notes, and
from the owner's remarks while building Broom.

## Bundled in the scripts

`scripts/detect.mjs` and `scripts/design.mjs` are single files built with esbuild, so they carry the code of the
libraries below. Each is used under its licence, reproduced here as the licence asks.

### zod 4.6.5 (design.mjs)

https://github.com/colinhacks/zod

MIT License

Copyright (c) 2025 Colin McDonnell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### culori 4.0.2 (detect.mjs, design.mjs)

https://github.com/Evercoder/culori

MIT License

Copyright (c) 2018 Dan Burzo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### kiwi-schema 0.5.0 (design.mjs, reading Figma files)

https://github.com/evanw/kiwi

MIT License

Copyright (c) 2016-2023 Evan Wallace

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

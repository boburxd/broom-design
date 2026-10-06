# broom redesign

A new look for a product that already exists. Its screens, content and routes stay; its look changes. Paths are
relative to this skill's folder; `<skill-dir>` is that folder.

## 1. Audit first

Run `broom audit` (commands/audit.md). It writes `SLOP_REPORT.md` and gives you their system, their content and what
is wrong. Read its baseline and "What to fix first" before anything else.

## 2. Ask what the redesign is for

Ask the brief's redesign questions (references/brief.md) the way commands/design.md asks: what to keep (the brand's
accent, the logo, a layout people know) and what is wrong, seen from the visual, the business and the product side,
and what they dislike. Offer what the audit found as suggestions; the person decides.

## 3. Design the new system

Follow commands/design.md, skipping its offer of a redesign. In `.broom/brief.json` set `kind` to `redesign`, put the
answers in `redesign.reasons` (`visual`, `business`, `product`) and `redesign.dislikes`, and fill `redesign.repo` from
the audit's baseline: `host` `upload`, `url` empty, `name`, `stack`, `summary`, and `fonts`, `colors`, `radii`,
`spacing` and `components` as lists of strings. What the audit already knows (the product type, the stack, a kept
accent or font) is filled in, not asked. Render into `.broom/pack`, and do not copy its components over theirs: the
pack is the target, not a replacement.

## 4. Move their tokens first

Put the new values into their own token files under their own names (their `--primary` keeps its name and takes the
new value), in the notation the file already uses; add the tokens they lack. One edit moves every screen at once. A
technique (how surfaces separate, the corner shape) changes here for the whole system, or not at all. Run
`broom check`.

## 5. Restyle, one screen at a time

Shared components first, then the screens one at a time, with the pack's DESIGN_SYSTEM.md and component docs as the
target. Every edit keeps what commands/fix.md says an edit keeps, with one difference: the system to keep is now the
new one. Their copy, hooks, field order, routes and structure stay.

Work in the order §6a.40 gives (references/studio-hand.md): type, then spacing and rhythm, then colour (the neutrals
unified, the brand's accent kept), then motion, then recomposing a key section; replacing a whole block comes last.
Stop when the brief is met.

After each screen, run `node <skill-dir>/scripts/detect.mjs --changed`, and if you can open the screen in a browser,
compare it before and after as commands/fix.md says.

## 6. Finish

Report what changed on each screen, what was kept and why, and the score before and after.

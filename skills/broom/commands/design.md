# broom design

A design system from scratch. You do the reading, the asking and the writing; `scripts/design.mjs` does the numbers,
the validators and the files. Paths are relative to this skill's folder; `<skill-dir>` is that folder. Working files
go in `.broom/` at the repository root.

## 1. Read what they have

- The repository: the README, `package.json` and the stack, any brand colours, fonts or logo. If the product already
  has a design system in use, say so and offer `broom redesign` or `broom audit` instead.
- Ask once whether they have a requirements document (PDF, DOCX or Markdown) or screenshots of designs they like.
- A requirements document: read it for the product's name, what it does, who it is for, its type and category and the
  nouns it deals in, and reduce it to what a designer needs: its screens, flows, own words and constraints.
- Screenshots: read each in the order §6a.39 gives (surface, type, structure, motion, rhythm). Take roles and
  proportions (greys, accent, corners, density, how surfaces separate), never a typeface name from a picture.

## 2. Fill the brief

`node <skill-dir>/scripts/design.mjs example` prints JSON: `about`, `required`, `optional` (every field with its
allowed values), `defaults`, `notRead` and a minimal `example`. Write `.broom/brief.json` from it.

- Required: `productType`, `product.name`, `product.description` and `product.audience`.
- A requirements document goes into `spec`: its `name` and a `summary` within the limit `optional` gives.
- What the screenshots showed goes into the `visual` fields. A product they like or dislike that the references list
  names goes into `references.liked` or `references.disliked`.
- `platform.aiTools` names the agent you are, and any others the team uses: it decides which entry files ship
  (CLAUDE.md with the skills, AGENTS.md, .cursorrules). Left out, it is Claude Code alone.
- A field left out takes the product type's default. That is how "Decide for me" works: leave the field out.

Show the person what you filled and where it came from, so they can correct it. Then ask only what is left open, with
the questions in references/brief.md:

- in order of how much they change the result, a few at a time;
- with your own multiple-choice question tool if you have one: at most four choices a question plus "Other"; when a
  list is longer, offer the four that fit this product best;
- with "Decide for me" and "Show me options" on every choice question. "Show me options" lists every choice with its
  description, then asks again;
- never answering for the person. Name, what it does and who it is for are free text: draft them from what you know
  and let the person correct them.

## 3. Plan

`node <skill-dir>/scripts/design.mjs plan .broom/brief.json` prints JSON: `instructions`, the `schema` of fill.json and
the derived `parameters` (colours, type, spacing, radius, controls, motion, components). A warning on stderr means the
brief says something the script did not take (an unknown key, a stack from another product type, an id not in a
catalogue): fix the brief and plan again. If a derived value contradicts what the person asked for, change the brief
and plan again; never change the numbers by hand.

## 4. Write fill.json

Write `.broom/fill.json` the way `instructions` say: `identity` (`name`, `tagline`, `lexicon`) and, if you choose,
`components` (each one's prose and copy, by the names in `parameters.components`) and `newTerms`. Every key may be
left out, and Broom's built-in text stands in for it; a key you write must match `schema` exactly, and an unknown key
is refused.

Write it by references/writing.md (§7: how a system is named and its prose written), with references/copy.md,
references/studio-hand.md and references/components.md. Use the nouns the product deals in, never "items" or
"records". Before writing the identity, name the three obvious defaults for this kind of interface and what replaces
each (§6h.9).

## 5. Render

`node <skill-dir>/scripts/design.mjs render .broom/brief.json .broom/fill.json --out .broom/pack`

Render into an empty folder: the script writes only inside it and never deletes, so an earlier render's files would
stay beside the new ones (empty `.broom/pack` before rendering again). It writes the pack after the validators:
DESIGN_SYSTEM.md, tokens, components for the chosen stack, docs, the skills and the entry files for the chosen agents.
It prints what came from fill.json, what the engine repaired, which prose it wrote again, and the validator warnings;
pass the warnings on to the person, since they do not stop the render. A refusal goes to stderr with exit code 1: fix
fill.json or the brief and render again. Never edit the generated files to silence a validator.

## 6. Put it in the project

Follow the Install section of the pack's own README.md. Never overwrite a file that exists: append an entry file
(CLAUDE.md, AGENTS.md, .cursorrules) to theirs; for anything else, show the person the difference and ask. Keep
`.broom/brief.json` and `.broom/fill.json`: with them the system can be changed and rendered again.

## 7. Finish

Run `broom check` (commands/check.md) over everything you wrote. Tell the person what was decided and why, where the
files are, and that a choice changes by editing `.broom/brief.json` and rendering again.

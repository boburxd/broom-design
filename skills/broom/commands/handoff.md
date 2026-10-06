# broom handoff

A finished Figma file becomes the rules the coding agent builds from: the file's own system, in the file's own names.
Nothing in the file is redesigned and no value is "corrected". Paths are relative to this skill's folder;
`<skill-dir>` is that folder.

## With a Figma MCP

If you have one (Figma's own server has `get_variable_defs`, `get_metadata` and `get_design_context`), ask for the
file's link and read every variable collection with its modes, the colour, text and effect styles, and every component
with its variants and properties. Open the key frames as well, for how surfaces separate and the corners and spacing in
use. Then write the pack yourself, under the names the script uses:

- `DESIGN_SYSTEM.md`: what was measured (every value marked found, read from the file, or assumed, with what you chose
  and why), the tokens by collection and mode, the components with their variants and states, how surfaces separate,
  and "Approved exceptions": what the file does on purpose.
- `tokens/tokens.json` in the W3C design tokens format, and `tokens/tokens.css`: one token per variable, named by its
  path (`color/bg/primary` becomes `--color-bg-primary`), each mode as a theme.
- `docs/components/<kebab-slug>.md`, one per component (`ButtonGroup` is `button-group.md`): its variants, sizes,
  states and the tokens it binds.
- `CLAUDE.md`, `AGENTS.md` and `.cursorrules`: a short entry for each agent: build with DESIGN_SYSTEM.md, the tokens
  and these components, and run `broom check` before finishing UI work.

Name the system and write its prose by references/writing.md (§7).

## Without one

Ask for the file itself, a `.fig` from Save local copy in Figma's File menu. The script needs Node 22.15 or later here,
because Figma files are zstd-compressed; on an older Node it stops and says so, and the person updates Node.

1. `node <skill-dir>/scripts/design.mjs handoff <file.fig>` prints a fill request in plan's shape: `instructions`, the
   `schema` of fill.json (`name` and `tagline`, both optional) and `parameters`: the file's counts and its findings.
2. Write `.broom/fill.json` the way `instructions` say, by references/writing.md (§7): name the system the file
   already is.
3. `node <skill-dir>/scripts/design.mjs handoff <file.fig> .broom/fill.json --out .broom/pack`, into an empty folder,
   writes the pack (DESIGN_SYSTEM.md, tokens, components, docs, skills, CLAUDE.md, AGENTS.md and .cursorrules) and
   prints the file's findings: must, drift, taste, then "Kept as theirs".

## Report what departs

The findings are where the file departs from its own system and from the rules. Check each in the file (the page,
frame and layer it names) before you report it; on the MCP path, read the file against references/bans.md,
references/studio-hand.md and references/checklist.md yourself. Report them, never fix them: what the file declares on
purpose is theirs (§6a.41), and an accessibility floor (text contrast, target size) is reported whatever the file says.

## Finish

Put the pack in the project the way commands/design.md step 6 says: append, never overwrite. Tell the person how many
variables, styles and components were read, what was assumed, and the departures.

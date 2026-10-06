# Broom Design

**The design skill for AI coding agents.** Broom Design collects the most popular design skills into one Agent Skill,
together with a working studio's own taste: one set of rules, a checker, a design system generator and six commands.
It works in Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI, Windsurf, OpenCode and any agent that reads
skills, and it removes AI slop from web apps, mobile apps and websites: the generic, machine-made look of default UI.
It respects the product's own design system. What your system does on purpose stays, and slop is whatever drifts from
it toward generic defaults.

## What it covers

- Separation: one technique per surface (a fill, a stroke or a shadow), and the one your system chose is kept.
- Corners: radius that follows height, nested corners that agree, your own scale.
- Colour and contrast: checked in every state and in both themes.
- Spacing and type: your scale, a real hierarchy, no generic defaults.
- States, motion and interaction: focus, hover, busy, empty and error states, reduced motion.
- Copy in the product's own words, accessibility, honest flows with no dark patterns, and AI chat surfaces.
- Any stack: React, Vue, Svelte, Astro, plain HTML and CSS, React Native, Flutter, SwiftUI and Jetpack Compose.

## Install

    npx skills add boburxd/broom-design

- `-g` installs it for every project.
- `-a claude-code`, `-a cursor`, `-a codex` and so on pick the agents.
- `npx skills update broom` updates it.

By hand: copy `skills/broom` into `.claude/skills/` (Claude Code), `.agents/skills/` (Codex, Cursor, GitHub Copilot,
Gemini CLI, OpenCode) or `.windsurf/skills/` (Windsurf).

In Claude Code it also installs as a plugin:

    /plugin marketplace add boburxd/broom-design
    /plugin install broom@broom-design

A plugin's skills carry the plugin's name, so there the commands read `/broom:broom audit` and so on, and
`claude plugin update broom@broom-design` updates it.

## Use

| Command | What it does |
|---|---|
| `/broom audit` | Finds the slop and writes `SLOP_REPORT.md`. Changes no code. |
| `/broom fix` | Fixes the report one finding at a time, checking after every edit. |
| `/broom check` | A quick pass over the files you changed. |
| `/broom design` | A design system from scratch: a short brief, then tokens, components, `DESIGN_SYSTEM.md` and rules for your agent. |
| `/broom redesign` | A new look for a product that exists: an audit, a new system, then its screens one at a time. |
| `/broom handoff` | A finished Figma file becomes the rules your agent builds from, in the file's own names. |

That is how Claude Code takes them; in other agents, ask in the same words ("broom audit"). It also works on its own:
whenever the agent writes or changes UI, it reads the rules first and runs the checker before it calls the work done.

Everything that needs judgement (reading a requirements document or a screenshot, reviewing a screen, writing copy)
happens in your own agent session, with the model you already use. The scripts do the deterministic rest: reading the
code, the numbers, the validators and the files.

## What is inside

In `skills/broom/`:

- `SKILL.md`: what the agent reads first, every time.
- `commands/`: the six commands, step by step.
- `references/`: the rules. Principles, the slop list, decision tables, components, copy, the studio's own hand,
  product types, the finishing passes, spacing, interaction, honesty and AI surfaces, the audit method, the
  checklist and the design brief.
- `scripts/detect.mjs`: the checker.
- `scripts/design.mjs`: turns a brief, or a Figma file, into a design system. Node 18 or later; a Figma file needs
  22.15 or later.

## Run the checker yourself

From the repository root, with the path where the skill was installed (`.claude/skills/broom`,
`.agents/skills/broom` and so on):

    node .agents/skills/broom/scripts/detect.mjs [dir] [--changed] [--json]

It needs Node 18 or later, no dependencies and no network. It reads your own system first (tokens, radii, spacing,
fonts, blurs, how surfaces separate), then prints each finding as `path:line  message  [detector-id]`, grouped as
`must` (universal defects), `drift` (off your own system) and `taste`. A "Kept as theirs" block lists what your system
does on purpose, and the check leaves it alone. The last line is the count and a score: clean under 3, light 3–10,
noticeable 10–20, heavy 20 and over. `--changed` checks only the files changed against git HEAD, plus untracked ones;
`--json` prints the same as data.

## Sources

Broom brings together the ideas of the design skills and guides below, restated in its own words and checked
against each other. Thank you to their authors. Details and licences: `THIRD_PARTY_NOTICES.md`.

**Design skills** (most installed first)

- [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) by Anthropic
- [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) by Vercel
- [design-mobile-apps](https://github.com/designed-by-ai/skills) by designed-by-ai
- [taste-skill](https://github.com/Leonxlnx/taste-skill) by Leonxlnx
- [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) by Next Level Builder
- [skills](https://github.com/emilkowalski/skills) by Emil Kowalski
- [impeccable](https://github.com/pbakaus/impeccable) by Paul Bakaus
- [extract-design-system](https://github.com/arvindrk/extract-design-system) by Arvind
- [agents](https://github.com/wshobson/agents) (UI design skills) by Seth Hobson
- [Stitch skills](https://github.com/google-labs-code/stitch-skills) by Google Labs
- [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better) by Jakub Krehel
- [hallmark](https://github.com/Nutlope/hallmark) by Nutlope
- [web-quality-skills](https://github.com/addyosmani/web-quality-skills) and [agent-skills](https://github.com/addyosmani/agent-skills) by Addy Osmani
- [huashu-design](https://github.com/alchaincyf/huashu-design) by alchaincyf
- [skills](https://github.com/jakubkrehel/skills) and [oklch-skill](https://github.com/jakubkrehel/oklch-skill) by Jakub Krehel
- [interface-design](https://github.com/Dammyjay93/interface-design) by Damola Akinleye
- [ui-skills](https://github.com/ibelick/ui-skills) by Julien Thibeaut
- [transitions.dev](https://github.com/Jakubantalik/transitions.dev) by Jakub Antalik
- [skills](https://github.com/wondelai/skills) by Wondel.ai
- [web-design-engineer](https://github.com/ConardLi/garden-skills/tree/main/skills/web-design-engineer) by ConardLi
- [Uncodixfy](https://github.com/cyxzdev/Uncodixfy) by cyxzdev
- [anti-slop](https://github.com/miqdadbadjuber/anti-slop) by Miqdad Badjuber
- [designer-skills](https://github.com/Owl-Listener/designer-skills) by MC Dean
- [ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills) by Thientan Soparat
- [UIZZE](https://github.com/uizze/uizze) by UIZZE
- [claude-design-system-prompt](https://github.com/Trystan-SA/claude-design-system-prompt) by Trystan Sarrade
- [platform-design-skills](https://github.com/ehmo/platform-design-skills) by ehmo

**Platform guidelines**

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) by Apple
- [Material Design 3](https://m3.material.io) by Google
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) by W3C

**Design systems and files**

- [iOS and iPadOS 26 Design Resources](https://developer.apple.com/design/resources/) by Apple
- MCP Apps for Claude (Figma Community) by Anthropic
- [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) by VoltAgent

## License

Apache-2.0, see `LICENSE`. Third-party notices: `THIRD_PARTY_NOTICES.md`.

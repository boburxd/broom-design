# broom audit

Find the AI slop in this product and write `SLOP_REPORT.md`. Change no code. Paths are relative to this skill's
folder; `<skill-dir>` is that folder.

## 1. Read the product

Before judging anything, write down in a few lines:

- what the product is and who it is for;
- its type: web app, mobile app or website. One repository may hold several (a site and an app, iOS and Android):
  audit the one the person named, or ask which;
- its stack;
- its system: where its tokens live and what they hold (colours, radii, spacing scale, fonts, blurs), its shared
  components, and how its surfaces separate (a fill, a stroke on the page's own colour, or both).

Only what drives the screens now is the system: drafts, migrations and unused files are not (§6h.2). This is the
baseline every finding is measured against.

## 2. Run the checker

From the repository root: `node <skill-dir>/scripts/detect.mjs`. Keep its output and its last line for the report.
Its "Kept as theirs:" block lists their decisions: they are not findings.

## 3. Prove every finding

Open each `path:line` and keep the finding only if it holds up under references/audit-method.md (§6h):

- **Three proofs**: the decision it breaks (theirs first; a principle only where they decided nothing), the path by
  which the value reaches the screen, and the one fix that follows from both. Two possible fixes, or a guess at
  intent, and it is dropped.
- **Try to disprove it**: a declared decision, a state or breakpoint that explains it, a component that overrides it.
- **One cause, one finding**: name the token, rule or component that produces it and list every place it shows.
- **Rate it.** Severity: blocker (someone cannot read, reach, operate or understand it), major (on the main screens
  or many), minor (one place, polish). Confidence: high (the code proves it), medium (rendering could change it),
  low (drop it). A blocker is reported even where their system does it on purpose.
- **The cheapest fix**: delete, then use what the platform gives, then reuse their component or token, then correct
  a value. Add something new only when none of those works.

## 4. Read what a script cannot see

Read the most telling UI files: the main screens, the shared components, the global styles. Judge them against
references/bans.md, references/checklist.md and references/studio-hand.md for hierarchy (one thing leads), states,
copy, layout, one height for the controls of a row, spacing (references/spacing.md), corners (their scale; a nested
corner is the outer one minus the inset), and contrast in every state (rest, hover, focus, selected, disabled) and
both themes. Prove each the way step 3 does.

If you can open the running product in a browser, judge hierarchy, density and contrast there. If you cannot, such
a finding is medium confidence at most, and the report says it was checked by reading.

## 5. Report what is absent

What is missing is slop too (§6a.40): the current-location mark in navigation; hover, press and focus on controls;
the empty, loading and error branch of every list or fetch; a way back from every leaf screen; a not-found page; a
destructive variant where something is deleted; a busy state on every asynchronous action. Tie each to the file
where it belongs.

## 6. Write SLOP_REPORT.md

At the repository root, in this format:

```markdown
# AI slop report: <product>

Audited <YYYY-MM-DD>. Read from the code; <seen in a browser at <width>px | not seen on the rendered screen>.

<detect.mjs's last line, as printed>. <D> of its findings dropped after checking; <K> more found by reading.

## Baseline

<Product type · stack · where the tokens and the components live · how surfaces separate · radii · spacing scale ·
fonts · blurs.>

## What to fix first

1. **<Blocker> · <high> confidence. <What, in the product's own words>.** <Why: their decision or the rule (§…) it
   breaks.> Fix: <the exact change: their token and the value it holds>. Places: `path:line`, `path:line`.
2. …

## Findings

### must · <n>
- `path:line` <what to do> [detector-id]

### drift · <n>
- `path:line` <what to do> [detector-id]

### taste · <n>
- `path:line` <what to do> [detector-id]

### Found by reading · <n>
- <Major> · <medium>: `path:line` <what is wrong>. Fix: <what to do>.

### Absent · <n>
- <what is missing>: `path`

## Kept as theirs

- <what their system does on purpose>, at `path`: <why it stays>.

Nothing outside this list is an exception. A departure decided later is added here with its reason.
```

"What to fix first" holds about seven fixes, like ones grouped: blockers first, then by how many screens one edit
repairs, then by risk. Findings list only what survived step 3, blockers first in every group.

Then tell the person the score, the number of blockers and the first three fixes, and that `broom fix` works through
the report.

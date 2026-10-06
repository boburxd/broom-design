# broom fix

Fix what `SLOP_REPORT.md` lists, one finding at a time. If there is no report, run `broom audit` first
(commands/audit.md). Paths are relative to this skill's folder; `<skill-dir>` is that folder.

## Order

Before the first edit, run `node <skill-dir>/scripts/detect.mjs` on the whole repository and keep its output: it is
the baseline for every comparison and the score before.

Work "What to fix first" from the top, then the findings: `must`, then "Found by reading" by severity, then `drift`,
then `taste`. An "Absent" item adds something new, so do it only where "What to fix first" names it or the person
asks. Never touch what "Kept as theirs" lists. If the person named findings, fix only those.

## One finding, one edit

1. Find what produces it (a token, a rule, a shared component) and fix it there: one edit at the source repairs
   every place it shows.
2. Take the cheapest fix that works: delete the cause, then use what the platform gives, then reuse their component
   or token, then correct a value. Add something new only when none of those works.
3. Run `node <skill-dir>/scripts/detect.mjs --changed` and compare its lines for the files you edited with what the
   baseline printed for them: the finding is gone and nothing new appeared (line numbers may shift). If anything got
   worse, undo the edit and take the next cheapest fix.
4. Look for what the edit broke that no script sees: a contrast fix that washed the brand colour out to grey (move
   its lightness, keep its hue), a focus ring or border now running into its neighbour, the screen's main heading or
   action no longer the strongest thing on it. Where a hierarchy fix could go either way, take the stronger contrast.
5. If you can open the page in a browser, compare it before and after the edit: the selected and hover states still
   read, a blur is still there, and nothing wrapped, moved or got covered.

## What an edit keeps

These restate §6a.32 (references/studio-hand.md) and §2.0 (references/bans.md) for an edit.

- **Their system.** Their tokens, components, styling method and its version: Tailwind stays Tailwind, CSS modules
  stay CSS modules, a hex stays a hex. Only tokens, classes and imports that already exist; no new dependency. If a
  fix needs a token they lack, add it where their tokens live and use it, never an inline literal. A component, a
  colour or a dialog that matches their tokens is theirs and stays.
- **Copy, word for word.** Every label, heading, button, placeholder and message keeps its words and its language:
  nothing renamed, reworded, shortened or translated. Navigation labels, the logo, the order of form fields and any
  legal or consent text stay as they came.
- **Hooks.** Every `id`, `name`, `for`, `href`, `autocomplete`, `role`, `aria-*` and `data-*`, every alt text, test
  selector and analytics call stays exactly as it was. Never remove a label, a focus style, a keyboard path, or a
  reduced-motion or `prefers-contrast` branch.
- **Text in place.** Never move, cover or wrap text that read clearly: a badge stays beside its label, a tooltip off
  its trigger, a one-line label on one line.
- **Contrast in every state.** After any change to a fill, a border or a text colour, measure the text and icons on
  that element at rest, hover, pressed, focus, selected (the active tab, the selected chip, the segmented thumb) and
  disabled, in both themes: 4.5:1 for text, 3:1 for large text, icons and boundaries. A new fill brings its paired
  text colour. An edit that leaves one state below its floor is undone.
- **Separation their way.** If their surfaces separate by a fill, keep the fill and drop a border or resting shadow
  beside it. If they share the page's colour and separate by a stroke, the stroke is theirs: never add a fill under
  it or trade it for a shadow. A translucent fill with a backdrop blur is one technique: never remove the blur or make
  the fill opaque. A technique changes for the whole system or not at all.
- **Corners on their scale.** A 10px button stays 10px; half the height is only for what they already draw as a
  pill. A rounded element near a rounded parent's corner takes the parent's radius minus the inset between them.
- **Spacing onto their scale.** Missing, tight or uneven padding grows or shrinks to a step of their spacing scale;
  space inside a group stays smaller than space between groups. Structure and order stay.
- **Complete edits.** No `...` and no "rest unchanged" comment in place of code you left out.
- **The code, not the check.** A value moved into a variable or a comment is still the same value.

## A finding that is wrong

If the code is right as it stands, leave it and add it to "Kept as theirs" in `SLOP_REPORT.md` with the reason, so
the next run reads a decision instead of making one.

## Finish

Run `node <skill-dir>/scripts/detect.mjs` on the whole repository once more. Then report in a few lines:

- the score before and after (the last line of each run);
- what changed: the finding, the edit, `path:line`;
- what was left, and why: wrong, waiting for the person's decision, or out of scope;
- what was checked in a browser and what only by reading.

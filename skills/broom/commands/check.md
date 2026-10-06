# broom check

A quick pass over the files you changed. Paths are relative to this skill's folder; `<skill-dir>` is that folder.

1. From the repository root run `node <skill-dir>/scripts/detect.mjs --changed`. Without git, pass the folder you
   changed instead.
2. Fix every `must`, one finding per edit, keeping what commands/fix.md says an edit keeps.
3. Read every `drift` line: use the token or component of theirs that it names, unless the departure is deliberate;
   then say so.
4. Fix the `taste` lines in code you wrote for this task; leave the rest unless asked.
5. Leave everything under "Kept as theirs".
6. Run it again until no `must` is left.
7. Report: the last line before and after, what you fixed, and what you left with the reason.

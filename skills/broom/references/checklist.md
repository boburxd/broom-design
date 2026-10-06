## 6. The slop checklist (agents run this before finishing any UI)

1. Is there exactly one primary action on the screen?
2. Does any element use a color outside the token set? Any gradient, other than a website's atmosphere
   behind its content?
3. Count the type families in use (max 2, mono included). Any font size outside the scale?
4. Is every gap a value from the spacing scale? Do unrelated groups have more space than related ones?
5. Any shadow at rest on something that does not float (menu, popover, dialog, sheet, tooltip, toast,
   FAB)? In dark mode, do floating surfaces separate by a lighter fill, with no ring and no drop?
6. Any radius written as 9999 or 1000? Is every rounded control half its height, does the list it opens
   take the same number, and is every nested corner outer − padding?
7. Does every input have a visible label? Does every icon-only control have an accessible name?
8. Tab through the screen: is focus visible everywhere, in a sensible order?
9. Check text contrast against the target (AA 4.5 / AAA 7) for body and muted text, in both modes.
10. Read every string: verbs on buttons, nouns for titles, no exclamation marks, no em dash, no
    marketing adjectives, no emoji outside a playful brief's copy.
11. Motion: does every animation explain a spatial change? Is a control's transition at most 300ms, a
    sheet's 400 and a full-screen change 450, and a website's scroll reveal under 800ms, played once, on the
    first two or three sections? Does reduced motion turn every movement into a short fade?
12. Remove one thing. If nothing breaks, remove another.
13. For every card, panel, row, field and overlay: name the one technique separating it from its
    background — fill, stroke, or effect — and prefer the fill (in a product that already has its own
    technique, keep that one: item 21). If you can name two at rest, delete one
    (§2.0); only a translucent fill with a blur, or a hover adding a shadow, may pair. A fill with a
    border around it, or a border with a shadow, is the most common failure.
14. Does every button name its result, with the number, currency or unit it changes?
15. Does the screen ship with its empty, loading, locked and error states, and does every control
    lead somewhere: no link to #, no handler that does nothing, and a not-found page for an address that
    does not exist?
16. Is any number shown twice? Is any fact invented?
17. Is any section an icon, a title and two lines, repeated across, where the thing itself could be shown?
18. Read the headings alone: one h1, and does every level sit one under the heading it belongs to?
19. Share the page and search for it: its own title, description, preview image and icon, a canonical
    address, a title no other page uses?
20. Double every label, name and title: does anything spill, get cut mid-word or wrap onto a second line?
21. In a product that already exists: which one technique do its surfaces use? A stroke on the page's own colour
    stays a stroke, with no fill added; a translucent fill with a backdrop blur keeps its blur.
22. For every component an edit touched: measure its label and icon against its own fill in every state (rest,
    hover, pressed, selected or active, disabled) and in both themes — 4.5:1 text, 3:1 large text, icons and
    boundaries?
23. Is every container's padding at or above its floor, are opposite insets equal (unless §6d.4 names the
    reason), and is the space inside each group smaller than the space between groups?
24. Look again after the edit: does any text now overlap, sit under something, or wrap where it was one line?
25. Does each change fix a finding or a departure from their own system, and leave what matches their system,
    and every word of copy, as it was?
26. Can the page be zoomed and every field take a paste? Does each field declare its type, inputmode and
    autocomplete, and does field text on a phone stay at 16px or more?
27. Does any overlay open another, any scroll area sit inside another on the same axis, or any pinned bar cover
    the focused element? Does any row of actions wrap?
28. Is every progress indicator honest: nothing for the quickest waits, a number once the total is known, one
    place for each kind of operation?
29. Charts: do bars start at zero, do series differ by more than colour, is every critical value printed, and
    does the title state the finding?
30. Are dates, numbers and currencies formatted by the locale, and does every weight, italic and symbol on the
    screen really exist in the font?
31. Does any badge count something that needs no action, or any menu, select or segmented control mix values
    with commands?
32. Does one toast show at a time, does an Undo toast stay 8–10s and pause on hover, focus and a hidden tab, and
    does a busy button keep its label as the progressive verb?
33. Is any text justified, any text area stuck at a fixed height, or any value rendered as NaN, undefined, null,
    [object Object], Invalid Date or a raw timestamp?
34. Does the strongest signal on the screen sit on its subject or its main action, and does the main content
    start where the eye starts?
35. Is anything paid, shared or subscribed ticked in advance, any urgency invented, any total hidden until the
    last step? Is leaving as easy as joining?
36. On a website at 1024px and wider, are the main sections visible links, six or seven at most?
37. Does a toast keep to two lines and 5s (8–10s with Undo), and does a confirming button repeat the title's
    verb and object?
38. Where the screen holds a chat: is a form-shaped task forced into it, and does the assistant say it is one?

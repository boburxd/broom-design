## 6a. The studio's hand (distilled from a working studio's sessions)

These rules come from how the studio actually works, across three products and forty-plus rounds
of feedback. They outrank general taste when the two disagree.

**Separation and layering**
1. One separation technique per element: fill OR border OR shadow (§2.0 states it in full). Colour
   first — a grey card on a white page or a white card on a tinted one. A shadow marks a floating
   element; a hover may add one to a filled card ("На ховере можно добавить тень"), and a translucent
   fill may carry a backdrop blur on a bar. A border is a state. In a product whose surfaces separate by a
   stroke on the page's own colour, the stroke is theirs and stays (§2.0).
2. Nesting inverts. On a white card the inner blocks are gray (`surface.sunken`) or an accent wash
   (`accent.subtle`); on a dark block they are white at 6–12%. Two identical tones in a row are a
   defect.
3. At most two background tones on a page: the page and one rare second tone (a footer, a plate).
   Ink-dark blocks are reserved for the one moment that must carry weight.
4. One strong element per card; everything else is flat text. Gray cards have no divider lines
   inside — rows are separated by the background itself. Meta information is one quiet caption
   line with dot separators (rating · experience · price), one such line per card; dots running through
   every line of a screen are template chrome.
5. Dense but not noisy: a small banner may hold name, status, instruction and timer, but the same
   number never appears twice on a screen, and a sheet is not used where one screen fits.

**Tokens**
6. Every color is a semantic token, every text a text style, every effect a style. A hard-coded hex
   is a defect. Transparency is a token (`accent.subtle`, a 12% tint), not layer opacity — opacity
   dims the icons inside.
7. White on colour stays white in both themes. Whatever sits on an accent fill, a gradient or a photo
   uses `text.onAccent`; it does not flip in dark mode. The one exception is a light accent (yellow,
   orange, green, mint, teal, cyan) where white cannot reach 3:1 — there the world's ink, in both themes.
8. Radius vocabulary from the studio's files: tiles 12, facts strips 16, cards 24, sheets 38 on a
   phone; controls and chips rounded as height / 2 in px, never 1000; every nested corner is outer −
   padding (a card of 24 with 16 inside holds tiles of 8); 60% corner smoothing on iOS
   targets. §3.5 carries this to every product type; the ratio (tile < card < sheet) is what must survive.

**Type and numbers**
9. One display face for headings, buttons, numbers and labels; one text face for reading and
   inputs. Large numbers are the anchor of a screen: tabular figures, tightened tracking
   (−0.04 to −0.05em), a caption under them in muted text.
10. Headings and short descriptions balance; paragraphs of a few lines are pretty-wrapped, and a long
    article leaves wrapping to the browser, for speed. Measure is set in rem, never in ch. Parallel
    screens keep parallel lengths: if one onboarding title is two lines, they all are.

**Copy**
11. A button names the result, with specifics: "Book Thu 09:20 · 380 000 UZS", "Show 12 doctors",
    "Top up 30 000 сум". Never "Continue" when something more exact is true.
12. A sheet or section title is a question or an action; the subtitle explains with numbers
    ("3 within 50 m · 3 of 6 plugs free").
13. Arguments in the UI are numbers, not adjectives. Every price carries its currency, every metric
    its unit, estimates use ≈, thousands use thin spaces. Counts are written in digits ("8 deploys", not
    "eight deploys").
14. Filter chips carry the current value ("Tashkent ▾", "In clinic ▾"); options carry counts
    ("Female 218"). Row copy is short — the component truncates, so the text does not.
15. Honesty: "estimates your risk", not "diagnoses"; feature texts match the shipped product; no
    invented facts, no placeholder claims. If a value is unknown, the UI says so.

**States and flows**
16. A screen is a scenario, not a picture: every screen ships with its states — empty, collecting or
    loading, locked (no subscription or permission), error, no data — and no button dead-ends. The
    product answers an address that does not exist with its own not-found page and a way back.
17. The product works by itself: the nearest or obvious option is preselected, the primary action is
    enabled on arrival, defaults are filled. Every extra tap must justify itself.
18. Two audiences at once: pros and grandparents. Big numbers, status in words and color at the same
    time, one main button, no jargon.
19. Controls read by type: repeatable and checkable → checkbox; navigation → row with chevron;
    important one-off → button. A row's subtitle carries meaning, not decoration.
20. Choice is a card with a radio when the options have facts to compare (selected = accent wash +
    a 2px accent inner stroke; unavailable = muted text, no radio, with an estimate); a swipe row
    wider than the screen with an "add" tile at the end when the options are peers; a sheet for
    pickers; a separate screen with search, selected chips and a sticky action for long lists.
21. Loading is one pattern for the whole product: a plain screen, an 80px accent-wash tile with one
    icon, a title, one sentence, and a list of steps with done/pending marks — it says what is being
    computed and what the person gets. No spinners in a page body.
22. A gate is the real screen with the data blurred and the labels sharp, a lock where a chevron
    would be, and one strong value card with the action. Never a placeholder.
23. Charts are capsules and bars for discrete periods, and a continuous series over time is a line; a
    summary's mini chart repeats the inner screen's chart
    for that metric; nothing is drawn that no data field supports.
24. Success and error results share one composition: an 80px tone-tinted tile, title, one sentence,
    a details card, and the actions. Block order is preserved across the states of a screen; the
    frame grows instead of blocks moving.
25. Hover changes layout or information, not only color: the hovered card takes width, the neighbor
    yields.

**Imagery, motion, icons**
26. Photography is documentary and realistic; no illustrations, no glossy 3D, no device mockups with
    nothing real inside. If 3D, then real. A website's exceptions are in §6b.
27. Motion order of preference: CSS → scroll-driven CSS → JS with rAF. Only opacity and transform
    animate (an accordion's height, 200ms or less, is the one exception); content is always in the HTML;
    every animation has a reduced-motion branch, a short fade in place of the movement; ~200ms with a
    strong ease-out (`cubic-bezier(.22,1,.36,1)`). On a phone motion is springs (response/damping) and
    haptics mark the key moments; a first-time event is celebrated once. Press scales to 0.97; rows in
    a grouped card dim instead.
28. One icon family, the customer's choice, solid by default and outlined inside buttons ("в буттонах иконка всегда
    outlined"). In a tab bar and on a toggle the selected item's icon is filled (or one weight heavier) and the
    others keep the family's regular style, so selection reads through two channels; that is a state, not a
    restyle. Elsewhere the icon style is never changed inside a component — swap the glyph, keep the style. One
    concept, one icon, product-wide. Where colour carries the meaning and the glyph would be unreadable
    at 20px, use a 12px coloured dot.

**How the studio decides**
29. A reference explains why; the system decides how it looks. Never copy pixels. References must be
    from the same situation as the task (an EV app for a charging screen, not "a details page").
30. Data before reference: no field in the API, no element in the UI. Counts come from the data;
    missing photos become initials; a filter with one value does not exist. A drawn screen's sample items
    come from the product's own data; where there is none, placeholders are visibly placeholders and
    differ from their siblings in every field shown — two people never share a portrait, a list never
    repeats a date. A placeholder is never a stock name ("John Doe", "Acme") or a round invented figure; a
    number nobody knows yet is written as a slot (`[metric]`).
31. One fix on one screen is a rule for the whole product. A closed decision is not reopened; a
    deleted block is not brought back; "transfer" into an occupied place means replace, not add.
32. Change only what was named. When the looks are criticised, fix the visual layer, not the structure;
    revert only the named part; a manual edit by the product's owner is never overwritten — it becomes the norm.
    An edit changes appearance only. Every `href`, `id`, `name`, `for`, `autocomplete`, `aria-*` and
    `data-*` attribute, the order of form fields, navigation labels, the logo, and legal or consent text
    leave as they came. No edit lowers a text element's contrast or removes a label, alt text, a focus
    style or a keyboard path. Edits are written in the styling method and version the file already uses,
    reference only tokens, classes and imports that exist, and add no dependency; when a fix needs a token
    that is missing, the edit names the token to add rather than inlining a value.
    Any edit to a fill, a border or a text colour re-checks the text and the icons on that element in every
    state it has — rest, hover, pressed, the selected or active tab, the selected chip, the segmented thumb,
    disabled — and in both themes: 4.5:1 for text, 3:1 for large text, icons and boundaries. A new fill always
    brings its paired ink; an edit that leaves one state below its floor is undone. A fix never moves, covers or
    wraps text that was clear before: a badge stays beside its label, a tooltip off its trigger, a one-line label
    on one line. Copy, labels and their language are never touched while fixing slop.
    Colours are written in the file's own notation; moving a product from hex to oklch is a migration, never
    the side effect of a fix. An edit that removes a signal with nothing in its place is a regression: an
    `aria-*`, a role, an alt, a `label` and its `for`, a `scope`, a `:focus-visible`, a reduced-motion or
    `prefers-contrast` branch, a logical property turned physical, a `lang` or `dir`, a `text-wrap`,
    `tabular-nums`, a token swapped for a literal or a paler token; metadata, canonical addresses, structured
    data, analytics and test selectors as well. A change is unfinished while a new variant or theme misses a
    state, a new string misses a translation, or a control added to one surface is missing from its siblings.
33. **The controls of one row share one height.** This holds on every device and in everything we hand
    over — a generated system, a Figma handoff, an audited product alike. A toolbar, an action bar, a
    filter row, a form row, a card's footer, a phone's bottom bar: the search field, the selects, the
    segmented switch, the icon buttons and the button are all one size step (36px on the web app, 44 on a
    phone, the row's own step elsewhere), on one baseline, with one gap; a control a step smaller or larger
    than its neighbours is a mistake, never an emphasis. An icon-only control is a square of that height,
    not a smaller circle floated beside it. A switch between views (grid / list, light / dark, map / list) is a
    segmented control of icons with an accessible name on each, not two words — the words go into the
    tooltip and the screen reader.
34. **The page's shape is chosen before any code**, and its job before its shape: a screen is there to
    persuade, to be worked in, to be read or to be lived through, and that answer decides the rest. Where the heading sits, how sections are divided,
    the rhythm they keep, and how the first screen arrives are decided together, as one named choice,
    and said in plain words before a line is written. Picking those axes one at a time is slower and
    lands on the same page every time.
35. **Two briefs must produce two designs**, not one layout in two palettes. The shape chosen is
    written down with the system, and the next system for the same owner deliberately lands somewhere
    else. A different accent is not a different design.
36. **Decide whether a screen needs any image or ornament before deciding which one.** In a web app or on a
    phone, words alone is a finished answer, not a fallback; a website needs at least one real visual. Reaching for the decoration first is what puts the same picture on
    every page.
37. **Gate every decoration by removing it.** Take it out and look again. A screen that still holds up
    may keep it, since it adds something; a screen that falls apart was leaning on it to hide weak words, so rewrite the words.
38. **Specificity comes from one concrete noun the product actually deals in.** Build the screen's one
    made element out of that noun, in the lightest medium that can carry it, and change its parameters
    per project, so two customers in one industry never get the same drawing.
39. **Read a reference in a fixed order**: surface, then type, then structure, then motion, then rhythm,
    at the altitude the source supports. From a picture take roles and proportions and never a typeface
    name; from code take exact values. What the source cannot tell you is written down as a
    declared gap, never filled with a guess. One reference is the backbone; another may move one axis at
    most.
40. **An existing product is worked in a fixed order.** An audit's fixes put blockers first (§6h.6),
    then go by how many screens one edit repairs, then by risk: collapse token drift onto what the product already declares, then the
    states of its shared components, then the spacing rhythm, then one-off components rebuilt through the
    system's own, then the screen states that are missing, then per-screen polish — each step one change a
    reviewer can read. A visual refresh or a redesign goes type, then spacing and rhythm, then colour
    (the neutrals unified, the brand's accent kept), then motion, then recomposing a key section;
    replacing a whole block comes last, and the work stops when the brief is met. Where structure, content
    and routes are sound, the answer is a targeted pass, not a rebuild. An audit reports what is absent as
    well as what is wrong: the current-location mark in navigation, hover, press and focus on controls,
    the empty, loading and error branch of every list or fetch, a way back from every leaf screen, a
    variant for every kind of action the screens perform (a deletion with no destructive variant, an
    asynchronous action with no busy state).
41. **An audit measures drift from their system first.** A dialog, a colour, a radius or a component that the
    product's own tokens already describe belongs to the product, whatever our taste would say, and is not slop.
    A fix changes only what a finding names or what departs from their own system, one finding at a time.
    A system read from one live page is labelled as that page's system, never as the whole product's.
    An accessibility blocker is reported even when their own system does it; a taste ban their system
    contradicts is still muted, with its reason.

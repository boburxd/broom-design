## 6e. Interaction, platform and content

What the sections above leave unsaid about how an interface behaves. "Web" means a web app and a website,
"phone" a mobile app (and a phone's browser where it says so); a line with no tag holds everywhere.

**Colour and themes**
1. One colour, one role. The colour that marks what can be pressed never paints text that cannot. A semantic
   token does its own job only: a divider token never colours text, a secondary-text token never fills a ground.
   Hues within 15° of each other read as one colour: a heading tinted near the accent's hue reads as something
   to press.
2. Hover, press and focus are always more visible than rest, never paler. States move along the family's
   ladder (§3.3a); a component that draws them as a layer over its own fill instead takes the element's
   own text or icon colour for that layer: 8 % on hover, 10 % on focus and on press,
   16 % while it is dragged. Either way the label keeps its floor in every state, and press shows the moment the
   pointer goes down.
3. A surface set on another surface (a search field on a panel) sits at least two steps of the ramp away from
   it, or the two merge. The main region and the navigation keep their surface colours at every width.
4. Themes: the default follows the system; a switch between them fades instead of jumping in brightness. Web: a
   dark theme sets `color-scheme: dark` on the root so scrollbars and native fields follow, `meta theme-color`
   matches the page background with one value per theme, and a native `<select>` is given its background and
   text colour explicitly. One mechanism switches every token between themes, never a media query for some
   and a `.dark` class for the rest.
5. In the dark theme a content image on a white ground is dimmed a little so it does not glow. A logo has a
   version for the dark theme and product pictures have dark variants; a dark mark never sits on a dark ground. An icon or picture
   whose edge disappears in one theme gets a thin keyline in that theme only, drawn as part of the image and
   never counted as a second separation technique.
6. Over colourful content (a photo, a video, a cover) bars and their labels stay monochrome, and the accent fills
   the one main control, never its label and never several controls. A colour taken from content lives beside
   its source, at most one such scheme a screen, and never stands in for a semantic colour.
7. Translucent material: glass over bright media is dimmed with about 35 % black; the faintest text step never
   sits on a thin or translucent material, and text-heavy zones move to a denser one; text on glass is higher in
   contrast and heavier than on a solid surface, never a flat grey, and colour goes on a solid layer, not on the
   glass. Translucent never sits on translucent. Under `prefers-reduced-transparency` bars and sheets turn
   opaque and lose their blur. Text on a translucent bar or sheet is checked against both the lightest and the
   darkest content that can pass under it; where either fails, the material gets denser.
8. Running text never sits on a fill of middle lightness (OKLCH L about 0.45–0.75), where even black barely
   reads; such a fill carries a short label at most.
9. Text over a gradient or an atmosphere is measured at its worst spot, never on average. A colour computed while
   rendering (`color-mix`, a relative colour, a `/50` opacity) is judged by the pair as rendered, and only a
   solid token goes under text.
10. Two hues that sit side by side or must be told apart also differ in lightness, by 0.2 of OKLCH L or more:
   never a red on a blue, a red beside a green or a blue beside a yellow at one lightness.
11. Rise and fall are tokens set by locale, never a hard-coded green and red; in some markets a rise is red (web
   app, phone).
12. A ramp built from a brand colour keeps its hue within 10°, steps by perceived lightness (closer together
   toward the light end), lets chroma peak in the middle and stops short of pure black and pure white; a ramp
   stepped by HSL lightness is drift.
13. Web: a decorative gradient interpolates `in oklab` (`in oklch shorter hue` between opposite hues), never in
   sRGB, and a large gradient of low contrast takes a little noise against banding (website). A wide-gamut colour
   is declared in sRGB first and in P3 inside `@media (color-gamut: p3)`; a P3 colour with no fallback is a
   defect.

**Tokens**
14. Tokens come in two tiers, raw values and roles, and components read only the roles, never a hue step. A
   name by looks (`--blue-button`), by the first place it was used (`--sidebar-gray`), a numbered role
   (`--text-2`) or one concept under two names is drift; a name states its purpose and carries no side
   (`inline-start`, never `left`).
15. A divider and a control's stroke are separate tokens even while they share a value, and fields have their
   own background, stroke and focus tokens.
16. A component-level token exists only for a written difference; more than a handful of them means the role
   tier is missing roles. No token is defined through a chain of derivations (a `color-mix` of another
   token's relative colour).
17. Web: every `var(--x)` names a declared token; an undefined one voids the whole declaration it sits in.

**Type**
18. Line height by role: display 1.0–1.1, headings 1.1–1.3, interface labels 1.2–1.4, running text 1.5–1.7, more
   as the line gets longer, and a serif a little more than a sans. Three lines or more never take the tight
   leading, even in a box of fixed height.
19. Running text anywhere, a dialog or a settings description as much as an article, stays under about 80
   characters a line (§1.8) and above about 45; supporting lines run 40–60, each column of a multi-column text
   is measured on its own, and on a phone running text sets 35–50 characters a line.
20. Small navigation and tab labels are not bold. A state that changes weight (a selected tab, an unread row)
    does not change width: the bold width is reserved.
21. Sizes are in rem and line heights have no unit, so the person's text size, bold-text setting and zoom carry
    through. A variable font follows its optical size by type size, and light text and icons on a dark ground
    take a slightly lighter weight so they do not read heavier. A family that ships Display and Text cuts uses
    the cut made for the size. Web: the root font size is never in px, and type never sizes in bare `vw`; type
    that scales with the screen is a `clamp()` between rem values.
22. A child heading is never larger or heavier than its parent; deep levels share a size only when weight or
    tracking parts them; a heading is never smaller than its body, except an overline meant as one.
23. Adjacent levels differ by one or two levers (size, weight, colour); only the most important takes all three.
    Emphasis inside one role is a single weight step (400 → 500), not a change of size.
24. In a label and value pair the value leads and the label is smaller or muted. Web app: one size can carry
    three levels by weight and colour (a value at 600, a label at 500, meta at 400 muted) on a text ramp of
    four steps: primary, secondary, tertiary, disabled.
25. The largest heading on a screen is at least twice the body size, about 2.5 times as the aim (a website's
    hero, §6b).
26. Interface text is 11px at least (11pt on iOS).
27. Text is stored in its natural case, and capitals come from `text-transform` (web). Real small caps,
    superscripts and subscripts come from the font (`font-variant-caps`, `font-variant-position`), never from
    shrunken spans; a font's features are set through such properties rather than raw `font-feature-settings`
    or `font-variation-settings` wherever a property exists; an ID or a code holding both 0 and O uses the
    font's slashed zero.
28. Web: fonts ship as `.woff2` only, the weights in use only, about 200KB in all, at most two or three
    preloaded above the fold, never through a CSS `@import`. Font smoothing on macOS is set once, on the root,
    never in components.
29. Web: a link's underline takes its position and thickness from the font (`text-underline-position:
    from-font`, `text-decoration-skip-ink: auto`); a term that has a definition gets a dotted underline.

**Layout and surfaces**
30. Squint at the screen: exactly one entry point for the eye survives the blur. Boldness is spent in one place a
    page, one memorable element, and everything else stays quiet. The hierarchy survives greyscale: with the
    colour taken out, the entry point, the main action and everything selected still show. A system is bold on
    one or two axes (colour, type, layout, interaction) and conventional on the rest.
31. Numbered markers (01, 02, 03) only where the content really is a sequence.
32. When a list or grid changes its number of items, nothing below it jumps. Web app: items that are mostly
    text are a list and a grid is for images (a website keeps three or more items of one kind as a grid, §6b).
33. Depth: a large floating surface sits one step higher on the elevation ladder than a small one; at rest
    floating things take the lower shadow steps, the top step is for what is being dragged, and a hover lifts
    exactly one step. A modal task dims what is behind it, a non-modal side panel does not, and a stack of sheets
    dims each parent by one more step.
34. A blurred or faded edge only where content passes under a floating bar, and one per pane. A top bar is the
    page's colour at rest and takes its fill or blur only once content scrolls under it.
35. Bars that run the full width (a top bar, a docked toolbar, a bottom navigation) have square corners. In a
    joined group (a split button) only the outer corners take the group's radius; the inner ones are about 4.
36. A control on a photograph, a video or a pattern gets protection, a solid fill or a shadow; outlined, text and
    ghost controls are never set on an image.
37. Menus, popovers and tooltips escape their scroll containers (the top layer or a portal) and flip to stay
    inside the screen.
38. A horizontal scroller shows that it scrolls: a cut item at its edge, an edge fade or a visible scrollbar;
    an edge fade is a mask on the scroller, never a gradient of the page's colour laid over the content. Scrolling done for the person moves
    exactly as far as needed, and paging leaves one line of overlap.
39. Web: breakpoints come from where the content breaks, not from devices, and a component that lives in both a
    sidebar and the main column adapts with a container query. At 320 CSS px (400 % zoom) nothing scrolls in two
    directions except tables, maps and code inside their own frames.
40. A change of width, a rotation or a fold keeps the state: the scroll position, typed input, what is open, what
    is selected.
41. List and detail (web app, tablet): from about 840px they sit side by side with the selected row marked and
    no Back; narrower, the detail is its own screen with Back; a change of width keeps the selection.
42. Nothing critical lives only at the bottom of a sidebar or a window. The logo appears once, where it orients,
    and the brand never takes the content's room.
43. Web: two columns of unequal weight split about 2:1; 50/50 is for equals.
44. Web: a page ends on purpose, on a footer or a summary; a phone screen does not need one.

**Components and states**
45. Hover, press and focus belong to what can be pressed. A container that is not itself interactive (a card
    holding buttons) never lights up as a whole. Press shows on pointer-down; the action runs on release, and
    sliding off the target before release cancels it.
46. A disabled control does not react to hover or press; an unavailable floating primary action is hidden; an
    unavailable menu command stays in place, disabled. A control that must explain why it is unavailable is
    `aria-disabled` (it stays focusable and may carry a tooltip) or shows the reason as text beside it; a
    natively disabled control never carries a tooltip.
47. A trigger shows that what it opens is open, with `aria-expanded`, and its chevron turns 180°.
48. A control sits next to what it changes and repeats its arrangement. The frequent path is on the surface and
    the advanced one level down; a disclosure names what it reveals ("Advanced"), starts closed, and a screen has
    one at most.
49. Text is selectable, an error code, an ID or an address above all; `user-select: none` belongs only on
    surfaces that take a gesture. Rows hold short text, long
    text lives in a title and on the detail screen, and where the start and the end both matter (a file name, an
    ID) it is cut in the middle.
50. Multiple selection: where selecting is the main job, checkboxes are always visible; where it is secondary,
    they appear on hover and focus, then on every row once one is picked, with a "N selected" bar carrying the
    bulk actions.
51. Cards do not scroll inside on touch; a swipeable card holds nothing swipeable; sorting and filtering sit
    outside the collection they act on.
52. A reversible toggle (done, like) changes at once and rolls back with a message if the server refuses. An
    optimistic update is only for cheap, reversible actions, never a payment, a deletion or a send.
53. Coming back restores the state: the screen, the scroll, the open panels, the settings section. Tapping the
    current section again goes to its top, and each section keeps its own state. A new window or tab opens only
    when working side by side helps, never by default.
54. Bars: a title under 15 characters that names the screen, not the product; Back and Close as the standard
    glyphs without words, the same everywhere; icon buttons as bare glyphs, with no circle or square around each
    (the bar is already their container); one highlighted action, at the end, and navigation at the start. The trailing group is pushed to the end
    (`margin-inline-start: auto`), with no dead gap left by a capped `flex: 1`.
55. Help, contact and support sit in one place and one order on every screen.
56. Web: state lives in the address (filters, tabs, the page, open panels, the search), and navigation is real
    links, so opening in a new tab works. The browser's Back works in every flow, a modal included, and keeps
    the state; history is never hijacked. A link that opens a new tab or leaves the product says so, with a mark
    and words for the screen reader. Content that appears on hover or focus closes on Escape, can be hovered
    itself, and stays until it is dismissed.
57. Web app: a single-key shortcut can be turned off or remapped, or it takes a modifier; the platform's own
    shortcuts (find, undo) are never taken over, and ⌘, opens settings.
58. A hand-built select, dialog, popover, tooltip or menu beside an installed primitive or the product's own
    component is a finding; one that must be hand-built carries the whole contract: arrows, Enter, Escape,
    focus trapped and returned, ARIA, a click outside, the page's scroll locked. Web: one primitive system for
    each surface of interaction, one animation system for each component.
59. Focus and input never change the context: a select or a radio never navigates, submits or opens a window by
    itself. A filter may refresh its results; going to another page waits for an action.
60. A mode (editing, selecting, recording) stays visible while it lasts and always shows its way out; better
    still, no mode at all.
61. The primary action holds one place on every screen of a flow.
62. With no logo or picture to hand, the name is set in type, or a visible slot is labelled with what goes there
    and at what size; never an invented mark.

**Overlays**
63. A non-modal popover keeps the work on a click outside; work is thrown away only by an explicit cancel.
64. An alert is never only informational: its title, two lines at most, says what happened, never "Error"; its
    text does not explain the buttons; it never scrolls.
65. No alert at launch: a problem at start-up shows what is cached and a quiet status line. A warning is an
    alert, never a popover or a notification, and an error is reported inside the product, never by push.

**Feedback and loading**
66. The first paint is the empty shell of the first screen, never a logo splash; a web app shows its frame, not
    a branded loader.
67. A long operation can be cancelled, and paused where cancelling loses work. Loading never blocks the parts of
    the interface that do not depend on it.
68. A status people check (updated, unread, offline) sits beside its object, not in a toast, and new data
    reaching a list someone is reading slots in quietly. A command that cannot run says why the moment it is
    called.
69. Undo goes back to the last logical point, its label names the action ("Undo rename"), and a result off the
    screen is scrolled to and highlighted. A success message appears only once the change is visible:
    "Created" above a list that has not changed is untrue.
70. Web app: work saves continuously with no Save button, and anything not yet saved is marked. Drag and drop
    shows its preview after about 3px of movement, lights a target only while it is over it, sends a failed drop
    back, scrolls at the edges and can be undone.
71. Onboarding teaches by doing, or by a hint at the control, never a tour; a skipped one does not return; it
    holds no legal text, and optional setup waits until later. A tip is one or two sentences, only for a feature
    of three steps or fewer, only for people who have not used it, and at most one a day. A hint fades after a few uses and stays in the help.
72. An action that must wait counts down on the control itself ("Resend code in 0:28"); a lockout or a limit
    says when to try again.
73. A request has a timeout (about 15s) and offers a retry with the input kept. Past about 10s a wait gives an
    estimate and lets the person work on, with a notice when the result is ready; past about 30s it says it is
    still working, with retry and cancel.
74. One region shows one state: never a spinner over an error, never an empty state under a skeleton.
75. At most two reminders of unfinished things on a screen (a setup checklist, a completeness meter, a draft
    banner), and only for what the person started.

**Forms and input**
76. Submit stays enabled until the request starts. On an error every error shows at once beside its field, and
    focus goes to the first invalid one, marked `aria-invalid` and described. A long form also lists its errors in a focusable summary at the top,
    each one a link to its field.
77. The minority is marked, whichever of required and optional it is, and the rule is explained once at the
    top of the form; a required field carries `aria-required`, and its
    hint and error are tied to it with `aria-describedby`.
78. A field is as wide as what it expects (a postcode short, an address long); stacked peers share one width;
    on a wide screen fields are capped. Web: a form runs 300–500px wide.
79. Fill in what is already known and offer a choice where typing can be avoided; never prefill a password.
80. On touch a field ends in a clear button; an icon at its start names the field's purpose, one at its end is a
    function.
81. Pickers list values in a predictable order and open beside their field; minute steps divide 60; a short
    list is a menu and a very long one is a search.
82. A date can always be typed, with the calendar behind an icon; any separator is accepted and the value is
    formatted when the field is left, never by a live mask; the format is in the hint; 12 or 24 hours follow the
    locale.
83. Units and currency are a fixed prefix or suffix inside the field; a field with a limit shows a counter.
84. A password field has a show button whose name follows its state ("Show password", "Hide password").
    Read-only values keep full contrast and stay selectable; they never look disabled.
85. Session and code timeouts warn first and can be extended, and what was typed survives signing in again. A failed submit,
    an error, leaving and a timeout never clear a form.
86. Web: Escape closes the top overlay or clears a selection, and never erases typed text.
87. Settings: sensible defaults and few settings; a task's own options (sort, filter) live on its screen; a
    setting's description says what "on" does; a link to a setting lands on that setting.
88. A permission request states its purpose in one active, specific sentence, never "for a better experience";
    a screen before the system's prompt has one button, which opens the prompt.
89. A form is one column; two fields share a row only when they are one answer (given and family name, city and
    postcode).
90. In a text area Enter starts a new line and ⌘ or Ctrl + Enter sends; in a single-line field Enter submits the
    form.
91. A field accepts any text and judges it afterwards: nothing is blocked while typing, values are trimmed before
    they are checked, and a live check runs about 300ms after typing pauses, never on each keystroke.
92. Long codes, IDs, phone and card numbers show in groups of three or four, and a code field groups as it is
    typed.
93. Limits show before the action, not as an error after it: the size and type of file allowed beside the upload,
    impossible dates disabled in the picker.
94. A submission with legal, financial or medical consequences passes a review step that shows every answer with
    a way to change each, or it can be undone.
95. A flow of several steps has three to five named stages and says where the person is and how much remains
    ("Step 2 of 4 · about 2 min"), never a bare "Step 7 of 12".
96. Instructions stay in view while the task is done, not only in a window that has closed.
97. Names: one "Full name" field, or given and family name with no order assumed, 50 characters or more; an
    address follows its country (the postcode optional where there is none); a phone or a card number accepts
    spaces, hyphens and a country code and is formatted when the field is left.

**Motion**
98. Frequency decides: what is seen a hundred times a day (a command palette, shortcuts, the main navigation)
    does not animate, what is seen dozens of times barely does, and delight is kept for rare first moments. An
    action taken from the keyboard never animates. A frequent interaction (a row hovered, a tab switched, a key
    pressed) answers at once or within 150ms, on opacity and colour.
99. A popover, menu, dropdown or tooltip grows from its trigger (`transform-origin` at the trigger); a modal from
    the centre. An exit leaves the way it came (a toast from below goes down, a panel from the right goes right),
    and an overlay enters from the edge it is anchored to.
100. Strong named curves replace the built-in keywords: an ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entrances
    and for an exit that retraces its entrance, an ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` for movement across
    the screen, a sheet's `cubic-bezier(0.32, 0.72, 0, 1)`; only an element leaving for good accelerates, on an
    ease-in (§1.6).
101. The deliberate phase is slow (a hold) and the system's answer fast (about 200ms).
102. A transition follows how screens relate: parent to child slides forward and back; peers (tabs, a carousel)
    slide sideways together; top-level sections cross through a quick fade; a card opening into its detail
    transforms as one container. One axis a transition: a group moves in one direction. Web: a view transition is for a
    change of navigation level, never inside a surface dense with interaction.
103. Standing chrome (navigation, a sidebar, a player) does not animate when the screen changes, and a background
    refresh makes no noise.
104. Input is never blocked by an animation: a moving element can be caught and reversed, and a new animation
    starts from the current value.
105. Springs are critically damped (damping 1.0, response 0.3–0.4 s). A bounce appears only as the settle of a
    gesture thrown with momentum, and overshoot only ever moves position, size or angle, never colour or opacity.
106. A stagger never holds back interaction and plays only on surfaces seen rarely, never on a list someone opens
    all day; on a website a staggered list counts as one of its two or three reveals (§6b), and under reduced
    motion the items arrive together. A staggered entrance leaves in one quick fade (about 200ms) and never plays
    its stagger backwards.
107. Glass appears through blur and scale together, not a plain fade. A blur animates 8px at most, once, on a
    small surface; a large `backdrop-filter` is never animated and arrives at its value. A light blur of 2–3px
    may soften a swap or a slide, never a plain appearance or a change of colour or theme. Translucent layers never crossfade slowly: the old leaves, the new arrives, and
    any overlap falls in the fastest part; sheets slide in opaque.
108. An animated icon plays once as a confirmation, or loops only while its action runs. Motion never carries
    information alone: the change is also visible as text or a state. A list animates its inserts, removals and
    moves, and never rearranges itself during an interaction the person did not cause.
109. Web app: a dense desktop tool may open its menus instantly.
110. Nothing flashes more than three times a second. Media playing on its own for more than 5s beside content has
    a pause; video has captions or a transcript; sound never starts by itself; a GIF is a video, stopped under
    reduced motion.
111. Web: a child's transform is not driven by a custom property set on its parent (every child recalculates).
    `will-change` names only transform, opacity or filter, only while an animation runs and stutters on its
    first frame, never `all`. Layout is never read and written in one frame: a change of layout is measured once
    and played by transform; a `requestAnimationFrame` loop has a condition that stops it.
112. Motion values are tokens named by purpose (open, close, swap, slide, stagger); a literal is mapped to the
    token of its use, never to the nearest number.
113. Closing and pointer-leave are never delayed; a delay exists only for a stagger, an intent filter or a
    sequence, and motion that feels late is made shorter, never later.
114. A celebration plays one way: checking animates, unchecking rolls back quickly with no drawing and no flash.
    A badge or a dot added to a trigger animates by itself; the trigger does not move.
115. Web: hover in navigation changes a fill or a colour; a link never shifts sideways.
116. Web: motion tied to scroll runs on a scroll or view timeline, paused through an IntersectionObserver, never on
    scroll events; a loop (a website's moving atmosphere too) pauses off screen.

**Gestures** (phone, unless the line says otherwise)
117. A swipe dismisses by speed as well as distance (above about 0.11 px/ms a flick is enough). Past a boundary
    the content resists like rubber instead of stopping dead.
118. A drag follows the finger 1:1 and keeps the point where it was grabbed, with pointer capture, ignoring extra
    touches once it has started; it waits about 10px before it commits to a direction. On release the finger's
    speed passes to a spring, and the resting point is projected and snapped.
119. Every drag, swipe and pinch also has a tap and a keyboard path, and every gesture a visible control that
    does the same (everywhere).
120. Haptics and sound land in the same frame as the visual, only at moments that matter, and every sound has a
    visual twin (everywhere).
121. Frequent actions are simple one-finger gestures, and the system's own gestures are never overridden.
122. In a phone's browser: `overscroll-behavior: contain` in modals, `touch-action: manipulation` on controls, a
    tap highlight colour chosen on purpose, and no text selection while dragging.

**Accessibility and locale**
123. Web: focus rings show on `:focus-visible`; `outline: none` never appears without a replacement; a compound
    control shows the group's focus with `:focus-within`. A focus ring of the product's own holds 3:1 against
    everything it crosses (fills, the page, images, hover, the selected state); across mixed surfaces it is two
    colours, and in forced colours it takes the system colour.
124. Web: a compound widget (tabs, radios, a segmented control, a toolbar, a menu, chips, a carousel) is one Tab
    stop with the arrow keys inside, and Tab lands on the selected item. No positive `tabindex`; the source order
    matches the visual order at every width.
125. Every screen and dialog sets where focus starts, and closing returns focus to the trigger. Web: a route
    change in the client sets `document.title` and moves focus to the new h1 (`tabindex="-1"`) or to `main`;
    Back restores the scroll and a new route starts at the top. After a deletion focus moves to the next item
    (or the previous one), never to the top of the page.
126. Decorative icons are `aria-hidden`; whatever changes by itself (a toast, a validation message, "12 results")
    is announced in a polite live region, and an error through `role="alert"`. `aria-hidden` never
    sits on a focusable element or over one. Focus never jumps to a toast or a status unless it holds a control
    the person needs, and a repeated polite announcement goes to a region emptied before its text changes.
127. An accessible name starts with the visible label and says what the control does, not what it looks like
    ("Voice search", not "Microphone"), without repeating its role.
128. Web: a skip link is the first focusable element and shows on focus; one banner, one main and one
    contentinfo a page, repeated regions with different names; `<html lang>` on every page and passages in
    another language marked.
129. Icons that carry meaning grow with the text. At large text sizes the layout reflows (metadata under the
    text, fewer columns) instead of truncating; controls without text and bars do not grow and show an enlarged
    label on a long press.
130. Nothing disappears on a timer while it still holds an action or information the person needs: it waits
    until it is dismissed. The one timed exception is the Undo toast (§4), which stays 8–10s and pauses on hover,
    on focus and while the tab is hidden; its result is shown at its trigger as well.
131. Alt text runs to about 125–140 characters, does not repeat a caption beside it, and includes any text in the
    image; a chart's alt gives its finding and its key numbers.
132. Quotation marks follow the language («» in Russian, 「」 in Chinese and Japanese). Lines and fixed text boxes
    leave room for tall scripts (about 7 % more for CJK, Arabic and Thai, 30 % for Burmese). CJK running text
    sets 22–38 characters a line with leading about 0.2 higher than Latin, tracking 0 to 0.05em and never negative,
    no italic, and `line-break: strict`. Web: brand names,
    code and identifiers carry `translate="no"` so the browser's translator leaves them alone. Scripts
    outside Latin take no tracking, which breaks Arabic joining and Indic shaping; Arabic and Hebrew run a step
    larger, at 16px or more.
133. Right to left: layout uses logical properties (inline-start, inline-end); directional icons mirror, while
    clocks, refresh, media controls, charts, phone numbers and addresses do not. Text of mixed direction
    sits in `<bdi>` and digits keep their order; a paragraph of three lines or more aligns to its own script.

**Icons, images and performance**
134. An icon's stroke follows the weight of the text beside it (on a 24 grid, 1.5 beside 400, 2 beside 500–600,
    2.5 beside 700) and its size follows that text (12–14px text takes a 16 icon, 16px a 20, 18–20px a 24);
    icons are drawn at their set's own grid sizes (16, 20, 24), checked at the smallest, never at a fractional
    scale.
    Standard actions take the standard glyph everywhere: share, delete, filter, more, add. Icons hold no text,
    human figures in them are neutral, and in right-to-left only the directional ones mirror.
135. Decoration and content by kind: an essay cover, a settings banner, a landscape on a profile are decoration
    and go; portraits, products and places are content and must be there. No text is baked into an image
    except a logo.
136. Raster images ship at 2× and 3×, flat icons as vectors; images are sized to how they are shown (`srcset`,
    `sizes`), lazy below the fold, the hero at high priority, and under `prefers-reduced-data` no video starts by
    itself.
137. Web app: a list longer than about 50 items is virtualized. Web: nothing is measured from text before the
    fonts have loaded. Web: layout shift stays at 0.1 or less, input answers within 200ms and the largest element
    paints within 2.5s.
138. Each glyph is one SVG coloured by `currentColor`, its states drawn in CSS, never separate files; a library's
    icons are used as published and by name, their paths never redrawn. SVG is preferred to an icon font; a font
    is allowed only with a fallback for forced colours, where an icon is an SVG in `currentColor`, never a
    background image.

**Data and charts**
139. Ticks fall on familiar steps, gridlines are few and light, and the data is stronger than the axes. Data that
    needs no analysis is a list or a table, not a chart. No second y-axis and no 3D; one or two numbers are
    printed, not drawn.
140. On touch the whole chart is the scrub area. The segments of a stack are parted by a gap. Adjacent segments and
    series hold 3:1 against each other, not only against the page.
141. One data set keeps one chart type and one set of colours in every view. Axis labels are short, the units go
    in the title, and the chart's edge lines up with the content's edge.
142. Series and bars are labelled directly, at their end; a legend only where labels cannot fit; category names
    sit on the chart, not only in its accessible name.
143. Bars are sorted by value or by their natural order (time, a scale); five to seven categories, the rest in
    "Other"; eight categorical series at most. A pie only for two to five parts of a whole, the largest first
    from twelve o'clock; otherwise bars or the number itself.
144. A continuous series over time is a line and discrete periods are bars; a line chart holds four or five series
    at most, and a target or a threshold is a labelled line.
145. Ordered data takes one hue stepped by lightness, data around a midpoint two hues through a neutral, and
    distinct hues only for an unordered set.
146. A chart agrees with itself: a stack sums to its total, a waterfall closes, shares add to 100 %, a cumulative
    line never falls.
147. Every chart has its data as a table or text as well as its alt. It plots only the points that carry its
    point; on a phone fewer points and larger labels, or a table.
148. A change ("+12 %") appears only with a real series behind it and its period ("vs last week") (web app).

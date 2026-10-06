## 2. Bans (the slop list)

Anything in this list is a defect, not a style choice. It is what new UI is held to and what a review or the
slop detector checks; the rest of this file says what to do instead.

**0. One separation technique, colour first.** There are exactly three ways to separate an element from
its background: a different colour (a fill), a stroke (a border), or an effect (a shadow). An element
uses **one**, and colour is the priority: if a fill can separate it, it has no border and no shadow. A
fill plus a border, a border plus a shadow, or a fill plus a shadow on something that does not float are
defects, in both themes and in every component. Non-floating surfaces — cards, panels, rows, list items,
fields, banners — separate by fill. Things that float over arbitrary content — dialog, sheet, popover,
menu, tooltip, toast, a FAB, the thumb of a segmented control — separate by a shadow in light (one
colour, ink at 12%), and in dark, where a drop shadow does not read, by a lighter raised fill with no
ring. A floating element's fill is its body, not a second technique. Exactly two pairs are allowed:
- **a translucent fill with a backdrop blur** — bars, sheets and floating controls over moving content;
  never a content card;
- **a hover (or press) that adds one more technique, preferably a shadow** — a filled card gains a
  shadow; an outlined button gains a tint.
Two things are not separation at all: a divider between two siblings (it stays a border, on one side),
and a border that marks a **state** (focus, invalid, selected, checked, current).
Two accessibility modes are named exceptions, each inside its own media query and nowhere else. Under
`prefers-contrast: more` a surface may turn near-solid and take a contrasting border as well. For forced colours,
controls and cards carry a transparent 1px border from the start, so the system has an edge to paint when it
replaces every colour, and focus is drawn with `outline`, never `box-shadow`, which forced colours erase; a
transparent border is never counted as a technique.
**An existing product's technique is its own.** When its cards, panels and popovers share the page's colour
and a stroke separates them, consistently, the stroke is its one technique: adding a fill under the stroke, or
removing the stroke, breaks it — each gives a second technique or none. Where it uses a translucent fill with a
backdrop blur (a header, a bar, a sheet, a floating control), that pair is one technique and no fix strips the
blur or makes the fill opaque. A technique is changed for the whole system or not at all: one card moved from a
stroke to a fill leaves two systems on one screen. Our "colour first" decides what a new system does, and what a
product with no consistent technique converges on; it never overrules one that has one.
In a stack of rows (a list, a settings group, a feed, a table of people) the divider **starts where the text
starts** and runs to the row's end, whatever leads the row: an icon, an avatar, a thumbnail, a checkbox. It
never runs under the leading element; the leading element stands in the row's white space, and the rule belongs
to the text.

**Color**
- Purple, violet, or indigo as the default accent. Blue-500 / indigo-500 / violet-500 from a
  framework palette used as brand. A component kit's starter theme shipped as the brand, its root
  variables, primary and radius as the installer left them: the kit is plumbing, and the brand's own
  tokens overwrite every colour, radius and type value it arrived with.
- Gradients as decoration: behind text, on buttons or cards, gradient text, glows behind imagery. A
  brand may name gradient styles for a short written list of moments, each two stops of one hue family
  (never three, never across hues); nothing outside the list. A scrim
  that holds text readable on a photograph is protection, not decoration, and is not a gradient here;
  neither is a website's atmosphere behind its content (§6b).
- Pure black (#000) anywhere — black is a tinted near-black — and neon accents as "dark mode", the stock
  dark look included: a flat, deep blue-black (about #0d1117) lit by a cyan or violet glow.
- More than one accent hue; a brand colour beyond the two extras, one with no written job, or two of
  them on one control. Semantic colors used as fills for cards or sections. On a website, a full-width
  coloured band or a hero ground above OKLCH chroma 0.04: a large field stays near-neutral, and the full
  chroma of an accent belongs to controls and marks.
- The two stock palettes of generated pages, where the brief did not ask for them: a cream ground with a
  display serif and a terracotta accent, and a near-black ground lit by one acid green or vermilion. A
  palette the person chose, our warm mood included, is theirs and is never flagged.
- A pastel circle behind every icon. (One 12% tile anchoring a card or a result screen is fine.)
- A state, a status or a result told by colour alone: a red and a green that differ in nothing else.
  Every state carries a second channel as well, a word, a glyph or a shape.
- A rule that repaints a surface and leaves the text colour to inheritance, so an inverted section keeps
  the page's ink; a label whose colour and fill sit within a few points of lightness. The rule that sets a
  background sets its text colour with it, and a fill that carries text has its paired ink token
  (`text.onAccent` on an accent fill, `f.dark` on a soft one).
- Warm-tinted and cool-tinted neutrals in one product. One grey family, tinted one way; a second
  temperature is drift, mapped onto the nearest step of the ramp.
- Text on a photograph with nothing under it holding its contrast; a white headline over a bright part
  of the image. A scrim limited to the text's region (the page tone fading in, or ink at 40–60 %) keeps
  the lightest pixel under the glyphs above the text floor.

**Type**
- Three or more type families. Display serifs at UI sizes (< 20px). Decorative fonts anywhere. More
  than five type sizes on one page, or a size from outside the ratio; a third face, where a brand has
  one, is a register for at most two places, never a third surface.
- Gray body text (#94a3b8 and lighter) on white. Hint text, helper lines and placeholders held to the
  relaxed floor for large text instead of the body floor.
- Uppercase headings, buttons, labels or table headers with wide tracking, mono uppercase badges; an
  eyebrow over every section (one small tracked uppercase eyebrow, 11 to 12px, may sit above a section
  heading, at most one for every three sections); centered headings inside left-aligned pages; a word in
  capitals for emphasis inside a sentence. Display capitals with leading below 1.0, where the next line's
  cap-tops collide (capitals have no descenders).
- A main heading in italic, one italicised word inside an upright headline, or one word set in another
  family. Headings are roman and in one face, and a lowercase italic subhead under the main heading is
  the one italic allowed; emphasis in a heading is weight, the accent colour or a
  drawn underline in the heading's own family, and italic stays in running body copy. CJK text takes no
  italic at all, heading or body: emphasis there is weight or colour.
- A heading, label or year range turned on its side as ornament up the page edge. It is set
  horizontally where it belongs, or deleted (vertical Japanese or Chinese text is a writing mode, not
  this).
- Headings picked for their size instead of their place: a level skipped (h1 straight to h3), two h1 on
  one page. One h1 names the page and every heading sits one level under the one it belongs to; the level
  comes from the outline and the size from the scale, and the two may differ. A skipped level is a taste
  finding, not an accessibility failure, unless it breaks moving through the page by headings.
- A heading a half step above its body, under 200 weight units apart (500 over a 400 body). At least 200
  weight units separate them, so a 400 body pairs with 600 or 700; a size step alone is not hierarchy either.
- Type the browser has to fake or patch: a bold or italic synthesized because the family lacks it, a symbol
  the font does not have (⌘, ⏎, ⌥, an uncommon arrow) dropping into a random face, a fallback whose metrics
  shift the page when the web font arrives, a weight under 400 below about 24px. Every weight and italic in
  use exists in the family; `font-synthesis: none` is set only once every family of the fallback stack has
  been checked for those weights and italics, and otherwise only the synthesis that would fire is switched off
  (`font-synthesis-weight` or `-style`); the stack ends in a family that covers every script and
  symbol the product prints (Noto); the fallback is fitted to the web font (`size-adjust`, ascent and descent
  overrides) and the critical faces are preloaded with `font-display: swap`; thin and light weights live only
  at display sizes.
- Justified interface text (`text-align: justify`), which opens rivers between words at interface widths.
  Text is set flush to its starting edge; centred text runs two lines at most (a short heading, an empty
  state, one call to action), and a page keeps one axis of alignment.

**Layout & surfaces**
- A card with a drop shadow around every section. Cards nested inside cards. A page of hairlines and
  text with no surfaces or images — it reads as a draft.
- A pill written as radius 9999/1000/`rounded-full`; one radius for every control size; nested corners
  that ignore outer − padding = inner (§1.10).
- Uniform 16px padding and uniform gaps between unrelated groups.
- Everything centered: hero headline + subhead + two buttons + floating screenshot with glow. A hero
  pinned to the full viewport height with only text in it is the same tell on its own; everything it
  promises is visible at once in an 800px-tall window. A website's cinematic hero is the exception (§6b).
- A browser bar with a URL pill and traffic-light dots, a phone frame with a notch, a terminal or code
  window with a mock title bar, drawn in markup around content that already has real chrome. A real
  screenshot in a figure, or a typographic frame (a rule above, a label, a rule below); a device frame
  comes from a photograph or a transparent asset, never from CSS, and on a website it holds a real
  screenshot. A product screen imitated from boxes
  and invented rows (a fake dashboard in the hero) is the same fault: a screenshot, the real component
  working, or nothing.
- A hero with more than four text elements (an optional small label, the headline, one sentence, the
  actions), a headline past three lines at 1280px, a supporting sentence past about 20 words, anything
  under the actions (a tagline, a "works with" row, a price teaser, a row of avatars), more than 96px of
  empty space above its first line (a cinematic hero's media is not empty space). One primary action and at most one quieter secondary; logos, prices
  and proof go in the section below; a long headline is cut, never shrunk.
- A page of one section shape repeated: three rows of cards, image-left and text-right alternating with
  its mirror all the way down. No more than two sections in a row share a skeleton; the next changes one
  axis (media side, column split, density, surface tone) and keeps the grid, type and spacing scale. A new
  picture in the same frame is not a new section.
- A section header split in two, a large heading on one side and a small paragraph floating in the other
  column, aligned to nothing. The paragraph goes under its heading within the measure; a second column is
  earned by an image, a control or data.
- The icon + title + two lines trio as a section's default, three or four of them in a row standing for
  what the product does. Show the thing itself (a screenshot, the real component, a number with its
  source), or give one feature the whole section.
- A grid with a blank or decorative filler cell, spans that leave an empty cell or corner, a lone item
  stranded on the last row of three or more columns. Columns come from the item count (2 + 1, 3 + 2, one
  lead item and the rest), spans add up to the tracks, or the layout changes. A
  card grid fills with `auto-fit`, never `auto-fill`, which leaves phantom tracks; a fixed count is
  `repeat(n, minmax(0, 1fr))`.
- An image with no declared shape, so the page jumps when the file arrives; cards in one grid at
  different ratios; many ratios on one page. The frame declares its ratio (`aspect-ratio` with
  `object-fit: cover`) before the file loads, a grid takes one ratio, a page at most two (say 4:3 for
  cards, 16:9 for a feature).
- A "scroll" or "swipe" label, a down arrow or an animated mouse telling people the page goes on. The
  top edge of the next section showing above the fold is the cue.
- On a phone: a control, label or number under the status bar, the home indicator or a gesture edge
  (fills and images may run under them; bars and bottom actions add the platform's safe-area inset to
  their own padding), and a screen built like a scrolling marketing page, with a headline block, stacked
  sections and a footer, where an app screen belongs.
- Fonts, icons, images or media loaded from somebody else's origin at run time. The product serves its
  own assets from its own origin, and an asset URL is never a script, a pixel or a widget.
- Anything sized to the viewport's full width, a hero at the full viewport height hiding what follows,
  and a grid track that can hold an image declared as a
  bare fraction. Width is 100% inside the container's padding, full height is the dynamic viewport unit (a cinematic hero takes most of it),
  a track that can hold an image takes a zero minimum (`minmax(0, 1fr)`), and horizontal bleed is
  clipped on the element that overflows, clipped rather than hidden so sticky and fixed children survive.
- A layout that only holds the text it was drawn with: a longer name, a translation or a real title spills
  out of its box, is cut mid-word, or pushes a label onto a second line. Every box is drawn for the longest
  real value: running text wraps, a one-line slot truncates with an ellipsis and shows the whole on hover and
  focus, a control's label is shortened. Every layout holds text 30 % longer than the source language, and a
  long unbreakable string (an address, an email, an ID, a hash) breaks anywhere (`overflow-wrap: anywhere`)
  instead of pushing its box wider.
- A sticky or fixed header, footer or banner that covers the focused element or the target of an anchor
  link. The page scrolls with a `scroll-padding` equal to whatever is pinned, and every anchor target
  carries a `scroll-margin-top` of the header's height.
- A scroll area inside another that scrolls on the same axis. One scroller per axis: an inner region either
  grows with the page or the page around it stops scrolling.
- A row of actions that wraps onto a second line; a button stretched across a wide window. A button is as
  wide as its label, with its icon and label centred together, and full width only on a narrow screen; as
  the row narrows its tail folds into "More" in a set order, and the primary action stays the most visible
  one at every width.
- A website's primary navigation hidden behind a menu button at 1024px and wider, or a top navigation of more
  than six or seven items. From 1024 the main sections are visible links on one line; the menu button appears
  only below 1024, and further places live in the footer or on a section's own page.
- Reversed hierarchy: the strongest signal on a screen (size, contrast, room) spent on a supporting element
  while the subject or the main action is cramped; filler given the space the key content needs; main content
  starting anywhere but where the eye starts, at the top and the inline-start edge (a phone's bottom action and
  a dialog's buttons are not this). A main area left nearly empty on a desktop is fixed by composition, an
  empty state centred in its own place, never by filler.
- Structural hacks: a negative margin undoing a parent's padding, a `calc()` written to make something fit,
  absolute positioning used to step around the flow. The layout is fixed where it is wrong.
- A decorative layer laid over interactive ones (a backdrop, a glow, a full-width `::after`) that catches the
  pointer or reaches assistive technology: it takes `pointer-events: none` and `aria-hidden`. A backdrop that
  closes something on a click is a control and is built as one.
- Graph paper, dot grids or line grids as a background in a web app or on a phone. On a website one such
  pattern may serve as its atmosphere, at 8 % opacity or less (§6b).
- Glassmorphism on content surfaces. Bento grids for content that is not a grid.
- Stat tiles with large colored numbers and green up-arrow badges as the default dashboard.
- Every element at one size and weight — four equal metric tiles, a wall of equal cards, a list where
  nothing leads. A screen with no subject is unreadable on any device and in any product type.
- A colored bar or stripe on the left edge of alerts, cards, banners, toasts, or rows. The semantic
  colour lives in a soft tint, the title and the icon, or in a dot.
- Icon before every heading, list item, or nav entry. Emoji as icons, in a control, or in
  any string outside a playful brief's copy. Two icon families on one screen, which reads as loudly as two typefaces. A coloured dot before every item when
  the dot reports nothing; a dot marks a state or is not drawn.
- The obvious glyph for a concept: sparkles or a magic wand on anything AI, a rocket for starting or
  launching; a robot, an orb, a lightning bolt, a diamond or a star standing for a feature; a hand gesture
  (a thumbs-up, an OK sign, a pointing finger) or a regional object as an action icon in a product used
  across countries. The glyph says what the action does to its object, from the one family, or there is none.
- Scale-on-hover that shifts layout; tilt, particles, animated blobs; parallax outside a website. The system pointer
  hidden or replaced by an image, or a shape trailing it: the platform's cursor stays, changed only to
  the standard keywords that say what a surface does (pointer, text, grab).
- A control whose geometry changes between rest, hover, focus, error and disabled: a border that
  thickens, a focus ring that pushes its neighbours aside, a message that appears under a field and
  moves the form. One border thickness everywhere, the focus ring's room reserved from the start as a
  transparent outline, one line of height under a field whether it is empty or reporting, and a box
  reserved for anything that arrives after first paint.
- Animating width, height, top, left, margin or padding (one exception: an accordion, a collapsible or a
  `details` may animate its height, in 200ms or less); properties that change together given
  different durations or curves; an exit as long as the entrance it answers (it runs at about two
  thirds); a second entrance revealed on scroll after the page has already arrived, outside a website's one-time
  reveals on its first two or three sections (§6b); motion that follows
  the pointer; anything entering from `scale(0)`, which reads as appearing from nowhere: an entrance starts at
  opacity 0 and a scale set by its size (a modal 0.96, a menu 0.97, a tooltip 0.98, a menu closing to 0.99),
  never below 0.9. The one exception is an icon swapping in place (copy turning into a check): the new glyph
  grows from 0.25 with opacity and a blur of 4px at most, on a spring with no bounce, and under reduced motion
  simply fades in.
- A carousel, banner or figure that advances by itself, with no pause on hover and focus and no manual
  control. The reader advances it, and nothing holding reading text moves on its own.

**Components & interaction**
- Several status chips, badges or pills competing in one header, row or card: a state, a plan, a live
  marker and a count, all the same size.
- Asking for more than the step needs: four fields where one question would do, everything required,
  a form that collects what will not matter until later. A rating, notifications or a permission asked
  for before the person has done the thing it serves; it is asked right after that moment, in a pause after
  a finished task, and a rating no more than once every one to two weeks.
- Zoom disabled: `user-scalable=no` or `maximum-scale=1` in the viewport meta. The person can always zoom.
- Paste blocked in any field; a sign-in that defeats password managers or offers no way in without
  remembering a password. Paste always works, the form names its fields so a manager can fill them, and a
  link or a code by email sits beside the password.
- A field that does not say what it holds: the wrong `type`, `inputmode`, `name` or `autocomplete` (an email
  as plain text, a code without `one-time-code`, a new password without `new-password`); spellcheck and
  autocorrect left on for an email, a code or a username; autofocus on a phone, or on more than one field;
  the same question asked twice in one flow; field text under 16px in a phone's browser, which zooms the page
  on focus. Autofocus goes to the one main field, on a desktop only (a search screen focuses its field on
  opening), and what was entered once is carried forward. Codes, PINs and card numbers are `type="text"` with
  `inputmode="numeric"`, money takes `inputmode="decimal"`, and `type="number"` is for quantities only.
- An error, a confirmation or a question through the browser's blocking `alert`, `confirm` or
  `prompt`. The product's own dialog, an inline message under the field, or an undo.
- A div, span, li, td or img with a click handler standing in for a button or a link; a page with no
  `main` landmark. A real button or link (a whole card can be its hit area), inside header, nav or main. A
  control that goes to another page is a link and a link that acts is a button; a site's navigation is a
  list inside `nav`, never `role="menu"`; a list is `ul` or `ol`, and a table's headers are `th`.
- A tab bar with more than five entries, or an action (create, scan, pay) among the places. Three to
  five destinations the person comes back to; an action is the screen's primary button or a sheet, and a
  sixth destination lives inside one of the five.
- Overlays stacked on overlays: a modal that opens another modal, two popovers open at once, navigation
  inside a modal, several tooltips showing together. One modal at a time, and only an alert may sit over
  it; a modal has one path through it, and a long or many-step task gets a full screen, not a dialog; a
  popover points at its source without covering it, one at a time, sized to its content, never carrying a
  warning, and on a phone it becomes a sheet.
- Values and commands mixed in one control: a select that also runs actions, an action menu holding a
  choice, a segmented control mixing a choice with an action or icons with words. An action menu of fewer
  than three items; a screen's primary action hidden behind "More". A select holds only mutually exclusive
  values, a menu only commands, a segmented control only choices or only actions; under three actions are
  buttons. A segmented control has two to five options (up to seven on a wide screen), of equal width, all
  words or all icons, nouns, never wrapping and never stretched across a wide panel, the selected one marked
  by more than colour (the thumb, a check or an icon).
- A badge on something that needs no action, a badge that never clears, a badge carrying a price, a score
  or any number that is not waiting work, a badge longer than four characters. A badge counts what waits for
  the person and clears once it is seen; past 999 it reads 999+, where room is short it is a dot, and it is
  announced together with its section.
- A box-shadow, glow, or halo ring on a focused input, select, or textarea. Focus is the border
  switching to the focus color; keyboard focus on buttons is a 2px outline with offset.
- Two separation techniques on one element at rest: a fill AND a border, a border AND a shadow, a fill
  AND a shadow on something that does not float. See §2.0 — one technique, colour first; only a
  translucent fill with a blur, or a hover adding a shadow, may pair.
- Three layers of background in one card (gray card, white plate, colored chips). One strong element
  per card; the rest is flat text. A stacking order invented at the rule that needed it: it comes from
  one named ladder of about six steps, and nothing outside it.
- The same number shown twice on one screen (a chart and a widget with the same figures).
- A button or chevron that leads nowhere: a link to `#` or to nothing, a click handler with an empty body or
  one that only logs, a button wired to nothing; a control that declares a state (`aria-sort`, `aria-pressed`,
  `aria-expanded`, `aria-checked`, `aria-selected`) and changes nothing when clicked, such as a sort chevron
  that sorts nothing. Every control has a destination screen or state. An address
  that does not exist lands on a not-found page in the product's own look, with a way back, never a blank
  screen or the host's default page.
- Loading as a spinner, an orb, a pulsing ring, a gradient background, or cards around steps. A busy
  indicator that flashes: it waits about 150ms before it appears, or stays about 300ms once it has.
- Progress that is not honest: a bar that races to 90 % and stalls, an indeterminate indicator where the
  total is known, a spinner that turns into a bar, one kind of operation reporting its progress in different
  places. A wait short enough for the delay above shows nothing; up to about 5s an indeterminate indicator;
  past 5s a determinate one with a number, switching the moment the total is known; one indicator for a
  group; the track shows where it ends, it moves at an even pace, and a stall says so and what to do. It never
  moves backwards, reaches 100 % before it hides and waits for the server on its last stretch; a failure freezes
  the bar and names the point ("Failed at 47 %. Retry").
- A subscription or permission gate as a placeholder with a lock. The real layout stays visible;
  only the data is blurred.
- Pickers (region, language, date) as full-screen lists; a bottom sheet where one screen fits.
- Icons restyled inside components (filled outlines, swapped styles). Instance-swap only. Icons of one
  family drawn at two stroke weights: one family, one weight. Which family is the customer's choice
  (Hugeicons is our free default); one per product.
- Illustrations, mascots, glossy 3D, mockups with nothing real inside. Photography only, and only
  documentary; a website's exceptions are listed in §6b. A
  large numeral or ornament that names nothing is decoration too: a figure earns its size only as an
  issue, a year, a version or a step. An animation or illustration file shipped for a mark that a few
  lines of stylesheet would draw is the same fault.
- An image with no alternative text, alternative text that repeats the file name or says "image",
  decoration left visible to assistive technology. The text names what the image is there to show;
  anything decorative carries an empty alt and is hidden.
- An affordance that only hover reveals: a menu, a delete, a count or a fact that lives in a tooltip.
  Hover styling written with no query for pointers that can hover. Everything hover reaches is
  reachable by focus and by tap, and a coarse pointer gets the larger hit area instead.
- Two primary buttons side by side; three or more button colors in one view; a text link standing in
  for a secondary action (a tertiary action is a text-style button). A link inside running text without
  its underline: inline links are always underlined, while a text-style action button may go without one.
- A group of peer filled buttons or chips whose members cannot be found against the page: the label or
  the container's boundary of each reaches 3:1 against the page (the 12% grey fill stays; the label carries
  it).
- Placeholder text used as the label. Inputs without visible labels.
- Toasts for trivial success. Spinners where a skeleton shaped like the content belongs. A
  confirmation in front of something the person can undo: a result already visible on the screen gets
  no message, something reversible simply happens with an Undo toast that stays 8–10s and pauses while
  it is hovered, focused or the tab is hidden, and only the irreversible asks first, by having the person
  type the name of what is going or, as an alternative, hold the button while it fills (about 2s, linear,
  snapping back in about 200ms when let go). Toasts shown together in a pile: each
  new one takes the place of the last.
- Dropdowns that open with no keyboard path. Dialogs without a title or without focus management.
- Disabled buttons as the only validation feedback. A field that complains about its format before the
  person has left it once, or that stops following it afterwards; the rules a new value must meet (a
  username still free, a password's requirements) are live guidance while typing, never an error. Disabled signalled by opacity alone: it is its own
  fill and text step, with the cursor and the announcement to match.
- A text area that cannot grow: `resize: none` on a fixed height, so a long answer scrolls inside a slot. A
  text area grows with its text or can be resized vertically.
- A dark pattern: a paid add-on, data sharing or a mailing list ticked in advance; a total that grows with fees
  on the last step; a refusal worded to shame or drawn faint; urgency or scarcity nobody can back (a timer that
  resets, "12 people are viewing"); leaving harder than joining; a wall in front of content that could be
  shown, a phone's web page blocking its content to push the app, an interstitial on entry or on exit;
  permissions asked at first launch. The honest version of each is in §6f.
- A task with many required fields or parallel choices pushed into a chat; a failed turn that asks its own
  question again; an assistant that passes itself off as a person. Forms and tables do form work, a second
  attempt adds examples or options and a third offers a way out, and an assistant says it is one (§6g).

**Data and charts**
- A chart that misleads or hides: bars that do not start at zero, a bounded measure on a range picked to
  look dramatic, two series told apart by colour alone (a red and a green worst of all), a critical value
  shown only on hover, a title that says what the chart is instead of what it shows. Bars start at zero, a
  bounded measure keeps its whole range (0–100 %), series differ by shape or pattern as well as by colour
  (blue and orange where two hues must carry two states), every critical value is printed, and the title is
  the takeaway in one line.

**Copy**
- "Welcome back", "Get started", "Supercharge", "Unlock", "Seamless", "Effortless", "Oops",
  "Something went wrong" without a next step, sparkles or rocket emoji.
- A heading that names no subject ("Unlock your potential today") — one that would fit any product,
  and therefore describes none.
- Marketing adjectives inside product UI. Exclamation marks.
- A failure that does not say, in this order and in the active voice, what failed, the cause when it is
  known, and the next step as an imperative. Where somebody is already stuck there is no joke and no
  apology.
- "Continue", "Submit", "OK" where the result can be named ("Pay 365 200 UZS", "Show 12 doctors"). A
  label that needs its surroundings to be understood, since assistive technology reads links as a bare
  list; two identical labels leading to two different places. One destination reached by differently
  worded actions on one page ("Contact us", "Let's talk", "Start a project"): one intent, one label. A
  button label that wraps to two lines at desktop width: a label is three words or fewer. An action that
  changes its word along the flow: "Publish" is "Publishing…" while it runs and "Published" when it is
  done, and the last step of a flow names its result, never a bare "Done" or "Continue".
- Straight quotes and apostrophes, three periods for an ellipsis, two hyphens for a dash, a plain space
  between a number and its unit. The real characters, and a non-breaking space before the unit, inside a
  keyboard shortcut (⌘ K) and inside a compound name, so none of them breaks across a line.
- Dates, numbers and currencies formatted by hand, or in a form that reads two ways (6/6); the interface
  language chosen from the visitor's IP. Formats come from the locale (`Intl`), dates are unambiguous ("6
  June"), and the language follows the browser's own list of languages.
- An em dash in interface copy. A comma, colon, full stop or parentheses instead; an en dash stays for
  ranges (9:00–18:00).
- Adjectives where a number exists ("high pressure" instead of "above 130/85 on 6 of 10 days"); data
  described as "fast", "almost" or "nearly" instead of by its real values.
- Text shaped like data with no data behind it: a version or build stamp on a marketing page, a local
  time or weather strip, an issue number, a live counter, a credit for a photographer nobody hired, a tag
  across a photo, a caption built as "LABEL // YEAR" for ornament. Deleted; a tag on an image only where it is the item's real state (sold out, −20 %).
- A line that performs instead of informing: a poetic name on a plain section, a sentence about the page
  or the list itself, a modest-sounding line that says nothing, a metaphor that does not hold; terminal
  metrics, essay prose and slogans on one page. The plain functional name ("Testimonials", "Latest
  writing"), one register, and a line that would be as true on another product's page is cut. Forced triples, false
  ranges ("from the first click to the final invoice"), "not just X, it's Y" and runs of dramatic fragments are
  the same fault on a website, and an assistant's leftovers ("Here's…", "Let me know if…", "I hope this
  helps") never reach interface text.
- A price without its currency, a metric without its unit, a feature text that does not match the
  real product, an invented fact. An unnamed authority ("experts say") is named or removed, and a true number
  that does not serve its section's point is cut as well.
- Rendered text a person was never meant to read: NaN, undefined, null, [object Object], Invalid Date, a raw
  ISO timestamp, an extreme number left unformatted or spilling out of its box; debug toggles, test strings and
  scaffolding shipped to production. Every value is formatted before it renders, and anything for developers
  stays behind a flag.

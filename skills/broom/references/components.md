## 4. Component rules

- **Optical padding**: the box a variant draws changes how much padding *looks* like the same
  padding. An outlined control pads 4px less vertically — the 1px stroke and the space inside it read
  as height — and a ghost or text control pads 4px less horizontally, because there is no box for the
  label to sit inside. Same family of rule as the icon side being 2px tighter than the text side.
- **Button**: one primary per view. Primary = ink fill (monochrome) or accent fill; secondary = a
  **filled** neutral (grey at 12%), never a hairline box or a text link; tertiary = a text-style button
  (no underline needed; a link inside running text keeps its underline); ghost = text only, and only in
  toolbars and headers; danger = a quiet danger tint (12%) with the dark danger text, a solid danger
  fill only inside a confirmation. Label = the body size, semibold; icons inside a button are outlined.
  Busy keeps the width and keeps the label, turned into its progressive verb ("Pay" → "Paying…") beside
  a small indicator; the indicator never replaces the label. Press = scale 0.97, shown the moment the
  pointer or finger goes down; the action fires on release, and moving off the button before release
  cancels it. An irreversible action may use hold-to-confirm (about 2s of linear fill, snapping back in
  about 200ms when let go) instead of typing the name, which stays the default. Radius
  per size (§3.5).
  The preferred option of a set is told by style, never by size: buttons of one set are one size. Neither a
  destructive action nor Cancel is the default that Enter fires. One icon at most, at the start; a chevron
  at the end only on a menu trigger, and an arrow after the label is never a default ornament. A label that
  toggles keeps both versions near one length or reserves the longer one's width. An icon-only button's glyph
  is about half its size: 16 in 32, 20 in 40, 24 in 48. A destructive action never takes the accent fill and
  an affirming one never the danger fill: one role of action, one variant across the product. A critical or
  destructive action carries a printed label; icon-only buttons are for frequent, reversible actions. In a row,
  a destructive action stands apart from the creating ones, at the row's edge or behind a gap one step larger,
  never between them. While busy, a control ignores further presses until its request ends, and repeats
  collapse into one: a double submit sends once, quick toggles send the final state.
- **Input / Textarea / Select**: label above; the field is a borderless `surface.sunken` fill, one step
  darker on hover. Focus adds a 1px `border.focus` and nothing else — no ring, no wash, no glow;
  invalid = a 1px danger border + a message below, never a red background. Height = control md; a text
  area takes its size step's control radius. Placeholder is an example, never the label. A format hint
  goes after the label and before the input, out of reach of autofill suggestions and the on-screen keyboard,
  and a label ends without a colon. A text area grows with its text or resizes vertically.
- **Checkbox / Radio / Switch**: 16–24px control with a 40px hit area, label clickable, focus ring
  on the control. Unchecked is a 1.5px stroke (an element with no fill of its own); checked = an accent
  fill (ink for monochrome). Checkbox radius 4 / 6 / 8 at 16 / 20 / 24; radio and switch are circles.
  The label and the control are one hit area, with no dead gap between them. A switch applies at once, so
  it never sits in a form with a Save button (a checkbox does); it is on or off, never two opposite options,
  and its label says what is on, with no On or Off printed in the track. A parent checkbox shows the mixed
  state when its children differ, and "select all" selects all. Radios come two to five, stacked, one chosen
  in advance, with an explicit "None" where declining is allowed; more options are a select, and a single
  on/off is a checkbox, never a lone radio. The check and the indeterminate dash are one drawing at one
  stroke weight. A checked box always means yes: a choice never hides a double negative.
- **Slider / stepper**: a slider's minimum is at the left or the bottom; it applies while it is dragged; its
  value is visible (a label or a linked field), and a wide range gets a number field beside it; tick labels
  only at the ends; the track's ends hold 3:1; arrows, Page Up / Page Down, Home and End move it. A stepper
  sits beside the value it changes and, on a wide range, accepts typing.
- **Chip**: never the next or the main action, and never alone; a label of 20 characters at most; filter
  chips are nouns and take a check when selected; one selection mode on a page; past two rows the set
  scrolls or folds behind "Show all"; a set carries a second sign that it can be pressed (a label above
  it, a 3:1 stroke on a chip with no fill, or icons).
- **Card**: one fill against the tone behind it, radius = surface, padding 12–16 on a phone and 16–24 on
  the web, no border and no shadow at rest (§2.0). An interactive card may gain `shadow.md` on hover —
  the one allowed second technique — and scales to 0.97 on press. Nesting inverts; never a card in a
  card of the same tone. Inner tiles and images take `surface − padding`.
- **Badge (label)**: the body family in sentence case, tracked like the body, 20/24/28 tall with the
  radius of its height (§3.5), a 12% tint of its family with the family's dark text, optional icon;
  never mono, never uppercase, never a saturated fill. Status = word + colour + icon, or a dot.
- **Alert**: one fill (`surface.sunken`, or a semantic tint at 8–12%), the semantic color in the title
  and the icon, never as a bar down the left edge and never a fill with a border around it; title +
  one sentence, optional action. Not a toast.
- **Toast**: bottom corner, 16px from the window's edges, two lines at most and one action at most, 288–568px
  wide on a desktop. Toasts never stack: each new one takes the place of the last. A plain one dismisses
  itself after 5s; one carrying Undo stays 8–10s and pauses
  while it is hovered, while it or its action has focus, and while the tab is hidden. A result that a toast
  reports also shows at its trigger ("Save" becomes "Saved"). Enters from below 8px, exits shorter.
- **Dialog**: width by content (sm 448 / md 576 / lg 768), title + one sentence + body + actions
  right-aligned with the primary last. Destructive confirmations use the danger fill and open
  with focus on the least destructive action. Focus is trapped; Escape closes; the backdrop is black at 40 %
  in light and 60 % in dark, never the theme's ink, which is near-white in dark. A dialog is for a decision that blocks; anything only
  informational is inline or a toast. Its title is the specific question ("Delete 3 invoices?"), never "Are
  you sure?", and its text says the consequence and whether it can be undone. The confirming button repeats
  the title's verb and object ("Delete 3 invoices"), never "Yes", "OK" or "Confirm". Two actions at most (an alert
  three, of one or two words each), no "Learn more" that leads out of it, Cancel never disabled, and a
  required alert does not close on a backdrop click. A dialog stands 70–80 % of the viewport's height at most,
  and opening one never scrolls the page under it; a long dialog scrolls its body only: the title and the
  actions stay put and the page under it is locked. Closing one that holds typed input (Escape, the
  backdrop, a swipe) asks and offers to keep it; an untouched one closes silently; leaving a page with unsaved
  work asks too. Done pairs with Cancel (Back on later steps), and the three never appear together.
- **Sheet**: side panel for editing in context, 400–480px, same header pattern as dialog. A side sheet has a
  visible close button; a non-modal one pushes the content aside instead of covering it (web app).
- **Tabs**: navigation = text tabs with a 2px current indicator in ink (accent only when the product's
  accent is ink). Filtering = a segmented control: a grey track with a floating white thumb (the thumb
  takes `shadow.sm`, its radius is the track's minus the inset) or pill chips carrying counts; the thumb is
  the selection's second channel, and in a segmented control of icons the selected icon is filled. Tabs hold
  parallel content, never the steps of a task; four to six fit fixed, more scroll with the last one cut at
  the edge, and they never loop. A tab or a segment shows the new selection the moment it is clicked, even
  while its content is still loading. With the keyboard, arrows switch tabs at once where the panels draw
  instantly; where switching is costly, arrows move focus and Enter or Space activates (web app).
- **Table**: hairline rules between rows — dividers, not a box around the table — header in the body
  family, sentence case, muted, medium weight; numbers right-aligned with tabular figures, row hover =
  `surface.sunken`, selected = accent wash. Sticky header on long tables. On a narrow screen a table scrolls
  inside its own frame with the first column pinned, or turns into a stack of label–value cards; its columns
  are never squeezed. A sortable table sorts on a click of a column header, reverses on a second click, and
  shows the direction on the header it sorts by; rows stay parted by hairlines, never by alternating fills.
  A table opens with the columns its decision needs (about six), the deciding one early and the rest in a
  column picker, never the stock name, status, date and actions. A routine status is plain text, and a tint or
  a badge marks only a state that needs attention (web app). A column of numbers keeps one precision and one
  format.
- **Dropdown / listbox / popover**: it floats, so the shadow is the whole edge in light and a lighter
  fill in dark: `surface.raised`, `shadow.md`, no border, no ring. Its radius is the radius of the control
  that opened it (`menu`); its rows take `item` = menu − 4. Items 32–36px on the web, 44 on a phone;
  keyboard: arrows, Home/End, type ahead, Escape. The selected row shows a check **at the end of the
  row**, never a coloured background. It sits on the trigger's edge with a 4px gap and turns to stay on
  screen; a submenu opens beside it without overlapping, with a safe zone for the pointer, one level deep and
  about five items long, and exists only when one word repeats in three or more items (`Sort by`). Icons on
  every item of a group or on none; the frequent first, at most three groups in a context menu, the
  destructive last. One item, one action: a single choice closes the menu, a multiple one does not; a
  toggled item changes its label ("Show map", "Hide map") or carries a check, and a set of attributes ends in
  "Reset all". Everything in a context menu is also somewhere in the visible interface; things of one kind
  all have a context menu or none do, and with a mouse the right click opens the same list as "More".
  Menus and dropdowns open on a click, never on hover; its list is at least as wide as the control that opens it, about
  320px at most, and scrolls after about eight items. A keyboard shortcut sits at the row's end, muted, in the
  platform's notation (web app).
- **Tooltip**: 200ms delay, 12–13px, ink surface with paper text (inverted), radius `item`, max 240px,
  no arrow. One line, only on an element with no visible text, and never holding what the person needs; 4px
  from a trigger that has an edge, 8px from bare text, never covering the trigger; one at a time, and once
  one is open its neighbours open at once, with no delay and no animation (web app). It hides
  the moment the pointer leaves, and in a group one tooltip moves between triggers instead of a second
  appearing (web app). It starts with a verb,
  runs 60–75 characters at most and has no full stop. With a pointer, every icon-only button gets one on
  hover and on focus naming its action; a control whose label is visible gets none.
- **Skeleton**: shaped like the content it replaces, one pulse, neutral 8% ink. Never for what is already
  cached: the cache shows at once and updates in place. No spinner inside a
  page body. It carries `aria-busy` and a name ("Loading invoices"); a progress indicator is a `progressbar`
  with a name.
- **Empty state**: one statement, one sentence, one action. No illustration by default. It never holds
  anything the person will need later: it goes away once there is content. It is written for its cause:
  the first time, what the space is for and the first action; filtered to nothing, which filter or query did
  it, a way to clear it and a spelling hint; all done, a calm line with no action; no access, who can grant
  it. Never "No data"; an empty collection replaces its table, with no column headers over nothing.
- **Navigation**: its form follows the job (§6b), never a sidebar by default. Current item = ink text and
  a subtle background, never an accent fill. Icons only when every item has one. A tab bar, a rail or a
  drawer shows each place with its glyph and a printed name (a word or two, shown whole); the
  current one's icon is filled (or one weight heavier) while the rest keep the family's regular style. Only navigation keeps a
  standing "current" mark, one per set; an action button never stays lit after it runs, and a real toggle
  declares `aria-pressed`. Labels name what is behind them ("Invoices"), never an umbrella ("Home",
  "Overview"). Breadcrumbs appear from the third level down; the last one is the current page as text with
  `aria-current`, never a link, and the middle folds on a narrow screen (web).
- **Search**: one place in the product; the placeholder names its scope ("Search invoices"); results come
  while typing; recent searches show before typing and can be cleared; the clear button appears only when
  there is text; the query stays visible above its results; on a phone search sits at the bottom, and a
  field that filters a list sits above that list. Suggestions come after two or three characters, within
  about 300ms, five to eight of them, the match highlighted, arrows working, the product's own sections among
  them. Results name their count with the query ("142 results for …") and highlight the match in each title;
  applied filters are chips that remove themselves, with "Clear all" from two.
- **Carousel** (phones and websites): on a vertical page it has "Show all", no arrows laid over its items,
  announces the position, holds at most three items with text on a compact screen, and snaps. Page dots sit
  centred at the bottom, about ten at most, and are not coloured. A slide out of view is inert: out of the
  Tab order and hidden from assistive technology.
- **Filters**: a filter panel shows the four or five used most; the rest wait behind one "More filters" (web).
- **Feed**: an endless list has an end or a "Load more" and never puts the footer out of reach; it loads the
  next batch ahead of time and keeps focus where it was.
- **Avatar**: one size in one context (32 in a list, 48 on a card, 96 on a profile).
- **Live indicator**: a live or recording mark is one dot, with no glow and no endless pulse.

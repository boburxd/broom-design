## 6b. By product type

**Navigation** (every product type) follows the job, never a sidebar by default: a few peer destinations
are a top bar or tabs; many destinations, or objects the person switches between all day, earn a sidebar;
on a phone, a tab bar of three to five places. By width: a bottom bar under 600px, a rail or a sidebar from
840px; never two primary navigations on one screen, and no bottom bar on a desktop. A sidebar is at most two
levels deep (a deeper level becomes a list column), it is not hidden by default, and whatever is hidden to give
focus (bars, the sidebar) comes back with one familiar action; panes keep minimum sizes. A web app's sidebar
runs about 240–280px while it serves the content and about 360px when it is an equal pane, fixed to the
window's edge with square outer corners, never a floating rounded shell. Web: a page's title matches the link
that led to it, the logo leads home, global and local navigation are separate components, and the utilities
(account, notifications, settings, help) sit as a quiet group at the end of the top bar; a large product
reaches every page two ways, by navigation and by search.

**Web app**:
- A screen starts with the work: no hero band, slogan or welcome above it, and no right-hand "Today" or
  "Recent" column by default.
- In a row of panels a short one never ends on an empty strip: its inner child takes what remains
  (`auto minmax(0, 1fr)`).
- A detail page links to the objects it relates to instead of embedding each one whole.

**Mobile app** (the studio's four phone products agree on all of this):
- The page is white; cards are one grey step below it, radius 24, padding 12–16; rows 56–60 tall sit at
  gap 0 inside one clipped r24 group, separated by the background, not by lines.
- Controls 36 / 44 / 52 with 44 the default; the bottom call to action is 52 tall, full width, 32 from
  the left, right and bottom screen edges and 16 below the content, standing on the platform's
  progressive blur — never on a plate, a bar or a page-colour fade.
- A bottom sheet has a 36×4 grabber, a 76 header and a 38 top radius. A map object's details go in a
  sheet over the map; a flow step or a result is a full screen; a picker is a sheet; a confirmation is
  an overlay. A modal bottom sheet opens at half the screen's height or less, its grabber is a focusable
  button, and on a wide screen it becomes a side sheet or a dialog. A choice after a deliberate action
  (closing a draft: delete, save, cancel) is an action sheet, the destructive option first and Cancel last. On Android a destructive confirmation
  is a dialog, never an action sheet. A long press takes about 500ms, and a longer hold shows its progress.
- Close is ✕ and Done is ✓. Up to four comparable options are radio cards with the nearest preselected;
  peers (cards, plans, devices) are a swipe row ending in a dashed "add" tile; each filter is a chip
  carrying its current value. At most three metric cards in a row.
- Bars under Liquid Glass are a translucent fill with a blur — the one pair §2.0 allows. Glass belongs to
  the functional layer only; a content control turns to glass only while it is being dragged (a slider's
  thumb).
- A phone product stands apart through colour, type and imagery; its layout and navigation follow the
  platform's conventions, but the navigation is restyled in the product's own look, never left as the kit
  drew it.
- The top bar holds at most two actions (four on a wide screen), one of them filled, and a small bar's title
  never wraps. A bar that hides while scrolling down comes back on any scroll up, and never hides while a
  screen reader runs.
- An (i) button only shows details; going deeper is a row with a chevron. On iOS a switch lives in a list
  row; outside a list it is a toggle button.
- On an Android target a FAB is one a screen, for the one creative primary action, never on a card, at the
  bottom right on a compact screen and at the top of the rail on a wide one, and it stays put while the
  content scrolls.
- The system back gesture is never intercepted: no carousel and no drawer at the left edge. The orientation
  is not locked without a reason. The keyboard never covers the focused field or the form's primary action.
- Besides empty, loading and error, a phone screen has a no-network and a no-permission state, each with a
  way forward. Pull to refresh never replaces refreshing on its own, and its label says when the data was
  last updated.
- Notifications: marketing only after an explicit yes; none repeated; no personal data in the text; a title
  of about 29 characters and a body of 40 to 80; one or two actions.
- Safe areas: fills and images may run under the status bar, the home indicator and the gesture edges;
  no control, label or number does. Bars and bottom actions add the platform's inset
  (`env(safe-area-inset-*)`, `SafeAreaView`, `.safeAreaInset`) to their own padding.
- The tab bar holds three to five places the person comes back to, never an action, each shown with its glyph and
  a printed name; a create, scan or pay is the screen's primary button or a sheet. It shows on every section's screens, only a modal may
  cover it, and its tabs are never hidden or disabled.
- A screen is an app screen — a title bar, one content region (a list, a grid, a map or a form), a tab
  bar or one bottom action — never a scrolling web page with a headline block, stacked sections and a
  footer.
- One platform's idiom per product: no FAB under an iOS large title, no drawer beside a tab bar.

**Website** (the studio's sites, filtered through §2.0 and §1.10):
- Controls 40 / 48 / 56; fields tall with 16–18px text; body 16–17. The page's main heading is at least
  2.5 times the body size, and a hero's display may run 4 to 6 times; a high-contrast hairline serif (Cormorant and its kind) only from 40px.
- The hero opens with the most characteristic thing in the product's own world. A big number over a small
  caption, a row of stats and a gradient is the stock hero, not a choice. Its headline is one claim of three
  to seven words, and a label above the H1 says what the heading does not, never a pill with a dot repeating
  the category.
- Build pages from surfaces, cards and real photographs; a page of hairlines and text reads as a draft.
  Three or more items of one kind are a card grid, not full-width rows.
- The accent is a mark with a written list of places — a dot, a short bar, a line, the text selection —
  never a large resting fill. A full-width coloured band or a hero ground keeps OKLCH chroma at 0.04 or
  below; controls keep the accent at its own chroma. Status is a dot, never a stripe.
- Headings say literally what is offered (the service and the place); no slogans, no numbered sections,
  no invented numbers, clients or years.
- Images keep the artwork's ratio, one cover one ratio; a bad crop is never hidden by a blur, a fade or a
  mask; logos in their own colours at equal optical area, without frames.
- Readable content never runs in a marquee; a carousel steps one item at a time and always swipes (§4).
- Pages print: the chrome is hidden, ink on white, text at 12pt or more, and every link shows its address. A document view inside a
  web app prints the same way.
- One conversion point per page; no call to action on every card; empty sections are not rendered; the
  sticky header is the page tone (or that tone translucent with a blur) with no border under it. A section that
  repeats an earlier one or does nothing for the page's job is removed; one action is one control on a
  screen, repeated once at most after the first has left the view.
- Each section composition appears at most once a page; a page of about eight sections uses at least four
  shapes, and never three image-and-text splits in a row. Sections are parted one way, by tone, by a line or by
  space, and a background that alternates every other section is not variety. On a phone section padding is
  about half the desktop's (96–128 becomes 48–64).
- The header is 64–72px tall, never over 80. From 1024 its main sections are visible links on one line, six
  or seven at most; a menu button appears only below 1024, and there it says "Menu", or the main sections stay
  in view while the secondary ones fold. A sticky header shrinks or hides while scrolling down.
- A testimonial runs at most three lines, attributed by name, role and organisation.
- A marketing page shows the three to five items that matter and links to the rest; a 20-row table
  belongs on the page it links to.
- A marketing page runs: hero, the proof or the product shown working, what it does (one feature at a
  time, never the icon trio), how it works, proof, price, questions, the one call to action. Proof
  sections exist only with real proof: logos, quotes with name, role and company, numbers with a source.
  Nothing is invented to fill one. "How it works" has as many steps as it really takes, never three forced
  ones under round numbered icons; the questions are ones its people really ask, and with none known there is
  no FAQ; prices list the plans really sold, about three at most of three to five lines each, the rest in a
  comparison table, one highlighted only with its reason named; the footer holds the links the site really has,
  never four stock half-empty columns. A page that asks for a sign-up or a payment links to terms and privacy
  pages that exist; a product never shown working says plainly that it is not out yet, and no section says
  "coming soon".
- SEO basics: one H1, headings that describe their section in order with no level skipped, a meta title
  and description written for the page, alt text on every image that means something. Structured data
  describes only what is on the page (no invented ratings, reviews, prices or company facts), and `hreflang`
  points only to pages that exist.
- The share card is designed like any other surface: every page has its own title (never the framework's
  default, never another page's), a description, a preview image made for sharing, a canonical address and
  the product's own icon. A link pasted into a chat is often the first screen anybody sees. The title,
  description, canonical and `og:url` agree (`og:url` is the canonical); share images use absolute addresses and
  the large summary card, each tag written once from one place. Page titles share one format, the most specific
  part first ("Billing · Settings · Product"). Previews and staging are `noindex`, and the robots directives
  match who the page is for.
- A page of text alone is not finished: it has at least one real visual. Imagery uses at least two
  different crops (a wide scene and a close detail, say); a device mockup only ever holds a real
  screenshot. The images of one page share one treatment: palette, light and crop.
- What a website may do that a product may not, each with its guardrail: an atmosphere behind content
  (grain, noise, fog, duotone, a mesh), never on a control, at most two layers of it in one section, a texture (grain, noise, a pattern) at 8 %
  opacity or less, text over it held at its floor by a scrim and
  measured at its worst spot, never on average, and an atmosphere that moves takes 10s or
  longer for a cycle (never a sway near five seconds), stays translucent while it moves and stands still
  under reduced motion;
  background photographs in sections, under the same scrim rule; a cinematic hero (full-bleed media, a
  scrim, the headline, up to two actions) taking most of the first viewport while the next section's top
  edge stays visible; stickers, orbits and illustrations in onboarding; one large numeral as the page's
  motif; emoji in the copy of a playful brief, never as icons in controls. Motion may add a first load that
  arrives in meaningful chunks (the heading, the text, the actions) about 100ms apart, while a list inside keeps
  its 40ms stagger; scroll reveals on the first two or three sections at most (once each, 800ms at most);
  parallax on decorative layers only, never on text or on anything read or pressed; springs, small loops,
  staggered lists and smooth scrolling to an anchor. The wheel and touch are never captured or chopped into
  sections, and a pinned section that scrubs can be scrolled past at any point. Under reduced motion each becomes a short fade or stands still
  (parallax, loops and smooth scroll stop), and the keyboard, anchors and find-in-page keep working.

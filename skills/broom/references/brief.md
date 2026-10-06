# The brief

The questions that set a new product's design, in the order to ask them: the ones that change the result most come first. Each answer is the id in backticks; the line after it says what the choice means.

Ask every question with its choices. Besides them, each also takes "Decide for me" (the default named under it stands) and "Show me options" (every choice with its line, then the question again). A question that what the person already gave you answers (a document, the repository, their brand) is not asked: show the answer you took and where it came from. The name, the description and the audience are free text: draft them from what you know and let the person correct them.

## 1. What are you building? `productType`

Default: `web-app`.

- **Web app** `web-app`: A tool people use for hours. Dense, keyboard-friendly, 14px base.
- **Mobile app** `mobile-app`: Thumb-sized targets, 16px base, one column, generous tap areas.
- **Website** `website`: Reading and persuasion. Larger type, longer measure, more air.

## 2. What is it called? `name`

Free text: the product's name, a word or two.

## 3. What does it do? `description`

Free text: a sentence or two, in the person's words.

## 4. Who is it for? `audience`

Free text: the people who use it, and what they are doing when they do.

## 5. Which code should the components be written in? `stacks`

One or more, from the product type's own list; the first is the main one.

**Web app**, default `react-tailwind`:

- **React + Tailwind** `react-tailwind`: Tokens, Tailwind config, React components, docs, rules.
- **Next.js + Tailwind** `nextjs-tailwind`: Same output as React + Tailwind, App Router idioms in docs.
- **Vue** `vue`: Tokens, Vue 3.5 components, docs, rules.
- **Svelte** `svelte`: Tokens, Svelte 5 components, docs, rules.
- **HTML + CSS** `html-css`: CSS variables, docs, rules. No framework components.

**Mobile app**, default `react-native`:

- **SwiftUI** `swiftui`: Native iOS. Tokens as Swift, docs, rules. Components: specs only.
- **Jetpack Compose** `android-compose`: Native Android. Tokens as Kotlin, docs, rules. Components: specs only.
- **Flutter** `flutter`: Multiplatform. Tokens as Dart, docs, rules. Components: specs only.
- **React Native** `react-native`: Multiplatform. Tokens, React Native components, docs, rules.

**Website**, default `nextjs-tailwind`:

- **Next.js + Tailwind** `nextjs-tailwind`: Same output as React + Tailwind, App Router idioms in docs.
- **HTML + CSS** `html-css`: CSS variables, docs, rules. No framework components.
- **React + Tailwind** `react-tailwind`: Tokens, Tailwind config, React components, docs, rules.
- **Vue** `vue`: Tokens, Vue 3.5 components, docs, rules.
- **Svelte** `svelte`: Tokens, Svelte 5 components, docs, rules.

## 6. Which greys? `colorMood`

Default: `neutral`.

- **Warm** `warm`: Ivory paper and warm greys, as in Anthropic's Claude.
- **Neutral** `neutral`: Pure greys with no tint, on Apple's lightness steps.
- **Cool** `cool`: Blue-grey steps with a clear edge between surfaces.

## 7. Which accent colour? `accent`

A hex: one of these, or the brand's own. Default: the greys' own accent (warm #ff8d28, neutral #0088ff, cool #0088ff).

- **Ink** `#1c1d20`: Monochrome; the text colour is the accent.
- **Red** `#ff383c`: iOS Red, #ff4245 in dark.
- **Orange** `#ff8d28`: iOS Orange, #ff9230 in dark.
- **Yellow** `#ffcc00`: iOS Yellow, #ffd600 in dark.
- **Green** `#34c759`: iOS Green, #30d158 in dark.
- **Mint** `#00c8b3`: iOS Mint, #00dac3 in dark.
- **Teal** `#00c3d0`: iOS Teal, #00d2e0 in dark.
- **Cyan** `#00c0e8`: iOS Cyan, #3cd3fe in dark.
- **Blue** `#0088ff`: iOS Blue, #0091ff in dark.
- **Indigo** `#6155f5`: iOS Indigo, #6d7cff in dark.
- **Purple** `#cb30e0`: iOS Purple, #db34f2 in dark.
- **Pink** `#ff2d55`: iOS Pink, #ff375f in dark.
- **Brown** `#ac7f5e`: iOS Brown, #b78a66 in dark.

## 8. Which type? `typePairing`

Default: `grotesk`.

- **Grotesk** `grotesk`: Inter for everything, tracked −1%. The default. Display Inter, body Inter, mono Geist Mono.
- **Humanist** `humanist`: Readable and friendly; the quiet professional choice. Display Source Sans 3, body Source Sans 3, mono Source Code Pro.
- **Geometric** `geometric`: Even strokes and round forms. Modern without being cold. Display Albert Sans, body Albert Sans, mono JetBrains Mono.
- **Swiss** `swiss`: Rational grotesque with a dense, no-nonsense texture. Display Archivo, body Archivo, mono IBM Plex Mono.
- **Editorial serif** `editorial-serif`: A serif for display, a sans for every control. Display Newsreader, body Source Sans 3, mono Source Code Pro.
- **Mono tech** `mono-tech`: Monospace display and data, a plain sans for reading. Display IBM Plex Mono, body IBM Plex Sans, mono IBM Plex Mono.
- **Geist** `geist`: A crisp modern grotesk with its own mono. Technical, calm. Display Geist, body Geist, mono Geist Mono.
- **Outfit** `outfit`: Round geometric letters. Friendly, consumer, confident. Display Outfit, body Outfit, mono Geist Mono.
- **Garamond** `garamond`: A book serif for headings over a clean sans. Literary, calm. Display EB Garamond, body Geist, mono Geist Mono.
- **Cormorant** `cormorant`: A tall, fine display serif over Inter. Luxury and heritage. Display Cormorant Garamond, body Inter, mono Geist Mono.
- **Playfair** `playfair`: High-contrast display serif over a plain sans. Magazine covers. Display Playfair Display, body Source Sans 3, mono Source Code Pro.

## 9. Which corners? `radius`

Default: `soft`.

- **Sharp** `sharp`: 2px corners on every control. Reads technical.
- **Soft** `soft`: Radius grows with height: 8, 10, 12px. The safe default.
- **Round** `round`: Controls rounded to half their height. Friendly, consumer.

## 10. How much motion? `motion`

Default: `minimal`.

- **None** `none`: State changes are instant. Nothing moves.
- **Minimal** `minimal`: Short transitions that explain state. The default for tools.
- **Expressive** `expressive`: Longer enters, small staggers. For consumer and editorial work.

## 11. Which kind of product is it closest to? `category`

Optional, from the product type's own list. It decides which words the copy uses, so a clinical tool never says "items".

**Web app**:

- **Analytics & BI** `analytics`: Its words: report, metric, segment, dashboard, query.
- **CRM & sales** `crm`: Its words: deal, contact, pipeline, account, activity.
- **Project & task work** `project`: Its words: task, project, sprint, assignee, milestone.
- **Finance & accounting** `finance`: Its words: invoice, payment, ledger, balance, transaction.
- **Developer tools** `devtools`: Its words: build, deployment, log, environment, run.
- **Support & helpdesk** `support`: Its words: ticket, conversation, queue, reply, customer.
- **HR & people** `hr`: Its words: candidate, employee, review, request, role.
- **Commerce back office** `commerce-admin`: Its words: order, product, stock, shipment, refund.
- **Clinical & health** `clinical`: Its words: patient, visit, record, appointment, prescription.
- **Education & LMS** `education`: Its words: course, lesson, student, assignment, grade.
- **Content & CMS** `content`: Its words: article, draft, collection, asset, revision.
- **Logistics & operations** `operations`: Its words: route, shipment, shift, vehicle, warehouse.

**Mobile app**:

- **Banking & payments** `banking`: Its words: account, transfer, card, balance, transaction.
- **Health & fitness** `health`: Its words: workout, streak, session, goal, progress.
- **Social & messaging** `social`: Its words: message, post, profile, group, reply.
- **Media & streaming** `media`: Its words: track, episode, playlist, library, queue.
- **Travel & mobility** `travel`: Its words: trip, ride, booking, stop, route.
- **Shopping & delivery** `shopping`: Its words: order, cart, item, delivery, store.
- **Productivity & notes** `productivity`: Its words: task, note, reminder, list, event.
- **Learning & education** `learning`: Its words: lesson, streak, exercise, level, review.
- **Utilities & tools** `utility`: Its words: scan, entry, preset, history, device.
- **Field & operations** `field`: Its words: job, checklist, site, vehicle, shift.

**Website**:

- **Product & SaaS site** `product`: Its words: plan, feature, customer, trial, integration.
- **Documentation** `docs`: Its words: guide, reference, example, version, endpoint.
- **Publication & blog** `publication`: Its words: article, issue, author, topic, archive.
- **Portfolio** `portfolio`: Its words: project, case, client, role, year.
- **Online store** `store`: Its words: product, cart, size, order, collection.
- **Agency & studio** `agency`: Its words: service, client, case, team, enquiry.
- **Event & conference** `event`: Its words: talk, speaker, ticket, session, venue.
- **Non-profit & public** `nonprofit`: Its words: programme, donation, report, volunteer, impact.
- **Personal & landing** `personal`: Its words: work, writing, contact, talk, note.

## 12. Which icon library? `iconLibrary`

Default: `hugeicons`.

- **Hugeicons** `hugeicons`: Thousands of free, rounded line icons. The default.
- **Lucide** `lucide`: Clean, even line icons, popular in React and Vue projects.
- **Phosphor** `phosphor`: A large, flexible family with several weights.
- **Tabler** `tabler`: Crisp line icons on a 24px grid, a very large set.
- **Heroicons** `heroicons`: A compact set from the makers of Tailwind CSS.
- **Material Symbols** `material-symbols`: Google's icons, at home on Android.
- **SF Symbols** `sf-symbols`: Apple's system icons, for iPhone and iPad apps.
- **Our own icons** `own`: You bring the icons. The components take them as props.

## 13. Any texture behind the big sections? `atmosphere`

Websites only. Any number of them, or none (the default).

- **Grain** `grain`: A faint film grain over the background, like printed paper.
- **Noise** `noise`: A finer digital noise that takes the flatness off large areas.
- **Fog** `fog`: Soft, blurred light in the page's own tone, behind the content.
- **Duotone** `duotone`: Photos redrawn in two of your colours, so they match the page.
- **Mesh** `mesh`: Large, soft colour fields blended from your accent and brand colours.

## 14. Anything you never want to see? `avoid`

Free text in the person's words, and any of these. Each picked one adds its rule to the design.

**Color**:

- **Purple gradients** `gradient-accent`: A blue-to-purple gradient hero and gradient buttons. Rule: No gradients: no purple or indigo gradient backgrounds, buttons, or text.
- **Accent on everything** `accent-everywhere`: Every icon, heading, and border in the brand color. Rule: The accent marks one primary action per screen and selection; never every icon, heading, or border.
- **Rainbow badges** `rainbow-status`: Six pastel badge colors in one table. Rule: Status colors are semantic only (success, warning, danger); no rainbow badge palettes.
- **Neon glows on dark** `dark-glow`: Dark background, glowing cyan borders and blurred color blobs. Rule: No glow effects, blurred color blobs, or neon borders.

**Type**:

- **Three typefaces** `three-fonts`: A display serif, a rounded sans, and a script in one screen. Rule: Two type families at most; the mono family carries data and labels.
- **Hero type in a tool** `hero-type`: A 56px slogan above a data table. Rule: No hero headings inside the product: screens start with the task, not a slogan.
- **Everything centered** `centered-text`: Centered paragraphs, centered forms, centered tables. Rule: Left-align text in the product; center only single-line dialog titles.
- **Thin gray paragraphs** `thin-gray-text`: Light-weight light-gray body text on white. Rule: Body text meets the contrast floor at regular weight; no thin gray paragraphs.

**Layout**:

- **Card with a shadow around everything** `card-shadow-everywhere`: Every section is a white card with a drop shadow, cards inside cards. Rule: Surfaces separate with hairlines or background shifts; shadows only on overlays.
- **Stat tiles** `stat-tiles`: A row of four KPI tiles with big numbers and trend arrows. Rule: No KPI tile rows; numbers live in tables and lists with their context.
- **Icon in every heading** `icon-in-every-heading`: A colored icon glued to each section title. Rule: Headings are text; icons only where they carry meaning (status, actions).
- **Bento grid** `bento-grid`: Unequal rounded boxes tiled like a lunch box. Rule: No decorative bento layouts; one grid, one rhythm.

**Components**:

- **Icon-only buttons** `icon-only-buttons`: A toolbar of unlabeled icons. Rule: Every button has a visible label; an icon-only control needs a tooltip and an accessible name.
- **A modal for every action** `modal-for-everything`: A dialog to confirm a rename. Rule: Confirm inline or with undo; modals only for destructive, irreversible steps.
- **Toasts for every action** `toast-spam`: Three stacked toasts after one click. Rule: Toasts only for background results; a visible state change needs no toast.
- **Spinners and orbs** `spinners`: A centered spinner where content should be. Rule: Loading is a step list or a skeleton in place, never a spinner or an orb.
- **Mascots and stickers** `mascots`: A smiling blob illustration and emoji in labels. Rule: No mascots, decorative illustrations, or emoji anywhere in the product.
- **Empty states with artwork** `empty-state-art`: A big illustration and a slogan where the list is empty. Rule: Empty states are one sentence and the one action, without artwork.

**Motion**:

- **Confetti** `confetti`: Confetti after saving a form. Rule: No confetti, celebrations, or fireworks.
- **Bouncy motion** `bouncy-motion`: Cards that overshoot and wobble into place. Rule: Ease-out only, under 250ms; nothing bounces or overshoots.
- **Scroll reveals** `scroll-reveals`: Sections fading in as you scroll. Rule: Content does not fade in on scroll inside the product.

**Copy**:

- **Marketing copy in the product** `marketing-copy`: “Supercharge your workflow!” above a settings form. Rule: Product copy names the task and the result; no slogans, no exclamation marks.
- **Submit / OK / Continue** `vague-buttons`: A form that ends with a lone “Submit”. Rule: Buttons name the result with the amount or unit (e.g. Send 3 invoices), never Submit or OK.
- **Placeholder numbers** `lorem-numbers`: $12,345 and 99+ on every example. Rule: Examples use specific, plausible numbers from the domain; never $12,345 or 99+.

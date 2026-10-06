## 1. Principles

1. **One voice.** One type family carries the interface; a monospace family is allowed for code and
   nothing else — numbers take the Tabular style (the body family, medium, tabular figures), labels and
   badges the body family in sentence case. Hierarchy comes from size, weight, and space, never from
   adding fonts. Display sizes get tighter tracking (−0.01em to −0.03em). A family tuned for it
   may carry the same −0.01em down to 11px — Inter does, and the studio's own system tracks every
   step that way — but a family that was not tuned for it keeps small sizes at 0. On an iOS target the
   system face tracks by size the way its makers publish it: positive below 12pt, negative from 13 to
   23pt, positive again from 24pt. Negative tracking never reaches CJK glyphs (§6e.132).
2. **One accent, and at most two more brand colours.** The accent marks the primary action, focus, and
   selection. A brand may name up to two more colours, each with one written job (a highlight, an
   illustration), set at least 60° of OKLCH hue or 0.3 of lightness away from the accent and from each
   other, and never three competing on one control; nothing else is saturated. The accent covers 5 % of a
   screen's area or less.
   Semantic colors (danger, success, warning) are signals, not decoration, and are never used as
   fills for large areas. If a screen has more than one accent-colored element competing for the
   eye, the hierarchy is broken.
3. **Ink and paper.** Neutrals do the work. A slightly tinted neutral scale (warm or cool, following
   the color mood) reads as designed; pure #808080 grays read as unfinished. Text is ink, not gray:
   body text sits at ≥ 4.5:1 (AA) or ≥ 7:1 (AAA), and "muted" text holds 4.5:1 on every surface.
4. **Space is structure.** A 4px base with a fixed scale (4, 8, 12, 16, 24, 32, 48, 64, 96). Related
   things sit closer together than unrelated things — proximity first, then a fill, and elevation only
   for what floats. A hairline is a divider inside an element, never decoration; a page built from
   hairlines and text alone reads as a draft. Equal spacing between unrelated groups is the most common
   tell of generated UI.
5. **One separation technique, colour first.** An element is lifted off its background by a fill, a
   stroke, or an effect — one of them (see §2.0). Colour is the default and the priority: a surface tone
   against the page tone. In a product that already exists, its own technique wins: cards on the page's
   own colour, set apart by one consistent stroke, keep that stroke. Two pairs are allowed and no others: a translucent fill with a backdrop blur
   (bars, sheets, floating controls over moving content), and a hover that adds one more technique,
   preferably a shadow. Elevation means "temporarily above arbitrary content": menus, popovers, dialogs,
   sheets, toasts. A 1px stroke is for dividers between siblings, for elements with no fill of their own
   (an unchecked box, a dashed "add" tile) and for states. Cards group repeated objects; they do not
   decorate a section of prose.
6. **Motion explains.** Every animation answers "where did this come from" or "where did it go".
   Enter: 160–260ms ease-out, travelling by how often it is seen: 4px for a change in place, 8px for a
   slide, 12px for text that expands, and past about 40px only for a panel or a drawer. Duration follows
   how much moves: a control 300ms at most, a sheet or a drawer 300–400ms, a full-screen change up to
   450ms. A reversible single movement (a tab indicator, a sideways slide, an accordion, an icon or a word
   swapping) runs one duration and one curve both ways; only an opening and its closing differ, the close
   shorter and travelling less (a dropdown 250 → 150ms, a panel 400 → 350ms, about two thirds for anything
   small). An element leaving for good accelerates (ease-in), and one retracing its own entrance (a sheet
   sliding back where it came from) eases out.
   Interactive state changes use transitions (interruptible), not keyframes. No bounce, no
   overshoot (the one exception is the settle at the end of a gesture thrown with momentum, §6e), no infinite decorative animation in a web app or on a phone; a website may add the motion
   §6b allows it. `prefers-reduced-motion` replaces motion rather than removing it: a slide, a zoom or
   a morph becomes a short opacity fade (150ms at most), nothing animates into or out of blur, depth or
   scale, and a drag still follows the finger. Whatever an entrance would have revealed is shown, never left
   hidden, and an indicator that carries a state becomes static text, not a frozen loop. On the web motion is
   opt-in in code, written inside `@media (prefers-reduced-motion: no-preference)`; a global switch-off sets
   durations to 0.01ms, not 0, so end events still fire.
7. **Copy is design.** Buttons are verbs ("Save invoice", not "Submit"). Titles are nouns. Empty
   states say what the space is for and offer one action. No exclamation marks, no "Oops", no
   "Welcome back", no adjectives about the product ("seamless", "powerful", "effortless").
8. **Density follows the job.** Tools people use for hours are compact (14px base, 32–36px
   controls). Reading surfaces are spacious (17–18px base, 1.6 line-height, 65–75 character
   measure). Mobile is thumb-sized (16px base, 44px targets). One product, one density.
9. **Accessibility is the floor, not a feature.** Contrast targets from the brief, a visible focus
   ring on every interactive element (2px accent, 2px offset), 40px minimum hit areas (44px on
   touch), labels on every input, keyboard paths for every menu and dialog, and color never as the
   only signal.
10. **Radius follows height, and nests.** Every size step has its own radius. In a rounded system a
    control's radius is half its height in px — 28 → 14, 36 → 18, 44 → 22, 52 → 26 — never 9999 or
    1000; in a soft one it is about 0.28 × height rounded to an even number (28 → 8, 36 → 10, 44 → 12);
    in a sharp one, 2. The number carries to what the control opens: a 44px trigger opens a list with a
    22px radius, and a text area takes the radius of its size step's control. Nested corners follow
    **outer radius − padding = inner radius**: a menu of radius 18 with a 4px inset holds items of 14; a
    card of 24 with 16px padding holds tiles of 8. Circles are their size / 2. The rule holds up to a
    24px inset; past that the two surfaces take their radii independently. When iOS is a target,
    corners are continuous with 60 % smoothing (`radius.smoothing` 0.6, SwiftUI `.continuous`, Figma corner
    smoothing); other targets draw plain arcs.

## 6d. Spacing

From the platform guides, read against ours. The
scale is §1.4's; the icon side, optical offsets, equal paddings and the text container's larger bottom are in §4
and §6c. What follows is what those do not already say.

1. **The rhythm is 8, the grain is 4.** Layout values (margins, gaps between groups, section padding) are steps of
   the scale; 2 and 6 exist only inside a component (an icon's gap, a chip's avatar inset). A value between two
   steps is drift (§6c Normalize 2), and a fix rounds it onto the scale in either direction.
2. **Padding, gap, margin, in that order.** A container sets its padding and the gap between its children;
   children do not push each other apart with margins of their own, which are never uniform. A margin is for the
   space outside a container, or a page's layout.
3. **Inside a group is tighter than between groups**, by at least one step of the scale and usually double
   (8 inside, 16 between; 16 inside, 32 between). Peers keep one gap; a gap that changes between two peers says
   they are not peers.
4. **Opposite insets are equal.** Leading equals trailing; top equals bottom in a control, so its label is
   centred. The only departures: the icon side of a control 2px tighter (§6c Polish 1), a ghost or outlined
   control's optical offsets (§4), a text container's bottom one step larger (§6c Polish 17), the side of a field
   that holds an icon or a chevron (it reserves that box and nothing more), and indentation that shows a level.
   Anything else unequal is a defect, not a style.
5. **The floor.** Content never sits closer to its container's edge than: 8px in a 28px control, 12px in a 36px
   one, 16px in a 44px one and up (horizontally; vertically the height sets it); 12 in a card on a phone and 16
   on the web; 24 in a dialog (16 in a phone sheet's header); 16 from a phone's screen edge, 24 from a window
   600px and wider. A label that touches its fill's edge, or text that meets a card's corner, is cramped at any
   size.
6. **Dialogs and sheets.** 24 on every side; 16 between the title and the body; 24 between the body and the
   actions; 8 between two buttons.
7. **Rows and lists.** Leading and trailing insets equal (16 on a phone, 12–16 on the web), the leading element
   and the text on shared vertical lines down the list, the divider starting at the text (§2.0). A tall row
   (two lines and up) top-aligns its leading and trailing elements with the first line.
8. **Targets.** 44 on touch, 40 with a pointer (§1.9), 48 when the product is built on a Material stack. A small
   icon gets its target from its own padding, never from a neighbour's, and two targets side by side leave at
   least 8 between them; a control with no visible edge wants about 24 of clear space around what is drawn.
   A hit area larger than its control is drawn by a pseudo-element on the wrapper, never on the input; it
   shrinks rather than overlap, and two hit areas never intersect. Auditing someone else's product, a small
   target passes when a 24px circle centred on it touches no other target (WCAG 2.5.8); what we generate keeps
   40 and 44.
9. **Margins by width.** Under 600px, 16 at each side; from 600, 24 (28 in Apple's regular width); from 1200 the
   content stops at its container (§6c Polish 15) and the margins take the rest. The spacer between two panes is
   the margin's value.
10. **Density moves vertical padding, never horizontal.** A denser step takes 4 off a row's or a control's
    height and nothing off its sides, the text size stays, and no density goes under the target floor. One
    density per product (§1.8); menus, dialogs and toasts never densify.
11. **Growth keeps the spacing.** When the text grows (a translation, a larger text setting, 200 % zoom), rows and
    containers grow and neighbours stack; the paddings and gaps keep their values, and nothing overlaps. A box
    that holds text sets a `min-height`, never a fixed height, and survives a reader's own spacing (line height
    1.5, paragraphs 2×, letters 0.12em, words 0.16em).
12. **A spacing fix may grow or shrink.** It moves each inset or gap to the step that satisfies the floor and the
    group rule, keeps the structure and the order, and changes no copy.
13. **Headings sit close to what they head.** The space above a heading is at least twice the space below
    it, and the first heading in a container has none above it.

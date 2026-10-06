## 7. How the system is named and its prose written

- **Name**: one or two plain words that could be a studio's internal codename (e.g. "Ledger",
  "Field", "Northwind Grid"). Never "Nova", "Lumen", "Aether", "Nexus", "Zen", "Flux", "Prism", or any
  word ending in "-ify". Never include "Design System".
- **Tagline**: one sentence that states the point of view, not the product's benefits.
- **Principles**: five to seven. Each one is specific to this brief, names what to do and what
  not to do, and could be checked by a reviewer. No principle may be "be consistent" or "keep it
  simple".
- **Decision rules**: `when / then / because`. Written for a coding agent that has never seen the
  product. Prefer numbers over adjectives.
- **Anti-patterns**: the ban list above, rewritten in this product's voice, plus the user's own.
- **Component copy**: default labels, empty-state text, error text, and helper text in the product's
  voice, for the product's actual domain (invoices, sessions, patients — not "items"). The rule engine
  extracts the domain nouns from the brief (`meta.domain`); use them, and never "records", "entries",
  or "data". Buttons name results with specifics (§6a.11), titles are nouns or questions, every
  price has a currency and every metric a unit.
- **A11y notes**: concrete: roles, keyboard keys, focus order, announcements.

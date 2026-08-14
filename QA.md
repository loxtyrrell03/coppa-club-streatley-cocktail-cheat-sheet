# QA inventory

## Content and source checks

- Cocktails contains 26 builds in the expected 5 Coupe / 7 Rocks / 5 Highball /
  9 Spritz groups; Study contains the same 26 cocktails and no wine, beer, or cider.
- Wines contains 49 current Streatley entries. Names, origins, venue notes, formats,
  and prices match the venue page/menu; dryness and body are clearly presented as
  a practical guide rather than venue copy.
- Beer & cider contains 14 current draught or packaged entries. Venue-listed
  draught ABVs and producer-checked packaged ABVs are attributed correctly.
- Seasonal spritz prices match the current Coppa menu, while the interface retains
  the Streatley availability/till caveat.
- Canal Grando and REAL are labelled as likely pours, never confirmed cocktail
  mappings. REAL is described as alcohol-free, not `0.0%`.
- The Blazing Pineapple Buck warns that the public wording may describe one
  spiced-orange ginger beer mixer; the reconstructed split is not overstated.
- Product names use safe current forms such as Altos Plata Tequila, MARTINI Riserva
  Speciale Rubino, Havana Club 3yr / 7yo, and Discarded Banana Peel Rum.
- Vintage, packaged ABV, keg, till, and live bar-bible checks are prominent wherever
  their changeability matters.

## Functional and visual checks

| Area | Functional check | Visual/accessibility check |
| --- | --- | --- |
| Four views | Open direct hashes for `#cocktails`, `#wines`, `#beers`, and `#study`; switch repeatedly | Active nav state is clear; each view begins below the header without a scroll jump |
| Scoped search | Search `pineapple` in Cocktails, a region/style in Wines, and `lager` in Beer; clear each | Only the active catalogue changes; count and empty state remain legible |
| Cocktail filters | Select each serve, combine a filter with search, then reset | Selected chip is unmistakable and counts remain accurate |
| Recipe specs | Inspect the densest and shortest builds | Specs scan on the left; the smaller photo stays on the right; colour cues supplement rather than replace labels |
| Wine catalogue | Search name, grape/region, dry/sweet wording, and tasting note | Group headings and practical style descriptors are easy to distinguish |
| Beer catalogue | Search brewery, style, format, cider, and ABV | Draught, packaged, and alcohol-free groupings scan cleanly |
| Product dialog | Open each unique product mapping; dismiss by button, Escape, backdrop, and browser Back | Correct image or `exact bottle not shown`; focus stays contained and returns to the trigger |
| Study | Start, reveal, use each grade, finish a staged queue, reload, and reset | No reveal scroll jump; spec is left/photo right; controls meet touch-target minimum |
| Offline/PWA | Load once, go offline, reload each direct hash, reveal a Study answer | All catalogues, recipes, local images, and saved progress remain usable |
| Responsive | Inspect 320×568, 390×844, and 1440×900 | No clipping, overlap, or page-level horizontal scrolling |
| Keyboard/motion | Tab through controls; use Space to reveal outside form fields; enable reduced motion | Focus is visible; typing and controls are not intercepted; motion is restrained |
| Images | Scroll all lazy images and force one bad URL | No distortion or third-party runtime dependency; fallback is clear |
| Privacy | Inspect network and source | No login, analytics, tracking, cookies, or third-party runtime assets |

## Study scheduling checks

- All 26 new cards are initially due; Again re-queues a card; Hard / Good / Easy
  show their next intervals; learning cards graduate as expected.
- Due, New, Seen, streak, session grade breakdown, no-due state, and completion
  summary update without layout shift.
- Progress persists under `coppa-study-v1`; corrupt saved JSON safely recovers to a
  fresh deck; reset requires confirmation.

Exploratory coverage should include rapid view/search/filter changes, long queries,
the densest build, opening a product reference during Study, offline direct-hash
reloads, and checks against the current till, bottle labels, and keg badges.

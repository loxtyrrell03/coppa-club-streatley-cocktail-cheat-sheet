# QA inventory

## User-visible claims

- The initial iPhone view clearly shows the venue, cheat-sheet purpose, source warning,
  search, category filters, and the start of the recipe list.
- Text is comfortably readable, controls meet a 44 px touch-target minimum, and no
  content clips or creates page-level horizontal scrolling at 390 px or 320 px.
- All 26 recipes appear in the correct 5 / 7 / 5 / 9 categories with source prices,
  builds, glass/ice, methods, finishes, and visible alcohol-free labels where applicable.
- Every recipe has a credited, useful-alt-text cocktail photograph in the source
  Coupe/Martini, Rocks, Highball, or large wine-glass family; no image is broken,
  distorted, or dependent on a third-party runtime.
- Exact source ingredient names remain visible. Every one of the 30 bottled product
  mappings adds a verified type and opens either the matching reusable product photo
  or an explicitly labelled ingredient/category photo—never a different brand's bottle.
- The bottle dialog fits on iPhone, has a prominent close control, contains keyboard
  focus, restores trigger focus, and closes via Close, Escape, outside tap, or browser Back.
- Search is fast across names and ingredients; category filters, clear, empty-state
  reset, and diacritic-insensitive search all work with visible result counts.
- The Install control gives exact Safari Add-to-Home-Screen guidance and can be closed.
- Study mode contains all 26 imported flashcard fronts and uses the audited recipe
  records for every answer.
- Again / Hard / Good / Easy show their next intervals, Again re-queues a card,
  learning cards graduate, and review progress persists locally after reload.
- Study dashboard, question, revealed answer, grading controls, completion summary,
  empty-due state, and reset confirmation are usable at iPhone sizes.
- Relative app-shell paths, the manifest, icons, service-worker scope, and all 56
  visual assets plus the Study modules work offline from a GitHub Pages-style subpath.
- Desktop layout is balanced and retains readable card structure.
- The site has no login, analytics, tracking scripts, or third-party runtime assets.

## Control and state coverage

| Control or state | Functional check | Visual check |
| --- | --- | --- |
| Search | Enter `pineapple`; verify matching cards and count; clear | Filtered cards remain legible |
| Category chips | Select Rocks; select All | Active state is unmistakable |
| Combined search/filter | Select Spritz and search `0%` | Two alcohol-free cards remain uncluttered |
| Empty result | Search impossible text; use Show all | Empty state is centered and actionable |
| Diacritic search | Search `pina`; find Spiced Piña Colada | Correct card name renders |
| Bottle references | Open all 30 unique product IDs and compare title/type/alt/mapping | Correct product or clearly labelled ingredient photo fits; affordance is obvious |
| Bottle dismissal | Close by button, Escape, outside tap, browser Back; tab repeatedly | Focus stays in the dialog and returns to the trigger |
| Image loading | Scroll through all 26 lazy images; force one bad URL | All images load; clear fallback replaces the failed image |
| Install | Open dialog; close with both controls/backdrop | Steps and Share icon fit on iPhone |
| Offline | Load once, set browser offline, reload subpath, open bottle | Saved page, 26 recipes, drink photos, credits, and product reference remain visible |
| Responsive | Inspect 390×844, 320×568, and 1440×900 | No clipping, overlap, or horizontal page scroll |
| Motion | Trigger a category filter | Card entrance is restrained; reduced-motion rule exists |
| App sections | Switch Recipes â†’ Study â†’ Recipes | Active section is obvious and the Study action is above the fold |
| Study start/reveal | Start 26 due cards; reveal the answer | Question remains focused; answer is readable and uses the drink photo |
| Study grades | Use Again, then three Easy grades; confirm the card returns | Four large grade targets and interval labels remain visible |
| Learning graduation | Grade the returned learning card Good | The next Good interval changes to one day |
| Study persistence | Grade cards, reload, inspect counts and streak | Dashboard reflects saved progress without layout shift |
| Study completion | Complete a staged one-card queue | Grade breakdown and return action are clear |
| Study reset | Dismiss once, then confirm | Progress is only erased after confirmation |
| Study offline | Load once, go offline, reload `#study`, reveal an answer | Dashboard, card, photo, ingredients and grading controls remain available |
| Study edge states | Stage no cards due; corrupt saved JSON | Start disables with next-due copy; damaged state recovers to a fresh deck |

Exploratory checks: rapidly alternate search and filters; use a long ingredient query;
inspect the densest build cards; switch sections mid-session; close a Study bottle
reference; test no-due and corrupt-storage recovery; and reload a direct hash URL offline.

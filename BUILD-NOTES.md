<!-- Moved out of CLAUDE.md 2026-08-12. It was 13.3KB — 60% of a file that loads in
     full at the start of EVERY session, including sessions that never touch the site.
     Nothing here changed; only where it lives. Read this before any work on
     clients/hagodigital/site/, and the `artwork-swap` and `site-builder` skills point here. -->

# hagodigital.ai — build notes

`site/` — the live site at hagodigital.ai. Deploys from a **separate** repo via `site/deploy.sh`.
  Bilingual: English at the root, Spanish under `site/es/`, ES/EN switcher in the nav. The two
  languages target **different segments on purpose** (English trades, Spanish high-ticket
  professions) — see `decision-log.md`, don't sync the lists. Spanish is **transcreated**, never
  word-swapped: the ES About hero is "Hago. En presente, primera persona.", not a translation.
  **Rebuilt 2026-08-07 on the "Attract. Convert. Scale." design.** Ten pages — EN
  `index/about/branding/contact/thanks/404`, ES `index/about/contact/thanks` — plus `what-we-do.html`
  and `how-we-work.html`, which are `noindex` redirect stubs pointing at `#what` and `#how`.
  **`contact.html` is where every English CTA goes (2026-08-14)**, under the label **"Start with a
  free call"** on all nineteen of them. It carries **both doors on one page**: the calendar on every
  button, and the qualifying form below it. Its own header CTA points at the **calendar**, not at
  itself — a header button that reloads the page you are already on is a dead control.
  **`start.html` is retired.** It existed (2026-08-11 → 2026-08-14) to choose between the public
  brand brief and the calendar; the brief is now private, password-protected and sent **after** the call, so
  door A had nothing behind it and a chooser with one door is just the calendar with extra steps.
  `app.js` still carries both `start` and `book`: `start` → `contact.html`, `book` → the calendar
  direct, which is what **every Spanish CTA uses**, because no Spanish enquiry flow or brief exists.
  Making the calendar primary again is one line — point `start` at `book`'s URL.
  **Two more service pages shipped 2026-08-13** — `websites.html` and `google-presence.html`, taking the
  site to **twelve pages** and `check-motion.sh` to twelve (thirteen and thirteen until `start.html`
  was retired on 2026-08-14). Both are built on the **pillar pattern** (`pagehero` → `band` → three
  numbered `.pillar` rows alternating cream/navy, figure side flipping each row → `endbar`) — which
  `start.html` also used, so `websites.html` is now the reference copy of it — **not** the `.hero`
  mascot layout — joining that grid means touching
  `--bird-h`/`--bird-tail`/`--hero-floor`, which are shared across both languages and both existing
  heroes. Pillar 01 on each **reuses the homepage's own illustration** for that service
  (`websites.webp`, `google-presence.webp`), bare on cream; pillars 02 and 03 are **drawn SVG with
  solid fills**, the same treatment `start.html` used. Entry is via new `.tlink`s on **homepage pillars 02 and 03**
  plus the footer nav — **the header nav was deliberately left alone**, since it already collapses at
  1100px because Spanish doesn't fit and two more items would push it. No ES versions, so both lang
  toggles point at `/es/` like branding's. **Three claim-control paragraphs are load-bearing and carry
  `CLAIM CONTROL` comments**: the SEO boundary line quoted verbatim from `business-model.md`, the
  refusal to promise a GBP verification date (`website-rules.md` — Google owns that timing), and the
  reviews section promising the *mechanism* only, never an outcome. Do not soften any of the three;
  each replaced wording JP asked for that the rules forbid.
  `branding.html` (2026-08-08) is the one deep service page: brand vs branding vs brand identity,
  then the ten-part system. It is in the header and footer nav of the **English pages only** — no
  transcreated ES version exists, so its ES toggle points at `/es/`, not a `/es/branding.html`.
  It states the mascot, logo-suite and source-file claims **more specifically than the homepage
  does**, against the wordmark-only rule and the unsigned IP assignment. JP shipped it knowing.
  Structure: `index.html` 24KB, shared `styles.css`, six WebP images and six **self-hosted** WOFF2
  (**Instrument Sans** body + Manrope display, both SIL OFL — no Google Fonts request). **Inter was
  dropped 2026-08-12**: a detector flagged it as the single most common face in AI-generated UIs,
  which is a poor look for a studio selling distinctiveness. Instrument Sans is 88.2KB against Inter's
  141.4KB for the same three weights on the same latin subset, and it sets the homepage lede in two
  lines where Inter took three. Body face is one token — `--body` — plus three `@font-face` rules and
  **one preload link per page, 11 of them**; the preload is the part that gets missed. The
  brand-discovery forms still name Inter in their own inline CSS and are built separately by
  `build.py`. Assets are separate files on purpose;
  the design arrived as one 0.83MB file with everything base64'd inline, which caches nothing.
  Six-colour palette — navy `#000A18`, blue `#2365DE`, lime `#CEFF00`, yellow `#FFF200`, ivory
  `#F8F5E6`, grey `#696D71`. **Navy is a section GROUND, not a theme**; the page alternates grounds.
  **One theme: light.** **The palette list is not how the palette is used** — audited 2026-08-10 after a
  deliverable came back off-brand. **Raw blue is never a fill:** all eight uses of `--blue` in
  `styles.css` are focus outline, tick circle, ring border, hover border or link text, and on cream that
  role is carried by `--blue-ink #1B4EB0` as *text*. **The only emphasis fills are lime and navy.**
  **`--yellow` appears zero times** — it is one of the six and is not in the working system; don't reach
  for it. Derived tokens exist because a raw one fails contrast: `--blue-lift #6E9BFF` (on navy),
  `--blue-ink #1B4EB0` (on cream), `--ink #2E3540`, `--cream-dim #C9C4B4`, `--cream-mute #9AA0A8`,
  `--navy-2 #050E1F`, `--navy-3 #0A1526`, `--cream-2 #EFEADB`. Buttons are **6px radius, not pills**;
  motion is `--rise-t .78s` / `--rise-y 30px` / `--rise-step 95ms` / `--ease cubic-bezier(.2,.7,.3,1)`.
  `mascot-flying.webp` and `mascot-perched.webp` are cut off their plates. **The perched bird was replaced
  2026-08-12** — new artwork, cut off a near-white plate, and the earlier ground-shadow-bar note
  is retired with the file it described. **Both heroes were replaced again later the same day** with a matched
  pair — a perched bird for the homepage and a pointing bird for branding, **so `mascot-chart.webp` no longer
  holds a chart**; it is `905×1102` portrait where it used to be `1000×725` landscape, and the name is the
  only thing left of the old file. The perched file is `724×1325`. **The plate on that batch keys at
  `--tol 7`, not the measured 11** — the drawing's own ivory is inside 11 of the near-white plate and a
  default run holes the body and crest. **Both files have exactly one enclosed pocket worth taking — the gap
  between the legs** (10,465px on the branding file, 6,897px on the perched one) — and the floor has to be
  set to catch it and nothing else: `--pocket-min 3000`. At `--pocket-min 1` the perched file came back
  ragged, because at tol 7 the drawing's own white highlights are enclosed plate-coloured regions too; at
  the default 1500 it is fine, and at no floor at all the bird ships with a **white patch between its legs**,
  which is what reached the live site. Between-the-legs is the one pocket to look for on a standing figure.
  **The dotted white fringe was the third defect off this generator and it reached the live site**: every
  outline is wrapped in a light ring that survives the plate tolerance by a pixel or two, so the silhouette
  ships edged in white dashes. It measured 370px on a 725×1327 file — a statistic that reads as clean.
  `swap.py` now grows the keyed region inward through anything **light AND neutral** (`≥170`, spread `≤14`),
  which the ring satisfies and the drawing's ivory does not; it removed 3,256px and 5,643px from the two
  files. **Zoom the silhouette on the preview, not just the plate corners.**
  **THE TWO HEROES ARE ONE HERO.** Same grid, same `--bird-h`, same `--hero-floor`, same padding — the only
  page-specific declaration left anywhere is `.hero-mascot.art-wide{--bird-tail:0}`, because that drawing's
  claws are its lowest pixel and the perched one's are not. Everything else that used to be private to
  `branding.html` — its own copy-width token, its own escape from `.shell`'s 1280px cap, its own width-driven
  size ceiling, a geometric-mean factor of `0.8156` — is **deleted**. Each of those was a way for the two to
  drift, and each of them did. **A geometric-mean match is the wrong tool here**: equal mass across a `.546`
  and a `.821` aspect means unequal HEIGHT, and unequal height is what reads as "different sizes" on two
  pages meant to feel like one product. Measured identical at 1920/1440/1280/1024 and stacked: same height
  to 0.1px, same LEFT EDGE to 0.1px, feet `+0.0` on both.
  **The figure is `justify-self:start`, not `center`** (2026-08-12). The column has to fit the wider drawing,
  so centring parked the narrower one 110px out into open navy — 167px from the copy on the homepage against
  61px on branding, and the homepage bird read as drifting away from the words. Aligned to the column's start
  both birds begin at the same x and sit 56px from the copy. **With two silhouettes of different natural
  widths, a shared left edge is a stronger reading of "same position" than a shared centre** — centring makes
  the *gap* differ, which is the thing the eye actually reads. Stacked, it goes back to centred.
  The figure column is **`1.36fr`, not `.82fr`** — it has to fit the WIDER drawing at full height, and a
  column that fits only one of them is exactly how they stopped matching. If a future hero needs more room,
  widen the SHARED grid so both pages move together.
  **`--bird-h` is now the HOMEPAGE only** (both languages) and reads
  `clamp(300px,min(60vw,calc((100vh - 143.5px) / 0.9842)),980px)` — and it now drives **both** heroes and
  both languages. The middle leg is a **fold guard**, not
  styling: the CTA's bottom is `nav + hero pad-top + --bird-h * (1 - --bird-tail)`, so a width-only size
  pushes the button off a 768px laptop while measuring fine on a 900px one. **It was the fitted constant
  `76vh` and is now the arithmetic**, solved from a measured `107.5px` of nav-plus-hero-padding. The
  clearance in it is **36px, not 24** — the branding hero's copy block is taller than the homepage's, so on
  that page the COPY sets the row height and the button sits 12px lower than the bird alone would put it.
  Size the guard for the taller of the two. `verify.py` prints `fold+N` and fails under 16px, so it is
  checked rather than trusted: `+36` homepage, `+24` branding at 900 innerHeight.
  **The hero's own top padding is part of this number**, and it is the only place left to find bird: the
  feet are pinned to the CTA and the CTA has to clear the fold, so `100vh - nav - hero pad - 24` IS the
  ceiling. `.hero` therefore pays `clamp(24px,2.6vw,36px)` instead of the sitewide `--sect * .8` (83px at
  1440). **Restoring the section rhythm there costs ~47px of mascot** — it looks like an inconsistency and
  it is a deliberate trade. Homepage bird measures **781px tall at 900 innerHeight**, against 430 before
  2026-08-12 and 684 earlier the same day. `branding.html` went width-driven the same day and reads `--bird-h-wide` as a max-width, so the
  two heroes no longer share a height and raising one does not touch the other. **`--flip` is `1` on both** —
  each current file already faces left. **New artwork invalidates every one of these numbers silently —
  re-measure, don't assume**, and that includes which way the bird faces.
  **Both homepage heroes end on the CTA button** (2026-08-11, EN and ES alike). No reassurance line, no tick
  row — those three claims moved down to About, where the same three were already being made at length, and the
  old `Strategic / Practical / Results` wording is off the site entirely. **`--hero-floor` couples the copy
  column's `padding-bottom` to the bird's `margin-bottom`**, which is what lands the feet level with the button;
  hardcode either and the next change to the other breaks it silently. **`--bird-tail` is the second half of
  that**, added 2026-08-12: it is how far the artwork continues BELOW the feet as a fraction of image height
  (`.0158` — 21px of tail past the claws on a 1327px file; the branding bird's claws ARE its lowest pixel, so
  `.art-wide` overrides it to `0`). It was 0 and unnamed while the old bird's claws
  were its lowest pixel. **Measure it on every new file** — it belongs to the drawing, not the layout, and
  getting it wrong floats the feet by an amount that grows with `--bird-h`. **Measure the claws, not the alpha
  bbox**: both current drawings drop a wing or tail tip lower than the feet, so a plain `getbbox()` reads that
  tip as the floor. Isolate the claw column on x first. **`verify.py` now measures this itself** and prints
  `feet±N` against the CTA's bottom, failing past 2px — the claim is a number, not a sentence, and it is
  skipped automatically below the stack breakpoint where the mascot sits under the copy. Measured 0.0px
  feet-to-button on **all three pages** at 1920/1440/1280/1024. The
  **streak field is deleted, the glow kept** — it's the only ground the bird has — and `.hero-streaks` keeps its
  class because `app.js` reads it for the parallax layer. Four anchors are load-bearing across **11 files** —
  `#brand` `#what` `#how` `#proof` — don't rename them, and don't quietly invalidate the nav label while keeping the ID.
  **Voice is first person singular.** About states that a graphic designer is brought in and
  managed; "we" survives only where it means JP and the reader ("if we're not a fit").
  **Scroll motion, added 2026-08-07.** No library. Elements carry `data-rise` / `data-stagger` in
  the markup and `app.js` adds `.in` via `IntersectionObserver`, one-shot. **Those attributes are
  load-bearing across the same 11 files as the anchors** — they look like leftovers, have no visual
  effect of their own, and deleting them kills the motion silently. The hidden state is gated on
  `html.js`, set by an inline `<head>` script, so with JS off nothing is hidden and no crawler meets
  an invisible section. Parallax rides the hero streak field and mascot **only, never copy**.
  **`site/check-motion.sh` gates every deploy** (2026-08-08), called by `deploy.sh` before the clone
  and kept unpublished by the existing `*.sh` filter. The layer fails in two directions and only one
  is cosmetic: stripped attributes lose the motion, but a page that arms `html.js` without the means
  to reveal ships its sections at `opacity:0` — **invisible content on a live page, no error**. The
  check asserts *presence* of each leg, never counts occurrences, so ordinary edits pass. **Add any
  new page to its `PAGES` list** — a page not listed is a page it cannot protect.
  **The hero flip is a token, not a magic number.** `app.js` reads `--flip` off `.hero-mascot img`
  (default `-1`). `branding.html` sets `1` because its artwork already faces left *in the file*.
  **The declining-chart problem is closed (2026-08-12)** — it was open since 2026-08-11 and the fix was not
  a token. The artwork that carried the falling bars is gone; the branding hero is now a bare bird pointing
  up and left, so there is no chart to read as decline and no flip that trades the reading for the bird's
  direction. Do not reintroduce a chart into this slot without re-reading that argument.
  **Six more assets were replaced 2026-08-12** — `websites`, `google-presence`, `ai-human` on the homepage,
  and system cards `sys-voice`, `sys-palette`, `sys-guides` on branding. Two things about that batch are worth
  keeping. **The pillar illustrations have large ivory areas of their own that no colour test can separate
  from the plate** — the laptop body is `(246,246,245)`, a spread of 1 and seven units off a `(253,253,253)`
  plate — so what saves them is CONNECTIVITY, not tolerance: run `--pocket-min` effectively infinite and let
  the border-connected fill do the work. A default run keyed the laptop body, both browser panels and the
  letter H straight out of the drawing. **And the system cards sit on NAVY, not cream**: `sys-voice` was
  previewed on `--ground cream`, looked perfect, and shipped a holed microphone on a navy card. **The preview
  ground has to be the ground the asset actually lands on**, which for the ten cards means `--ground navy`
  even though the section around them is cream.
  **`swap.py --card 640` normalises a card in the asset**, on the geometric mean of the bbox (target 480,
  measured across the seven cards already in place), centred on a transparent square. Growing the outline
  ring is WRONG for these — the tile face is light and neutral, so the grow eats it and the card loses the
  tile the other seven have. Pass `--grow-min 999` to turn it off on anything with a flat light panel in it.
  **Supplied artwork is cut off its plate, never pasted as a rectangle.** Never a global colour key —
  the bird's wings, beak and feet are all dark navy and a global key holes
  them. **The framed-panel exception is retired (2026-08-11)**: the branding hero's third file keys
  cleanly, so the radius, hairline and shadow are **deleted** from `.hero-mascot.art-wide img`.
  **This generator's files have NO clean plate — assume all three defects on every new batch** (learned
  the hard way, 2026-08-11, one of them on the live site):
  1. The plate arrives **near-white**, not near-navy. Test **bright AND neutral**: the ivory tile is
     `(248,245,230)`, an 18-point channel spread, and that gap — not any brightness threshold — is the
     whole safety margin. Widen the neutrality tolerance past it and the tiles get eaten.
  2. A pocket of plate can be **sealed off by artwork** where a border flood never reaches. Key enclosed
     regions too, but only on an **even split of the two checker tones** (≥45% each, ≥3000px). Set from
     measurement: real pockets sit at 50/47 and 48/46, nothing else gets both tones past 38%. A loose
     15% mix ate the A's crossbar, the ruler and the cap's monogram — the failure a tight threshold
     prevents looks like **ragged artwork**, not leftover plate.
  3. Every outline is wrapped in a **noisy ring dipping to ~193** that both survives the plate test and
     fragments the plate into islands the border fill can't reach. That is what a "white border" is —
     it shipped as an 8px band and JP caught it live. Fix by **growing the keyed region inward** through
     anything still light and neutral (≥170, spread ≤14); it stops itself on outlines and on colour.
  Then **render it on the real ground and look** — corner measurement can't decide this, and a plate
  that measures clean at the corners still shows when a glow sits behind it.
  Spacing is a scale — `--s1`…`--s6` (8/12/16/24/32/48) — and every section pad derives from
  `--sect`, so the page rescales together. Don't reintroduce a one-off px value.
  **No phone number anywhere on the site** (2026-08-07) — no `tel:`, none in the JSON-LD. WhatsApp
  carries it from `contact.html` and `thanks.html`. The number stays on the GBP, so NAP is
  **deliberately asymmetric**; see `website-rules.md`.
  **The nav collapses to the burger at 1100px, not 960** — Spanish doesn't fit the band below it.
  **Two live claims are knowingly ahead of the docs**: the hero promises "AI workflows", which are
  parked until three websites ship, and section 01 promises "You own the files outright", which
  needs the designer IP clause. Both are JP's decisions — don't quietly tidy either away.
  **The Decision is not on the site.** It's the first sellable thing and the homepage never
  mentions it. Deliberate as of 2026-08-07; see the project record.
  **Both contact pages sell the call** (2026-08-09). The booking button and a WhatsApp text-link sit
  in the hero; the old "Two ways to reach me" card pair is gone and **email is off the contact route
  in both languages** — the form is the same act with better answers, and email stays in the footer.
  Order runs book · why it's worth booking · the fallback form · where I work · book again.
  **The ten-part system grid is ten raster cards, zero SVG** (2026-08-11). The art box is square and
  `object-fit` is `contain`, not cover — cover cropped the microphone's speech bubbles and the swatch
  fan's outer cards off. **Scale is normalised in the ASSET, not the box**: every drawing is cut to its
  own bounds and re-centred so the **geometric mean of its visible bbox is 480 of 640** (2026-08-12).
  It was the LONG EDGE at 76% until then, and that was the wrong measure — it matches a tall thin
  object and a wide flat one on whichever axis they happen to be long in, and lets the other axis land
  anywhere. Measured that way the seven tiles sat at 471–486 while the microphone, the swatch fan and
  the open book sat at 374, 426 and 434 — the exact three JP picked out by eye. Live spread is now 4%.
  **Measure the bbox on alpha ≥ 64, not on a plain `getbbox()`**: the keying leaves a near-transparent
  halo that is up to ~45px a side, and sizing off it lands the visible drawing 100px narrower than the
  arithmetic promises. The microphone caps at 462 rather than 480 because nothing may touch the frame
  edge. A new file at a different fill will look wrong however `.scard .art` is styled — re-measure,
  don't just swap it. Tooling: `_shared/artwork/swap.py`.
  **`branding.html` opens its difference section with a `.band on-navy`** (2026-08-11), the same device
  the homepage uses for "Three pillars. One connected system." — `--navy-2`, a shade off the hero so the
  two navy blocks read as separate. `#difference` sits on the band. Its `.callout` and the `.endbar`
  share one panel: navy ground, lime 56px disc, cream emphasis, `--s5`. On the band, a two-line heading's
  second line takes `--blue-lift`; `--blue-ink` is mixed for cream and fails on navy.
  Live at `7621abf`. Pushing this repo does **not** publish; run `deploy.sh`, then verify **live
  content** — the `build.json` SHA only proves a file was written.


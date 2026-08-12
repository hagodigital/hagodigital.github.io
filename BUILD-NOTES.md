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
  **Rebuilt 2026-08-07 on the "Attract. Convert. Scale." design.** Eleven pages — EN
  `index/about/branding/contact/start/thanks/404`, ES `index/about/contact/thanks` — plus `what-we-do.html`
  and `how-we-work.html`, which are `noindex` redirect stubs pointing at `#what` and `#how`.
  **`start.html` (2026-08-11) is where every English CTA now goes**, not the calendar. Two equal
  doors — the brand brief then book, or book now — and the label is **"Start with a free call"** on
  all nineteen of them. Built on the **homepage pillar pattern**, not its own layout: `pagehero` →
  `band` → numbered `.pillar` rows alternating cream/navy, each with `.n`/`.h2`/`.sub`/`.lede`/
  `.checks`/`.ctas`. Its two figures are **drawn SVG with solid fills** — the only page besides
  `branding.html` with drawn art, and solid on purpose, since the system cards that read lighter than
  their neighbours are exactly the ones drawn as outlines. Figure 01 carries its own navy panel on
  the cream ground, figure 02 sits bare on navy — **matching the homepage, which does the same thing
  with `.framed` asset 08 and bare asset 09**. Don't "fix" that into a matched pair. `app.js` carries both `start` and `book` destinations: **Spanish still goes
  direct to the calendar**, because no Spanish brief exists. Equal weight between the two doors is
  load-bearing, not styling — the moment door B reads as the lesser option the page costs enquiries
  instead of improving them.
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
  2026-08-12** — new artwork, cut off a near-white plate, **725×1327**, and the earlier ground-shadow-bar note
  is retired with the file it described. **Both heroes were replaced again later the same day** with a matched
  pair — a perched bird for the homepage and a pointing bird for branding, **so `mascot-chart.webp` no longer
  holds a chart**; it is `907×1105` portrait where it used to be `1000×725` landscape, and the name is the
  only thing left of the old file. **The plate on that batch keys at `--tol 7`, not the measured 11** — the
  drawing's own ivory is inside 11 of the near-white plate and a default run holes the body and crest. Take
  enclosed pockets on the branding file (one 10,465px pocket between the legs) and none on the perched one.
  **`--bird-h` is now the HOMEPAGE only** (both languages) and reads
  `clamp(300px,min(52vw,76vh),760px)` — the **76vh leg is a fold guard**, not styling: the CTA's bottom is
  `nav + hero pad-top + --bird-h * (1 - --bird-tail)`, so a width-only size pushes the button off a 768px
  laptop while measuring fine on a 900px one. It holds ~33–42px of clearance at 720/768/780 and is inert on
  tall screens. `branding.html` went width-driven the same day and reads `--bird-h-wide` as a max-width, so the
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


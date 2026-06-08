# Lumen and Pixel — Website Changelog

Tracks locked-in changes to lumenandpixel.com.
Brainstorming and exploratory discussions are excluded.
Format: version → date → what changed and why.

---

## v1.42 — June 2026

### Field Notes section — correct structure + nav active state fix

**URL structure (final):**
- `/field-notes/index.html` — EN hub
- `/field-notes/slug.html` — EN article/case study
- `/pt/field-notes/index.html` — PT hub (fully translated UI)
- `/pt/field-notes/slug.html` — PT article/case study
- Language switcher on each page links to the same slug in the other language

**Active nav link fix (all 16 existing pages):**
- Active nav link: `var(--blue-700)` text + 2px `var(--green-500)` underline via `::after`
- Language switcher active: bold navy + 1.5px green underline
- Replaces illegible green-text-on-light-nav pattern

**New files (4):**
- `field-notes/index.html` — EN hub with filter (All / Articles / Case Studies), empty state, filter JS
- `field-notes/article-template.html` — EN article template with all meta, lede, body styles, callout box, footer CTA
- `pt/field-notes/index.html` — PT hub, full Portuguese UI, mirrors EN article list
- `pt/field-notes/article-template.html` — PT article template, all strings translated

**Nav updated on all 16 existing pages:**
- EN: Field Notes → `field-notes/index.html`
- PT: Notas de Campo → `field-notes/index.html` (relative = `/pt/field-notes/index.html`)
- Desktop nav + mobile menu updated on all pages

**How to publish a new article:**
1. Duplicate the relevant template (EN + PT), rename both to the same slug
2. Fill in all PLACEHOLDER values (title, slug, date, read time, lede, body, meta)
3. Add matching `<a class="fn-article-item">` entry to both hub pages
4. Deploy both language versions together

---

### Field Notes section + nav active state fix

**Active nav link fix (all 16 pages):**
- Active nav links now use `var(--blue-700)` text (dark navy, WCAG compliant) with a 2px `var(--green-500)` underline `::after` pseudo-element instead of green text on light nav background
- Language switcher active state fixed with same pattern (bold navy + thin green underline)

**New section: Field Notes**
- `/articles/index.html` — EN hub. Hero, filter buttons (All / Articles / Case Studies), article list (empty at launch, placeholder state shown). Filterable by JS with no page reload.
- `/articles/article-template.html` — reusable template for every new article or case study. Contains all semantic markup, full CSS, `og:type: article`, `article:published_time` meta, back navigation, article body styles (h2/h3, blockquote, callout note, lede), footer CTA.
- `/pt/field-notes.html` — PT hub mirror. Full PT UI (nav, hero, filters, footer). Articles link to EN `/articles/` pages. Language switcher on EN articles links back to this PT hub.

**Nav updated on all 16 existing pages:**
- Field Notes added to desktop nav and mobile menu on all EN pages (`articles/index.html`)
- Notas de Campo added to desktop nav and mobile menu on all PT pages (`../articles/index.html`)

**How to publish an article:**
1. Duplicate `articles/article-template.html`, rename to slug
2. Fill in: title, slug, date, read time, category tag, lede, body content, all meta tags
3. Add matching `<a class="fn-article-item">` entry to both `articles/index.html` and `pt/field-notes.html`
4. Deploy

---

## v1.41 — June 2026

### Complete `<head>` audit and upgrade across all 16 pages

**New assets added to `/images/`:**
- `favicon-16x16.png` and `favicon-32x32.png` — PNG fallback favicons (rasterised from SVG) for browsers that don't support SVG favicons
- `apple-touch-icon.png` (180×180) — replaces incorrect `og-image.png` reference on iOS home screen save
- `android-chrome-192x192.png` and `android-chrome-512x512.png` — for Android PWA/Chrome

**New root file:**
- `site.webmanifest` — PWA manifest referencing Android icons, theme colour `#021829`

**OG image fixed:**
- `og-image.png` resized from 1536×1024 to correct 1200×630 (LinkedIn/WhatsApp spec) with centre crop

**All 16 pages updated:**
- Favicon set: SVG primary + PNG 32×32 / 16×16 fallbacks
- `apple-touch-icon` corrected to `apple-touch-icon.png` (180×180)
- `<link rel="manifest">` added
- `<meta name="theme-color">` added (#021829)
- `<link rel="canonical">` added (page-specific absolute URL)
- `<meta name="robots">` added (`index,follow` on content pages; `noindex,nofollow` on quiz, thank-you, 404)
- `<meta name="description">` added (unique per page, separate from og:description — required for Google SEO)
- `og:image:width` (1200) and `og:image:height` (630) declared explicitly after og:image
- `og:type` and `og:site_name` standardised across all pages

**Homepage only:**
- JSON-LD Organisation schema added (schema.org/Organization — name, URL, logo, description, founder, address, email, sameAs)

**Decision: Drive URL approach abandoned.** All brand assets live in the repo under `/images/`. No external hosting needed for a static site on GitHub Pages. Reliable, fast, zero dependency.

---

## v1.40 — May 2026

### Resources page hidden from navigation
- Removed the Resources link from desktop nav, mobile menu, and lang-switch on all 16 pages (EN + PT).
- The page files (`resources.html`, `pt/resources.html`) are preserved on disk and accessible via direct URL. Nothing deleted.
- Reason: roadmap item, not ready for public visibility.
- To restore: re-add `<li><a href="resources.html">Resources</a></li>` to nav-links and mobile-menu on all pages.

### Founder section hidden on About page
- Wrapped the `.founder` section and its preceding `.divider` in `<div style="display:none">` on both `about.html` and `pt/about.html`.
- Content preserved in full — name, bio, photo placeholder, role.
- Reason: not yet substantiated enough to add credibility at this stage. To be restored when speaker/public appearances justify the personal profile section.
- To restore: remove the `<div style="display:none">` wrapper and its closing `</div>` from both pages.

### Cal.com discovery call CTA added to About page
- Added a "Book a discovery call" button in the contact-left panel on both `about.html` and `pt/about.html`.
- Sits below the social links (Instagram / LinkedIn), separated by a thin rule.
- Links to `https://cal.com/lumenandpixel` — update this URL when the cal.com account is configured.
- PT label: "Agendar uma chamada" / "Prefere falar diretamente?"
- Provides a sync (call) path alongside the existing async (contact form) path.

### Package and versioning convention established
- From this version forward: zip file named `lumenandpixel-v{MAJOR}.{MINOR}.zip`, folder inside matches.
- Versioning increments sequentially from v1.40.

---

## v1.41 — May 2026

### PT copy audit fixes

Full audit conducted across all EN and PT pages. EN copy assessed as consistent and deliberately left unchanged. The following PT errors were corrected:

**Values section — pt/about.html**
- "Artesanato Intencional" → "Execução Intencional" (artesanato = handicraft, wrong connotation for professional practice)
- "Clareza Antes da Complexidade" → "Clareza Primeiro" (literal translation, reads as translated rather than native)
- "A Alegria como Padrão" → "A Alegria como Critério" (padrão reads as ISO standard; critério = the measure by which success is judged)

**Terminology and consistency — pt/services.html**
- "Pré-Produção Programming" → "Programação de Pré-Produção" (untranslated English word)
- `<em>&amp; Automation</em>` → `<em>&amp; Automação</em>` in Show Control h2 heading (untranslated)
- "3D Pre-Visualização" → "Pré-Visualização 3D" (inverted word order from PT convention)
- "fly-throughs interativos" → "percursos virtuais interativos"
- "walkthroughs animados" → "percursos animados"

**European PT corrections**
- "Ainda não tenho certeza" → "Ainda não tenho a certeza" (Brazilian PT → European PT; missing article)
- "Director de Produção" → "Diretor de Produção" (old orthographic convention)

**Anglicisms**
- "Produções em tour" → "Digressões" (personal preference over "produções itinerantes")
- "dia do show" → "dia do espetáculo" (mixed register)
- "browser" → "navegador" (pt/index.html newsletter fallback)

**Terms intentionally kept in English (industry standard in PT context)**
- load-in (universal in Portuguese production industry; "montagem" would signal outsider)
- briefing (fully adopted into PT)
- rigging (no established PT equivalent in this industry)
- plot (technical term, no PT equivalent)
- show file / ficheiro de show (hybrid accepted in industry)

**EN copy — no changes made**
EN copy assessed as consistent in register throughout. The quiz and services page problem/response tables are the strongest writing on the site. AI-pattern density exists but is not at a level that damages credibility with a professional audience. Specific observations documented but not acted on pending Ricardo's direction.

**PT quiz encoding — no action needed**
Apparent encoding issue was a false positive from text extraction. The file uses HTML entities (&#227; etc.) which are valid HTML and render correctly in browsers.

---



### Hero image replaced
- New image: backstage technical rig with stage visible in background.
- Processing applied: highlight compression, shadow toning toward brand blue `#021829`, overall darkening. Image is intentionally near-abstract — scene is barely readable, serves as texture behind hero text.

### Hero headline rewritten
- Old: "Crafting pixel perfect experiences for live events."
- New: "The creative is ready. Is the system?"
- Rationale: original headline was generic and positioned on output. New headline names the specific tension the services resolve.

### Quiz surfaced to hero and navigation
- "Find your fit" link added to desktop nav and mobile menu on all 16 pages.
- Second CTA button added to homepage hero alongside "Explore services".
- Previously: quiz was only reachable from the bottom of the services page.

### Scope signal block integrated into hero
- Seven context tokens (event types, geography, production phase) added as a subtitle line inside the hero, between the headline and the CTAs.
- Replaced an earlier standalone "scope strip" section between hero and marquee, which did not fit visually.

### Client logo banner added to homepage
- Section heading: "Trusted by" (EN) / "Confiam em nós" (PT).
- Seven logos: SAP, Randstad, Verisure, CGD, Palácio da Bolsa (text), Yeatman, Real Companhia Velha.
- Later updated: Palácio da Bolsa removed (no image asset available). Six logo items remain.
- Logos self-hosted under `images/logos/`. SVG logos (Randstad, Verisure, CGD) preprocessed to white paths. PNG logos (SAP, Yeatman, RCV) have transparent backgrounds and use `filter: invert(1)`.
- Randstad rebuilt as stacked SVG (mark above wordmark) to solve readability at small size.
- RCV cropped to wordmark only — heraldic crest removed from crop.
- Position: between service cards and "One partner. Every system." CTA banner.

### Service card icons replaced (homepage)
- Old: custom inline SVG icons in brand green.
- New: four PNG icons extracted from uploaded icon sheet (spotlight motif per service), rendered white via `filter: invert(1)` on gradient backgrounds.
- Grainy gradient backgrounds generated as SVG files using `feTurbulence` filter — no raster files.
- Gradient colour map: Show Design (blue→green), Show Control (black→steel blue), System Architecture (dark blue shift), Technical Direction (blue→forest green).

### Stock images replaced on Services page
- Four Unsplash images removed.
- Replaced with gradient panels matching the homepage card gradients, centred icon at 120px.
- No external image requests on the services page.

### Scroll anchor fix on Services page
- `scroll-margin-top: 136px` added to `.service-section`.
- Fixed: section headings were being obscured by the sticky tab nav (68px main nav + 52px tab nav + 16px breathing room) when jumping to anchors.

### "From the field" project story section added to About page
- New section between founder block and contact form on both `about.html` and `pt/about.html`.
- Single story card, placeholder content: corporate awards ceremony, signal routing problem, System Architecture service.
- Structure: service tag + context meta, headline, two body paragraphs, pull quote with role attribution.
- Design: green left border accent, subtle green quote background, max-width 680px body.
- Section title ("From the field / How it works in practice") scales to multiple stories without structural change.
- Placeholder quote: "We've never had a load-in this clean." — Production Manager.
- To be replaced with a real named project when available.

---

## Persistent decisions (apply to all versions)

### Technology stack
- Pure HTML/CSS/JS. No framework. No build step.
- Hosted on GitHub Pages. DNS via GoDaddy.
- Forms: Web3Forms (contact), MailerLite (newsletter).
- Access key (Web3Forms): `2b0f7125-de63-40f7-9f81-674a1026f915`
- MailerLite account: `2252485`, form ID: `gZXg1D`

### Brand tokens
- Page background: `#021829` (blue-700)
- Accent: `#33fb31` (green-500)
- Display font: Space Mono
- Body font: Nunito

### Language structure
- EN pages: root (`/`)
- PT pages: `/pt/` subdirectory
- Lang switcher in every nav (desktop + mobile)
- All content changes must be mirrored to PT equivalents

### File structure conventions
- `images/` — hero, logo-mark, favicon, og-image
- `images/logos/` — client logo files
- `images/icons/` — service icons
- `images/gradients/` — SVG grain gradients per service
- `pt/` — Portuguese mirror of all EN pages

### Pages currently hidden from navigation (not deleted)
- `resources.html` + `pt/resources.html` — roadmap, hidden as of v1.40
- `.founder` section on About — hidden as of v1.40, content preserved

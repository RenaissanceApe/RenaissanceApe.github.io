# Lumen and Pixel — Website Changelog

Tracks locked-in changes to lumenandpixel.com.
Brainstorming and exploratory discussions are excluded.
Format: version → date → what changed and why.

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

## v1.42 — May 2026

### Contact form migrated from Web3Forms to n8n

Both `about.html` and `pt/about.html` contact forms replaced. Web3Forms dependency removed entirely.

**What changed:**
- Removed `action="https://api.web3forms.com/submit"` and `method="POST"` from form element
- Removed hidden fields: `access_key`, `subject`, `botcheck`, `redirect`, `lead_source`, `entry_page`, `quiz_result`
- Form now submits via JavaScript `fetch()` POST to `https://n8n.lumenandpixel.com/webhook/inbound-lead`
- Added `id="form-submit-btn"` to submit button for JS targeting

**n8n payload fields:**

| Key | Source | Notes |
|---|---|---|
| `name` | `#contact_person` | Required |
| `company` | `#organization` | Optional |
| `email` | `#email` | Required |
| `service` | `#service` select | English value regardless of page language |
| `message` | `#message` | Required |
| `source` | hardcoded | "Website" (EN) / "Website PT" (PT) |
| `entry_page` | hardcoded | "About page" (EN) / "Página Sobre (PT)" (PT) |
| `quiz_result` | URL param `?service=` | Populated from quiz routing |

**Behaviour:**
- On success: `window.location.href = 'thank-you.html'` (same redirect as before)
- On error: inline status message in brand colours (green-500 success, #e05c5c error)
- Button disabled + text changed to "Sending…" / "A enviar…" while request is in flight
- Client-side validation: name, email, message required before fetch fires

**Preserved from previous implementation:**
- Quiz result URL param pre-fill (`?service=SD/SC/SA/TD`)
- Smooth scroll and hash routing (`#contact-form`)
- All form field labels, placeholders, and select options unchanged
- Privacy Policy note with link to `legal.html#privacy`

**Webhook URL:** `https://n8n.lumenandpixel.com/webhook/inbound-lead`
Confirm this matches the exact webhook path configured in your n8n workflow.

---



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

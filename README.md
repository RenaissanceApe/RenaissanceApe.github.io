# lumenandpixel.com

Source for **www.lumenandpixel.com** — a bilingual (EN/PT) static site served by
GitHub Pages from `main`. The custom domain is set in `CNAME`.

There is no build step. Pages are plain HTML and can be edited directly in the
GitHub web UI; whatever is on `main` is what is live.

## Layout

```
index.html, about.html, services.html, quiz.html,        English pages
resources.html, legal.html, 404.html, thank-you.html
pt/…                                                     Portuguese mirrors
field-notes/, pt/field-notes/                            Field Notes hubs + article templates
site.css, site.js                                        Shared styles and behaviour
fonts.css, fonts/                                        Self-hosted webfonts
images/                                                  Logos, icons, gradients
CHANGELOG.md                                             What changed, and why
```

## Shared files — read this before editing a page

Every nav-bearing page loads these four lines, and they should stay:

```html
<link rel="stylesheet" href="/site.css" />
<noscript><style>.reveal{opacity:1;transform:none;}</style></noscript>
<script>window.__lpRevealFailsafe=setTimeout(…,4000);</script>
<script src="/site.js" defer></script>
```

- **`site.js`** owns scroll-reveal and the mobile menu (open/close, Escape,
  focus trap, scroll lock). **Do not paste that logic back into a page** — it
  used to be duplicated across 14 files, which is how one page stayed broken
  while the others were fixed.
- **`site.css`** holds reduced-motion support, mobile-menu focus safety, `svh`
  units and the form honeypot style. It loads *after* each page's inline
  `<style>` and wins on cascade order, so the inline blocks need no changes.
- **`fonts.css`** serves Space Mono and Nunito from `/fonts/`.
- The inline `<script>` failsafe reveals content if `site.js` ever fails to
  load. `site.js` cancels it on startup.

Page-specific JavaScript (contact form, quiz, Field Notes filter, newsletter)
stays inline on its own page.

## No third-party code in the browser

A page load makes **zero off-origin requests**. No analytics, no tracking, no
embedded marketing scripts, no CDN fonts — so the site sets no cookies and needs
no consent banner. Keep it that way: anything new that runs in the visitor's
browser changes the site's legal position and means updating `legal.html` and
`pt/legal.html`.

Services are called **server-side only**, after the visitor submits something:

| Endpoint | Used by |
|---|---|
| `…/webhook/inbound-lead` | contact form (`about.html`, `pt/about.html`) |
| `…/webhook/newsletter-signup` | newsletter (`index.html`, `pt/index.html`) |

Both live in n8n Cloud. See `CHANGELOG.md` v1.45 for the newsletter payload and
the double opt-in / unsubscribe behaviour the workflow is expected to provide.

## Working on both languages

EN and PT pages are separate files that must be changed together. The language
switcher links each page to its counterpart; the logo always points at the home
page **of the current language**. The quiz passes its result to the contact form
as `?service=SD|SC|SA|TD` — both languages use the same English `<option>`
values, only the labels are translated.

## Checking your work

```bash
python3 -m http.server 8000     # then browse http://localhost:8000
```

Worth checking after any change: the page at 375px wide with the mobile menu
open, the page with JavaScript disabled, and — if you touched a form — that a
malformed email is rejected.

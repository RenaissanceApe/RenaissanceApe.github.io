/* ─── LUMEN AND PIXEL — SHARED PAGE BEHAVIOUR ──────────────────────────────
   Loaded with `defer` on every page, so the DOM is parsed before this runs.

   Replaces the scroll-reveal and mobile-menu snippets that were previously
   copy-pasted into each page's inline <script>. Page-specific behaviour
   (the contact form, the quiz, the Field Notes filter) stays inline.
   ────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  var motionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  var prefersReducedMotion = motionQuery ? motionQuery.matches : false;

  function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }


  /* ── Scroll reveal ──────────────────────────────────────────────────────
     `.reveal` elements start at opacity:0 and are only made visible from
     here, so anything that prevents this running would leave large parts of
     the page permanently blank. Both fallbacks below fail *open*: if we
     can't observe scrolling, we show everything immediately.               */

  /* Each page arms a timer that reveals everything after a few seconds. It
     exists for the case where this file is blocked or fails to load — without
     it, .reveal content would stay at opacity:0 forever. We got here, so the
     timer isn't needed. */
  if (window.__lpRevealFailsafe) {
    clearTimeout(window.__lpRevealFailsafe);
    window.__lpRevealFailsafe = null;
  }

  var revealables = toArray(document.querySelectorAll('.reveal'));

  function revealAll() {
    revealables.forEach(function (el) { el.classList.add('visible'); });
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealables.forEach(function (el) { observer.observe(el); });
  }


  /* ── Mobile menu ────────────────────────────────────────────────────────*/

  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
                  'select:not([disabled]), textarea:not([disabled]), ' +
                  '[tabindex]:not([tabindex="-1"])';

  var isOpen = false;

  /* Only elements that are actually rendered — on desktop the menu is
     display:none and this correctly returns nothing. */
  function menuFocusables() {
    return toArray(menu.querySelectorAll(FOCUSABLE)).filter(function (el) {
      return el.offsetParent !== null;
    });
  }

  function setOpen(open, restoreFocus) {
    if (open === isOpen) return;
    isOpen = open;

    menu.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute(
      'aria-label',
      open ? 'Close navigation menu' : 'Open navigation menu'
    );
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      var first = menuFocusables()[0];
      if (first) first.focus();
    } else if (restoreFocus !== false) {
      hamburger.focus();
    }
  }

  hamburger.addEventListener('click', function (event) {
    /* Keep this click from reaching the outside-click handler below. */
    event.stopPropagation();
    setOpen(!isOpen);
  });

  /* Following a link closes the menu; don't pull focus back to the
     hamburger, since we're navigating away. */
  menu.addEventListener('click', function (event) {
    if (event.target.closest && event.target.closest('a')) {
      setOpen(false, false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (!isOpen) return;

    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;

    /* The menu is marked aria-modal, so focus has to stay inside it.
       The hamburger sits before the menu in the DOM and doubles as the
       close button, so it belongs at the head of the loop. */
    var loop = [hamburger].concat(menuFocusables());
    if (loop.length < 2) return;

    var first = loop[0];
    var last = loop[loop.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (!isOpen) return;
    if (menu.contains(event.target) || hamburger.contains(event.target)) return;
    setOpen(false, false);
  });

  /* Crossing back to the desktop breakpoint hides the menu via CSS but
     leaves `body { overflow: hidden }` behind, which locks scrolling for
     the rest of the session. Release it explicitly. */
  var desktopQuery = window.matchMedia
    ? window.matchMedia('(min-width: 901px)')
    : null;

  function handleBreakpointChange(event) {
    if (event.matches) setOpen(false, false);
  }

  if (desktopQuery) {
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', handleBreakpointChange);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(handleBreakpointChange);
    }
  } else {
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setOpen(false, false);
    });
  }
})();

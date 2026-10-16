/**
 * Localhost navigation helper (injected into the mirrored pages).
 * Forces real full-page navigations for internal links so the site works
 * from a static file server without Next.js RSC endpoints.
 */
(function () {
  document.addEventListener(
    "click",
    function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var el = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!el) return;
      var href = el.getAttribute("href");
      if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return;
      if (el.hasAttribute("download") || (el.target && el.target !== "_self")) return;
      var u;
      try { u = new URL(href, location.href); } catch (err) { return; }
      if (u.origin !== location.origin) return; // external links keep default behaviour
      e.preventDefault();
      e.stopImmediatePropagation();
      location.href = u.pathname + u.search + u.hash;
    },
    true
  );
  // Next.js RSC prefetches have no endpoint on a static mirror - answer them
  // with a plain 404 so the router treats the prefetch as skipped.
  var origFetch = window.fetch;
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    var hdrs = (init && init.headers) || (input && input.headers) || null;
    var wantsRsc = url.indexOf("_rsc=") !== -1;
    if (hdrs) {
      try {
        wantsRsc = wantsRsc || (typeof hdrs.get === "function" ? hdrs.get("RSC") : hdrs.RSC || hdrs.rsc);
      } catch (err) {}
    }
    if (wantsRsc) {
      return Promise.resolve(new Response("", { status: 404 }));
    }
    return origFetch.apply(this, arguments);
  };
})();

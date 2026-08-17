Security & maintenance notes

Applied changes (per your request):

- Optimized Service Worker (sw.js): reduced the precache to essential navigation assets and added safer runtime caching logic.
  - Previously the SW precached a very large collection of font files (hundreds of .woff2 files). That can cause slow installs, high data usage and cache quota problems on mobile devices. Now fonts/images/scripts/styles are cached at runtime when requested using a cache-first strategy, while navigation requests use a network-first strategy with a fallback to index.html.
  - The runtime caching explicitly avoids caching API-like paths ("/__/", "/api/", paths containing "firebase") to prevent accidental caching of dynamic or sensitive responses.

- Did NOT change Firebase database.rules.json per your instruction (no auth restriction applied). The repo is private and current rule allowing read/write for trips/japan-osaka-2026 is retained.

Nice-to-have / next steps (I can implement on request):

1) Move personal data into an external template (js/data.private.template.json) or store runtime-loaded JSON and keep the repo copy minimal. I added a template file to help with that. If you want, I can modify app.js to fetch the JSON instead of embedding a JS file.

2) Add stricter Firebase validation rules only when you decide to enable auth (require owner uid and validate data shape).

3) Split large data.js into per-page JSON blobs and lazily load them to reduce FCP.

Notes about the SW changes:
- The new SW still precaches key files to allow offline loading of the main app shell.
- Fonts and many static vendor assets are cached on first request, which avoids a huge install step while still supporting offline after the first use.
- If you prefer to move fonts to a CDN or use a variable-subset font to reduce size further, I can prepare that change.

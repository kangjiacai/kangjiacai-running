# Surface brief — 430 / HEFEI

- Mode: Operate.
- Audience: one runner preparing for the 2026 Hefei Marathon, using the page several times a week on desktop and mobile.
- Primary job: immediately see the current training week, check off completed sessions, and leave a short note; then inspect the whole ten-week plan and long-run fueling instructions.
- Approved direction: “蓝图配速簿”, a Chinese surveyor field notebook fused with a cobalt architectural blueprint. Approved comp: `.impeccable/mocks/approved-blueprint.png`.
- Memorable moment: the ten-week marathon route is drawn as a surveyed contour through the page, with the active week pinned in chartreuse and the 4:30 target acting as a monumental left-hand binding.
- Visual language: deep cobalt, warm bone paper, graphite ink, chartreuse signal; square technical geometry, thin drafting lines, ruled note paper, condensed display type, tabular data. No gradients, glass, generic card grids, decorative pills, or fake photography.
- Interaction: shadcn Checkbox and Textarea primitives; each session can be checked; each week has a saved note. State persists only in localStorage under a versioned key. No authentication or backend.
- Responsive rule: preserve the route hierarchy on narrow screens; the blue spine becomes a compact masthead, week navigation scrolls horizontally, and the note sheet follows the current-week checklist.
- Motion: one route-drawing reveal on first load with an already-visible fallback; honor reduced motion.
- Data constraints: race is 2026-11-08 at 07:30; goal is 4:30 at 6'24\"/km. Weekly availability is Monday 19:00–20:00, Thursday preferred with Friday backup 19:00–20:00, and flexible weekends. The final Sunday is the race, not a training long run.
- Accessibility: Chinese page language, 44px touch targets where practical, explicit checkbox labels, visible focus, non-color current-state marker, AA text contrast, and meaningful section headings.
- Visual inventory:
  - Required: one seamless cobalt blueprint-paper texture behind blueprint surfaces; no embedded text.
  - Reusable primitives: shadcn Checkbox and Textarea, Button only when an actual action needs it.
  - Vector geometry: authored SVG for the ten-week route and distance profile; geometry is functional data visualization, not illustration.
  - Social preview: one branded landscape image generated only after the first meaningful preview.

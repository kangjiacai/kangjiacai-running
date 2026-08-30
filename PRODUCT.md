# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing scaffold: Vinext, React 19, TypeScript, Tailwind CSS, and shadcn components. The user delegated implementation choices by asking for a complete web page without naming a framework.

## Users

- Primary user: the runner who supplied the Garmin activity history and is preparing for the 2026 Hefei Marathon.
- Inferred from the explicit brief: personal, frequent use on desktop and mobile during the ten-week training block.

## Product Purpose

Turn the runner's sub-4:30 marathon plan into an execution surface: understand the current week, check off completed sessions, review long-run fueling, and record short notes. Success means the runner can open the page and immediately know what to do next without consulting the conversation history.

## Positioning

This is a personal race campaign board built around one real training calendar and one finish-line target, not a general fitness dashboard or social running product.

## Operating Context

- Race: Hefei Marathon, 2026-11-08, 07:30 start.
- Weekly availability: Monday 19:00–20:00; one flexible evening on Thursday or Friday from 19:00–20:00; Saturday and Sunday available.
- Preferred weekly rhythm: Monday recovery, Thursday preferred for quality work, Saturday easy, Sunday long run.
- Default goal: finish in 4:30 at 6'24"/km.
- 4:20–4:25 is only evaluated after all three gates pass: the W07 peak long run, the final 6 km at marathon pace in W08, and a tolerated 55–60 g/h fueling strategy. If any gate fails, 4:30 remains the target.

## Capabilities and Constraints

- One responsive route containing the complete ten-week plan.
- Simple per-session todo completion controls.
- Per-session completion and per-week notes persist only in versioned browser `localStorage`; there is no account, backend, sharing, or cloud sync.
- On mobile, show the current week's executable tasks before the ten-week route.
- Show pace vocabulary, long-run fueling guidance, race-week schedule, and target decision gates.
- All training facts must remain consistent with the approved conversation plan; do not invent medical claims or race logistics.

## Brand Commitments

- Working product name: `430 / HEFEI`.
- Simplified Chinese interface.
- User explicitly requested a high-end, high-status presentation rather than a generic fitness template.
- Durable visual world: “蓝图配速簿” — deep cobalt engineering blueprint paper, warm bone field-note paper, graphite ink, and fluorescent-yellow signals.
- Use square technical geometry, thin drafting lines, ruled paper, and the surveyed ten-week route; avoid glass, generic card grids, decorative pills, and fabricated photography.
- Use Barlow Condensed for numeric and English display typography. Keep Chinese body copy at a normal weight and prioritize reading clarity.

## Evidence on Hand

- Garmin source data: `/Users/kangjiacai/Downloads/Activities (1).csv`.
- Confirmed plan and fueling decisions from the current conversation.
- Visual build path: `comp-first`.
- Approved visual authority: `.impeccable/mocks/approved-blueprint.png`; surface contract: `.impeccable/surfaces/app-page-tsx.md`.
- No logo, photography, official race assets, sponsor marks, or verified course map were provided; future work must not fabricate them.

## Product Principles

1. The next executable session outranks historical analytics.
2. Progress should feel earned through completed training, not gamified through invented scores.
3. Race ambition stays paired with visible endurance and fueling checkpoints.
4. The page must work as a private field notebook on both phone and desktop.

## Accessibility & Inclusion

Use semantic controls, visible focus states, keyboard-operable todo and notes interactions, sufficient contrast, and reduced-motion support.

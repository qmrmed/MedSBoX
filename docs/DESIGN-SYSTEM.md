# MedSBoX Pro — Brand & Design System

## Status

Phase 2 — Brand & Design System.

The uploaded MedSBoX identity sheet is the visual source of truth. This phase does **not** replace the logo, symbol, `Pro` treatment, or core identity.

## Brand direction

- Premium medical technology
- Contemporary and official
- Calm, precise, and trustworthy
- Blue / cyan primary energy with restrained violet accents
- Deep navy foundations for the flagship dark experience
- Clean light surfaces for daylight use
- Glass used selectively for depth, not as decoration everywhere
- Glow used as an accent, never as the primary information hierarchy

## Logo rules

Approved assets already present in `assets/img/` are canonical:

- `medsbox-app-icon.svg` — application icon
- `medsbox-brand-mark.svg` — circular logo mark
- `medsbox-logo-mark.svg` — full lockup for dark surfaces
- `medsbox-logo-mark-light.svg` — approved light-surface lockup
- PNG variants remain available for contexts that require raster assets

Do not redraw or restyle the M symbol. Do not alter the Pro badge geometry. Do not apply arbitrary gradients to the logo itself.

## Color architecture

The production CSS uses semantic tokens rather than scattering raw colors through components.

### Brand

- Brand blue: `--msb-brand-500`
- Strong blue: `--msb-brand-600`
- Cyan accent: `--msb-brand-400`
- Violet accent: `--msb-violet-500`
- Deep navy: `--msb-navy-950` through `--msb-navy-700`

### Semantic roles

- `--msb-color-text`
- `--msb-color-text-secondary`
- `--msb-color-text-muted`
- `--msb-color-surface`
- `--msb-color-surface-elevated`
- `--msb-color-border`
- `--msb-color-primary`
- `--msb-color-success`
- `--msb-color-warning`
- `--msb-color-danger`
- `--msb-color-info`

Components should consume semantic roles, not hard-coded palette values.

## Typography

Primary UI family: Inter with Plus Jakarta Sans used for display and controls.

Hierarchy:

- Display: `--msb-text-3xl`
- Section heading: `--msb-text-2xl`
- Large UI heading: `--msb-text-xl`
- Body: `--msb-text-md`
- Supporting text: `--msb-text-sm`
- Caption: `--msb-text-xs`

Body copy remains readable and relaxed. Headings use tighter metrics and strong hierarchy.

## Spacing

The system uses a 4px base with an 8px rhythm for primary layout decisions. Tokens range from `--msb-space-1` through `--msb-space-12`.

## Shape

- Small controls: 12px
- Standard controls: 16px
- Cards: 20–28px
- Hero surfaces: up to 32px
- Pills: 999px

Corners should feel soft and contemporary without making every object look inflated.

## Glass policy

Glass is intentionally limited. Critical text must remain on sufficiently opaque surfaces and never depend on a busy blurred background for legibility.

Recommended distribution:

- Mostly solid / readable surfaces
- Selective glass for navigation, hero layers, floating controls, and premium cards
- Small amounts of glow and gradient for focus and brand expression

Backdrop blur is kept to a small number of surfaces to protect performance.

## Interaction states

Every interactive component must provide:

- Default
- Hover
- Active / pressed
- Focus-visible
- Disabled
- Loading where applicable
- Error / validation where applicable

The minimum interactive target is 44px.

## Accessibility

Accessibility is part of the foundation, not a later polish step. The system provides visible focus tokens, semantic states, reduced-motion behavior, forced-colors handling, and touch-target sizing.

Color must not be the only way to communicate status.

## Motion

Motion should communicate hierarchy and state:

- Fast: 160ms
- Normal: 220ms
- Slow: 420ms

Use the shared easing token and always respect `prefers-reduced-motion`.

## Theme architecture

The system supports:

- System preference
- Light
- Dark

The same semantic roles are retained across themes so components do not need separate markup or ad-hoc color overrides.

## Component contract

Future shared components should consume these tokens and expose variants instead of inventing page-specific styling.

Core component families:

- Navigation
- Buttons
- Inputs
- Cards
- Badges
- Tabs
- Search / filters
- Tables
- Modals
- Toasts
- Empty states
- Loading states
- Error states

## Quality gate

A component is not considered design-system compliant until it has been checked for hierarchy, responsive behavior, keyboard focus, contrast, reduced motion, and both light/dark themes.

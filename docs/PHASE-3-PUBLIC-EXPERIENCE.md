# Phase 3 — Public Website & Library Experience

Version target: **v1.5.0**

## Objective

Turn the approved MedSBoX Pro design foundation into a coherent, premium and usable public product experience without changing the approved brand identity or the account-free customer architecture.

## Scope

- Homepage hierarchy, conversion path and live catalog presentation.
- Library discovery, search, category navigation, cards, modal/detail states and protected-download messaging.
- Offers presentation, campaign hierarchy and subscriber-first download messaging.
- Apple Store device/catalog hierarchy and responsive presentation.
- Subscription plan selection, payment handoff, reference visibility and support CTA.
- Activation form, validation feedback and recovery path.
- Shared header, active navigation, theme control, mobile quick navigation and footer.
- Loading, empty, focus, hover, active and error states.
- Compact phone, tablet and desktop breakpoints.
- Reduced-motion and keyboard interaction safeguards.

## Acceptance gate

- [x] Public experience layer is implemented without introducing a new runtime dependency.
- [x] Canonical brand assets remain the visual source of truth.
- [x] Glass treatment is restrained and keeps content readable.
- [x] Navigation has visible active state and keyboard-friendly interaction.
- [x] Mobile quick navigation is safe-area aware and hides while scrolling down.
- [x] Library, Offers, Apple Store, Subscription and Activation receive consistent surface and interaction treatment.
- [x] Loading/empty states are visible when live catalog content is unavailable.
- [x] Focus-visible states are preserved for keyboard and switch-device navigation.
- [x] Reduced-motion behavior is independent of the selected color theme.
- [ ] Local project audit and release check pass after the final v1.5.0 tree is pulled.
- [ ] Production deployment and post-deploy smoke verification are performed only after the milestone is approved.

## Deployment rule

No Firebase deployment is part of this phase implementation itself. Deployment remains the final controlled step after the complete milestone tree passes local QA.

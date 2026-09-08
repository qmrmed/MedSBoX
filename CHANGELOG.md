# MedSBoX Pro Changelog

## v1.7.0 — Commerce, Subscriptions & Activation

- Android checkout now creates a real pending order before the Telegram handoff.
- Checkout references are deterministic order IDs and repeated clicks in one session reuse the same order.
- Firestore Rules verify that order amount and currency match the active subscription plan.
- Admin activation-code issuance is atomic: the code and `code_issued` order state commit together.
- Issued codes remain portable across devices while retaining an immutable order linkage.
- Activation validates the active plan, duration integrity and issued-order linkage before granting access.
- Subscription activation and code consumption remain one transaction.
- Expired subscriptions are denied by the subscriber security rule without depending on client cleanup.
- Strengthened the Admin and activation security contract without introducing password-based public accounts.
- Added the Phase 5 commerce/activation acceptance documentation and release gate.

## v1.6.0 — Apple Store & Offers Experience

- Upgraded the Apple Store public catalog with live search and result feedback.
- Added category filtering that works with the live Firestore Apple catalog instead of hardcoded records.
- Improved Apple plan presentation by prioritizing Admin-featured plans and then price.
- Preserved device-specific protected Telegram delivery and account-free checkout handoff.
- Added explicit offer lifecycle classification so hidden, upcoming and expired campaigns never appear as live public offers.
- Added public Offers search plus Android/Apple platform filtering.
- Preserved priority ordering and Admin scheduling as the campaign source of truth.
- Kept protected offer download URLs in `offerDownloads` rather than public offer records.
- Added responsive toolbar styling and explicit filtered-result behavior for compact screens.
- Expanded the phase documentation and release gate for the Apple/Offers product layer.

## v1.5.0 — Public Website & Library Experience

- Applied the approved MedSBoX Pro Brand & Design System as a dedicated public-experience layer across the storefront, Library, Offers, Apple Store, Subscription and Activation journeys.
- Improved public navigation, Library discovery, Offers, Apple Store, Subscription and Activation presentation.
- Added responsive breakpoints and accessibility safeguards without introducing a new dependency.

## v1.4.0 — Brand & Premium Design System

- Established the approved MedSBoX Pro identity sheet as the visual source of truth.
- Added a semantic token-based design system covering brand colors, surfaces, typography, spacing, shape, elevation, glass, motion, and accessibility.
- Preserved the canonical MedSBoX app icon, logo mark, full lockup, light lockup, and `Pro` treatment.
- Added consistent focus-visible states, 44px interactive targets, reduced-motion and forced-colors safeguards.

## v1.3.0 — Foundation & Architecture

- Established runtime architecture, trust boundaries, Firestore data contracts, security architecture and development conventions.
- Added version-controlled Firestore indexes and explicit Storage Rules wiring.
- Prevented Firebase infrastructure files from being published as Hosting assets.

## v1.2.2 — Complete storefront, UX & flow audit

- Completed the repository-wide storefront, Library, Offers, Subscription, Activation and Apple Store audit.
- Removed visible account registration/sign-in dependency from the customer journey while preserving technical anonymous sessions where required.
- Fixed Android pricing at **$10 / year** and **$25 one time** and hardened Apple checkout handoff.
- Protected download collections and activation integrity were preserved.

## v1.2.1 — Major architecture, security & experience release

- Unified public catalogs around live Firestore data.
- Added protected download collections and hardened activation/order rules.
- Reworked Apple Store around live Admin-controlled applications and plans.

## v1.1.1 — Catalog, Apple Store & Activation hardening

- Added Admin-controlled catalog seeding and Apple Store data management.
- Hardened activation-code handling and protected download delivery.

## v1.1.0 — Offers & Ads

- Added live Offers and campaign presentation.
- Added protected offer download delivery and related Admin controls.

## v1.0.1 — Maintenance

- Applied stability and presentation fixes after the initial stable release.

## v1.0.0 — Initial stable release

- First stable MedSBoX Pro storefront, library and Admin architecture.

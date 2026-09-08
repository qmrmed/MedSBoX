# MedSBoX Pro Changelog

## v1.5.0 — Public Website & Library Experience

- Applied the approved MedSBoX Pro Brand & Design System as a dedicated public-experience layer across the storefront, Library, Offers, Apple Store, Subscription and Activation journeys.
- Added a shared premium surface treatment with controlled blur, readable contrast, subtle depth and consistent interaction states.
- Improved public navigation with clearer active-page indication, keyboard support, mobile ergonomics and safe-area aware bottom navigation.
- Improved Library discovery with stronger search focus states, category interactions, catalog-card depth and live/empty-state presentation.
- Improved Offers and Apple Store presentation with clearer hierarchy, responsive cards and consistent campaign/catalog interactions.
- Refined Subscription and Activation surfaces for clearer conversion hierarchy, reference visibility, form focus states and support handoff.
- Added responsive breakpoints for compact phones, tablets and desktop layouts without introducing a new dependency.
- Corrected the reduced-motion guard in shared navigation so accessibility behavior is independent of the current color theme.
- Added Escape-key handling for the theme menu and tightened public navigation behavior.
- Preserved the approved MedSBoX Pro identity assets and account-free customer journey.

## v1.4.0 — Brand & Premium Design System

- Established the approved MedSBoX Pro identity sheet as the visual source of truth.
- Added a semantic token-based design system covering brand colors, surfaces, typography, spacing, shape, elevation, glass, motion, and accessibility.
- Preserved the canonical MedSBoX app icon, logo mark, full lockup, light lockup, and `Pro` treatment without redesigning the identity.
- Activated the design system globally through the existing brand asset layer so public, catalog, subscription, activation, Apple Store, offers, and Admin surfaces share the same foundation.
- Introduced restrained glass treatment with readable surface opacity and controlled blur rather than decorative glass on every element.
- Added consistent focus-visible states and 44px minimum interactive targets.
- Added reduced-motion and forced-colors safeguards to the design foundation.
- Added documented typography, color semantics, spacing, component contracts, logo rules, glass policy, and motion rules.
- Expanded release integrity checks to verify the design-system foundation and canonical brand assets.

## v1.3.0 — Foundation & Architecture

- Established the MedSBoX runtime architecture and explicit trust boundaries.
- Documented domain ownership for catalog, commerce, access, administration and protected downloads.
- Defined the Firestore data model, field contracts and subscription/activation lifecycle invariants.
- Documented the security architecture and trusted-operation boundaries for Cloud Functions, Firestore Rules and Storage.
- Added development conventions covering modules, data validation, error states, accessibility, performance and release discipline.
- Added version-controlled Firestore composite indexes for subscription-expiry processing.
- Wired `firestore.indexes.json` into Firebase configuration.
- Wired `storage.rules` into Firebase configuration so Storage security rules are part of the controlled deployment configuration.
- Prevented Firebase infrastructure files from being published as Hosting assets.
- Added Phase 1 acceptance criteria and aligned the release roadmap with the long-term MedSBoX Pro master plan.

## v1.2.2 — Complete storefront, UX & flow audit

- Completed a repository-wide public experience audit across Home, Library, Offers, Subscription, Activation, Apple Store and shared navigation.
- Removed the visible account-registration/sign-in dependency from the customer journey.
- Kept invisible Firebase anonymous sessions only where authenticated Firestore access is required; customers never see or manage an account.
- Fixed the Android subscription path so Annual is **$10 / year** and Lifetime is **$25 one time**, independent of stale catalog pricing.
- Added a safe Apple Store checkout handoff so an `ios-*` plan is resolved from the live Admin-controlled Apple plans instead of silently becoming the Android Annual plan.
- Reworked download gating so protected downloads require an active subscription while unauthenticated visitors are sent to the subscription/activation path.
- Preserved protected Telegram download collections and subscriber-only Firestore access.
- Improved public homepage messaging for the 100+ Android application catalog and the two commercial plans.
- Preserved mobile navigation, safe-area behavior, Liquid Glass motion, page entry/reveal transitions, reduced-motion handling, and light/dark visual consistency.
- Normalized legacy public links that attempted to open registration/login so they resolve to the subscription flow.
- Kept Admin authentication separate from the public customer experience.
- Expanded release integrity checks for account-free checkout, fixed subscription pricing, public flow, protected downloads, live catalogs, Admin sections and Firestore security.
- Fixed the project audit's JavaScript regex escaping so the audit itself runs correctly under current Node.js releases.
- Updated project documentation to match the account-free customer architecture.

## v1.2.1 — Major architecture, security & experience release

- Unified the public catalog around live Firestore data and removed runtime dependence on a hardcoded Library fallback.
- Added protected application, offer, and Apple download collections so private Telegram delivery links are not part of public catalog metadata.
- Added automatic migration of legacy application Telegram links into protected `appDownloads` records.
- Reworked the Apple Store around live Admin-controlled applications and plans.
- Hardened Annual/Lifetime activation with one-time transactional code consumption and plan/duration validation.
- Added final Firestore activation-expiry integrity checks.
- Added a dedicated Activation Code Manager.
- Strengthened order creation validation in Firestore.
- Strengthened Hosting behavior and added a branded 404 recovery experience.
- Added stable hash navigation for Admin sections and a release integrity gate.

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

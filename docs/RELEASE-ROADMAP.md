# MedSBoX Pro Release Roadmap

The roadmap is organized as product milestones. Each milestone may contain multiple engineering commits, but production deployment is gated by the full milestone acceptance criteria.

## v1.2.2 — Production baseline

Current baseline for the account-free customer journey, live catalog, subscription plans, activation flow, protected downloads and Firebase Rules hardening.

## v1.3.0 — Foundation & Architecture

Phase 1 establishes the technical contract before major UX work:

- runtime architecture and trust boundaries;
- domain ownership and collection responsibilities;
- Firestore data model and lifecycle invariants;
- security architecture and privileged-operation boundaries;
- development conventions;
- version-controlled Firestore indexes;
- explicit Storage Rules wiring in Firebase configuration;
- phase acceptance criteria.

See `docs/PHASE-1-FOUNDATION.md`.

## v1.4.0 — Brand & Design System

Phase 2 establishes the visual source of truth before deeper page redesign:

- preserve the approved MedSBoX identity sheet and canonical logo family;
- semantic brand and surface tokens;
- typography and spacing scales;
- shape, elevation and depth rules;
- controlled glass and restrained glow treatment;
- light and dark semantic themes;
- component interaction states;
- 44px touch targets and visible focus states;
- reduced-motion and forced-colors safeguards;
- reusable motion tokens;
- design-system documentation and release integrity checks.

See `docs/DESIGN-SYSTEM.md`.

## v1.5.0 — Public Website & Library

Phase 3 applies the design foundation to the complete public customer journey:

- premium homepage hierarchy and clearer conversion path;
- Library discovery, search, categories, cards, detail/modal states and access messaging;
- Offers campaign presentation and subscriber-first download messaging;
- Apple Store device/catalog hierarchy and responsive presentation;
- Subscription plan selection, payment handoff, order-reference visibility and support CTA;
- Activation form, validation feedback and recovery path;
- shared header, active navigation, theme control, mobile quick navigation and footer;
- loading, empty, focus, hover, active and error states;
- compact-phone, tablet and desktop responsive behavior;
- reduced-motion and keyboard interaction safeguards;
- no new runtime dependency and no change to the approved brand identity.

See `docs/PHASE-3-PUBLIC-EXPERIENCE.md`.

## v1.6.0 — Apple Store & Offers

Build the Apple catalog experience and a complete offer/promotion lifecycle.

## v1.7.0 — Commerce, Subscriptions & Activation

Harden the complete order-to-access journey, including lifecycle states, idempotency, subscription access and activation integrity.

## v1.8.0 — Admin Control Center & Operations

Turn Admin into a real control center with catalog, commerce, access, users, system controls, auditability and operational visibility.

## v1.9.0 — Security, Performance & Quality

Dedicated security hardening, performance engineering, accessibility verification, observability, privacy readiness and automated quality gates.

## v2.0.0 — MedSBoX Pro Production Milestone

The complete product milestone after all planned phases pass final QA, security review, release checks and production verification.

## Release discipline

- Do not deploy incomplete phases.
- Keep version and changelog aligned.
- Run the automated project/release checks before a release.
- Review Firebase Rules and infrastructure configuration before deployment.
- Prefer one controlled pull/deploy cycle after a milestone is fully ready.

# MedSBoX Pro Release Roadmap

## v1.2.2 — Production baseline
Account-free customer journey, live catalog, subscriptions, activation and protected downloads.

## v1.3.0 — Foundation & Architecture
Technical contracts, trust boundaries, data model and infrastructure.

## v1.4.0 — Brand & Design System
Approved identity and semantic design foundation.

## v1.5.0 — Public Website & Library
Complete public customer journey and responsive experience.

## v1.6.0 — Apple Store & Offers
Live Apple catalog, plan prioritization, offer lifecycle and platform filtering.

## v1.7.0 — Commerce, Subscriptions & Activation
Real orders, atomic code issuance, activation integrity and expiry enforcement.

## v1.8.0 — Admin Control Center & Operations
Operations metrics, stale-order/expiry/orphan detection, expiry reconciliation and immutable audit records.

## v1.9.0 — Security, Performance & Quality
Hosting security headers, cache policy and automated quality checks.

## v2.0.0 — Production Milestone

All planned engineering phases are consolidated into one production release candidate. The final gate now includes:

- repository integrity and JavaScript syntax;
- public customer-flow integrity;
- live catalog/Apple/Offers contracts;
- commerce/order/activation invariants;
- Admin Operations and audit controls;
- Firestore security boundaries;
- Hosting security headers and cache policy;
- page metadata/accessibility checks;
- one-command final release gate;
- post-deploy production smoke-test checklist.

See `docs/PRODUCTION-RELEASE-GATE.md`.

## Release discipline

- Do not call the milestone production-verified until the Firebase deployment and live smoke tests are actually performed.
- Keep version and changelog aligned.
- Run `node tools/final-release-gate.mjs` before deployment.
- Prefer one controlled pull/deploy cycle for the final candidate.

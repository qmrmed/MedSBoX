# MedSBoX Pro Release Roadmap

## v1.1.2 — Security & data hygiene

Implemented repository hardening for legacy public download links, local artifact hygiene, payment-plan fallback removal, Admin markup integrity, and release metadata.

## v1.1.3 — UX & navigation hardening

Target: make every public page predictable on mobile and desktop, improve empty/loading/error states, preserve theme preference, and keep navigation/context stable while moving between Library, Offers, Apple Store, Plans, and Activation.

## v1.1.4 — Admin Control Center

Target: consolidate overlapping Admin behavior, make Applications/Offers/Plans/Orders/Codes/Users/Apple Store controls deterministic, remove legacy handler conflicts, and make every CRUD action visibly confirm its result.

## v1.1.5 — Reliability & release QA

Target: regression-proof the subscription lifecycle, activation lifecycle, protected downloads, Firestore queries/rules, caching, and responsive layouts. The dependency-free release checker becomes a mandatory gate.

## v1.2.1 — Major architecture and experience release

This is the major milestone. Work is intentionally broader than a visual refresh:

- unify catalog/application data contracts;
- reduce duplicated Admin modules and event interception;
- strengthen Firestore field/type validation while preserving existing records;
- improve authentication/session routing and account states;
- make subscription, order, and activation states explicit and auditable;
- improve Library and Apple Store discovery and filtering;
- introduce a more systematic loading/error/empty-state UX;
- improve accessibility, responsive behavior, metadata, and performance;
- evaluate Firebase App Check as a separate security layer without enabling a configuration that could unexpectedly block existing users or introduce unwanted cost;
- keep every release change documented and regression-tested.

## Release discipline

Intermediate versions are recorded as engineering milestones even when deployment is intentionally postponed. A single local `git pull` may therefore bring multiple prepared release commits. Deployment happens only after the complete selected milestone has passed the release gate.

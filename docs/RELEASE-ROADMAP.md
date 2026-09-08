# MedSBoX Pro Release Roadmap

The roadmap is organized as product milestones. Each milestone may contain multiple engineering commits, but production deployment is gated by the full milestone acceptance criteria.

## v1.2.2 — Production baseline

Current baseline for the account-free customer journey, live catalog, subscription plans, activation flow, protected downloads and Firebase Rules hardening.

## v1.3.0 — Foundation & Architecture

Phase 1 establishes the technical contract before major UX work.

## v1.4.0 — Brand & Design System

Phase 2 establishes the visual source of truth before deeper page redesign.

## v1.5.0 — Public Website & Library

Phase 3 applies the design foundation to the complete public customer journey.

## v1.6.0 — Apple Store & Offers

Phase 4 turns the Apple Store and Offers surfaces into controlled product systems.

## v1.7.0 — Commerce, Subscriptions & Activation

Phase 5 hardens the order-to-access chain, real order creation, atomic code issuance, activation integrity and expiry enforcement.

## v1.8.0 — Admin Control Center & Operations

Phase 6 adds a live operations control room:

- cross-domain counts for Android/Apple catalogs, offers, plans, orders, codes and users;
- stale pending-order detection;
- expired active-account detection;
- orphaned activation-code detection;
- explicit expiry reconciliation;
- immutable Admin audit records;
- Firestore Rules remain the authority for access control.

See `docs/PHASE-6-ADMIN-OPERATIONS.md`.

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

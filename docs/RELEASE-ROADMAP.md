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

Build the MedSBoX visual language and reusable UI system before redesigning individual pages:

- brand identity;
- design tokens;
- typography;
- surfaces and controlled glass treatment;
- components;
- responsive rules;
- accessibility states;
- motion system.

## v1.5.0 — Public Website & Library

Deliver the premium public experience and a substantially improved medical application marketplace.

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

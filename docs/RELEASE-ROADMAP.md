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

Phase 4 turns the Apple Store and Offers surfaces into controlled product systems:

- live Apple catalog search, category filtering and device-aware presentation;
- live Apple subscription plan ordering with featured-plan prioritization;
- subscriber-only Apple download delivery with device-specific links;
- offer lifecycle handling for hidden, upcoming, live and expired campaigns;
- public offer search and Android/Apple platform filtering;
- protected offer delivery remains outside public catalog documents;
- admin-managed scheduling, priority, publication state and device links remain the source of truth;
- empty, unavailable and filtered-result states are explicit;
- no hardcoded public Apple catalog or offer records;
- no new runtime dependency and no change to the approved MedSBoX identity.

See `docs/PHASE-4-APPLE-OFFERS.md`.

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

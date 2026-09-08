# MedSBoX Pro Release Roadmap

The roadmap is organized as product milestones. Each milestone may contain multiple engineering commits, but production deployment is gated by the full milestone acceptance criteria.

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

Operations metrics, stale-order/expiry/orphan detection, expiry reconciliation and immutable Admin audit records.

## v1.9.0 — Security, Performance & Quality

Phase 7 hardens the production surface:

- secure Hosting response headers;
- reliable cache policy for HTML/JS/CSS/static assets;
- automated page metadata and accessibility checks;
- automated security/performance checks;
- continued Firestore security invariants;
- no new runtime dependency and no public secret exposure.

See `docs/PHASE-7-SECURITY-PERFORMANCE-QUALITY.md`.

## v2.0.0 — MedSBoX Pro Production Milestone

Final product milestone after the full release train passes local QA, security review, release checks and production smoke testing.

## Release discipline

- Do not deploy incomplete phases.
- Keep version and changelog aligned.
- Run all automated checks before a release.
- Review Firebase Rules and Hosting headers before deployment.
- Prefer one controlled pull/deploy cycle after the release train is fully ready.

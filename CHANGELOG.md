# MedSBoX Pro Changelog

## v1.9.0 — Security, Performance & Quality

- Added secure Firebase Hosting response headers: `nosniff`, strict referrer policy, restrictive Permissions Policy and HSTS.
- Added explicit HTML/JavaScript no-cache policies for reliable releases.
- Added short-lived CSS caching and longer-lived static asset caching.
- Added a repository security/performance quality checker.
- Added automated checks for page titles, viewport metadata, image alt attributes, security headers, cache policy and reduced-motion support.
- Preserved Firestore as the authoritative security boundary for protected data and subscriptions.

## v1.8.0 — Admin Control Center & Operations

- Added a live Admin Operations control room across catalog, commerce and access collections.
- Added stale pending-order, expired-account and orphaned-code detection.
- Added explicit expiry reconciliation for active accounts whose server expiry has passed.
- Added immutable Admin audit records for reconciliation actions.

## v1.7.0 — Commerce, Subscriptions & Activation

- Android checkout now creates a real pending order before the Telegram handoff.
- Checkout references are deterministic order IDs and repeated clicks in one session reuse the same order.
- Firestore Rules verify that order amount and currency match the active subscription plan.
- Admin activation-code issuance is atomic: the code and `code_issued` order state commit together.
- Issued codes remain portable across devices while retaining an immutable order linkage.
- Activation validates the active plan, duration integrity and issued-order linkage before granting access.
- Subscription activation and code consumption remain one transaction.
- Expired subscriptions are denied by the subscriber security rule without depending on client cleanup.

## v1.6.0 — Apple Store & Offers Experience

- Upgraded the Apple Store public catalog with live search and result feedback.
- Added category filtering, featured-plan prioritization, protected device delivery and offer lifecycle/filtering.

## v1.5.0 — Public Website & Library Experience

- Applied the approved MedSBoX Pro Brand & Design System across the public customer journey.
- Improved public navigation, Library discovery, Offers, Apple Store, Subscription and Activation presentation.

## v1.4.0 — Brand & Premium Design System

- Established the approved MedSBoX Pro identity sheet and semantic design-system foundation.

## v1.3.0 — Foundation & Architecture

- Established runtime architecture, trust boundaries, Firestore contracts and infrastructure wiring.

## v1.2.2 — Complete storefront, UX & flow audit

- Completed the repository-wide storefront, Library, Offers, Subscription, Activation and Apple Store audit.
- Removed visible account registration/sign-in dependency and fixed Android pricing at **$10 / year** and **$25 one time**.

## v1.2.1 — Major architecture, security & experience release

- Unified public catalogs and protected download collections.
- Hardened activation/order rules and Apple Store administration.

## v1.1.1 — Catalog, Apple Store & Activation hardening

- Added Admin-controlled catalog seeding and Apple Store data management.

## v1.1.0 — Offers & Ads

- Added live Offers and protected offer download delivery.

## v1.0.1 — Maintenance

- Applied stability and presentation fixes.

## v1.0.0 — Initial stable release

- First stable MedSBoX Pro storefront, library and Admin architecture.

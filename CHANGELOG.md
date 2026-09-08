# MedSBoX Pro Changelog

## v1.2.2 — Account-free subscription & Liquid Glass experience

- Removed public account creation, sign-in, password reset, and account UI from the customer-facing flow.
- Rebuilt subscription entry around two clear plans: Annual $10/year and Lifetime $25 one time.
- Made every public Android download action lead to the subscription and activation page instead of an account gate.
- Reworked subscription activation around the official Telegram activation account with a prepared plan, reference, and 100+ Android apps message.
- Added clear activation instructions and benefit messaging: one subscription unlocks access to 100+ ready-to-use Android applications.
- Reworked public Library, Offers, Apple Store, Activation, and homepage navigation to use the account-free customer journey.
- Added a more refined Liquid Glass visual layer with flowing ambient forms, glass surfaces, responsive spacing, subtle page transitions, motion-safe reveals, and a floating mobile navigation pill.
- Added stronger subscription hierarchy, plan emphasis, CTA consistency, and mobile-first layout behavior.
- Updated the release integrity gate to validate the new account-free activation architecture and fixed subscription pricing.

## v1.2.1 — Major architecture, security & experience release

- Unified the public catalog around live Firestore data and removed runtime dependence on a hardcoded Library fallback.
- Added protected application, offer, and Apple download collections so private Telegram delivery links are not part of public catalog metadata.
- Added automatic migration of legacy application Telegram links into protected `appDownloads` records, with chunked batches for larger catalogs.
- Reworked the Apple Store around live Admin-controlled applications and plans, including iPhone/iPad availability, pricing, subscription type, priority, publishing state, and protected delivery links.
- Connected Apple Store plans to the shared order and activation lifecycle through mirrored `plans` records.
- Hardened Annual/Lifetime activation with one-time transactional code consumption and plan/duration validation.
- Added final Firestore activation-expiry integrity checks so annual activations cannot self-extend or switch into lifetime access by tampering with client-written expiry fields.
- Added a dedicated Activation Code Manager with visible generated codes, copy controls, order/account association, and deletion controls.
- Strengthened order creation validation in Firestore for identity, document ID, required fields, active plan, price, currency, and pending status.
- Strengthened Hosting behavior with clean URLs, no trailing slash, HTML freshness headers, content-type protection, and strict-origin referrer policy.
- Added a branded 404 recovery experience.
- Added stable hash navigation for Admin sections and preserved the Users section against markup regressions.
- Added a dependency-free release integrity checker and a mandatory release QA gate.
- Added an automated GitHub Actions release-integrity workflow for pushes and pull requests targeting `main`.
- Refreshed the release workflow actions to current major versions and removed the previous Node 20 action-runtime warning path.
- Added public crawler policy and sitemap files for the discoverable site surface.
- Made homepage subscription cards refresh from Admin-controlled Firestore plans at runtime rather than relying on client fallback pricing.
- Removed static homepage catalog examples and made the hero featured-app rail read from the live Admin-controlled `apps` collection.
# MedSBoX Pro Changelog

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
- Added a unified Vision Final visual layer: cleaner hierarchy, consistent glass surfaces, safer mobile spacing, stronger responsive typography, horizontal filter rails, improved card/button rhythm, and reduced visual clutter.
- Added scroll-aware floating mobile navigation that minimizes while scrolling down and returns while scrolling up, reducing content obstruction while preserving one-tap navigation.
- Added subtle ambient motion, liquid-glass sweep, button shimmer, page reveal transitions, adaptive header material, active-navigation motion, and reduced-motion fallbacks for a more polished interaction system.
- Removed hardcoded homepage subscription pricing and Apple Store pricing copy in favor of Admin-controlled live states.
- Hardened checkout integrity so Telegram is opened only after the pending order has been successfully recorded; recording failures now remain on the payment page with an actionable error state.
- Improved Payment empty-state behavior, lifetime duration rendering, inline failure messaging, and checkout busy-state handling so users are never sent to Telegram after a failed order write.
- Hardened Admin application deletion so protected download records are removed together with the public application, and Admin now reports protected download-link counts from the secure collection.
- Preserved persistent authentication sessions and password-reset handling.
- Added a staged roadmap for future security and platform improvements, including optional Firebase App Check evaluation after compatibility and cost review.

## v1.1.2 — Security & data hygiene

- Migrated legacy application Telegram download links from public `apps` documents into protected `appDownloads` records before the Admin catalog controls load.
- Added local repository hygiene so Firebase metadata, local Hosting artifacts, and dependency folders are not accidentally committed.
- Removed hardcoded client-side subscription fallback pricing; the payment page now shows an explicit unavailable state when Admin-controlled plans cannot be loaded.
- Preserved the Admin Users section after a markup regression and refreshed Admin module cache versions.
- Added a dependency-free release integrity checker under `tools/release-check.mjs`.

## v1.1.3 — Hosting & public UX hardening (prepared)

- Added clean URL/trailing-slash behavior to Firebase Hosting.
- Added `no-cache`, `nosniff`, and strict-origin referrer behavior for HTML responses so new releases are less likely to be hidden by stale browser caches.
- Added a branded custom 404 experience with direct Home and Library recovery actions.

## v1.1.4 — Admin navigation hardening (prepared)

- Added stable hash-based Admin section navigation so a selected control-center area can be deep-linked and restored after navigation.
- Kept the existing Admin CRUD modules intact while adding navigation behavior as a non-invasive layer to reduce regression risk.

## v1.1.5 — Firestore validation hardening (prepared)

- Strengthened order creation validation with required-field, type, identity, active-plan, price, currency, and document-ID checks.
- Preserved the existing protected collections and activation-code lifecycle.

## v1.1.1 — Catalog, Apple Store & Activation hardening

- Reworked the Library data model so public applications are real Firestore records; no hardcoded fallback catalog is used.
- Preserved admin control over every application record, including starter/default records after initialization.
- Added a dedicated Apple Store admin control center for iPhone/iPad applications, images, subtitles, versions, categories, device availability, subscription type, priority, and protected Telegram links.
- Replaced the Apple Store's illustrative hardcoded catalog and pricing with live admin-controlled data.
- Added protected `iosDownloads` delivery for active subscribers and administrators.
- Added Apple Store plan management and connected Apple plans to the shared subscription/order system.
- Hardened Offers & Ads so Telegram download links are stored outside public offer documents and migrated away from public offer metadata.
- Added a dedicated activation-code manager with visible code results, copy controls, plan/duration display, and standalone code creation.
- Fixed activation handling for both Annual and Lifetime plans and added stronger validation of code ownership, plan, and duration.
- Added a direct Activation entry point from the Library and Apple Store.
- Hardened Firestore rules for applications, protected downloads, Apple catalog, offers, Apple plans, orders, users, and activation codes.
- Refreshed cache-busted page/module references for the new release.

## v1.1.0 — Offers & Ads release

- Added a premium public **Offers & Ads** storefront for featured applications, campaigns, and limited-time releases.
- Added an admin **Offers & Ads** console with title, subtitle, app name, version, image, approved devices, subscription type, priority, scheduling, and per-device Telegram links.
- Added optional start/end dates so campaigns can run for a defined period or stay active until manually hidden.
- Added subscriber-aware delivery: active subscribers are sent directly to the matching Telegram download post; visitors are routed into registration and the selected subscription plan.
- Added monthly, yearly, and lifetime offer types.
- Added public Offers entry points across the homepage and Library.
- Added secure Firestore rules for the new `offers` collection.
- Fixed the Library to query only active applications and removed the misleading hardcoded fallback catalog.
- Added direct registration opening from campaign links.
- Included the pending v1.0.1 admin catalog initialization fix in this release line.

## v1.0.1 — First maintenance release

- Hardened theme preference handling against invalid stored values.
- Replaced mobile navigation icon classes with broadly supported Font Awesome icons.
- Preserved the approved MedSBoX Pro Light/Dark visual identity and responsive social-card layout.
- Added explicit release version tracking through `VERSION`.

## v1.0.0 — First Stable Release

- Initial stable MedSBoX Pro release.
- Approved neon/glass brand identity.
- Light/Dark/System theme support.
- Medical app library, subscription, activation, developer support, and Apple Store pages.

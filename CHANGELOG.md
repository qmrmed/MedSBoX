# MedSBoX Pro Changelog

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

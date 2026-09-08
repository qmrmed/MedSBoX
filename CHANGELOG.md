# MedSBoX Pro Changelog

## v1.1.0 — Offers & Ads release

- Added a premium public **Offers & Ads** storefront for featured applications, campaigns, and limited-time releases.
- Added an admin **Offers & Ads** console with title, subtitle, app name, version, image, approved devices, subscription type, priority, scheduling, and per-device Telegram links.
- Added optional start/end dates so campaigns can run for a defined period or stay active until manually hidden.
- Added subscriber-aware delivery: active subscribers are sent directly to the matching Telegram download post; visitors are routed into registration and the selected subscription plan.
- Added monthly, yearly, and lifetime offer types.
- Added public Offers entry points across the homepage and Library.
- Added secure Firestore rules for the new `offers`, `offerDownloads`, and `appDownloads` collections.
- Moved download URLs out of public application/offer documents so they are only readable by active subscribers or admins.
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

# MedSBoX Pro Changelog

## v1.2.3 — Complete storefront, UX & flow audit

- Completed a repository-wide public experience audit across Home, Library, Offers, Subscription, Activation, Apple Store and shared navigation.
- Removed the visible account-registration/sign-in dependency from the customer journey.
- Added invisible Firebase anonymous sessions only where authenticated Firestore access is required; customers never see or manage an account.
- Fixed the subscription price path so Android checkout always presents the commercial plans as **$10 Annual** and **$25 Lifetime**, independent of stale catalog pricing.
- Reworked download gating so pressing a download leads to the subscription/activation path unless the current anonymous session has an active subscription.
- Preserved protected Telegram download collections and subscriber-only Firestore access.
- Improved mobile navigation, safe-area behavior, liquid-glass motion, page entry/reveal transitions, reduced-motion handling, and light/dark visual consistency.
- Normalized legacy public links that attempted to open registration/login so they resolve to the subscription flow.
- Kept Admin authentication separate from the public customer experience.
- Expanded release integrity checks for anonymous sessions, fixed subscription pricing, public flow, protected downloads, live catalogs and Firestore security.
- Updated project documentation to match the account-free customer architecture.

## v1.2.2 — Public subscription redesign

- Introduced the account-free subscription direction and Liquid Glass visual system.
- Added Annual and Lifetime subscription messaging and Telegram activation flow.

## v1.2.1 — Major architecture, security & experience release

- Unified the public catalog around live Firestore data and removed runtime dependence on a hardcoded Library fallback.
- Added protected application, offer, and Apple download collections so private Telegram delivery links are not part of public catalog metadata.
- Added automatic migration of legacy application Telegram links into protected `appDownloads` records.
- Reworked the Apple Store around live Admin-controlled applications and plans.
- Hardened Annual/Lifetime activation with one-time transactional code consumption and plan/duration validation.
- Added final Firestore activation-expiry integrity checks.
- Added a dedicated Activation Code Manager.
- Strengthened order creation validation in Firestore.
- Strengthened Hosting behavior and added a branded 404 recovery experience.
- Added stable hash navigation for Admin sections and a release integrity gate.

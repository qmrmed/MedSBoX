# Phase 4 — Apple Store & Offers

## Goal

Make Apple Store and Offers behave as controlled product systems rather than presentation-only pages. Firestore remains the source of truth; protected Telegram delivery remains outside public catalog documents.

## Apple Store acceptance criteria

- Published Apple applications come only from `iosApps`.
- Public search matches name, subtitle, category and description.
- Category filters work on the live catalog and combine with search.
- Device availability is shown from each record and each device keeps its own protected download link.
- Apple plans come only from active `iosPlans` records.
- Featured plans are prioritized, with price used as a stable secondary ordering.
- Selecting an Apple plan preserves the `ios-*` checkout route.
- Unavailable catalog/plan states are explicit and do not expose protected links.

## Offers acceptance criteria

- Public offers come only from active `offers` records.
- Campaign lifecycle is evaluated from `startAt` and `endAt` as hidden, upcoming, live or expired.
- Only live campaigns render publicly.
- Public search works across application/title/subtitle/description.
- Android and Apple platform filters combine with search.
- Priority ordering is preserved.
- Subscriber downloads resolve through `offerDownloads` only.
- Missing protected links produce a clear recovery message instead of a broken redirect.

## Admin contract

Admin remains the authoritative place to publish/hide Apple applications, edit plans, schedule offers, set priority and maintain device-specific Telegram links. No public page creates or mutates catalog records.

## Quality and security

- No new runtime dependency.
- No hardcoded Apple catalog or offer records.
- Protected download collections remain protected by Firestore Rules.
- Existing account-free customer flow remains unchanged.
- Release checks must cover the new files and public behavior contracts.

## Release gate

Phase 4 is not production-ready until local project audit, release check, manual responsive QA and production smoke testing all pass. The final deployment should remain one controlled pull/deploy cycle after the phase is complete.

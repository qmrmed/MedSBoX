# MedSBoX Pro — Development Conventions

## Source of truth

- `main` is the production-intended branch.
- `VERSION` is the release version source.
- `CHANGELOG.md` records user-visible release changes.
- Firebase project configuration must match the intended production project before deployment.

## Module responsibilities

Keep page modules focused:

- `app.js` — homepage orchestration and live plan/feature data.
- `library.js` — library/catalog experience and access flow.
- `offers.js` — offers experience.
- `ios-store.js` — Apple catalog and Apple plan flow.
- `payment.js` — order/reference/payment handoff logic.
- `activation.js` — activation lifecycle.
- `admin*.js` — administrative workflows.
- `theme.js` — shared public UI behavior, navigation and theme handling.

Shared functionality should move into dedicated utilities instead of being copied between pages.

## Data rules

- Catalog metadata is public only when intentionally marked active.
- Protected download metadata is kept separate from public catalog documents.
- Prices and entitlements are never trusted from the browser.
- New fields must have a defined type, lifecycle and authorization rule.

## Naming

Use clear camelCase JavaScript variables and functions. Use stable lower-case document IDs where the domain benefits from predictable identifiers. Keep user-facing labels separate from machine identifiers.

## Error handling

Every asynchronous user-facing operation must provide:

1. loading state,
2. success state where applicable,
3. actionable error state,
4. safe fallback when data is unavailable.

Do not expose stack traces, credentials, internal document contents or privileged implementation details to users.

## Accessibility

Interactive controls must be keyboard reachable, labelled, focus-visible and usable on touch devices. Respect reduced-motion preferences.

## Performance

Prefer:

- native browser APIs,
- small modules,
- deferred/non-critical scripts,
- lazy media,
- minimal Firestore reads,
- reusable cached data where safe.

Do not add a dependency for functionality that is trivial to maintain natively.

## Change discipline

For every meaningful change:

```text
Plan
 -> implement
 -> audit
 -> syntax check
 -> regression check
 -> update documentation
 -> release gate
```

Avoid unrelated refactors during feature work unless they directly improve reliability or remove a proven source of defects.

## Release discipline

Do not deploy an incomplete phase. A phase is complete only after its acceptance criteria, automated checks and relevant production-risk review pass.

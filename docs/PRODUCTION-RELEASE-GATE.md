# MedSBoX Pro Production Release Gate

## Release candidate

`v2.0.0` is the consolidated production milestone after Phases 1–7.

## Engineering gate

Run:

```bash
node tools/final-release-gate.mjs
```

This executes the project audit, security/performance checker and release checker as one final gate.

## Functional smoke test after deployment

1. Open the homepage and verify the approved MedSBoX Pro identity, navigation and responsive layout.
2. Open Library and confirm live catalog loading, search/filter behavior and protected-download gating.
3. Open Offers and verify lifecycle visibility, search and platform filtering.
4. Open Apple Store and verify live catalog, category/search filtering, device-specific presentation and plan handoff.
5. Open Subscription, select Annual and Lifetime, click the Telegram CTA and verify a pending Android order is created.
6. In Admin, verify the order, confirm payment, issue a code and verify the order/code transition.
7. Open Activation, enter the code and verify active access.
8. Confirm protected downloads work while the subscription is active.
9. Verify Admin Operations reports current counts and no unexpected orphan/stale records.
10. Confirm expired accounts are denied protected downloads; use reconciliation only to keep Admin status accurate.

## Deployment discipline

The repository is prepared for one controlled `git pull` followed by Firebase deployment. The deployment itself and live smoke test are not claimed until performed from the user's environment.

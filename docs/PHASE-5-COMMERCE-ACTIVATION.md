# MedSBoX Pro Phase 5 — Commerce, Subscriptions & Activation

## Delivered

### 1. Real commerce record
Android checkout now creates a Firestore `orders/{reference}` document with `pending` status before Telegram is opened. The checkout reference is the order ID, and repeat clicks during the same session reuse that order.

### 2. Atomic Admin issuance
Admin code issuance now uses a Firestore transaction. The transaction creates the activation code and moves the order to `code_issued` together. Firestore Rules cross-check the order, plan, duration, code and resulting state with `getAfter()`.

### 3. Portable activation
Issued codes keep the `orderId` linkage but do not lock the code to the anonymous checkout UID. A customer can therefore receive the code in Telegram and activate it on another device.

### 4. Plan integrity
Activation re-reads the current Android plan and rejects codes when the plan is inactive or the stored duration no longer matches the plan. Order creation also rejects price/currency drift.

### 5. Expiry enforcement
Subscriber access remains a server-side Rules decision based on `expiresAt > request.time`. Expired subscriptions therefore lose protected-download access even if a stale client still displays an old status.

## State contract

`pending` order → verified payment → `code_issued` order + `unused` code → activation → `active` user + `used` code.

A code cannot be issued without an order linkage, and an order cannot enter `code_issued` without the corresponding unused code in the same atomic write.

## QA gate

Run locally from the repository root:

```bash
node tools/project-audit.mjs
node tools/release-check.mjs
```

The production Firebase pull/deploy remains intentionally outside this engineering change until the full planned release train is complete.

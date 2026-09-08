# MedSBoX Pro Phase 6 — Admin Control Center & Operations

## Delivered

- Added a live Operations control room inside Admin.
- Added cross-domain counts for Android/Apple catalogs, offers, plans, orders, codes and users.
- Added stale pending-order detection for orders older than 48 hours.
- Added active-account expiry detection.
- Added orphaned issued-code detection.
- Added an Admin-only expiry reconciliation action that marks expired active accounts as `expired`.
- Added immutable Admin audit entries for reconciliation actions.
- Kept protected downloads server-guarded by Firestore Rules; the reconciliation tool is administrative bookkeeping, not the access-control mechanism.

## Safety

The reconciliation action is explicit and confirmation-gated. Audit documents can be created by an enabled Admin and cannot be edited or deleted from the client.

## Acceptance criteria

- Operations UI mounts only after an authenticated Admin session exists.
- All metrics are read from live Firestore collections.
- Expiry reconciliation uses a batched write.
- Firestore Rules protect `adminAudit` from public access and mutation.
- Existing catalog, commerce and activation flows remain intact.

The next phase is dedicated security, performance, accessibility and automated quality hardening.

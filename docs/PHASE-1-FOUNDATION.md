# Phase 1 — Foundation & Architecture

## Objective

Establish a stable technical foundation before the visual redesign and feature expansion. Phase 1 is about reducing ambiguity, defining trust boundaries, documenting the data contract, and making Firebase configuration explicit.

## Delivered

- [x] Runtime architecture documented.
- [x] Domain boundaries documented.
- [x] Trust boundaries documented.
- [x] Firestore data model documented.
- [x] Subscription and activation invariants documented.
- [x] Security architecture documented.
- [x] Development conventions documented.
- [x] Firestore composite index configuration added for subscription-expiry processing.
- [x] Firebase configuration now explicitly references Firestore indexes.
- [x] Firebase configuration now explicitly references Storage Rules.
- [x] Hosting ignore list prevents Firebase infrastructure files from being published as site assets.

## Acceptance criteria

Phase 1 is considered technically complete when:

1. Every production collection has an identified purpose and access model.
2. Public and protected data boundaries are explicit.
3. Privileged operations have a trusted execution boundary.
4. Subscription and activation invariants are written down and reflected by the current Rules/Functions design.
5. Firestore index configuration is version-controlled.
6. Storage Rules are version-controlled and wired into Firebase deployment configuration.
7. Development and release conventions are documented.
8. No production deployment is required merely to complete this documentation/configuration phase.

## Deliberately deferred

The following are not silently pulled into Phase 1:

- visual redesign,
- new catalog UX,
- analytics implementation,
- App Check activation,
- payment-provider automation,
- legal copy,
- new customer features.

Those belong to later phases where they can be designed and tested as complete systems.

## Next gate

Phase 2 starts only after the foundation is accepted. Phase 2 is the MedSBoX Brand + Design System build.

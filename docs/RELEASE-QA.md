# MedSBoX Pro Release QA

This is the release gate for every MedSBoX Pro version. A release is not considered final until the checks below pass locally and on the deployed Firebase site.

## 1. Public experience

- Home page loads in light, dark, and system themes.
- Header navigation works on mobile and desktop.
- Registration, login, logout, and returning-session flow work without redirect loops.
- Library shows only active Firestore applications; no hardcoded catalog fallback.
- Library search/category filtering works and empty/error states are readable.
- Offers page respects active/scheduled visibility and subscriber access.
- Apple Store uses live `iosApps` and `iosPlans` data controlled by Admin.
- Payment page never invents a plan or price when Firestore is unavailable.
- Activation accepts valid Annual and Lifetime codes and rejects reused, invalid, or wrong-account codes.

## 2. Admin control center

- Overview statistics load without blocking the console.
- Applications: create, edit, activate/hide, and delete.
- Application private download links are stored separately from public metadata.
- Offers: create, edit, schedule, activate/hide, and delete.
- Offer private Telegram links are stored separately from public metadata.
- Subscription plans: create, edit, activate/hide, and price/duration changes are reflected publicly.
- Orders: inspect status and issue a code only once.
- Activation Codes: create, copy, inspect, and delete; Annual/Lifetime are both visible.
- Users: list account and subscription state.
- Apple Store: manage apps, device availability, plans, pricing, publication state, and protected downloads.

## 3. Security

- Public documents contain only public metadata.
- Protected download collections are not publicly readable.
- Only Admin users can write catalog, plan, offer, order-management, and activation-code administration data.
- User self-service updates are limited to profile fields and the controlled activation transition.
- Firestore rules contain no unconditional `allow ...: true` grants.
- Queries match the constraints imposed by Firestore rules.

## 4. Static release gate

From the repository root:

```bash
node tools/release-check.mjs
```

The checker verifies local asset references, release metadata, public hardcoded catalogs, Admin section containers, and core Firestore protections.

## 5. Deployment gate

Deploy Firestore rules first, then Hosting:

```bash
firebase deploy --only firestore:rules
firebase deploy --only hosting
```

After deployment, repeat the public and Admin smoke tests above. Do not call an untested build a final release.

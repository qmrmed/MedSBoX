# MedSBoX Pro — Security Architecture

## Security principle

The browser is untrusted. Any value coming from HTML, JavaScript, URL parameters, local storage or client-side state can be modified by the user.

Authorization must therefore be enforced by Firebase Authentication, Firestore Rules and trusted Cloud Functions.

## Trust model

```text
PUBLIC BROWSER
  |  untrusted input
  v
Firebase Auth
  |  identity
  v
Firestore Rules  <---- direct database boundary
  |
  +---- public catalog reads
  +---- subscriber/admin protected reads
  +---- validated user lifecycle
  +---- validated orders / activation transitions

Cloud Functions  <---- privileged boundary
  |
  +---- order creation
  +---- code issuance
  +---- code redemption
  +---- signed download URLs
  +---- subscription expiry
```

## Authorization rules

### Public

Allowed only for intentionally public, active catalog content and active plans/offers.

### Subscriber

An authenticated user with `subscriptionStatus == active` and either no expiry or an expiry later than the current request time.

### Admin

An authenticated user with an enabled `admins/{uid}` document.

The UI may hide admin controls, but this is never relied upon for security.

## Sensitive operations

The following operations belong in trusted Functions or tightly validated Rules:

- Creating orders
- Issuing activation codes
- Redeeming activation codes
- Changing subscription state
- Generating protected download URLs
- Expiring subscriptions
- Any future refund/revocation workflow

## Download security

Public catalog documents must not expose protected download URLs. The preferred protected path is:

```text
subscriber
  -> callable Function
  -> verify active subscription
  -> verify requested app/file
  -> generate short-lived signed URL
  -> log download event
```

Signed URLs should be short-lived and scoped to the requested resource.

## Input validation

Validate at the earliest trusted boundary:

- IDs
- plan IDs
- references
- activation codes
- platform names
- storage paths
- numeric amounts
- lifecycle states

Never interpolate arbitrary user input into privileged paths without validation.

## Activation integrity

An activation code is bound to its plan and duration. Redemption must be transactional so that two concurrent attempts cannot successfully consume the same code.

## Secrets

Never commit:

- Firebase service-account credentials
- private API keys
- payment secrets
- signing keys
- server credentials
- deployment tokens

Firebase Web configuration values are public application configuration, but they do not replace Rules or server-side authorization.

## Security review checklist

Before every production release:

- [ ] No open Firestore `allow read/write` rules
- [ ] No public protected download metadata
- [ ] No client-controlled subscription entitlement
- [ ] No client-controlled admin privilege
- [ ] No reusable activation-code path
- [ ] Order amount validated against trusted plan data
- [ ] Protected downloads require active entitlement
- [ ] Admin operations remain server-authorized
- [ ] No private credentials in repository
- [ ] Error messages do not expose secrets or unnecessary internal data
- [ ] Security rules compile successfully

## Planned hardening

Later phases may add App Check, stronger abuse controls, richer audit logs, rate controls and automated security testing where they materially improve the threat model without creating unnecessary friction for legitimate users.

# MedSBoX Pro — Data Model

This document defines the current production data contract. Field names are intentionally stable so the UI, Functions and Rules can evolve independently.

## Collections

### `admins/{uid}`

```text
uid is the document id
enabled: boolean
role: string
```

Only trusted administration can create or change admin records.

### `users/{uid}`

```text
fullname: string (optional)
country: string (optional)
phone: string (optional)
plan: string (optional)
subscriptionStatus: pending | active | expired
startedAt: timestamp (optional)
activatedAt: timestamp (optional)
expiresAt: timestamp | null
activationCodeUsed: string (optional)
```

The document id is the Firebase Auth UID. Subscription fields are system-controlled; profile fields are user-controlled only within the explicit Rules allow-list.

### `plans/{planId}`

```text
id: string
name: string
price: number
currency: string
durationDays: integer | null
active: boolean
```

The document id is the plan id. The current Android commercial plans are `yearly` and `lifetime`; platform-specific plans can be represented without changing the access model.

### `apps/{appId}`

Public catalog metadata belongs here. Examples of fields used by the application include:

```text
name: string
description: string
category: string
platform: string
version: string
active: boolean
featured: boolean (optional)
image / icon metadata (optional)
requirements (optional)
whatsNew (optional)
```

**Never store protected download URLs in this public document.**

### `appDownloads/{appId}`

Protected download metadata. Access is restricted to admins or users with an active subscription.

```text
telegramUrls: map (legacy / controlled handoff)
storagePaths: map (preferred trusted-function source)
```

### `offers/{offerId}`

Offer metadata exposed only when active (or to admins). Future lifecycle states should use explicit state fields rather than overloading `active` when scheduling is introduced.

### `offerDownloads/{offerId}`

Protected offer download metadata. Never public.

### `iosApps/{appId}`

Apple catalog metadata. Same public/private separation principle as Android apps.

### `iosDownloads/{appId}`

Protected Apple download metadata.

### `iosPlans/{planId}`

```text
id: string
name: string
price: number
currency: string
durationDays: integer | null
active: boolean
```

### `orders/{orderId}`

```text
orderId: string
reference: string
userId: string
email: string (optional)
planId: string
planName: string
amount: number
currency: string
paymentMethod: string
status: pending | code_issued | activated | ...
createdAt: timestamp
codeId: string (optional)
codeIssuedAt: timestamp (optional)
activatedAt: timestamp (optional)
activatedUserId: string (optional)
```

Orders are immutable from the customer side. Admin/Function workflows control status transitions.

### `activationCodes/{codeId}`

```text
code: string
planId: string
durationDays: integer | null
status: unused | used
orderId: string | null
userId: string | null
usedBy: string (optional)
createdBy: string
createdAt: timestamp
usedAt: timestamp (optional)
note: string (optional)
```

A code is one-time use. Plan and duration are bound to the code and must remain consistent through redemption.

### `downloadLogs/{logId}`

Created by the trusted download-token Function.

```text
userId: string
appId: string
platform: string
createdAt: timestamp
```

This collection is operational data, not a public catalog.

## Lifecycle invariants

1. A user cannot become `active` through arbitrary client writes.
2. A non-lifetime subscription must have a future `expiresAt` when activated.
3. A lifetime subscription has `expiresAt == null`.
4. An activation code transitions from `unused` to `used` only once.
5. The code's plan and duration cannot be changed during redemption.
6. Order amount/currency must match the active plan used for the order.
7. Protected download metadata is never readable by an unauthenticated public visitor.
8. Admin access is determined by an explicit enabled admin record, not by a client-side flag.

## Future evolution

When analytics, audit logs, refunds, scheduled promotions or granular entitlements are introduced, they should use dedicated collections rather than adding unrelated fields to `users` or catalog documents.

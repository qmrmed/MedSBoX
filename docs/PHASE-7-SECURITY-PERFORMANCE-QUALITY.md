# MedSBoX Pro Phase 7 — Security, Performance & Quality

## Security

- Firebase Hosting now emits `X-Content-Type-Options: nosniff`.
- `Referrer-Policy` is strict across the site.
- `Permissions-Policy` disables camera, microphone, geolocation and browser payment APIs that MedSBoX does not need.
- HSTS is enabled for production HTTPS delivery.
- Firestore remains the authority for protected downloads, subscriptions, activation codes, orders and Admin audit data.

## Performance

- HTML and JavaScript are explicitly no-cache to avoid stale application shells after release.
- CSS uses short-lived caching with stale-while-revalidate.
- Static visual assets use longer caching.
- Existing versioned public asset references continue to provide cache-busting control.

## Quality

`tools/security-performance-check.mjs` verifies:
- page title and viewport metadata;
- image `alt` attributes;
- Hosting security headers;
- HTML/JS/CSS cache policy;
- reduced-motion support.

The main release checker continues to validate JavaScript syntax, public authentication boundaries, catalog integrity, commerce/activation contracts, Admin Operations, Firestore protections and design-system foundations.

## Acceptance gate

```bash
node tools/project-audit.mjs
node tools/security-performance-check.mjs
node tools/release-check.mjs
```

All three must pass before the final deployment cycle.

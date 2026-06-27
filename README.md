# Code V01D Booking Site

Static one-page booking/admin site for Code V01D Studio.

## Files

- `index.html` contains the standalone HTML/CSS/JS app.
- `code_void_one_page_mockup.html` redirects legacy local links to `index.html`.
- `design.md` records design and interaction guardrails.
- `security.md` records browser-only data limitations and production requirements.

## Deploy

This site can be hosted as static files, including GitHub Pages. No build step is required.

For a local preview:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Operations

The site has private request intake and admin records.

Public visitors can create booking inquiries without Google sign-in. The 관리자 workspace requires Google sign-in and only opens for approved admin accounts.

Calendar open-window settings and slot close/open states are stored as public non-PII availability data. Incoming inquiries and reservation records are admin-only.

## Important

Do not commit private credentials or customer exports. Review `security.md` before broad sharing.

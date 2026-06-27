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

## Important

The current admin and inquiry storage are browser-only features. Real deployment for customer data requires the backend, authentication, and data protections listed in `security.md`.

# Code V01D Booking Mockup

Static one-page booking/admin mockup for Code V01D Studio.

## Files

- `index.html` redirects visitors to the current app page.
- `code_void_one_page_mockup.html` contains the standalone HTML/CSS/JS app.
- `design.md` records design and interaction guardrails.
- `security.md` records mockup security limitations and production requirements.

## Deploy

This site can be hosted as static files, including GitHub Pages. No build step is required.

For a local preview:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/code_void_one_page_mockup.html
```

## Important

The current admin and inquiry storage are mock-only browser features. Real deployment for customer data requires the backend, authentication, and data protections listed in `security.md`.

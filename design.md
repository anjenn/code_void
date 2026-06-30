# Nest Dance x Code V01D Green Hipster Design Guardrail

_Last updated: 2026-06-30_

## Product Intent

Nest Dance x Code V01D is a one-page bilingual booking and admin site for photo/concept shoots, artwork inquiries, and dance class/studio scheduling. The first screen should feel like a collaborative underground studio flyer and booking experience, not a generic SaaS dashboard, template portfolio, or plain reservation form.

The updated direction is **green-based, black-and-white, retro/hipster, Code V01D-branded, and Nest Dance-aware**. It should visually connect the black Code V01D logo art, the green/white star graphics, and the lime timetable reference into one cohesive booking site for both brands.

The primary user flows remain:

1. A visitor checks the Nest Dance and Code V01D external links.
2. A visitor chooses a concept.
3. A visitor chooses the relevant studio tab and picks one or more calendar slots or sends an inquiry.
4. An admin signs in with the allowed Google account, opens the workspace, reviews demand, manages orders, records reservations, and checks insights.

## Visual Reference Direction

Use the attached references as the visual anchor:

- **Code V01D / 코드보이드 logo art**
  - Black background.
  - Heavy white block lettering.
  - Neon green accent glyphs.
  - Green and white spark/star motifs.
  - Digital, arcade, coding, tech-club energy.

- **Code V01d square logo art**
  - White varsity/block serif typography.
  - Green `V01` accent.
  - Strong black negative space.
  - Star and dot decoration.

- **Green timetable reference**
  - Lime green field.
  - Dark green header bars and tabs.
  - Cream/white content cards.
  - Condensed bold text.
  - Dance-studio flyer layout with clear schedule blocks.

The site should feel like: **retro dance-studio timetable + hacker/arcade logo + handmade hipster zine**.

## Visual System

Keep the site in this direction:

- Black, forest green, neon green, acid lime, cream white, and yellow-lime accents.
- `Space Mono` for brand moments and the main joint-brand title.
- `Space Grotesk` for section titles, card titles, metrics, and structured display type.
- `IBM Plex Sans KR` for controls, metadata, body copy, tables, badges, calendar buttons, and admin UI.
- `Nanum Gothic Coding` only as a Korean coding accent for `코드보이드` and small label components.
- Star/sparkle motifs from the logo images.
- Timetable-inspired card grids, day/time chips, bordered white blocks, dark green headers, and lime backgrounds.
- Slightly imperfect hipster/flyer energy through offset shadows, sticker-like cards, subtle rotations, thick outlines, and dashed inner borders.
- Admin UI should remain functional and dense, but still look like it belongs to Code V01D.

Avoid:

- Returning to the old pastel pink/lavender/pearl visual system.
- A flat all-green theme without contrast.
- Generic startup/SaaS dashboards.
- Overly corporate booking layouts.
- Heavy cybersecurity styling that loses the studio/flyer feeling.
- Thin elegant typography as the dominant style.
- Excessive gradients that make the site feel unrelated to the attached references.

## Core Tokens

Use these CSS custom properties as the source of truth for the green hipster mockup. Keep the existing variable names where possible so older components do not break, but reinterpret them through the new palette.

```css
:root {
  --paper: #f8ffe8;
  --paper-2: #edf6c5;
  --ink: #142617;
  --muted: #58704d;

  /* Legacy names remapped into the green system */
  --pink: #b6dd4a;
  --pink-deep: #137a3e;
  --violet: #1f8d4a;
  --violet-deep: #0f4f2c;
  --blue: #eefce4;
  --mint: #15c972;

  /* New green mockup tokens */
  --acid: #a6cf3a;
  --acid-soft: #d7ed70;
  --fern: #18763d;
  --fern-dark: #0d2c1a;
  --black: #030503;
  --cream: #fffef3;
  --gold: #eff05a;

  --pearl: rgba(255, 255, 239, .86);
  --glass: rgba(247, 255, 229, .76);
  --line: rgba(21, 112, 57, .42);

  --shadow: 0 26px 70px rgba(9, 38, 19, .32);
  --shadow-soft: 0 16px 40px rgba(9, 38, 19, .20);

  --radius-lg: 30px;
  --radius-md: 18px;
  --radius-sm: 10px;

  --brand: "Space Mono", "Nanum Gothic Coding", "IBM Plex Sans KR", monospace;
  --display: "Space Grotesk", "IBM Plex Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  --sans: "IBM Plex Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", Arial, sans-serif;
  --code-accent: "Nanum Gothic Coding", "Space Mono", "IBM Plex Sans KR", monospace;
  --single-font: var(--sans);
  --display-strong: var(--display);
  --serif: var(--sans);
}
```

### Token Use

- `--black` / `--fern-dark`: hero, sticky topbar, admin shell, dark brand moments.
- `--fern`: dark green chips, calendar headers, status pills, section kickers.
- `--acid`: main lime section field and offset shadows.
- `--gold`: yellow-lime highlights, active buttons, focus outline, selected states.
- `--cream`: cards, fields, timetable blocks, readable panels.
- `--ink`: default text.
- `--muted`: helper text and secondary descriptions.

## Typography Rules

Load the approved web fonts once in the standalone HTML:

```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=Nanum+Gothic+Coding:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap");
```

| Role | Font | Reason |
| --- | --- | --- |
| Brand | `Space Mono` | Monospace brand voice for the joint title, logo-adjacent text, and technical Code V01D energy. |
| Titles | `Space Grotesk` | Geometric, readable display type for headings, cards, metrics, and timetable structure. |
| Body/UI | `IBM Plex Sans KR` | Readable, technical, clean, and strong for Korean UI copy. |
| Korean coding accent | `Nanum Gothic Coding` | Use only for `코드보이드` and compact labels where a coding accent helps. |

### Brand

Use `--display` for:

- `h1`
- topbar brand text
- logo-adjacent brand text

Brand type should feel technical, crisp, and slightly coded without sacrificing readability.

### Titles / Display

Use `--display` for:

- section headings
- concept card titles
- metric numbers
- large hero labels

Display type should feel geometric, retro, arcade, timetable-like, and flyer-like. Keep `letter-spacing: 0`; do not use negative tracking.

### Utility / Interface

Use `--sans` for:

- navigation
- buttons
- form fields
- calendar slots
- admin tables
- kanban labels
- badges
- helper copy

Sans-serif text should be compact, high-contrast, and short enough to fit mobile UI.

### Coding Accent

Use `--code-accent` for:

- the `코드보이드:` brand row label
- small labels such as chips, month tags, status pills, price chips, and admin state tags

Do not use `Nanum Gothic Coding` for body paragraphs, form fields, or long Korean content.

### Text Treatment

- Large white text on black may use a green offset shadow.
- Green headings on lime sections may use a cream/white offset shadow.
- Avoid soft pastel text shadows.
- Avoid long all-caps paragraphs.

## Component Guardrails

### Top Navigation

- Sticky, rounded, and usable on narrow screens.
- Dark green/black glassy bar with cream text.
- Buttons should use pill shapes, green borders, and yellow-lime active states.
- Language toggle must remain visible and tappable.
- Do not add a large desktop-only navigation that collapses poorly.

### Hero

The hero is the primary brand moment.

Required qualities:

- Black or near-black background.
- Text title should read as two stacked brand lines: `Nest Dance` and `Code V01d`.
- Green and white star/spark motifs.
- Grid or subtle scanline texture.
- Big hero title should use `Space Mono` for the brand voice.
- Other major display headings should use `Space Grotesk`.
- Link buttons styled like stickers or flyer tags.
- Brand link rows for Nest Dance and Code V01D.
- Optional moodboard area using timetable or approved brand images.

Avoid:

- Plain hero with only centered text.
- Pastel glass card hero.
- Generic photographer hero image treatment.

### Link Cloud

- Links should feel like sticker buttons.
- Use cream fills, dark green borders, and offset shadows.
- Main booking CTA should use yellow-lime gradient or solid yellow-lime.
- Group social links by brand: `네스트 댄스:` and `코드보이드:`.
- Keep each brand row compact: brand label plus `Instagram`, `Blog`, and `Kakao Channel` pills.
- Keep the main `예약 문의` / `Book inquiry` CTA visually separated as the full-width action below the social rows.

### Sections

- Public sections should use lime/acid green fields or cream panels.
- Each section may include dashed inner borders to echo printed flyers.
- Section headings should be chunky and visible.
- Do not use transparent pastel glass sections.

### Concept Cards

Concept cards should look like white timetable blocks or handmade flyers:

- Cream/white background.
- Dark green border.
- Offset green shadow.
- Dashed inner border.
- Bold display title.
- Price chip in yellow-lime.
- One guide/view action and one concept-select action.

Required action behavior:

- `Select this concept` / `이 컨셉 선택` must set the inquiry concept select value.
- After selection, scroll to the calendar.
- External guide links may remain, but they must not replace the selection action.

### Calendar

The calendar should visually borrow from the timetable reference.

Required qualities:

- Lime section background.
- Dark green month chips and day headers.
- White/cream day cards.
- Thick green borders.
- Weekend days show concrete time slots.
- Monday-Friday shows a single request button.
- Blocked/closed slots use both visual treatment and text/state labels.
- Selected slots use a strong yellow-lime state.

Rules:

- Calendar rows must stay compact.
- Inline month stoppers should remain visible.
- Mobile calendar should use mini day selectors and one active day/range view at a time.
- No horizontal scrolling on mobile except where intentionally used and controlled.

### Nest Studio Timetable

The `Nest Studio` tab should use the attached `neststudio_calendar_mockup.html` direction as its source:

- Poster-like lime green field with a white outer border.
- Large `NESTSTUDIO / GEOYEO` header.
- Dark green `Class Time Table` label with yellow-lime text.
- Seven day columns and four evening rows from `18:00` through `22:00`.
- Cream class cards with dark green outlines.
- Empty cells remain visible so the timetable reads as a real weekly calendar.
- Horizontal scrolling is acceptable inside the timetable on mobile because the table is intentionally wide.
- Keep a Nest Studio inquiry CTA below or beside the timetable.

Do not replace the Nest tab with a plain text card. It should feel as substantial as the Code V01D calendar tab, but it does not need to share the same slot-selection state unless a future request explicitly asks for selectable dance-class bookings.

### Inquiry Panel

- Keep it sticky on desktop and below calendar on tablet/mobile.
- Use cream panel, green border, and offset shadow.
- Fields should be cream with green outlines.
- Focus state should use the yellow-lime focus ring.
- Inquiry actions are split into two buttons:
  - `SMS 문의`: disabled until name, contact, concept, memo, and at least one valid slot are filled.
  - `내용 복사 + 카카오 채널 열기`: copies the inquiry summary and opens Kakao Channel.
- Include a short information note explaining that SMS requires all details and that Kakao copies the message before opening the channel.

### Admin Workspace

Admin must remain functional but visually branded.

Required qualities:

- Dark green/black shell.
- Yellow-lime active tabs.
- Cream cards and tables inside.
- Status pills in dark green with yellow-lime text.
- Kanban cards with green borders and small offset shadows.
- Metrics use display numbers.

Avoid:

- Gray SaaS dashboard styling.
- Blue enterprise admin accents.
- Making admin look unrelated to the public site.

### Notices

- Use two tabs, not an accordion/details pill:
  - `서비스 안내`
  - `상담 정보`
- `서비스 안내` contains the estimate notes, cautions, and refund policy cards.
- `상담 정보` contains the inquiry checklist.
- Use cream or pale lime cards with heart-style bullets.
- Keep information dense but readable, and do not let notice cards become visually heavier than the booking flow.

## Content Rules

- Korean is the default language.
- English must switch without page reload.
- Any new visible label, button, placeholder, status, notice, concept, table header, or toast needs both Korean and English text.
- Keep button and chip copy short enough for mobile.
- Keep public copy clear and studio-like, not corporate.
- Avoid long marketing explainer blocks.
- Admin copy can be direct and utilitarian, but should still use the Code V01D tone.

## Required Interaction Rules

The following interactions must continue to work after design changes:

- Language switch updates all major visible text.
- Admin switch opens a Google sign-in prompt.
- Admin workspace is only revealed to the configured admin account.
- Concept select buttons preselect the inquiry concept and scroll to the calendar.
- Slot click toggles that slot in a multi-select list.
- Visitors can send several possible dates/times for admin review.
- Calendar displays the admin-configured open window, defaulting to tomorrow through roughly one month ahead.
- Inquiry submit saves a public inquiry.
- Kakao inquiry submit copies a paste-ready inquiry summary.
- Kakao inquiry submit opens Kakao Channel.
- SMS inquiry opens the device SMS composer with the inquiry information filled into the message body.
- SMS inquiry remains disabled until all fields and at least one candidate slot are filled.
- Inquiry submit increments every selected slot request count.
- Inquiry submit creates one incoming admin order with all selected candidate slots.
- Public Kakao handoff is possible once the visitor has entered a name.
- Contact, concept, memo, and candidate slots enrich the request but should not block the button.
- In admin mode, clicking a calendar slot toggles that slot between open and closed without changing public inquiry selections.
- Admin can add reservation records and optionally link each record back to an incoming request.
- Manual admin order add increments the selected slot and creates an order.
- Kanban previous/next buttons update order status.
- Kanban drag/drop updates order status.
- Insights update after inquiries, manual orders, or reservation records are added.

## Layout Rules

### Desktop

- Hero may use two columns: brand/CTA on the left, moodboard/reference art on the right.
- Calendar uses two columns: calendar grid plus sticky inquiry panel.
- Concept cards use three columns on desktop for the current three-offer set.
- Admin can use split panels for tables/forms.

### Tablet

- Hero becomes one column or stacked moodboard.
- Concept cards use two columns.
- Calendar becomes one column if the inquiry panel would become cramped.
- Admin split panels stack.

### Mobile

- All major sections become one column.
- Sticky top navigation must wrap cleanly.
- Link buttons can become two per row, then one per row below very small widths.
- Concept cards become single column.
- Calendar uses mini selectors and active day/range view.
- Buttons must remain at least comfortable tap size.
- No text should overlap, clip awkwardly, or require accidental horizontal scrolling.

## Accessibility Rules

- Use semantic sections, headings, forms, buttons, and tables.
- Keep interactive controls as real `<button>`, `<select>`, `<input>`, and `<textarea>` elements.
- Maintain visible focus outlines using yellow-lime focus rings.
- Use `aria-live` where dynamic slot/order feedback changes.
- Avoid relying on color alone for status; pair color with state text.
- Keep contrast high on lime sections.
- Do not place small green text on lime backgrounds without a cream or dark backing.
- Ensure all image-based brand art has nearby text equivalents, such as the `h1` and studio label.

## Asset Rules

- Approved bitmap assets include the attached Code V01D logo art and the green timetable reference.
- Use optimized `.webp` or embedded optimized data assets for static hosting.
- Keep hero/moodboard assets decorative unless they are necessary to understand content.
- Concept cards should use real studio/concept images or approved generated bitmap assets that clearly show the product or shoot style.
- The approved external CSS dependency is the Google Fonts import for `Space Mono`, `Space Grotesk`, `IBM Plex Sans KR`, and `Nanum Gothic Coding`.
- Do not add additional external dependencies to the standalone static site unless the project is intentionally converted into a real build system.
- Do not hotlink large external images.

## Motion Rules

Use motion sparingly:

- Hover lift may move cards by 1-6px.
- Sticker/flyer cards may rotate slightly on hover.
- Buttons may lift or shift offset shadow.
- Toasts may slide/fade.
- Avoid continuous animation that distracts from booking.
- Respect reduced motion if a full implementation adds animations.

## Implementation Notes

- Keep the site as a standalone static HTML mockup unless the project is intentionally converted into a build system.
- CSS overrides may appear after the old base styles; the final visible theme should be the green hipster system.
- Preserve existing JavaScript behavior while changing classes/styles.
- Keep old token names available when components depend on them.
- New UI labels must be added to both Korean and English `i18n` dictionaries.
- Any design change to calendar, inquiry, admin, or kanban must be tested in both public and admin modes.

## Quality Checklist

Before shipping a design update, verify:

- The first screen clearly feels like Nest Dance x Code V01D, not a template.
- The black/green/white logo art visually connects to the rest of the page.
- The calendar looks related to the lime timetable reference.
- Public flow works without admin login.
- Admin flow stays hidden until Google admin auth succeeds.
- Language switch still covers new visible text.
- Concept select buttons prefill the inquiry concept.
- Multiple slots can be selected and summarized.
- Kakao handoff still works after name entry.
- Mobile layout has no broken wrapping or accidental horizontal scroll.
- Focus states are visible.
- Status states include text, not color alone.

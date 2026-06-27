# Code V01D Design Guardrail

## Product Intent

Code V01D is a one-page bilingual booking and admin site for a pastel photo/concept studio. The first screen should feel like a branded booking experience, not a SaaS dashboard or a generic landing page.

The primary user flows are:

1. A visitor checks the creator profile and links.
2. A visitor chooses a concept.
3. A visitor picks a calendar slot and submits an inquiry.
4. An admin opens the workspace, reviews demand, manages orders, and checks insights.

## Visual System

Keep the site in the magical studio direction:

- Pearl white, pastel pink, lavender, icy blue, and mint accents.
- Lace, bows, hearts, sparkles, pearls, glassy panels, and glossy cards.
- Serif typography for the brand, hero, section headings, and primary public copy.
- Small sans-serif text only for controls, metadata, tables, badges, and dense admin UI.
- Soft shadows, translucent panels, ornamental borders, and gentle motion.

Avoid:

- Generic startup/SaaS dashboards.
- Heavy dark themes.
- Sharp industrial layouts.
- Large marketing explainer sections.
- Palette drift into a single flat purple or beige theme.

## Core Tokens

Use the existing CSS custom properties in `index.html` as the source of truth:

```css
--paper: #fff9ff;
--ink: #5d4569;
--pink: #f8a9d3;
--pink-deep: #d84d95;
--violet: #bda3ff;
--violet-deep: #805bcf;
--blue: #a9e7f6;
--mint: #bcf3e7;
--line: rgba(216, 119, 179, .34);
--shadow: 0 24px 70px rgba(167, 108, 170, .28);
--serif: "Noto Serif KR", "Nanum Myeongjo", "Iropke Batang", Georgia, Cambria, "Times New Roman", serif;
--sans: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", Arial, sans-serif;
```

## Content Rules

- Korean is the default language.
- English must switch without page reload.
- Any new visible label, button, placeholder, status, notice, concept, table header, or toast needs both Korean and English text.
- Keep copy short enough to fit mobile controls and cards.
- Admin UI should still feel like Code V01D, even when showing tables and kanban columns.

## Interaction Rules

Required interactions:

- Language switch updates all major visible text.
- Admin switch opens a password prompt before revealing the admin workspace.
- Concept buttons preselect the inquiry concept and scroll to the calendar.
- Slot click toggles that slot in a multi-select list, so visitors can send several possible dates/times for admin review.
- Calendar starts from the current day by default and displays the upcoming future weeks without showing past dates.
- Inquiry submit copies a paste-ready inquiry summary, opens Kakao Channel, increments every selected slot request count, and creates one incoming admin order with all selected candidate slots.
- Public Kakao handoff should be possible once the visitor has entered a name; contact, concept, memo, and candidate slots enrich the request but should not block the button.
- Manual admin order add increments the selected slot and creates an order.
- Kanban previous/next buttons and drag/drop update order status.
- Insights update after inquiries or manual orders are added.

## Layout Rules

- Desktop: hero and calendar use two-column layouts.
- Tablet: concept cards use two columns.
- Mobile: all major sections become one column.
- Top navigation stays sticky and usable on narrow screens.
- Calendar availability should show compact future-week rows with inline month stoppers: Saturdays and Sundays show concrete time slots, Monday-Friday show a single request button, and reserved or within-one-hour weekend slots appear as disabled blocked chips.
- Buttons must have stable dimensions and visible focus states.
- Text must not overlap, clip awkwardly, or require horizontal scrolling.

## Accessibility Rules

- Use semantic sections, headings, forms, buttons, and tables.
- Keep interactive controls as real `<button>`, `<select>`, `<input>`, and `<textarea>` elements.
- Maintain visible focus outlines.
- Use `aria-live` where dynamic slot/order feedback changes.
- Avoid relying on color alone for status; pair color with text.

## Asset Rules

Concept cards should use real studio/concept images or approved generated bitmap assets that clearly show the product or shoot style. Keep those card assets optimized for static hosting.

Do not add external dependencies to the standalone static site unless the project is intentionally converted into a real build system.

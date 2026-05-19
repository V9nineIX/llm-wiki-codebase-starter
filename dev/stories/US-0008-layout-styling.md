---
title: Layout & Styling — User Stories
type: story
tags: [story, react, todo, frontend, learning]
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
created: 2026-05-19
updated: 2026-05-19
---

# User Stories — Layout & Styling

> Derived from [[dev/epics/EPIC-0001-react-todo]] (EPIC-0001-D)

## US-0008: Responsive Layout

**As a** user, **I want** the app to be usable on both my phone and desktop **so that** I can manage tasks from any device.

**Acceptance criteria:**
- [ ] At 375px viewport width, all elements are visible and tappable without horizontal scrolling.
- [ ] On desktop, the content is constrained to `max-w-xl` (576px) and centered.
- [ ] No custom CSS files beyond the Tailwind index reset — all styling via Tailwind utility classes.

**Tasks:** _to be generated with `/story-to-tasks`_

---

## US-0009: Visual Polish

**As a** user, **I want** the app to look clean and readable **so that** using it is pleasant rather than distracting.

**Acceptance criteria:**
- [ ] Completed tasks render with strikethrough and visually muted styling (e.g. reduced opacity or grey text).
- [ ] The active filter button is visually distinct from inactive ones.
- [ ] The input and submit button are clearly grouped and easy to reach.
- [ ] No layout shifts or unstyled flashes on initial load.

**Tasks:** _to be generated with `/story-to-tasks`_

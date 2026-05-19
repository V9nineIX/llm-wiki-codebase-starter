---
title: Apply Tailwind responsive layout
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0008-layout-styling]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0002-wire-add-task-to-app-state]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0014 — Apply Tailwind responsive layout

> Derived from [[dev/stories/US-0008-layout-styling]] (US-0008: Responsive Layout)
> Blocked by: [[dev/tasks/T-0002-wire-add-task-to-app-state]]

## What to build

Apply Tailwind utility classes to make the app usable at any viewport width.
On desktop, content is constrained and centered. On mobile (375px), everything
is visible and tappable without horizontal scrolling. No custom CSS files —
all styling via Tailwind utilities only.

## Acceptance criteria

- [ ] Content is constrained to `max-w-xl` and horizontally centered on desktop
- [ ] At 375px viewport width, all elements are fully visible with no horizontal scroll
- [ ] All interactive elements (input, buttons, checkboxes) are comfortably tappable on mobile
- [ ] No custom CSS files added — styling is Tailwind utility classes only

## Done

<!-- Move completed criteria here when verified -->

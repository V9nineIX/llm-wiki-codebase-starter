---
title: Build FilterBar and derive filtered task view
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0006-filtering]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0004-build-use-todos-hook]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0011 — Build FilterBar and derive filtered task view

> Derived from [[dev/stories/US-0006-filtering]] (US-0006: Filter Tasks by Status)
> Blocked by: [[dev/tasks/T-0004-build-use-todos-hook]]

## What to build

A `FilterBar` component with three filter buttons: All, Active, Completed.
Active filter state lives in the parent component (not in `useTodos`) and
defaults to "All" on every page load — never persisted. The task list rendered
below is a derived view filtered from the full tasks array. The active filter
button is visually highlighted to show current selection.

## Acceptance criteria

_Behavior_
- [ ] "All" shows every task regardless of completion state
- [ ] "Active" shows only tasks where `completed` is `false`
- [ ] "Completed" shows only tasks where `completed` is `true`
- [ ] Filter defaults to "All" on every page load (never persisted to localStorage)
- [ ] Switching filters is immediate with no page reload

_UI / markup_
- [ ] FilterBar renders three visible buttons: All, Active, Completed
- [ ] The active filter button is visually distinct from inactive ones (e.g. bold, underline, or background highlight)
- [ ] Buttons are keyboard-accessible

## Done

<!-- Move completed criteria here when verified -->

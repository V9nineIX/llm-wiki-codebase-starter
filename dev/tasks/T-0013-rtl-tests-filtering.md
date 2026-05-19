---
title: Write RTL tests for filtering and empty states
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0006-filtering]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0012-add-empty-state-messages]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0013 — Write RTL tests for filtering and empty states

> Derived from [[dev/stories/US-0006-filtering]] (US-0006 + US-0007)
> Blocked by: [[dev/tasks/T-0012-add-empty-state-messages]]

## What to build

RTL tests covering all filter states and every empty-state message variant.

## Acceptance criteria

_Filter behavior_
- [ ] "All" filter renders all tasks regardless of `completed`
- [ ] "Active" filter renders only incomplete tasks
- [ ] "Completed" filter renders only completed tasks
- [ ] Active filter button is marked as the current selection (e.g. `aria-pressed` or class)
- [ ] Filter resets to "All" on remount (not persisted)

_Empty states_
- [ ] All + no tasks → "No tasks yet. Add one above." is rendered
- [ ] Active + no incomplete tasks → "No active tasks." is rendered
- [ ] Completed + no completed tasks → "No completed tasks." is rendered
- [ ] Adding a matching task removes the empty-state message

## Done

<!-- Move completed criteria here when verified -->

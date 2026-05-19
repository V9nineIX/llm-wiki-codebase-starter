---
title: Add empty-state messages per filter
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0006-filtering]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0011-build-filter-bar]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0012 — Add empty-state messages per filter

> Derived from [[dev/stories/US-0006-filtering]] (US-0007: Empty State per Filter)
> Blocked by: [[dev/tasks/T-0011-build-filter-bar]]

## What to build

When a filter returns zero tasks, render a contextual empty-state message in
place of the task list. The message is filter-specific and disappears as soon
as a matching task exists.

## Acceptance criteria

- [ ] All filter + no tasks → renders "No tasks yet. Add one above."
- [ ] Active filter + no incomplete tasks → renders "No active tasks."
- [ ] Completed filter + no completed tasks → renders "No completed tasks."
- [ ] Message disappears immediately when a matching task exists
- [ ] Message does not appear when the filtered list has at least one task

## Done

<!-- Move completed criteria here when verified -->

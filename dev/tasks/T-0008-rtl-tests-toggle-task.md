---
title: Write RTL tests for complete-task flow
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0001-task-management]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0007-wire-toggle-task]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0008 — Write RTL tests for complete-task flow

> Derived from [[dev/stories/US-0001-task-management]] (US-0002: Complete a Task)
> Blocked by: [[dev/tasks/T-0007-wire-toggle-task]]

## What to build

RTL tests covering the toggle interaction end-to-end: state mutation, visual
styling changes, and bidirectional toggle.

## Acceptance criteria

- [ ] Clicking a task checkbox marks it completed — checkbox is checked and text has strikethrough
- [ ] Clicking the checkbox again unchecks it and removes strikethrough
- [ ] Toggling one task does not affect other tasks in the list
- [ ] Completed styling (muted color) is applied and removed correctly on toggle

## Done

<!-- Move completed criteria here when verified -->

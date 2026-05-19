---
title: Write RTL tests for add-task flow
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0001-task-management]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0002-wire-add-task-to-app-state]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0003 — Write RTL tests for add-task flow

> Derived from [[dev/stories/US-0001-task-management]] (US-0001: Add a Task)
> Blocked by: [[dev/tasks/T-0002-wire-add-task-to-app-state]]

## What to build

React Testing Library tests covering the full add-task flow end-to-end:
input validation, submission via Enter and button click, new task position
in the list, and input state after submission.

## Acceptance criteria

- [ ] Unit: whitespace-only input does not call `onAddTask` and does not clear the field
- [ ] Unit: valid input calls `onAddTask` with the trimmed value
- [ ] Integration: submitting via Enter renders the new task at the top of the list
- [ ] Integration: submitting via button click also renders the new task at the top
- [ ] Integration: input is cleared and refocused after successful submission
- [ ] Integration: two rapid submissions produce two tasks with different IDs

## Done

<!-- Move completed criteria here when verified -->

---
title: Wire deleteTask — delete button and immediate removal
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0001-task-management]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0004-build-use-todos-hook]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0009 — Wire deleteTask — delete button and immediate removal

> Derived from [[dev/stories/US-0001-task-management]] (US-0003: Delete a Task)
> Blocked by: [[dev/tasks/T-0004-build-use-todos-hook]]

## What to build

Add `deleteTask(id)` to the `useTodos` hook and render a delete button in
each `TaskItem` row. Clicking removes the task from state immediately with
no confirmation dialog. Remaining tasks are unaffected in order and state.
The button has a clear affordance and is consistently positioned on every row.

## Acceptance criteria

_Behavior_
- [ ] Clicking delete removes the task immediately — no confirmation dialog
- [ ] Remaining tasks retain their order and completed state

_UI / markup_
- [ ] Each task row renders a `<button>` with a visible label or icon (e.g. "×")
- [ ] Delete button has sufficient size and contrast to be accessible
- [ ] Delete button is consistently positioned on every row (e.g. trailing end)

## Done

<!-- Move completed criteria here when verified -->

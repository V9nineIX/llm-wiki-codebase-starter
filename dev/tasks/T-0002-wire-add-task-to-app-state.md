---
title: Wire addTask to app state
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0001-task-management]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0001-build-add-task-input]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0002 — Wire addTask to app state

> Derived from [[dev/stories/US-0001-task-management]] (US-0001: Add a Task)
> Blocked by: [[dev/tasks/T-0001-build-add-task-input]]

## What to build

Implement `addTask(text)` in the parent component and pass it as `onAddTask`
to `AddTaskInput`. Each call prepends a new task object
`{ id: crypto.randomUUID(), text, completed: false }` to the tasks array.
The new task must appear at the top of the rendered list immediately.

## Acceptance criteria

- [ ] `addTask(text)` prepends `{ id: crypto.randomUUID(), text, completed: false }` to the tasks array
- [ ] New task appears at the top of the list immediately with no page reload
- [ ] Each task has a unique ID (no duplicates across multiple rapid submissions)
- [ ] Existing tasks retain their order and state after a new task is added

## Done

<!-- Move completed criteria here when verified -->

---
title: Build useTodos hook — load and persist to localStorage
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0004-persistence]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0004 — Build useTodos hook — load and persist to localStorage

> Derived from [[dev/stories/US-0004-persistence]] (US-0004: Tasks Survive a Page Refresh)
> Blocked by: None — can start immediately

## What to build

Extract task state into a `useTodos` custom hook that encapsulates all
read/write logic for `localStorage` key `todos-v1`. On mount the hook reads
and parses the stored value to initialise state. A `useEffect` writes the full
tasks array as JSON to `todos-v1` on every state change (add, toggle, delete).
Task order (newest-first) is preserved because it mirrors array order in state.

## Acceptance criteria

- [ ] `useTodos` returns `{ tasks, addTask, toggleTask, deleteTask }` and is the single source of truth for task state
- [ ] On mount, tasks are initialised from `localStorage` key `todos-v1` (parsed JSON array)
- [ ] On every state change, the full tasks array is written back to `todos-v1` as JSON
- [ ] A hard refresh restores the same tasks in the same order that were present before the refresh
- [ ] App still works if `todos-v1` is missing (starts with empty list) — error handling refined in [[dev/tasks/T-0005-harden-use-todos-read]]

## Done

<!-- Move completed criteria here when verified -->

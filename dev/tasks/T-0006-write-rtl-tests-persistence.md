---
title: Write RTL tests for persistence and error handling
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0004-persistence]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0005-harden-use-todos-read]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0006 — Write RTL tests for persistence and error handling

> Derived from [[dev/stories/US-0004-persistence]] (US-0004 + US-0005)
> Blocked by: [[dev/tasks/T-0005-harden-use-todos-read]]

## What to build

RTL + Jest tests for the `useTodos` hook covering the full persistence flow
and all corrupt-storage fallback paths. Mock `localStorage` via `jest.spyOn`
or `localStorage` fake — do not rely on real browser storage in tests.

## Acceptance criteria

_Happy path_
- [ ] On mount with valid `todos-v1`, tasks are rendered in stored order
- [ ] Adding a task writes the updated array to `todos-v1`
- [ ] Toggling a task writes the updated array to `todos-v1`
- [ ] Deleting a task writes the updated array to `todos-v1`

_Fallback paths_
- [ ] Missing `todos-v1` → app renders empty list, no error thrown
- [ ] Invalid JSON in `todos-v1` → app renders empty list, no error thrown
- [ ] Non-array value in `todos-v1` → app renders empty list
- [ ] Task with missing optional field → rendered with safe default, not dropped

## Done

<!-- Move completed criteria here when verified -->

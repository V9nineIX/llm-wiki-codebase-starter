---
title: Wire toggleTask — checkbox interaction and completed styling
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

# T-0007 — Wire toggleTask — checkbox interaction and completed styling

> Derived from [[dev/stories/US-0001-task-management]] (US-0002: Complete a Task)
> Blocked by: [[dev/tasks/T-0004-build-use-todos-hook]]

## What to build

Add `toggleTask(id)` to the `useTodos` hook and wire it to a checkbox in the
`TaskItem` component. Toggling flips `completed` in state and immediately
applies strikethrough + muted styling to the task text — no page reload needed.
The checkbox is a semantic element properly associated with the task label.

## Acceptance criteria

_Behavior_
- [ ] Clicking the checkbox toggles `completed` in the tasks array
- [ ] Clicking again restores the task to incomplete (true two-way toggle)
- [ ] Visual change is immediate with no page reload

_UI / markup_
- [ ] Checkbox is a semantic `<input type="checkbox">` associated with the task label via `htmlFor` / `id`
- [ ] Completed task text displays with strikethrough styling
- [ ] Completed task text is visually muted (reduced opacity or grey)
- [ ] Incomplete and complete states are visually distinct at a glance

## Done

<!-- Move completed criteria here when verified -->

---
title: Build AddTaskInput component
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0001-task-management]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0001 — Build AddTaskInput component

> Derived from [[dev/stories/US-0001-task-management]] (US-0001: Add a Task)
> Blocked by: None — can start immediately

## What to build

A self-contained `AddTaskInput` component with a text input and submit button.
The component owns its own input state, trims the value before submission, and
calls an `onAddTask(trimmedText)` prop on success. Whitespace-only input is
silently rejected. After a successful submission the input is cleared and
refocused. Markup is semantic; layout groups input and button in a single row.

## Acceptance criteria

- [ ] Renders a `<input type="text">` with a placeholder (e.g. "Add a task…") and a `<button type="submit">` with a visible label or icon
- [ ] Input and button are visually grouped in a single row with appropriate spacing
- [ ] Input has a visible focus ring / focus state
- [ ] Enter key and button click both call `onAddTask(trimmedText)` prop
- [ ] Whitespace-only input is silently rejected — `onAddTask` is not called, field is not cleared
- [ ] On successful submission, input is cleared and refocused

## Done

<!-- Move completed criteria here when verified -->

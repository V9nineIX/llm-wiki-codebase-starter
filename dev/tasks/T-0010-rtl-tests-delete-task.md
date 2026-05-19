---
title: Write RTL tests for delete-task flow
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0001-task-management]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0009-wire-delete-task]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0010 — Write RTL tests for delete-task flow

> Derived from [[dev/stories/US-0001-task-management]] (US-0003: Delete a Task)
> Blocked by: [[dev/tasks/T-0009-wire-delete-task]]

## What to build

RTL tests covering task deletion: immediate removal, sibling task integrity,
and delete button presence on every row.

## Acceptance criteria

- [ ] Clicking the delete button removes the target task from the rendered list
- [ ] Remaining tasks retain their text, order, and completed state after deletion
- [ ] Every rendered task row has exactly one delete button
- [ ] Deleting the last task results in an empty list (no crash)

## Done

<!-- Move completed criteria here when verified -->

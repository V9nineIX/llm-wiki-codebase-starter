---
title: Harden useTodos read — graceful fallback for corrupt or missing storage
type: task
tags: [task, react, todo, frontend, learning]
related-story: "[[dev/stories/US-0004-persistence]]"
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
blocked-by:
  - "[[dev/tasks/T-0004-build-use-todos-hook]]"
created: 2026-05-19
updated: 2026-05-19
---

# T-0005 — Harden useTodos read — graceful fallback for corrupt or missing storage

> Derived from [[dev/stories/US-0004-persistence]] (US-0005: Graceful Handling of Corrupt or Missing Storage)
> Blocked by: [[dev/tasks/T-0004-build-use-todos-hook]]

## What to build

Wrap the `localStorage` read in `useTodos` with a `try/catch` and add shape
validation. Any read failure (missing key, invalid JSON, non-array value)
falls back silently to an empty list — no crash, no error UI. Individual
tasks with missing optional fields are loaded with safe defaults rather than
dropped, so future schema additions don't break existing stored data.

## Acceptance criteria

- [ ] Missing `todos-v1` key → app starts with an empty list, no error thrown
- [ ] Invalid JSON in `todos-v1` → app falls back to empty list, no crash
- [ ] Non-array value in `todos-v1` → app falls back to empty list
- [ ] Task objects with missing optional fields are loaded with safe defaults (e.g. `completed: false`) rather than rejected
- [ ] Valid stored data is unaffected — no regression from T-0004 behaviour

## Done

<!-- Move completed criteria here when verified -->

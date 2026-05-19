---
title: React Todo App — Epics
type: epic
tags: [epic, react, todo, frontend, learning]
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
created: 2026-05-19
updated: 2026-05-19
---

# Epics — React Todo App

> Derived from [[dev/prd/PRD-0001-react-todo]]

## EPIC-0001-A: Task Management

Users can add, complete, and delete tasks. Input is trimmed and validated; new tasks are prepended (newest-first). Each task carries a stable `crypto.randomUUID()` ID and a `completed` boolean. Completed tasks are visually distinguished with strikethrough. Delete is single-click with no confirmation dialog.

**Stories:** [[dev/stories/US-0001-task-management]]

## EPIC-0001-B: Persistence

The full task list is serialised to `localStorage` under the key `todos-v1` on every state change and rehydrated on mount. A migration guard validates the stored shape and defaults missing fields gracefully instead of silently corrupting state.

**Stories:** [[dev/stories/US-0004-persistence]]

## EPIC-0001-C: Filtering

A filter bar lets users narrow the visible list to All, Active, or Completed tasks. Empty-state messages are filter-aware: "No tasks yet. Add one above." (All + empty list), "No active tasks." (Active filter), "No completed tasks." (Completed filter). Filter selection is ephemeral — it resets to "All" on every page load and is never persisted.

**Stories:** [[dev/stories/US-0006-filtering]]

## EPIC-0001-D: Layout & Styling

The app is styled exclusively with Tailwind CSS (no custom CSS beyond the index reset). It renders in a `max-w-xl` centered column, is usable at 375px on mobile, and shows an empty-state message when the task list is empty.

**Stories:** [[dev/stories/US-0008-layout-styling]]

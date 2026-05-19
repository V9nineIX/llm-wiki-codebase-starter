---
title: Persistence — User Stories
type: story
tags: [story, react, todo, frontend, learning]
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
created: 2026-05-19
updated: 2026-05-19
---

# User Stories — Persistence

> Derived from [[dev/epics/EPIC-0001-react-todo]] (EPIC-0001-B)

## US-0004: Tasks Survive a Page Refresh

**As a** user, **I want** my tasks to still be there when I reopen or refresh the tab **so that** I don't lose my list between sessions.

**Acceptance criteria:**
- [ ] On mount, tasks are loaded from `localStorage` key `todos-v1`.
- [ ] On every state change (add, toggle, delete), the full task list is written to `todos-v1`.
- [ ] A hard refresh (Ctrl+Shift+R) shows the same tasks that were present before the refresh.
- [ ] Task order (newest-first) is preserved across refresh.

**Tasks:** _to be generated with `/story-to-tasks`_

---

## US-0005: Graceful Handling of Corrupt or Missing Storage

**As a** user, **I want** the app to start cleanly even if my stored data is malformed **so that** a bad `localStorage` entry doesn't break the app.

**Acceptance criteria:**
- [ ] If `todos-v1` is missing, the app starts with an empty list.
- [ ] If `todos-v1` contains invalid JSON or an unexpected shape, the app falls back to an empty list (no crash).
- [ ] Tasks with missing optional fields (future schema additions) are loaded with safe defaults rather than rejected.

**Tasks:** _to be generated with `/story-to-tasks`_

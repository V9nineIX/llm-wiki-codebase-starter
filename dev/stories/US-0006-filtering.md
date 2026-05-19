---
title: Filtering — User Stories
type: story
tags: [story, react, todo, frontend, learning]
related-epic: "[[dev/epics/EPIC-0001-react-todo]]"
related-prd: "[[dev/prd/PRD-0001-react-todo]]"
created: 2026-05-19
updated: 2026-05-19
---

# User Stories — Filtering

> Derived from [[dev/epics/EPIC-0001-react-todo]] (EPIC-0001-C)

## US-0006: Filter Tasks by Status

**As a** user, **I want to** click a filter button **so that** I can focus on only the tasks relevant to my current context.

**Acceptance criteria:**
- [ ] Filter bar displays three options: All, Active, Completed.
- [ ] "All" shows every task regardless of completion state.
- [ ] "Active" shows only tasks where `completed` is `false`.
- [ ] "Completed" shows only tasks where `completed` is `true`.
- [ ] The active filter is visually highlighted.
- [ ] Filter defaults to "All" on every page load (never persisted).

**Tasks:** _to be generated with `/story-to-tasks`_

---

## US-0007: Empty State per Filter

**As a** user, **I want to** see a helpful message when a filter returns no tasks **so that** I know the list is empty rather than broken.

**Acceptance criteria:**
- [ ] All filter + no tasks → "No tasks yet. Add one above."
- [ ] Active filter + no incomplete tasks → "No active tasks."
- [ ] Completed filter + no completed tasks → "No completed tasks."
- [ ] The message disappears as soon as a matching task exists.

**Tasks:** _to be generated with `/story-to-tasks`_

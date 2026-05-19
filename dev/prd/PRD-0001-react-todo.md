---
title: React Todo App
type: prd
status: accepted
created: 2026-05-15
updated: 2026-05-19
owner: me
stakeholders: []
tags: [react, todo, frontend, learning]
related-adrs: []
related-projects: ["[[dev/projects/react-todo]]"]
sources: []
---

# PRD-0001: React Todo App

## TL;DR

A simple, client-side todo application built with [[React]] and Tailwind CSS. Anyone can use it to manage their daily tasks without sign-up or a backend. The goal is a clean learning project that demonstrates full CRUD with [[localStorage]] persistence.

## Problem

Users who want a lightweight task list often face tools that are over-engineered — requiring accounts, syncing services, or mobile installs. A minimal in-browser todo app solves this for casual use: open it, add tasks, close it, come back and they're still there.

Without this app, the only option is the blank CRA scaffold that does nothing useful. This project exists to turn that scaffold into a functional, styled, responsive UI demonstrating React fundamentals.

## Goals

1. User can add a new task by typing and submitting.
2. User can mark any task complete or incomplete (toggle).
3. User can delete any task.
4. User can filter the list by status: All / Active / Completed.
5. Tasks persist across browser refresh via [[localStorage]].
6. App is responsive and usable on both mobile and desktop.

## Non-goals

1. No backend or server — all state lives in the browser.
2. No user authentication or accounts.
3. No due dates, priorities, or labels.
4. No drag-to-reorder.
5. No edit-in-place for task text (delete and re-add instead).
6. No sync across devices.

## Users and use cases

**Primary user:** Anyone who wants a quick task list in the browser.

- **As a user**, I want to type a task and press Enter so that it appears in my list immediately.
- **As a user**, I want to click a checkbox so that a task is marked done and visually struck through.
- **As a user**, I want to click a delete button so that I can remove a task I no longer need.
- **As a user**, I want to filter by Active or Completed so that I can focus on what still needs doing.
- **As a user**, I want my tasks to still be there when I reopen the browser tab so that I don't lose my list.

## Requirements

### Functional

- [ ] Text input + submit button (or Enter key) to add a task. Input is trimmed on submit; empty/whitespace-only strings are silently rejected (no error UI, input stays focused). New tasks are prepended (newest-first order).
- [ ] Each task has a stable unique ID generated via `crypto.randomUUID()` (no library).
- [ ] Each task displays its text and a completion checkbox.
- [ ] Clicking the checkbox toggles `completed` state.
- [ ] Completed tasks are visually distinguished (e.g. strikethrough).
- [ ] Each task has a delete button that removes it from the list.
- [ ] Filter bar with three options: All, Active, Completed.
- [ ] Active filter shows only incomplete tasks; Completed shows only done tasks.
- [ ] Filter selection is intentionally ephemeral — resets to "All" on every page load (not persisted).
- [ ] Task list is read from `localStorage` on mount and written on every state change.
- [ ] Storage key is versioned (`todos-v1`). On read, validate shape; unknown/missing fields default gracefully (migration guard, not silent corruption).

### Non-functional

- [ ] Styled with Tailwind CSS — no custom CSS files beyond index.css reset.
- [ ] Responsive layout: single-column on mobile, `max-w-xl` (576px) centered on desktop.
- [ ] No third-party state management library (React `useState` only).
- [ ] Empty-state message shown when the filtered list has no tasks.

## Success metrics

| Metric | Baseline | Target | Measurement |
|---|---|---|---|
| All CRUD actions work | None (blank scaffold) | All 4 operations functional | Manual smoke test |
| Tasks survive refresh | N/A | Tasks reload from localStorage | Hard-refresh test |
| Mobile layout | N/A | Usable at 375px width | Browser DevTools resize |

## Open questions

None — all scope questions resolved during planning.

## Milestones

- **M1 — Functional CRUD**: Add, toggle, delete, filter all working with localStorage. Tailwind styling applied. Responsive layout verified.

## References

- [[wiki/concepts/React]]
- [[wiki/concepts/localStorage]]
- [[dev/projects/react-todo]]

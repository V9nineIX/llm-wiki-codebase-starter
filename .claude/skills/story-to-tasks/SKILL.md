---
name: story-to-tasks
description: Break down a User Story into independently-grabbable vertical-slice Tasks ready for agent delegation, written to dev/tasks/T-NNNN-slug.md with Obsidian frontmatter and wikilinks. Gates with grill-with-docs before generating. Use when the user says "create tasks from story", "break down user story", or invokes /story-to-tasks.
---

# Skill: User Story to Tasks (Agent-Ready Vertical Slices)

Converts a User Story into thin, independently-grabbable vertical-slice Tasks
in `dev/tasks/`. Each task is a tracer bullet that cuts through ALL layers
(schema → logic → UI → tests) end-to-end, demoable on its own, and safe to
hand to an AFK agent without further clarification.

## Workflow

### 1. Find the Story
Read `dev/stories/` and identify the target story. If multiple exist, ask
which one. The user may also paste or quote the story directly.

### 2. Gate: grill-with-docs
Always prompt:
> "Run `/grill-with-docs` on this Story first to validate against existing
> ADRs and domain model? (recommended) or proceed directly?"

Skip only if user explicitly says proceed.

### 3. Draft vertical slices

Break the story into **tracer-bullet slices**. Each slice is a thin vertical
cut through every relevant layer — NOT a horizontal layer-by-layer breakdown.

**Slice rules:**
- Each slice is narrow but COMPLETE end-to-end (schema + logic + UI + test)
- A completed slice is independently demoable or verifiable
- Classify each slice as **AFK** (agent can complete without human input) or
  **HITL** (requires a human decision, design review, or external dependency)
- Prefer AFK over HITL where possible
- Prefer many thin slices over few thick ones (aim for 2–5 per story)
- Each slice should complete in one focused session (~2 hours max)

**Good slice:** "Wire `toggleTask(id)` end-to-end: flip `completed` in state,
persist to DB, reflect in UI checkbox, write unit + integration tests"

**Bad slice:** "Update state" / "Add UI" / "Handle toggle"

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each slice show:
- **Title**: short descriptive name (imperative, agent-ready)
- **Type**: AFK / HITL
- **Blocked by**: which other T-NNNN slices must complete first (or "None")
- **Acceptance criteria**: 2–4 bullet checkboxes

Ask:
- Does the granularity feel right? (too coarse / too fine)
- Are the dependency relationships correct?
- Should any slices be merged or split?
- Are the correct slices marked HITL vs AFK?

Iterate until the user approves.

### 5. Find next T numbers

Read all files in `dev/tasks/` (create folder if missing). Next number =
highest T-NNNN + 1. Start at `T-0001` if none exist.

Assign **one file per slice** with sequential numbers, allocated in dependency
order (blockers get lower numbers).

### 6. Write files

Write each approved slice to `dev/tasks/T-NNNN-slug.md` using the template
below. Write blockers first so `[[wikilinks]]` to them resolve correctly.

### 7. Report

List each file created, its type (AFK/HITL), and its blockers.

---

## File template

```markdown
---
title: <Slice Title>
type: task
agent-type: AFK | HITL
tags: [task, <same tags as parent story>]
related-story: "[[dev/stories/US-NNNN-slug]]"
related-epic: "[[dev/epics/EPIC-NNNN-slug]]"
related-prd: "[[dev/prd/PRD-NNNN-slug]]"
blocked-by:
  - "[[dev/tasks/T-NNNN-slug]]"   # or remove section if none
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# T-NNNN — <Slice Title>

> Derived from [[dev/stories/US-NNNN-slug]]
> Type: AFK | HITL
> Blocked by: [[dev/tasks/T-NNNN-slug]] | None — can start immediately

## What to build

<Concise description of the end-to-end behavior this slice delivers.
Describe observable behavior, not layer-by-layer implementation steps.
Avoid file paths — they go stale. If a prototype produced a key snippet
(state shape, schema, type), inline it briefly and note it came from a
prototype.>

## Acceptance criteria

- [ ] <Criterion 1>
- [ ] <Criterion 2>
- [ ] <Criterion 3>

## Done

<!-- Move completed criteria here when verified -->
```

---

## Rules

- Use `[[wikilinks]]` for ALL internal references. NEVER `[text](path.md)`.
- Slice titles are imperative and agent-readable: "Add X", "Wire Y", "Expose Z".
- Do NOT invent scope not implied by the story's acceptance criteria.
- HITL slices must name what human decision or review is needed in "What to build".
- If `dev/tasks/` does not exist, create it before writing.
- After writing, developer or agent team picks up AFK tasks immediately;
  HITL tasks wait for the human gate to clear.

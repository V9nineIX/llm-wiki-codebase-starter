---
name: epic-to-stories
description: Break down an Epic into User Stories and write to dev/stories/US-NNNN-slug.md with Obsidian frontmatter and wikilinks. Gates with grill-with-docs before generating. Use when the user says "create stories from epic", "break down epic", or invokes /epic-to-stories.
---

# Skill: Epic to User Stories

Converts an Epic into INVEST-compliant User Stories in `dev/stories/`.
Each story is independently deliverable and will feed into `/story-to-tasks`.

## Workflow

1. **Find the Epic** — read `dev/epics/` and identify the target Epic.
   If multiple exist, ask which one. The user may also name the Epic section
   directly (e.g. "Task Management epic").

2. **Gate: grill-with-docs** — always prompt:
   > "Run `/grill-with-docs` on this Epic first to validate against existing
   > ADRs and domain model? (recommended) or proceed directly?"
   Skip only if user explicitly says proceed.

3. **Find next US number** — read all files in `dev/stories/` (create folder
   if missing). Next number = highest US-NNNN + 1. Start at `US-0001`
   if none exist. Each story gets its own sequential number.

4. **Break into User Stories** — write 2–5 stories per Epic.
   Each story follows the standard format:
   > As a <user>, I want to <action> so that <outcome>.

   Apply INVEST criteria:
   - **I**ndependent — can be built and tested alone
   - **N**egotiable — not a rigid spec
   - **V**aluable — delivers something the user notices
   - **E**stimable — small enough to size
   - **S**mall — completable in one session
   - **T**estable — has a clear acceptance criterion

5. **Write** one file per Epic to `dev/stories/US-NNNN-slug.md`
   using the template below.

6. **Report** — file path, number of stories, suggest `/story-to-tasks` next.

## File template

```markdown
---
title: <Epic Name> — User Stories
type: story
tags: [story, <same tags as parent PRD>]
related-epic: "[[dev/epics/EPIC-NNNN-slug]]"
related-prd: "[[dev/prd/PRD-NNNN-slug]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# User Stories — <Epic Name>

> Derived from [[dev/epics/EPIC-NNNN-slug]]

## US-NNNN: <Story Title>

**As a** user, **I want to** <action> **so that** <outcome>.

**Acceptance criteria:**
- [ ] <observable condition that proves it works>
- [ ] <edge case if relevant>

**Tasks:** _to be generated with `/story-to-tasks`_

---

## US-NNNN: <Story Title>

...
```

## Rules

- Use `[[wikilinks]]` for all internal references. NEVER `[text](path.md)`.
- Each story must have at least one acceptance criterion.
- Stories describe user behaviour, not implementation. "User can filter tasks"
  not "Add filter state to useState".
- If `dev/stories/` does not exist, create it before writing.
- After writing, suggest next step: `/story-to-tasks` on each story.

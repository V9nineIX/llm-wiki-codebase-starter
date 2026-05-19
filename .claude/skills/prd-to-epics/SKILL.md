---
name: prd-to-epics
description: Break down a PRD into Epics and write to dev/epics/EPIC-NNNN-slug.md with Obsidian frontmatter and wikilinks. Gates with grill-with-docs before generating. Use when the user says "create epics from PRD", "break down PRD into epics", or invokes /prd-to-epics.
---

# Skill: PRD to Epics

Converts a PRD into a structured Epic file in `dev/epics/`.
Each Epic is a major feature area that can be independently developed
and will feed into `/epic-to-stories`.

## Workflow

1. **Find the PRD** — read `dev/prd/` and identify the target PRD.
   If multiple exist, ask which one.

2. **Gate: grill-with-docs** — if PRD status is `draft`, prompt:
   > "This PRD is still in draft. Run `/grill-with-docs` first to validate
   > against existing ADRs? (recommended) or proceed directly?"
   Only skip if PRD is `accepted` or user explicitly says proceed.

3. **Find next EPIC number** — read all files in `dev/epics/` (create folder
   if missing). Next number = highest EPIC-NNNN + 1. Start at `EPIC-0001`
   if none exist.

4. **Derive slug** — use the same slug as the PRD.
   E.g. `PRD-0001-react-todo` → `EPIC-0001-react-todo`.

5. **Break into Epics** — scan PRD Goals and Requirements sections.
   Group into 3–6 Epics. Each Epic is a user-facing capability area,
   not a technical layer. Name in Title Case noun phrases.

   Good: "Task Management", "Persistence", "Filtering"
   Bad: "Backend", "useState", "localStorage"

6. **Write** to `dev/epics/EPIC-NNNN-slug.md` using the template below.

7. **Report** — file path, number of epics, suggest running `/epic-to-stories`
   on each epic next.

## File template

```markdown
---
title: <PRD title> — Epics
type: epic
tags: [epic, <same tags as PRD>]
related-prd: "[[dev/prd/PRD-NNNN-slug]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Epics — <PRD title>

> Derived from [[dev/prd/PRD-NNNN-slug]]

## EPIC-NNNN-A: <Epic Name>

<1–2 sentence description of the feature area and its user value.>

**Stories:** _to be generated with `/epic-to-stories`_

## EPIC-NNNN-B: <Epic Name>

<description>

**Stories:** _to be generated with `/epic-to-stories`_
```

## Rules

- Use `[[wikilinks]]` for all internal references. NEVER `[text](path.md)`.
- Each Epic covers one coherent user-facing area — if two areas could ship
  independently, they are separate Epics.
- Do NOT invent epics not implied by the PRD.
- If `dev/epics/` does not exist, create it before writing.
- After writing, suggest next step: `/epic-to-stories` on each Epic.

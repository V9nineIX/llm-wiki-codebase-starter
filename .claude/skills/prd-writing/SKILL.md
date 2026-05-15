---
name: prd-writing
description: Product Requirements Document (PRD) pattern of this vault. Consult
  BEFORE creating or editing files in dev/prd/. Defines numbering, frontmatter,
  section structure, status flow, and the bridge from PRD to wiki distillation.
---

# Skill: PRD Writing

PRDs in this vault capture the **what** and **why** of a product or feature
before implementation. They live in `dev/prd/` (collaborative zone) and feed
the `wiki/` zone through concept extraction.

A PRD is not an ADR. An ADR records a technical decision, immutable once
accepted. A PRD describes the product surface and evolves as understanding
sharpens.

## When to create

- A new feature or product idea has stabilized enough to be written down.
- An idea in `raw/ideas/` has been discussed and is ready for structure.
- A change to an existing product is large enough that it deserves its own
  scope document (rule of thumb: more than 1 sprint of work).

If the idea is still fuzzy, do NOT force it into a PRD. Save it to
`raw/ideas/YYYY-MM-DD-slug.md` first and iterate.

## Numbering and name

Files: `dev/prd/PRD-NNNN-short-slug.md`. NNNN is the next available integer,
zero-padded to 4 digits. E.g., `PRD-0003-vault-search-ui.md`.

Before creating a new PRD, READ all files in `dev/prd/` to find the next
number and detect if a PRD on the topic already exists (in which case update
the existing one instead of creating a new one).

## Required frontmatter

 ```yaml
---
title: <Short noun phrase — the product or feature name>
type: prd
status: draft | in-review | accepted | shipped | abandoned
created: 2026-05-15
updated: 2026-05-15
owner: me
stakeholders: []
tags: [tag1, tag2]
related-adrs: []       # ["[[ADR-0007]]"] when relevant
related-projects: []   # ["[[Project-X]]"] when relevant
sources:               # raw/ideas, raw/clippings that seeded this PRD
  - "[[raw/ideas/2026-05-15-example]]"
---
 ```

## Structure

 ```markdown
# PRD-NNNN: <Title>

## TL;DR

3 sentences. What is being built, for whom, and why now.

## Problem

2-4 paragraphs. The observed pain or opportunity. Include:
- Concrete symptom or user friction (not abstract)
- Who experiences it and how often
- What happens today without this product/feature
- Wikilinks to related concepts [[Concept-X]] or entities [[Entity-Y]]

## Goals

Numbered list. Each goal is measurable or at least observable.

1. <Goal — what success looks like>
2. ...

## Non-goals

Numbered list. Things we are explicitly NOT solving in this PRD. This
section is load-bearing — it prevents scope creep later.

1. <Non-goal>
2. ...

## Users and use cases

Brief description of the primary user(s) and 2-5 concrete use cases.
Use cases are written as scenarios, not feature lists:

- **As <user>**, I want to <action> so that <outcome>.
- ...

## Requirements

### Functional

- [ ] <Requirement — what the system must do>
- [ ] ...

### Non-functional

- [ ] <Constraint — performance, security, accessibility, etc.>
- [ ] ...

## Success metrics

How we'll know it worked. Each metric has a baseline (or "TBD") and a target.

| Metric | Baseline | Target | Measurement |
|---|---|---|---|
| <name> | <value> | <value> | <how> |

## Open questions

Numbered. Each question has an owner (or "TBD") and a decision deadline
(or "before shipping").

1. <Question> — owner: <name>, deadline: <date or milestone>
2. ...

## Milestones

Chronological. Optional but encouraged.

- **M1 — <name>**: <scope, target date>
- **M2 — <name>**: <scope, target date>

## References

- [[raw/ideas/...]]
- [[raw/clippings/...]]
- [[wiki/concepts/...]]
- [[dev/adr/ADR-NNNN]]
- External URLs when relevant
 ```

## Status flow

```
draft -> in-review -> accepted -> shipped
                   \-> abandoned
                   \-> superseded (by newer PRD; link both ways)
```

- `draft`: actively being written, frontmatter and most sections may be incomplete.
- `in-review`: structure stable, awaiting feedback from stakeholders.
- `accepted`: PRD is the source of truth; implementation can start. Open
  questions should be resolved or explicitly deferred.
- `shipped`: feature is live. PRD is now a historical record — do not edit
  except for adding a "Retrospective" section linking to a [[debrief]].
- `abandoned`: decision was made not to build. Add a one-paragraph reason
  at the top under `## Why abandoned`.

## Rules

- PRDs in `accepted` or `shipped` status are not silently rewritten. Material
  changes go through a `status: in-review` cycle or a new PRD that supersedes
  this one (update both PRDs' frontmatter accordingly).
- Never delete a PRD. Even abandoned ones are valuable history.
- Every PRD MUST have at least one `[[wikilink]]` to either a concept, an
  entity, or a related ADR/project. PRDs that touch nothing else in the vault
  are a smell — either the wiki is missing context (extract it) or the PRD
  is too disconnected from the rest of the work.
- If the PRD references a concept that does not yet exist in `wiki/concepts/`,
  PROPOSE creating that wiki page before finalizing the PRD. The wiki page
  should outlive the PRD.

## PRD -> wiki distillation

After a PRD reaches `accepted`, run a distillation pass:

1. Scan the PRD for concepts and entities mentioned.
2. For each concept not already in `wiki/concepts/`, create a page following
   the standard concept frontmatter (see `CLAUDE.md`). The PRD goes in that
   page's `sources:` list.
3. For each existing concept page touched by this PRD, update its `sources:`
   list and add a one-paragraph "Notes" entry referencing the PRD.
4. Add a wikilink to the PRD from any relevant wiki page.
5. Append a log entry to `log.md`:

```
## [YYYY-MM-DD] prd | PRD-NNNN <title> accepted

**Source:** [[dev/prd/PRD-NNNN-slug]]

Created/updated concepts:
- [[Concept-A]]
- [[Concept-B]]

**Open follow-ups:** <if any>
```

## Idea -> PRD bridge

When the user has an idea that is not yet a PRD:

1. Save the idea to `raw/ideas/YYYY-MM-DD-slug.md` with minimal frontmatter
   (`type: idea`, `created`, `tags`).
2. Discuss with the user: who is the user, what is the pain, what would
   success look like, what is out of scope.
3. Only after the rough shape stabilizes, scaffold the PRD in `dev/prd/`
   and start filling sections. Leave sections you cannot answer as
   "TBD — <what we need to know>" rather than inventing content.

Never auto-promote an idea to a PRD without confirming with the user.

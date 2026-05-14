---
name: adr-writing
description: Architecture Decision Records (ADRs) pattern of this vault. Consult
  BEFORE creating or editing files in dev/adr/. Defines numbering, frontmatter,
  section structure, and status flow.
---

# Skill: ADR Writing

ADRs in this vault follow the MADR (Markdown Architecture Decision Records)
format adapted. Each ADR is a `.md` file in `dev/adr/`.

## Numbering

Files: `dev/adr/ADR-NNNN-short-slug.md`. NNNN is the next available integer,
zero-padded to 4 digits. E.g., `ADR-0007-use-pgvector-for-rag.md`.

Before creating a new ADR, READ all files in dev/adr/ to find the next number
and detect if an ADR on the topic already exists (in which case update existing
instead of creating new).

## Required frontmatter

 ```yaml
---
title: Use pgvector for RAG storage
type: adr
status: proposed | accepted | rejected | superseded
decision-date: 2026-05-01
deciders: [me, Roan]
tags: [rag, postgres, vector-db]
supersedes: []  # ADR-XXXX if applicable
superseded-by: []
---
 ```

## Structure

 ```markdown
# ADR-NNNN: <Short imperative title>

## Context

2-4 paragraphs describing the problem and what motivated this decision. Include:
- Observed symptom / business requirement
- Known constraints
- Wikilinks to related projects [[Project-X]]

## Decision

1 direct paragraph. "We will use X." No adjectives. No "after careful analysis."

## Consequences

### Positive
- Short bullet item

### Negative / trade-offs
- Short bullet item

### Neutral
- Short bullet item

## Alternatives considered

Brief list. For each: why rejected (1-2 sentences).

## References

- [[raw/papers/...]]
- [[wiki/concepts/...]]
- External URLs when relevant
 ```

## Rules

- Accepted ADR is IMMUTABLE except for status change (accepted → superseded).
- Never delete an old ADR. If superseded, mark status: superseded and
  link superseded-by to the new one.
- If you find contradiction between two ADRs, DO NOT resolve alone. Report to Roan.
Create ~/vault/.claude/skills/debrief-writing/SKILL.md:

---
name: debrief-writing
description: Debrief / post-mortem pattern of this vault. Consult BEFORE creating
  or editing files in dev/debriefs/. Focuses on facts, not blame, and forces
  identification of generalizable learning.
---

# Skill: Debrief / Post-mortem Writing

Debriefs document incidents or significant events. The goal is **learning**,
not blame attribution. Each debrief is blameless.

## When to create

- Production incident (any severity)
- Bug that took >2h to diagnose
- Technical decision that proved wrong and had to be reverted
- Sprint or project ended (retrospective debrief)

## Numbering and name

`dev/debriefs/YYYY-MM-DD-short-slug.md`

## Frontmatter

 ```yaml
---
title: <What happened, in one sentence>
type: debrief
incident-date: 2026-04-28
severity: low | medium | high | critical
duration-minutes: 45
tags: [tag1, tag2]
related-projects: ["[[Project-X]]"]
related-adrs: ["[[ADR-0007]]"]
---
 ```

## Structure

 ```markdown
# Debrief: <title>

## TL;DR

3 sentences. What, impact, root cause.

## Timeline

Chronological list of events. Use UTC or explicit timezone.

- 14:32 — Alarm fires
- 14:35 — On-call investigates
- 14:48 — Root cause identified
- ...

## Root cause

Honest technical analysis. No softened reformulations.

## What worked

3-5 bullet items.

## What didn't work

3-5 bullet items. No people names — describe the system/process.

## Action items

Numbered list with [[wikilinks]] to projects where action will be executed.

- [ ] 1. Add timeout in [[Service-X]] for external calls
- [ ] 2. Update [[ADR-0003]] with new constraint

## Generalizable learning

1-2 paragraphs. **This is the most important section.** What goes beyond this
incident? What pattern applies to other systems? One-sentence answer:
"Systems that X must Y" — something that could become a future skill rule.
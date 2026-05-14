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
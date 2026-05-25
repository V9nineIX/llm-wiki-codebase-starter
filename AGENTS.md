# AGENTS.md — LLM Wiki Vault (Obsidian Knowledge Base)

This is an Obsidian vault implementing the **LLM Wiki Pattern** — a persistent, compounding
knowledge base where an LLM agent incrementally maintains a structured wiki between the user
and immutable raw sources.

You are an agent operating inside this vault. Your behavior is governed by this file,
`CLAUDE.md`, and the skills in `.claude/skills/`.

## Project overview

- **Purpose:** Personal knowledge base structured as a three-zone Obsidian vault.
  The agent compiles raw sources into a cross-referenced wiki, tracks engineering
  decisions (ADRs), and manages software development artifacts (PRDs, epics, stories, tasks).
- **Origin:** Andrej Karpathy's LLM Wiki Pattern (April 2026). See `wiki/concepts/LLM Wiki Pattern.md`.
- **Pattern:** Ingest raw sources → compile into wiki → query accumulated knowledge → lint for health.
- **Repo:** `wi9/llm-wiki-codebase-starter` (private).

## Directory structure

```
.
├── CLAUDE.md                 # Primary agent schema (zone rules, conventions, workflows)
├── AGENTS.md                 # This file — project overview for any coding agent
├── README.md                 # Minimal placeholder
├── log.md                    # Chronological append-only vault operation log
├── .gitignore                # Ignores workspace state, logs, DS_Store, /tmp/
│
├── raw/                      # ZONE 1 — READ-ONLY immutable sources
│   └── clippings/            #   Captured articles, papers, gists
│       └── YYYY-MM-DD-slug.md
│
├── wiki/                     # ZONE 2 — LLM-MAINTAINED knowledge
│   ├── index.md              #   Global content-oriented index
│   ├── concepts/             #   Concept pages (e.g. LLM Wiki Pattern, RAG, pgvector)
│   └── entities/             #   Entity pages (people, companies e.g. Andrej Karpathy, Verdent)
│
├── dev/                      # ZONE 3 — COLLABORATIVE engineering artifacts
│   ├── adr/                  #   Architecture Decision Records (ADR-NNNN-slug.md)
│   ├── prd/                  #   Product Requirement Documents (PRD-NNNN-slug.md)
│   ├── epics/                #   Epics broken down from PRDs (EPIC-NNNN-slug.md)
│   ├── stories/              #   User Stories from epics (US-NNNN-slug.md)
│   └── tasks/                #   Implementation tasks from stories (T-NNNN-slug.md)
│
├── .claude/                  # Claude Code configuration
│   ├── settings.local.json   #   Allowed-tools permissions
│   ├── commands/             #   Slash commands (wiki-ingest, wiki-query)
│   └── skills/               #   Agent skills (prd-writing, adr-writing, etc.)
│
└── .obsidian/                # Obsidian app config (core plugins, appearance)
```

## Zone rules (from CLAUDE.md)

| Zone | Path | Write Rules | Owner |
|------|------|-------------|-------|
| 1 | `raw/` | **READ-ONLY.** Never edit, rename, or move. Only read, cite, reference. | User-curated |
| 2 | `wiki/` | **LLM-MAINTAINED.** Create, edit, refactor freely. Every page must have frontmatter + at least 1 wikilink. | Agent-owned |
| 3 | `dev/` | **COLLABORATIVE.** Work together. NEVER edit an ADR without explicit confirmation. | Shared |

## Wikilink conventions

- ALWAYS use `[[wikilinks]]` for internal links. NEVER `[text](file.md)`.
- Concepts: `[[LLM Wiki Pattern]]`, `[[Optimistic Locking]]` (Title Case)
- Entities (people/companies): `[[Andrej Karpathy]]`, `[[Anthropic]]`
- Projects: `[[ECOM-API]]`, `[[Master-Thesis]]`
- Tags in frontmatter, comma-separated, kebab-case: `tags: [llm-wiki, knowledge-management]`

## Frontmatter conventions

Every wiki page must have:

```yaml
---
title: <title>
type: concept | entity | synthesis | adr | debrief | project | reading
tags: [tag1, tag2]
sources:
  - "[[raw/clippings/example]]"
created: 2026-05-01
updated: 2026-05-01
---
```

Additional fields by type:
- **ADR:** `status: proposed | accepted | superseded`, `decision-date`
- **Debrief:** `incident-date`, `severity`

## Ingestion workflow (`/wiki-ingest`)

1. Identify source. If URL, extract clean content.
2. Save raw to `raw/clippings/YYYY-MM-DD-slug.md` with frontmatter (URL, capture date).
3. Identify 3-7 key concepts and 1-3 entities.
4. New concepts → create page in `wiki/concepts/Concept.md`.
5. Existing concepts → update with new source in "Sources" + nuance in "Notes". NEVER rewrite entire page.
6. Create/update bidirectional wikilinks.
7. Update `wiki/index.md` if genuinely new.
8. Report: concepts created/updated, links added.

## Dev workflow (PRD → tasks pipeline)

```
/prd-writing → /grill-with-docs → /prd-to-epics
                                 → /grill-with-docs → /epic-to-stories
                                                     → /grill-with-docs → /story-to-tasks → build
```

Before creating `.canvas` or `.base` files, consult the corresponding skill.
Before generating epics/stories/tasks, run `/grill-with-docs` on the source artifact.

## Agent skills (`.claude/skills/`)

### Obsidian
- `obsidian-markdown` — Obsidian native syntax (ALWAYS use)
- `obsidian-bases` — databases via `.base`
- `json-canvas` — visual whiteboards
- `obsidian-cli` — automation via `obsdmd`
- `defuddle` — clean web content extraction

### Dev workflow
- `prd-writing` — create/edit PRDs in `dev/prd/`
- `adr-writing` — create/edit ADRs in `dev/adr/`
- `debrief-writing` — create debriefs in `dev/debriefs/`
- `prd-to-epics` — break PRD into Epics → `dev/epics/`
- `epic-to-stories` — break Epic into User Stories → `dev/stories/`
- `story-to-tasks` — break User Story into Tasks → `dev/tasks/`

## Strict limits

- NEVER delete files without explicit confirmation.
- NEVER run `git push` (the user does that manually).
- NEVER edit `CLAUDE.md` itself (ask the user).
- If an operation affects more than 5 files, SHOW the plan before executing.
- If unsure which zone a file belongs to, ASK.

## Key conventions summary

| Convention | Rule |
|------------|------|
| Internal links | `[[wikilinks]]` only, never markdown links |
| Page naming | Title Case for concepts/entities, kebab-case for filenames |
| Tags | kebab-case, comma-separated in frontmatter |
| Wiki pages | Minimum: frontmatter + at least 1 wikilink to another page |
| ADR edits | Require explicit confirmation before touching |
| Raw sources | Immutable — read and cite, never modify |
| Multi-file changes | Show plan before executing if >5 files affected |
| Git push | Manual only, user-owned |

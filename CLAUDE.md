# CLAUDE.md — Personal vault

You are operating inside my Obsidian vault. This file is read every session
and defines how you should behave.

## Zone structure

The vault has three zones with strictly different rules:

### Zone 1 — `raw/` (READ-ONLY)
Sources I curated: clipped articles, paper PDFs, books read,
my daily notes, fleeting thoughts.
- You NEVER edit files in raw/.
- You NEVER rename or move files in raw/.
- You only read, cite, and reference via [[wikilinks]].

### Zone 2 — `wiki/` (LLM-MAINTAINED)
Wiki generated and maintained by you. Concepts, entities, syntheses, indices.
- You own this zone. Create, edit, refactor freely.
- I rarely edit wiki/ by hand. If I ask for change, regenerate carefully.
- Every page in wiki/ MUST have frontmatter with: title, type, tags, sources.
- Every page MUST have at least 1 wikilink to another relevant page.

### Zone 3 — `dev/` (COLLABORATIVE)
Technical notes from my work: ADRs, debriefs, projects, snippets.
- We work together here.
- NEVER edit an existing ADR without explicit confirmation ("can I edit ADR-007?").
- You may SUGGEST rephrasings, find related ADRs, propose wikilinks.

## Wikilink conventions

- ALWAYS use [[wikilinks]] for internal links. NEVER `[text](file.md)`.
- For concepts: [[LLM Wiki Pattern]], [[Optimistic Locking]] (Title Case).
- For entities (people/companies): [[Andrej Karpathy]], [[Anthropic]].
- For projects: [[ECOM-API]], [[Master-Thesis]].
- Tags in frontmatter, comma-separated, kebab-case: `tags: [llm-wiki, knowledge-management]`.

## Frontmatter conventions

Every page you create must have this minimum frontmatter:

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

For ADRs, add: `status: proposed | accepted | superseded`, `decision-date`.
For debriefs, add: `incident-date`, `severity`.

## Ingestion workflow (when I request /wiki-ingest)

1. Identify the source. If URL, use the `defuddle` skill to extract clean content.
2. Save raw content to `raw/clippings/YYYY-MM-DD-slug.md` with frontmatter
   including original URL and capture date.
3. Identify 3-7 key concepts and 1-3 entities.
4. For each new concept: create page in `wiki/concepts/Concept.md`.
5. For each existing concept: update the page with new source in "Sources" section
   and new nuance in "Notes" section. NEVER rewrite the entire page.
6. Create/update bidirectional wikilinks between the clipping and the concepts.
7. Update `wiki/index.md` if something is genuinely new.
8. Report what was done as a list — concepts created/updated, links added.

## Strict limits

- NEVER delete files without explicit confirmation.
- NEVER run git push (I do that manually).
- NEVER edit CLAUDE.md itself (ask me).
- If an operation affects more than 5 files, SHOW the plan before executing.
- If unsure which zone a file belongs to, ASK.

## Available skills

Skills loaded in `.claude/skills/`:

### Obsidian
- `obsidian-markdown` — Obsidian native syntax (ALWAYS use)
- `obsidian-bases` — databases via .base
- `json-canvas` — visual whiteboards
- `obsidian-cli` — automation via obsdmd command
- `defuddle` — clean web content extraction

### Dev workflow
- `prd-writing` — `/prd-writing` create or edit PRDs in dev/prd/
- `adr-writing` — `/adr-writing` create or edit ADRs in dev/adr/
- `debrief-writing` — `/debrief-writing` create debriefs in dev/debriefs/
- `prd-to-epics` — `/prd-to-epics` break PRD into Epics → dev/epics/
- `epic-to-stories` — `/epic-to-stories` break Epic into User Stories → dev/stories/
- `story-to-tasks` — `/story-to-tasks` break User Story into Tasks → dev/tasks/

### Agent team (multi-agent development)
- `orchestrator-workflow` — Team Lead: SPAWN→PLAN→DISPATCH→COLLECT→TEST→QA_REVIEW→COMMIT→REPORT
- `subagent-frontend` — Component/UI developer (components, App.jsx, component tests)
- `subagent-backend` — State/hook developer (useTodos.js, hook tests)
- `subagent-qa` — QA engineer (acceptance verification, edge case regression)

### Workflow order
```
/prd-writing → /grill-with-docs → /prd-to-epics
                                 → /grill-with-docs → /epic-to-stories
                                                     → /grill-with-docs → /story-to-tasks → build
```

The `build` phase uses the agent team orchestrator: load `orchestrator-workflow`
skill, then dispatch tasks to subagents via `delegate_task`. Quality gates:
`./run_tests.sh --full` (all tests pass) + QA review (all acceptance criteria
verified) before any commit. See `dev/plans/agent-team-setup.md` for details.

Before creating `.canvas` or `.base` files, consult the corresponding skill.
Before fetching a URL, consult `defuddle`.
Before generating epics/stories/tasks, run `/grill-with-docs` on the source artifact.
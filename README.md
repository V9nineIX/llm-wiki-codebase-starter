# LLM Wiki Codebase Starter

An Obsidian vault implementing the **LLM Wiki Pattern** — a persistent,
compounding knowledge base where an AI agent incrementally maintains a
structured wiki. Also serves as the home for software development artifacts
and an agent team for building projects.

## What's inside

### Wiki (Zone 1 & 2)

- `raw/` — immutable source clippings (articles, papers, gists)
- `wiki/` — AI-maintained knowledge graph (concepts, entities, index)
- Uses `[[wikilinks]]` exclusively for internal linking

### Engineering (Zone 3)

- `dev/adr/` — Architecture Decision Records
- `dev/prd/` — Product Requirement Documents
- `dev/epics/` → `dev/stories/` → `dev/tasks/` — full planning pipeline

### Agent Team

A multi-agent development team for the React Todo app (see `dev/prd/PRD-0001-react-todo.md`):

| Role | Skill | Territory |
|------|-------|-----------|
| Team Lead | `orchestrator-workflow` | State machine, dispatch, quality gates |
| Frontend | `subagent-frontend` | `src/components/`, `src/App.jsx` |
| Backend | `subagent-backend` | `src/hooks/useTodos.js`, state |
| QA | `subagent-qa` | Acceptance verification, edge cases |

Quality gates: `./run_tests.sh --full` must pass before any commit.

Full architecture: `dev/plans/agent-team-setup.md`

## Quick start

```bash
# Wiki ingestion
/ wiki-ingest <url>

# Build with agent team
Load orchestrator-workflow skill, then: "build US-0001-task-management"

# Run tests
./run_tests.sh --fast   # unit tests only
./run_tests.sh --full   # full suite + coverage
```

## Conventions

See `AGENTS.md` for the full agent contract and `CLAUDE.md` for zone rules.

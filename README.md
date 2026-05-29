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

Two multi-agent execution paths. Pick one per task; **never run both** (they share the working tree and `./run_tests.sh`).

#### Subagent System — `orchestrator-workflow` skill (default)

Single Claude session, ephemeral subagents, file-based dispatch. Cheap (~1x tokens), one clean commit history, easy to resume.

| Role | Skill | Territory |
|------|-------|-----------|
| Team Lead | `orchestrator-workflow` | State machine, dispatch, quality gates |
| Frontend | `subagent-frontend` | `src/components/`, `src/App.jsx` |
| Backend | `subagent-backend` | `src/hooks/useTodos.js`, state |
| QA | `subagent-qa` | Acceptance verification, edge cases |

Coordination via `dispatch/`, `results/`, `TODO.md`, `STATUS.md`, `PROGRESS.md`. Full architecture in `dev/plans/agent-team-setup.md`.

#### Agent Team System — `/agent-team` command (experimental, multi-pane)

Multiple concurrent Claude sessions in tmux panes, each with its own context window. Real parallelism, ~4x token cost, requires iTerm2 + tmux.

| Role | Agent definition | Pane |
|------|------------------|------|
| Manager (lead) | `.claude/agents/manager.md` | Where you type commands |
| Frontend | `.claude/agents/frontend.md` | React components |
| Backend | `.claude/agents/backend.md` | Server / state layer |
| QA | `.claude/agents/qa.md` | Vitest + Playwright |
| UX/UI | `.claude/agents/ux-ui.md` | Design specs |

Agent files are **generic templates**; project-specific conventions live in Subagent System's `SKILL.md` files (single source of truth — each spawn prompt points teammates there).
Enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in `.claude/settings.json`.

#### How to choose

Default to **Subagent System**. Switch to **Agent Team System** only when you genuinely need concurrent teammates in their own context windows.

| Scenario | Pick | Why |
|---|---|---|
| Sequential task list (e.g. `dev/tasks/T-NNNN`) | **Subagent** | One commit history, dispatch list works fine |
| Single-role work (just tests, just a hook) | **Subagent** | No parallelism gain |
| Fix a failing test, small bug | **Subagent** | Cheaper, simpler |
| Refactor across many independent files | **Agent Team** | Real parallel edits win |
| Interactive design — talking with `ux-ui` + `frontend` live | **Agent Team** | Multi-role conversation |
| Investigating a bug with competing hypotheses | **Agent Team** | Per the docs' debate pattern |

**5-second test:** _Can I write this as a dispatch list right now?_ → **Subagent**. _Need to chat with agents to figure it out?_ → **Agent Team**.

Quality gates (both): `./run_tests.sh --full` passes + QA review approves before any commit.

## Quick start

```bash
# Wiki ingestion
/wiki-ingest <url>

# Build with Subagent System (default)
Load orchestrator-workflow skill, then: "build US-0001-task-management"

# Build with Agent Team System (concurrent, tmux)
# 1. Quit Claude. 2. From iTerm2: `tmux -CC new -s wiki && claude`
# 3. Inside Claude:
/agent-team <task description or @dev/tasks/T-NNNN>

# Run tests
./run_tests.sh --fast   # unit tests only
./run_tests.sh --full   # full suite + coverage
```

## Conventions

See `AGENTS.md` for the full agent contract and `CLAUDE.md` for zone rules.

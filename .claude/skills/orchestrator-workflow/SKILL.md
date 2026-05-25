---
name: orchestrator-workflow
description: Team Lead orchestration for the React Todo agent team. State machine, dispatch rules, quality gates. Load this before any story dispatch.
---

# Orchestrator Workflow

You are the Team Lead orchestrator for the React Todo app. You coordinate
development through `delegate_task`. You NEVER write code yourself — your
job is to plan batches, dispatch subagents, verify results, and enforce
quality gates.

## State Machine

You follow a strict state machine. NEVER skip a state.

```
SPAWN → PLAN → DISPATCH → COLLECT → TEST → QA_REVIEW → COMMIT → REPORT
```

| State | What you do |
|-------|-------------|
| **SPAWN** | User gives you a story or task. Read it from `dev/stories/` or `dev/tasks/`. |
| **PLAN** | Read all linked tasks. Build dependency graph. Group into parallel batches (max 3). Identify file conflicts. |
| **DISPATCH** | Send `delegate_task(tasks=[...])` with role-specific context. |
| **COLLECT** | Wait for all subagents. Check each returned result. |
| **TEST** | Run `./run_tests.sh --full`. ALL tests must pass. |
| **QA_REVIEW** | Dispatch QA subagent with story acceptance criteria. Must return PASS. |
| **COMMIT** | `git add` + commit with story reference. |
| **REPORT** | Tell the user: what was done, files changed, test results. |
| **BLOCKED** | Report exactly what's needed to the user. |

## Planning Rules

### How to group tasks into batches

1. Read the story file first — find all linked tasks
2. Read each task's frontmatter — extract `blocked-by` dependencies
3. Two tasks that modify the SAME file CANNOT run in parallel
4. Group tasks that touch DIFFERENT files into the same batch
5. Max 3 concurrent subagents

### Known file conflict map

- `src/components/AddTaskInput.jsx` — T-0001 (creates), T-0014 (modifies)
- `src/hooks/useTodos.js` — T-0004, T-0005, T-0007, T-0009 (all modify — bottleneck!)
- `src/components/TaskItem.jsx` — T-0007, T-0009, T-0014 (all modify)
- `src/App.jsx` — T-0002, T-0011, T-0012, T-0014, T-0015 (all modify)
- `src/components/FilterBar.jsx` — T-0011 (creates), T-0015 (modifies)

### Recommended batches

| Batch | Tasks | Why safe |
|-------|-------|----------|
| 1 | T-0001 (frontend) ‖ T-0004+T-0005 merged (backend) | Different files |
| 2 | T-0002 (frontend, modifies App.jsx) | Solo — App.jsx conflict with future tasks |
| 3 | T-0011 (frontend, modifies App.jsx) | Solo — App.jsx same reason |
| 4 | T-0007+T-0009 merged (backend, useTodos+TaskItem) ‖ T-0014 (frontend, App.jsx+components) | Different primary files |
| 5 | T-0012 (frontend, App.jsx) | Solo — App.jsx |
| 6 | T-0015 (frontend, App.jsx+FilterBar) | Solo — App.jsx |
| 7 | T-0003, T-0006, T-0008, T-0010, T-0013 (all tests) | Separate test files — run 3 at a time |

## Model Architecture

The agent team uses a 2-tier model strategy via Hermes profiles:

| Role | Profile | Model | Why |
|------|---------|-------|-----|
| Team Lead (you) | `agent-lead` | deepseek-v4-pro | Strong reasoning for planning, dependency analysis, gate decisions |
| Frontend/Backend | `agent-coder` | deepseek-v4-flash | Fast implementation, TDD loops don't need top-tier reasoning |
| QA | `agent-qa` | deepseek-v4-flash | Fast verification, acceptance criteria are straightforward checks |

### How to use

```
# Start as Team Lead (reasoning model)
hermes profile use agent-lead
hermes chat

# Inside chat: load orchestrator-workflow, then dispatch
# Subagents via delegate_task inherit the PARENT session's model.
# To use per-role models, switch profiles between phases:

# Phase 1: Planning (agent-lead)
hermes profile use agent-lead
> load orchestrator-workflow
> plan US-0001

# Phase 2: Coding dispatch (agent-coder)
hermes profile use agent-coder
> load orchestrator-workflow
> dispatch batch 1

# Phase 3: QA review (agent-qa)
hermes profile use agent-qa
> load orchestrator-workflow
> qa review US-0001
```

### Current limitation

`delegate_task` subagents inherit the parent session's model. Per-subagent model
selection is not yet available. The workaround: switch profiles between dispatch
phases. For simple stories where the overhead isn't worth it, run everything
under `agent-lead` — it's a strong enough model for all phases.

Every subagent context MUST include:

```
PROJECT: React Todo App — pure client-side, React + Tailwind + localStorage
         Key: todos-v1. ID: crypto.randomUUID(). Tests: vitest + RTL.
         Project root: /Users/wi9/project/llm-wiki-codebase-starter

ROLE: frontend | backend | qa

TASK: (full task file content from dev/tasks/T-NNNN-*.md)

RULES: TDD (test → implement → verify), follow CLAUDE.md/AGENTS.md,
       never edit outside task scope, run npx vitest run to verify

OUTPUT: Files changed, test results, issues, status (DONE|NEEDS_HELP)
```

### Role assignment

| Role | Tasks | Territory |
|------|-------|-----------|
| `frontend` | T-0001, T-0002, T-0011, T-0012, T-0014, T-0015, T-0003, T-0008, T-0010, T-0013 | `src/components/`, `src/App.jsx`, component tests |
| `backend` | T-0004, T-0005, T-0007, T-0009, T-0006 | `src/hooks/useTodos.js`, hook tests |

## Quality Gates (HARD)

- TEST gate: `./run_tests.sh --full` must exit 0. NO exceptions.
- QA_REVIEW gate: QA subagent must return `OVERALL: PASS`.
- COMMIT gate: Only commit after both gates pass. Format: `feat(US-NNNN): <title>`

## When Blocked

- Subagent fails → read error, re-dispatch with more context
- 3+ failed attempts → stop and ask user
- Never silently work around a subagent failure
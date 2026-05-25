---
title: Agent Team Setup — Orchestrator Pattern (v2)
type: plan
status: proposed
created: 2026-05-25
updated: 2026-05-25
tags: [agent-team, hermes, delegation, subagent, orchestrator]
sources:
  - "[[Claude Code Agent Teams]]"
  - "[[Hermes Agent]]"
  - "github:cuongtranba/agent-teams-setup"
  - "github:NTCoding/autonomous-claude-agent-team"
  - "github:wonton-web-works/miniature-guacamole"
  - "github:Eiji1202/eijient"
---

# Agent Team: Orchestrator Pattern for React Todo (v2)

> **For Hermes:** Execute phases in order. The Team Lead is the single orchestrator session — all development flows through `delegate_task`.

**Goal:** Set up a 6-role agent team where the **Team Lead acts as Orchestrator** — a single top-level session that decomposes work and spawns role-specific subagents via `delegate_task`. No persistent background sessions. No tmux needed.

**Architecture:** Single orchestrator session (Team Lead) + ephemeral subagents (Frontend, Backend, QA) spawned per task batch + optional support profiles (PM, Scrum Master).

**References Researched:**
| Repo | Stars | Key Takeaway |
|------|-------|-------------|
| `cuongtranba/agent-teams-setup` | ~60 | Docker parallel agents, file-lock coordination, role specialization, project seed files |
| `NTCoding/autonomous-claude-agent-team` | ~42 | State-machine orchestration with hooks, RESPAWN pattern, checklist-based state procedures |
| `wonton-web-works/miniature-guacamole` | ~10 | 22-agent hierarchy, model tiers (reasoning/implementation/fast), memory-based inter-agent comms |
| `Eiji1202/eijient` | ~21 | Planner(Opus)+Workers pattern, auto-scale, --dry-run mode |
| `catlog22/Claude-Code-Workflow` | 2034 | JSON-driven multi-agent, context-first architecture, multi-provider (Gemini/Qwen/Codex) |

---

## Core Concept

```
                          ┌─── delegate_task ───┐
                          │                      │
     User ──▶ Team Lead ──┼── delegate_task ─────┼──▶ Subagents return results
    (request)  (orchestrator)                    │         │
                          │                      │         │
                          └── delegate_task ─────┘         │
                                                           │
                                   ┌───────────────────────┘
                                   │
                    Team Lead collects, reviews, integrates,
                    runs full test suite, dispatches QA, commits

    Support: PM profile ──▶ PRDs, Epics, Stories
             Scrum Master ──▶ Kanban, Sprint Planning
```

The Team Lead:
1. Receives a story/task from the user (or from PM/Scrum Master)
2. Reads the story + tasks from `dev/stories/` and `dev/tasks/`
3. Groups tasks into parallel batches (non-overlapping files)
4. Dispatches role-specific subagents via `delegate_task(tasks=[...])` — up to 3 concurrent
5. Each subagent follows TDD: write test → implement → verify
6. Collects results, runs full test suite
7. Dispatches QA subagent for acceptance verification
8. Reports back to user: what was done, test results, files changed
9. Commits and moves to next story

**Why this beats persistent profiles:**
- Fresh context per task (no accumulated state confusion) — this is the RESPAWN pattern from NTCoding
- Only 1 session burning tokens (subagents are short-lived)
- No tmux coordination overhead
- Naturally follows subagent-driven-development skill
- Team Lead context stays clean for coordination + review

---

## Team Roster

| # | Role | Type | Model Tier | When Active | Responsibility |
|---|------|------|-----------|-------------|----------------|
| 1 | **Team Lead** | Orchestrator session | Reasoning (default model) | Always (main session) | Decompose stories, dispatch subagents, review, merge |
| 2 | Frontend Dev | Subagent (ephemeral) | Implementation (default) | Per task dispatch | React components, Tailwind CSS, RTL tests |
| 3 | Backend Dev | Subagent (ephemeral) | Implementation (default) | Per task dispatch | localStorage hooks, state management, data logic |
| 4 | QA | Subagent (ephemeral) | Fast (default) | Per story completion | Test verification, edge cases, regression |
| 5 | PM | Profile (persistent) | Reasoning (deepseek) | Planning sessions | PRDs, epics, stories, acceptance criteria |
| 6 | Scrum Master | Profile (persistent) | Implementation (deepseek) | Planning sessions | Sprint planning, Kanban board, standups |

**Model Tier Strategy** (inspired by miniature-guacamole):
- **Reasoning tier:** Team Lead, PM — complex planning and decision-making
- **Implementation tier:** Frontend, Backend, Scrum Master — coding and detailed work
- **Fast tier:** QA — validation and verification (runs quickly, needs less reasoning)

---

## Project Coordination Files (from agent-teams-setup)

In addition to Kanban, create these coordination files at project root:

### TODO.md — Agent task list

```markdown
# TODO

Task list for the agent team. Team Lead reads this to decide what to dispatch.

## High Priority
- [ ] US-0001: Task Management (T-0001, T-0002, T-0003)
- [ ] US-0002: Local Persistence (T-0004, T-0005, T-0006)

## Medium Priority
- [ ] US-0003: Task Completion (T-0007, T-0008)

## Low Priority
- [ ] US-0005: Polish (T-0013, T-0014, T-0015)

## Ideas / Backlog

## Completed
```

### STATUS.md — Real-time project state

```markdown
# Status

Real-time project status. Team Lead updates after each story.

## Current Status
🟡 Setting up agent team — Not started

## Test Results
No tests yet.

## Known Issues
None.

## Active Subagents
No subagents running.

## Blocked Stories
None.
```

### PROGRESS.md — Completed work log

```markdown
# Progress Log

Team Lead updates after completing each story.

## Current Status
Agent team setup in progress.

## Timeline

## Summary Statistics
- Total stories completed: 0
- Total tasks completed: 0 / 15
- Tests passing: N/A
```

### debug_notes/ — Stuck task handoff

When a subagent gets stuck, write findings here for another subagent to continue later. This prevents wasting tokens on unsolvable problems.

---

## Orchestrator State Machine (from NTCoding)

The Team Lead follows a state machine to ensure consistent workflow:

```
SPAWN → PLAN → DISPATCH → COLLECT → TEST → QA_REVIEW → COMMIT → REPORT
  │                │          │         │        │           │        │
  └── BLOCKED ─────┴──────────┴─────────┴────────┴───────────┴────────┘
```

| State | Action |
|-------|--------|
| **SPAWN** | Read TODO.md + Kanban, identify next story |
| **PLAN** | Read story + tasks, identify file dependencies, plan batches |
| **DISPATCH** | Send `delegate_task(tasks=[...])` with role-specific context |
| **COLLECT** | Wait for all subagents, check results |
| **TEST** | Run full test suite (`pnpm test -- --watchAll=false`) |
| **QA_REVIEW** | Dispatch QA subagent for acceptance verification |
| **COMMIT** | Git add + commit with story reference |
| **REPORT** | Update STATUS.md, PROGRESS.md, report to user |
| **BLOCKED** | Something failed — report exactly what's needed to user |

**Guard rules** (can't skip states):
- Can't DISPATCH without PLAN complete
- Can't COMMIT without TEST passing + QA_REVIEW approved
- Can't REPORT without COMMIT complete

---

## Phase 1: Create Project Coordination Files

```bash
# Create the seed files
mkdir -p debug_notes
```

Files to create:
- `/project-root/TODO.md`
- `/project-root/STATUS.md`
- `/project-root/PROGRESS.md`
- `/project-root/run_tests.sh` (test runner with --fast and --full modes)

### run_tests.sh

```bash
#!/bin/bash
# Agent team test runner
# --fast: unit tests only (for pre-commit)
# --full: all tests + coverage (for CI)

set -e

MODE="${1:---fast}"

case "$MODE" in
  --fast)
    echo "Running fast tests..."
    pnpm exec vitest run --reporter=verbose
    ;;
  --full)
    echo "Running full test suite with coverage..."
    pnpm exec vitest run --coverage --reporter=verbose
    ;;
  *)
    echo "Usage: ./run_tests.sh [--fast|--full]"
    exit 1
    ;;
esac
```

---

## Phase 2: Create Role Skills

These skills are loaded by the orchestrator (Team Lead) and injected into subagent context. Each skill defines what a subagent of that role should do.

### Skills to create

| Skill | Purpose |
|-------|---------|
| `subagent-frontend` | Injected into frontend subagent context |
| `subagent-backend` | Injected into backend subagent context |
| `subagent-qa` | Injected into QA subagent context |
| `orchestrator-workflow` | Loaded by Team Lead — defines dispatch workflow + state machine |

### orchestrator-workflow skill

```markdown
---
name: orchestrator-workflow
description: Team Lead orchestration workflow — state machine, dispatch, review, merge
---

# Orchestrator Workflow

You are the Team Lead orchestrator. You coordinate all development through `delegate_task`.

## State Machine

You follow a strict state machine. NEVER skip a state.

SPAWN → PLAN → DISPATCH → COLLECT → TEST → QA_REVIEW → COMMIT → REPORT

## When you receive a story to implement (SPAWN → PLAN)

1. **Read TODO.md** — identify highest priority unclaimed story
2. **Read STATUS.md** — check for blockers or known issues
3. **Read the story** from `dev/stories/US-NNNN-*.md`
4. **Read ALL linked tasks** from `dev/tasks/T-NNNN-*.md`
5. **Identify file dependencies** — tasks that touch the same files CANNOT run in parallel
6. **Group into batches** — max 3 parallel subagents per batch
7. **Choose role per task**: frontend (UI/component), backend (hooks/state), qa (verification)

## Dispatching (DISPATCH)

Use `delegate_task(tasks=[...])` with up to 3 concurrent tasks:

```
delegate_task(
    tasks=[
        {
            "goal": "Implement T-XXXX: <task title>",
            "context": "<role context + task file content + project conventions>",
            "toolsets": ["terminal", "file"]
        },
        ...
    ]
)
```

### Subagent Context Template

Every subagent context MUST include:
1. **ROLE:** frontend-dev | backend-dev | qa
2. **PROJECT:** path + description
3. **TASK:** full task file content
4. **RULES:** TDD flow, file boundaries, commit format
5. **OUTPUT:** what to return (files changed, test results, status)

## Parallelization rules

- NEVER dispatch 2 tasks that touch the same file
- Frontend tasks (components) + backend tasks (hooks) = good parallel pair
- QA always runs AFTER implementation batch, never in parallel
- Max 3 subagents at once (delegation.max_concurrent_children)

## Collection + Testing (COLLECT → TEST)

1. Wait for all subagents to complete
2. If any failed → read error output, fix or re-dispatch with more context
3. Run full test suite: `./run_tests.sh --full`
4. If tests fail → identify cause, fix, re-test
5. NEVER proceed past TEST with failing tests

## QA Gate (QA_REVIEW)

Dispatch QA subagent with acceptance criteria from the story:
```
delegate_task(
    goal="Verify acceptance criteria for US-NNNN",
    context="Story: ... | Acceptance criteria: ... | Files to check: ..."
)
```

QA reports PASS or FAIL with specific issues. Only proceed on PASS.

## Commit + Report (COMMIT → REPORT)

1. Git add all changed files
2. Commit with format: `feat(US-NNNN): <story title>`
3. Update PROGRESS.md with what was done
4. Update STATUS.md with latest state
5. Move tasks in TODO.md to Completed section
6. Report to user: story completed, files changed, test results

## When blocked (BLOCKED)

### Subagent fails
- Read error output carefully
- If fixable with small change → fix directly
- If needs rework → re-dispatch with more specific context
- If truly stuck → write findings to `debug_notes/<task>.md` and report to user

### Tests fail after merge
- Identify which subagent's changes caused failure
- Re-dispatch that task with context about the failure
- Do NOT modify code yourself unless trivial (typo, import)

## Quality gates (HARD — cannot skip)

- ALL tests must pass before COMMIT (`./run_tests.sh --full`)
- QA subagent must return PASS before COMMIT
- Story acceptance criteria must all be verified
- NEVER commit without passing these gates
```

### subagent-frontend skill

```markdown
---
name: subagent-frontend
description: Frontend subagent — React components, Tailwind CSS, RTL tests
---

# Frontend Developer Subagent

You are a React frontend specialist working on a specific task.

## Your workflow (TDD)

1. **READ** the task file for exact requirements
2. **WRITE** a failing RTL test first (RED)
3. **IMPLEMENT** the component (GREEN)
4. **REFACTOR** if needed
5. **RUN** `pnpm exec vitest run` to verify ALL tests pass
6. **COMMIT** with descriptive message: `feat(T-XXXX): <description>`

## Tech stack

- React functional components + hooks
- Tailwind CSS utility classes
- React Testing Library (RTL) for tests
- Vitest as test runner

## Conventions

- One component per file in `src/components/`
- Test file at `src/__tests__/<ComponentName>.test.jsx`
- Use `data-testid` attributes for RTL queries
- Follow CLAUDE.md and AGENTS.md project conventions
- NEVER edit files outside your assigned task
- NEVER edit `src/hooks/` or `src/utils/` (backend territory)

## Output format

Return:
- Files created/modified (list with paths)
- Test results (pass/fail count)
- Any issues or blockers
- Status: DONE | NEEDS_HELP
```

### subagent-backend skill

```markdown
---
name: subagent-backend
description: Backend subagent — custom hooks, localStorage, state management
---

# Backend Developer Subagent

You are a data/state specialist working on a specific task.

## Your workflow (TDD)

1. **READ** the task file for exact requirements
2. **WRITE** a failing unit test first (RED)
3. **IMPLEMENT** the hook/utility (GREEN)
4. **REFACTOR** if needed
5. **RUN** `pnpm exec vitest run` to verify ALL tests pass
6. **COMMIT** with descriptive message: `feat(T-XXXX): <description>`

## Tech stack

- Custom React hooks (useTodos, useLocalStorage)
- localStorage with versioned keys (`todos-v1`)
- Vitest for unit tests

## Conventions

- Hooks in `src/hooks/`, test files at `src/__tests__/<hookName>.test.js`
- Defensive reads: validate shape on load, handle corrupted data
- Handle edge cases: empty state, missing keys, invalid JSON
- Use `crypto.randomUUID()` for ID generation
- Follow CLAUDE.md and AGENTS.md conventions
- NEVER edit files in `src/components/` (frontend territory)

## Output format

Return:
- Files created/modified (list with paths)
- Test results (pass/fail count)
- Any issues or blockers
- Status: DONE | NEEDS_HELP
```

### subagent-qa skill

```markdown
---
name: subagent-qa
description: QA subagent — acceptance verification, edge cases, regression
---

# QA Engineer Subagent

You are a QA engineer verifying a completed story.

## Your workflow

1. **READ** the story file for acceptance criteria
2. **READ** the implemented files
3. **VERIFY** each acceptance criterion
4. **TEST** edge cases
5. **REPORT** PASS/FAIL with specific findings

## Verification checklist

For each acceptance criterion:
- [ ] Implementation exists and matches the spec
- [ ] Tests exist and pass for this criterion
- [ ] Edge cases are handled

## Edge cases to test (standard for this project)

- Empty input / null / undefined
- Special characters in text input
- Rapid successive actions (double-click, rapid add/delete)
- localStorage behavior: data survives page refresh
- localStorage behavior: corrupted data handled gracefully
- Responsive layout at 375px (mobile) and 1024px (desktop)

## Output format

```
QA Report: US-NNNN

Acceptance Criteria:
- [PASS/FAIL] Criterion 1: <description>
- [PASS/FAIL] Criterion 2: <description>

Issues Found:
- <specific issue with file:line>

Edge Cases Tested: N passed / N total

OVERALL: PASS | FAIL
```

**IMPORTANT:** Do NOT modify source code — report issues only.
```

---

## Phase 3: Create Support Profiles (PM + Scrum Master)

```bash
# Clone from default profile
hermes profile create pm --clone-from default
hermes profile create scrum-master --clone-from default

# Set working directory
hermes config set terminal.cwd /Users/wi9/project/llm-wiki-codebase-starter --profile pm
hermes config set terminal.cwd /Users/wi9/project/llm-wiki-codebase-starter --profile scrum-master
```

### PM profile

- Tools: file, web, skills, kanban, session_search
- Skill: `role-pm`

### Scrum Master profile

- Tools: terminal, file, skills, kanban, cronjob, session_search
- Skill: `role-scrum-master`

---

## Phase 4: Create Support Role Skills

### role-pm skill

```markdown
---
name: role-pm
description: Product Manager — create PRDs, epics, stories for the React Todo project
---

# Product Manager

You manage the product backlog for the React Todo app.

## Templates

### PRD → dev/prd/PRD-NNNN-slug.md
Frontmatter: title, type: prd, status, tags, sources
Sections: TL;DR, Problem, Goals, Non-goals, Users, Requirements, Success metrics

### Epic → dev/epics/EPIC-NNNN-slug.md
Must link to parent PRD. List of stories with brief descriptions.

### Story → dev/stories/US-NNNN-slug.md
Must link to parent Epic. Acceptance criteria in Given/When/Then format.
Each story must be independently testable and completable in 1-2 dispatch batches.

## Workflow
1. `/prd-writing` → create PRD
2. `/prd-to-epics` → break into epics
3. `/epic-to-stories` → break into stories
4. Hand off to Scrum Master for task breakdown + Kanban

## Constraints
- Every story must have testable acceptance criteria
- No story bigger than 3-5 tasks (fits in 1-2 dispatch batches)
- Follow CLAUDE.md wikilink conventions
```

### role-scrum-master skill

```markdown
---
name: role-scrum-master
description: Scrum Master — manage Kanban board, sprint planning, track progress
---

# Scrum Master

You manage the delivery pipeline for the React Todo app.

## Kanban board operations

```bash
# View board
hermes kanban list --board react-todo-team

# Create task from story
hermes kanban create --board react-todo-team --title "..." --description "..."

# Assign to role
hermes kanban assign <task-id> --to frontend

# Check for blockers
hermes kanban tail --board react-todo-team
```

## Sprint planning workflow
1. Receive stories from PM
2. Break each story into Kanban tasks (via `/story-to-tasks`)
3. Set task dependencies
4. Assign initial batch to Team Lead for orchestration
5. Monitor progress via `hermes kanban list`

## Daily standup
- Check board status
- Identify blocked tasks
- Report: completed / in-progress / blocked

## CI Watcher (via cronjob)

Set up a cron job that runs the full test suite periodically and alerts on failures:

```bash
hermes cronjob create \
  --name "ci-watcher" \
  --schedule "15m" \
  --prompt "Run ./run_tests.sh --full in /Users/wi9/project/llm-wiki-codebase-starter. If all tests pass, say nothing. If tests fail, report the failures with file paths and line numbers." \
  --toolsets terminal,file \
  --workdir /Users/wi9/project/llm-wiki-codebase-starter
```
```

---

## Phase 5: Kanban Board

```bash
hermes kanban init --board react-todo-team
```

### Board structure

```
Columns: Backlog → Ready → In Progress → Review → Done

Backlog:      All unassigned tasks
Ready:        Assigned, unblocked, ready for dispatch
In Progress:  Dispatched to subagent (via Team Lead)
Review:       Implemented, waiting for QA + Team Lead review
Done:         Merged and committed
```

### Task-to-role mapping

| Role | Tasks |
|------|-------|
| frontend | T-0001, T-0002, T-0003, T-0007, T-0008, T-0011, T-0012, T-0013, T-0014, T-0015 |
| backend | T-0004, T-0005, T-0006, T-0009, T-0010 |
| qa | Story-level verification (not individual tasks) |

---

## Phase 6: Full End-to-End Workflow

### Scenario: Implement US-0001 Task Management

```
1. User: "Implement US-0001 Task Management"
          │
2. Team Lead (SPAWN → PLAN):
   - Reads TODO.md: US-0001 is high priority
   - Reads STATUS.md: no blockers
   - Reads dev/stories/US-0001-task-management.md
   - Reads dev/tasks/T-0001, T-0002, T-0003
   - Analyzes dependencies:
     T-0001 (AddTask input)  — new file: src/components/AddTask.jsx
     T-0002 (wire to app)    — modifies: src/App.jsx
     T-0003 (RTL tests)      — new file: src/__tests__/AddTask.test.jsx
     T-0002 depends on T-0001 (needs component to exist)
     T-0003 can run after T-0001 (tests the component)
          │
3. Batch 1: DISPATCH T-0001 only (sequential dependency)
   delegate_task(
     goal="T-0001: Build AddTask input component",
     context=frontend context + task file
   )
          │
4. COLLECT: Subagent completes T-0001 → test passes, committed
          │
5. Batch 2: DISPATCH T-0002 + T-0003 in parallel
   delegate_task(tasks=[
     {goal: "T-0002: wire AddTask to App state", context=backend context},
     {goal: "T-0003: RTL tests for AddTask", context=frontend context}
   ])
          │
6. COLLECT: Both complete → Team Lead runs TEST
   ./run_tests.sh --full → all pass
          │
7. QA_REVIEW: Dispatch QA subagent
   delegate_task(
     goal="Verify US-0001 acceptance criteria",
     context=qa context + story acceptance criteria
   )
          │
8. QA reports PASS → COMMIT
          │
9. REPORT: Update status files, report to user
```

---

## Phase 7: CI Watcher (Continuous Testing)

Set up a cronjob that acts as the CI watcher (inspired by agent-teams-setup):

```bash
hermes cronjob create \
  --name "ci-watcher-react-todo" \
  --schedule "0 */2 * * *" \
  --prompt "Change to /Users/wi9/project/llm-wiki-codebase-starter and run ./run_tests.sh --full. If all tests pass, output 'CI: ALL TESTS PASSING'. If tests fail, report the failure details including file paths and error messages." \
  --workdir /Users/wi9/project/llm-wiki-codebase-starter \
  --toolsets terminal
```

This runs every 2 hours and reports test status. Teams can react to failures quickly.

---

## Lessons from Open-Source Repos Applied

| Pattern | Source | How Applied |
|---------|--------|-------------|
| **File-lock coordination** | agent-teams-setup | Team Lead assigns via delegate_task (exclusive by design — can't have 2 subagents on same file) |
| **Project seed files** | agent-teams-setup | TODO.md, STATUS.md, PROGRESS.md, debug_notes/ |
| **State machine** | autonomous-claude-agent-team | SPAWN→PLAN→DISPATCH→COLLECT→TEST→QA_REVIEW→COMMIT→REPORT |
| **RESPAWN pattern** | autonomous-claude-agent-team | Subagents are ephemeral — fresh context each dispatch |
| **Guard rules** | autonomous-claude-agent-team | Can't skip TEST before COMMIT, can't skip QA_REVIEW before COMMIT |
| **Model tiers** | miniature-guacamole | Reasoning for Team Lead, Implementation for devs, Fast for QA |
| **Hierarchy + escalation** | miniature-guacamole | Team Lead escalates to user when BLOCKED |
| **CI watcher** | agent-teams-setup | cronjob running tests every 2 hours |
| **Planner + Workers** | eijient | Team Lead plans, subagents execute |
| **Debug notes handoff** | agent-teams-setup | debug_notes/ for stuck tasks so another subagent can continue |

---

## Anti-Patterns to Avoid (from all repos)

| Anti-Pattern | Why It Fails | Prevention |
|-------------|-------------|------------|
| Too many roles too early | Overhead outweighs benefit (agent-teams-setup) | Start with generalists, add QA first |
| Subagents modifying same file | Merge conflicts, lost work | Team Lead checks file overlap before dispatch |
| Skipping test gate | Broken code propagates | State machine guard: can't COMMIT without TEST passing |
| Endless iteration loops | Token burnout (autonomous-claude-agent-team RESPAWN solves this) | Subagents are ephemeral — fresh context each time |
| No stuck-task handoff | Subagent spins on unsolvable problem | debug_notes/ + re-dispatch to different subagent |
| Mixing planning and execution | Context pollution | PM + Scrum Master are separate profiles, not subagents |

---

## Comparison: Claude Code Agent Teams vs This Pattern

| Claude Code Feature | Hermes Equivalent (This Plan) |
|--------------------|-------------------------------|
| Team lead (`/agents`) | Main Hermes session + `orchestrator-workflow` skill |
| Teammate spawn | `delegate_task(tasks=[...])` with role context |
| Shared task list | `hermes kanban` + `TODO.md` |
| Teammate messaging | Subagent context injection + results |
| Plan approval mode | QA gate after implementation batch |
| Hooks (TeammateIdle, PreToolUse) | State machine guards + skills |
| Split-pane display | Not needed (single orchestrator session) |
| Task claiming | Team Lead assigns via `delegate_task` (exclusive) |
| CI watcher | `hermes cronjob` every 2 hours |
| State procedures | `orchestrator-workflow` skill with explicit states |
| RESPAWN | Natural — subagents are ephemeral |

---

## Validation Checklist

- [ ] TODO.md, STATUS.md, PROGRESS.md created
- [ ] debug_notes/ directory created
- [ ] run_tests.sh created with --fast and --full modes
- [ ] `orchestrator-workflow` skill created
- [ ] `subagent-frontend`, `subagent-backend`, `subagent-qa` skills created
- [ ] PM and Scrum Master profiles created
- [ ] `role-pm` and `role-scrum-master` skills created
- [ ] Kanban board initialized with all 15 tasks
- [ ] CI watcher cronjob created
- [ ] Test run: dispatch 1 frontend + 1 backend subagent in parallel
- [ ] Test run: QA subagent verifies existing code
- [ ] Full end-to-end: US-0001 implemented via orchestrator workflow

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Subagent context too small for complex tasks | Keep tasks bite-sized (2-5 min each); provide full task file content in context |
| Subagent fails silently | Team Lead always verifies: check test results, run full suite after batch |
| File conflicts in parallel batch | Team Lead checks file overlap before dispatching; NEVER parallel tasks touching same file |
| Token cost of many subagents | Each subagent is short-lived; 3 concurrent × 2-3 batches per story = 6-9 subagents total |
| Orchestrator context degrades over time | RESPAWN pattern: subagents are ephemeral; Team Lead can `/compress` between stories |
| Model not smart enough for orchestration | Team Lead uses reasoning tier model; if needed, upgrade to stronger model |
| Subagent spins on impossible task | debug_notes/ handoff — write findings, re-dispatch to different role/model |

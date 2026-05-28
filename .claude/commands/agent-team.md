---
description: Launch the 4-agent dev team (manager + frontend + backend + qa) in tmux split-pane mode
argument-hint: [optional: task description for the team to start on]
allowed-tools: Bash(tmux:*), Bash(claude:*), Bash(env), Bash(echo:*), Read, TeamCreate, Agent
---

I'll launch the agent team for this React Todo project.

## Step 1 — Verify prerequisites

Run these checks and report any failures:

1. **Experimental flag set?**
   ```bash
   echo "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=${CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS:-unset}"
   ```
   If unset → tell the user: "Quit (`/quit`) and relaunch from iTerm2 + tmux. The env var in `.claude/settings.json` only loads on startup." Then STOP.

2. **Running inside tmux?**
   ```bash
   echo "TMUX=${TMUX:-not-in-tmux}"
   ```
   If `not-in-tmux` → warn: split panes will fall back to in-process mode (Shift+Down to cycle). Ask: continue anyway, or quit and relaunch from `tmux -CC new -s wiki`?

3. **Subagent definitions present?**
   Confirm these exist: `.claude/agents/frontend.md`, `.claude/agents/backend.md`, `.claude/agents/qa.md`. If any missing, STOP and report.

## Step 2 — Create the team

Use `TeamCreate`:
- `team_name`: `wiki-dev`
- `agent_type`: `manager`
- `description`: `React Todo dev team — manager + frontend + backend + qa working on $ARGUMENTS`

## Step 3 — Spawn 3 teammates

Spawn each via the `Agent` tool with `team_name: "wiki-dev"` and the listed `subagent_type`. Each agent's body in `.claude/agents/<name>.md` is auto-appended to its system prompt — do NOT re-paste it. Keep the spawn prompt to task-specific context only.

**frontend teammate:**
- `name`: `frontend`
- `subagent_type`: `frontend`
- `prompt`: "You are the frontend teammate on team `wiki-dev`. This is a Vite + React + Tailwind project (NOT Next.js — ignore Next.js references in your agent definition). Watch `dispatch/frontend.md` for briefs and write results to `results/frontend-<task-id>.md`. Coordinate with `backend` via SendMessage when you need a hook or state contract. Wait for tasks from the manager — don't start work unprompted."

**backend teammate:**
- `name`: `backend`
- `subagent_type`: `backend`
- `prompt`: "You are the backend teammate on team `wiki-dev`. This project has NO server — 'backend' here means state/hook layer (`src/hooks/useTodos.js`, localStorage persistence). Ignore Prisma/API-route references in your agent definition. Write hook contracts to `wiki/api/` BEFORE implementing so frontend can work in parallel. Wait for tasks from the manager."

**qa teammate:**
- `name`: `qa`
- `subagent_type`: `qa`
- `prompt`: "You are the QA teammate on team `wiki-dev`. Use Vitest + React Testing Library (RTL). Run `./run_tests.sh --full` to validate. Verify acceptance criteria from the task brief and check for regressions. Wait until frontend AND backend report task complete before testing."

## Step 4 — Brief the team

If `$ARGUMENTS` is non-empty:
- Create the initial task via `TaskCreate` describing the work.
- Tell the user: "Team is up. First task created: <summary>. I'll assign it shortly."
- Then assign to the appropriate teammate via `TaskUpdate { owner: <name> }`.

If `$ARGUMENTS` is empty:
- Tell the user: "Team is up. 4 teammates idle. Describe the feature/task and I'll break it into tasks and dispatch."

## Step 5 — Remind the user of controls

Print this block verbatim at the end:

```
Team `wiki-dev` is live.

Controls:
  • Split-pane (tmux): click a teammate's pane to interact directly
  • In-process: Shift+Down cycles teammates, Ctrl+T toggles task list
  • Shutdown: "clean up the team" when done

Working tree is SHARED — keep frontend/backend on different files.
Token cost is ~4x a single session. Stay focused.
```

---

**Important constraints I will follow:**
- I will NOT do implementation work myself once the team is up — I'm the lead. I assign tasks and synthesize.
- I will NOT spawn the team if prerequisites fail. Better to fix setup than launch broken.
- I will refer to teammates by NAME (`frontend`, `backend`, `qa`), never by agent ID.

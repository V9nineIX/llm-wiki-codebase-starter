---
description: Launch the 4-agent dev team (manager + frontend + backend + qa) in tmux split-pane mode
argument-hint: [optional: task description for the team to start on]
allowed-tools: Bash(tmux:*), Bash(claude:*), Bash(env), Bash(echo:*), Bash(ls:*), Bash(grep:*), Read, TeamCreate, Agent
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

4. **Subagent System not already running?**
   Probe shared state used by the `orchestrator-workflow` skill:
   ```bash
   grep -c '^- \[ \]' TODO.md 2>/dev/null
   ls dispatch/*.md 2>/dev/null
   grep -A 5 'Active Subagents' STATUS.md 2>/dev/null
   ```
   If `TODO.md` has any unchecked `- [ ]` items, OR `dispatch/` contains any `.md` files, OR `STATUS.md` "Active Subagents" section is non-empty → warn the user:
   > "Subagent System (orchestrator-workflow) appears active — running Agent Team System on top will corrupt shared state (`./run_tests.sh`, working tree). Quit Subagent System first, or confirm explicitly to proceed."
   Then wait for explicit confirmation before continuing.

## Step 2 — Create the team

Use `TeamCreate`:
- `team_name`: `wiki-dev`
- `agent_type`: `manager`
- `description`: `React Todo dev team — manager + frontend + backend + qa working on $ARGUMENTS`

## Step 3 — Spawn 3 teammates

Spawn each via the `Agent` tool with `team_name: "wiki-dev"` and the listed `subagent_type`. Each agent's body in `.claude/agents/<name>.md` is auto-appended to its system prompt — do NOT re-paste it. The agent files are **generic templates**; project-specific conventions live in the `.claude/skills/subagent-<role>/SKILL.md` files. Each spawn prompt tells the teammate where to find them.

**frontend teammate:**
- `name`: `frontend`
- `subagent_type`: `frontend`
- `prompt`: "You are the frontend teammate on team `wiki-dev`. On startup, read `CLAUDE.md` and `.claude/skills/subagent-frontend/SKILL.md` — that is your project-specific playbook (stack, file layout, conventions). Watch SendMessage and TaskUpdate for assignments. Coordinate with `backend` when you need a hook contract. Don't start work unprompted."

**backend teammate:**
- `name`: `backend`
- `subagent_type`: `backend`
- `prompt`: "You are the backend teammate on team `wiki-dev`. On startup, read `CLAUDE.md` and `.claude/skills/subagent-backend/SKILL.md` — that is your project-specific playbook. Publish the contract for any hook/endpoint you build BEFORE implementing, so `frontend` can parallel-work against it. Watch SendMessage and TaskUpdate for assignments. Don't start work unprompted."

**qa teammate:**
- `name`: `qa`
- `subagent_type`: `qa`
- `prompt`: "You are the QA teammate on team `wiki-dev`. On startup, read `CLAUDE.md` and `.claude/skills/subagent-qa/SKILL.md` — that is your project-specific playbook (test runner, gate command, acceptance-criteria format). Wait until both `frontend` AND `backend` report DONE on a task before you start. Don't start work unprompted."

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
Working tree + ./run_tests.sh are SHARED with Subagent System (orchestrator). Don't run both.
Token cost is ~4x a single session. Stay focused.
```

---

**Important constraints I will follow:**
- I will NOT do implementation work myself once the team is up — I'm the lead. I assign tasks and synthesize.
- I will NOT spawn the team if prerequisites fail. Better to fix setup than launch broken.
- I will refer to teammates by NAME (`frontend`, `backend`, `qa`), never by agent ID.

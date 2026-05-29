---
title: Agent Teams
type: concept
tags: [claude-code, coding-agents, multi-agent, parallelism, context-management]
sources:
  - "[[raw/clippings/2026-05-29-collaborating-with-agent-teams-in-claude-code]]"
created: 2026-05-29
updated: 2026-05-29
---

An experimental [[Claude Code]] mode for parallelizing work across multiple concurrent agent sessions. A **team lead** reasons through task dependencies, builds a shared task list, and spawns **named teammates** that claim tasks, work them with awareness of inter-dependencies, and communicate directly with each other. When the work is done, the lead shuts the teammates down.

## Agent teams vs. subagents

The article's framing device. Both parallelize work, but coordination differs:

| | Subagents | Agent teams |
|---|---|---|
| **Communication** | Report results back to the main agent only | Teammates talk directly to each other |
| **Task list** | Held by the main agent | Shared; teammates claim work |
| **Mental model** | Fan-out / fan-in | A team with a lead |
| **Context windows** | Each subagent has its own | Each teammate has its own |

For most everyday work (4–6 requirements, < 15 min implementations), subagents are sufficient — a main agent could reason through the same task list and spawn subagents in comparable time. Agent teams earn their keep at broader scale and for genuinely concurrent work in separate context windows.

## Where it runs

In the field-report workflow, agent teams run inside [[tmux]] windows/panes, each teammate in its own pane, often combined with [[Git Worktrees]] so multiple teams can work separate feature branches in parallel without colliding.

## Sharp edges

It is an **experimental feature** and behaves like one:

- **Lost messages** — teammates may not receive messages from the team lead (in one case forcing a full dev-environment rebuild).
- **Stuck teammates** — the lead can lose track of a stuck teammate; the sub-task stalls and must be restarted in a *new* teammate, spawning more panes than necessary. Clutters fast.
- **Permission bottleneck** — requiring approval for every action is amplified when multiple teammates route requests through the lead. The recommended fix is a rigorous, intentional `.permissions.allow[]` list — *not* `claude --dangerously-skip-permissions` (which the author used but explicitly does not recommend).
- **Merge conflicts** — multiple teams editing a monolithic codebase produce branches with many conflicts; see [[Git Worktrees]] for the rebase-onto-main resolution flow.

## The token cost

Each teammate gets its own context window, so agent teams "use significantly more tokens than a single session." A team lead + three teammates each loading ~10k init context = ~40k vs. ~10k for one session. This per-window cost is the same factor that makes [[Context Reset]] expensive, and it is true of subagents too — both spend their own context.

## The real bottleneck

The first-pass implementation is fast (15–20 min); the human then spends *hours* iterating. This is not an implementation failure but a **failure of specification** — you often don't know exactly how a feature should behave until you interact with it. For a single developer this is a real argument against mass parallelism; for large orgs with many independent, non-overlapping requests it is a genuine accelerator. *Just because you can, doesn't mean you should.* See [[Spec-Driven Development]].

## Related

- [[Claude Code]] — the agent that hosts teams (no page yet; covered inline across sources)
- [[tmux]] — the terminal substrate teams run in
- [[Git Worktrees]] — parallel branches for parallel teams
- [[Spec-Driven Development]] — the workflow that feeds issues to a team
- [[Context Reset]] — the per-context-window cost, generalized
- [[LLM Wiki Pattern]] — multi-agent write coordination across a shared knowledge view

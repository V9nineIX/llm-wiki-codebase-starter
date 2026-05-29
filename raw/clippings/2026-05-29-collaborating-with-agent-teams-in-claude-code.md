---
title: "Collaborating with Agents Teams in Claude Code"
source-url: "https://heeki.medium.com/collaborating-with-agents-teams-in-claude-code-f64a465f3c11"
author: heeki
captured-date: 2026-05-29
type: reading
tags: [claude-code, agent-teams, coding-agents, tmux, git-worktrees, spec-driven-development]
---

> Clipped from heeki.medium.com on 2026-05-29 via `defuddle`. Read-only source (Zone 1).

I have been building a lot lately. It has me thinking how the lines between product management, software engineering, and user experience testing are blurring. I start by documenting requirements for the product, refining until I think I have a decent start. Then I build, ensuring that the requirements are met. Finally, I test the user experience, iterating until I think I hit the mark. Yet as I'm building, I add more ideas to the backlog. The cycle seems to keep going, and I often have trouble keeping up with my backlog of ideas.

In my last blog post on using spec-driven development with Claude Code, I covered approaches for being more effective with agentic coding. In order to keep up with that backlog of ideas, I have been thinking about how to scale productivity by introducing more parallelism into the workflow.

I also see organizations think about using coding agents as digital workers to increase scale. Those digital workers can act autonomously on behalf of developers, taking assigned issues, understanding existing code bases, planning an implementation strategy, executing said implementation, scanning for security issues, producing documentation, and ultimately submitting a pull request for human review.

In this blog post, I document my experiments of attempting to scale with agent teams in Claude Code. I cover where I saw distinct advantages, where I hit some sharp edges, and where I found myself to be the bottleneck.

### Defining agent teams

> Subagents only report results back to the main agent and never talk to each other. In agent teams, teammates share a task list, claim work, and communicate directly with each other.

Candidly, for most of what I'm doing, I imagine subagents are sufficient both in terms of complexity and time. Most of my issues averaged 4–6 requirements with a few going up to 10. Most team-based implementations took less than 15 minutes. I am sure that a main agent could have reasoned through the same task list, spawned the appropriate subagents, and completed in comparable overall time.

### Digging into the development process

**Product management** — I start by spending time defining the requirements for a particular feature request. I use a Claude Code prompt to generate detailed documentation: high-level summary, context, a set of requirements each with expected behaviors, optional implementation notes, acceptance criteria, and out-of-scope items. This is effectively my specification. While I could have Claude Code automatically submit the issue, I instead have it write to a file locally so that I can review it first and then submit manually. #human-in-the-loop

Issue-documentation prompt (writes to `tmp/issues/###-issue-name.md`, prefixing each requirement with `R#: <requirement-name>`, with OVERVIEW and REQUIREMENTS sections).

**Software development engineer** — I give the first pass to an agent team via a prompt that: creates an agent team to work on a GitHub issue; creates a feature branch with a worktree matching the issue markdown; implements and tests all requirements ensuring no regressions; updates all `SPECIFICATIONS.md` and `README.md` (no sensitive info); and prepares but does not submit a pull request until reviewed.

With agent teams, the team lead reasons through task dependencies and creates a shared task list. It then spawns named teammates which claim and complete tasks, each aware of implementation inter-dependencies.

**User experience tester** — After the agent team completes the initial implementation, the team lead shuts down all the teammates. At this point, I interactively test the implemented features and iterate. I validate backend functionality and spend a fair amount of time tweaking the frontend. As I test, I instruct Claude Code to make updates — directly for smaller tasks or via subagents for larger tasks. Throughout, I think of new feature requests, which I document as new issues. The lines have blurred between these traditionally distinct roles.

### Setting up the basic developer environment

Primarily three tools: Claude Code, GitHub CLI, and tmux. `brew install claude-code gh tmux`.

In Claude Code settings, enable agent teams and direct usage with Bedrock (curious to monitor token usage across models). Updated hooks and status line — window tabs highlight when attention is required; the status bar shows repository, branch, model, files, and context-window consumption.

GitHub CLI simplifies pulling issues (used as feature specifications) and submitting pull requests.

Tmux is a force multiplier for terminal productivity: tmux package manager, themes, pane behavior, status bar. Avoid the mouse; keyboard shortcuts for everything.

iTerm2 (15+ years) had trouble rendering Nerd font symbols in neovim; switched to Ghostty, which rendered the full stack properly. Also switched from ohmyzsh to starship.rs (erroneously suspected ohmyzsh of cold-start issues causing agent-team coordination problems — not the cause, but liked the new setup).

### Navigating tmux

Previously used sessions for swapping between workflows (one window each), naming each session by feature. With Claude Code, context-switches more often, so transitioned to windows where each window has a set of panes relevant for a use case. Quickly swap windows with `<ctrl+b> <n|p|#>`; customizations highlight windows needing attention.

Key commands: `<ctrl+b> <s>` (sessions list), `:rename-session`, `:new-session`, `<ctrl+b> <c>` (new window), `<ctrl+b> <n|p|#>` (navigate windows).

### Building with Claude Code agent teams inside tmux

When working on a feature, checkout a branch (`git checkout -b 003-add-memory-resource`) — this sets the entire repository to that branch, keeping each window/pane consistent.

- Window 2: initial SWE prompt → Claude Code creates an agent team (team lead + three teammates); on completion the lead shuts down teammates.
- Window 1: run backend in pane 2, frontend in pane 3; test UX in browser.
- Window 3: side exploration, kept separate to avoid polluting window 2's main context.

### Increasing parallelism with git worktrees

Since checkout sets the whole repo to one branch, git worktrees enable working on multiple branches simultaneously by mounting a branch to a directory:

```
git worktree add -b <branch-name> <path>
git worktree add -b 003-add-memory-resource .claude/worktrees/003-add-memory-resource
```

Claude Code can manage the worktree automatically: `claude --worktree 003-add-memory-resource`. It creates the worktree, operates out of that directory, commits to that branch, and can auto-clean the worktree on session exit. Without a directory it generates a name (reminiscent of docker container names). This enables multiple agent teams working in parallel on separate feature requests.

> just because you can, doesn't mean you should.

### Considerations with worktrees

**Remember your directory context.** A fresh worktree is like mounting a freshly cloned repo into a directory. Deployment configs are not committed, so a fresh worktree needs: update environment config, install dependencies, initialize dev database, and start backend and frontend from the *correct sub-directory*. (Author repeatedly ran backend/frontend on main in window 1 while editing the feature branch in window 2, then wondered why updates didn't appear. #duh)

**Set your branch and worktree in your IDE accordingly.** In VS Code (or forks) you can swap to a worktree or open a new window. Author often opens a new window to still see gitignored files (env configs, notes) from main. Remember the branch/worktree context per IDE window.

**Be mindful of parallelism when committing to overlapping files.** Backend is a monolithic FastAPI app; frontend a monolithic Vite server. Three agent teams on separate issues produced branches with many merge conflicts. Reviewing/testing serially: review each PR, make subsequent commits, merge to main, then rebase the next PR from main. Rebase stashes the branch's changes, resets to the tip of main, reapplies, resolving conflicts during the process — Claude Code can handle conflict resolution. Rebase preferred for a linear commit history.

### Considerations with agent teams

**Agent teams are an experimental feature.** Wonky behavior: teammates not receiving messages from the team lead (led to fully rebuilding the dev environment); teammates getting stuck while the lead loses track of them, leaving sub-tasks stuck and requiring the lead to restart work in a new teammate — creating far more tmux panes than necessary. It got cluttered fast.

**Permissions requests can get unwieldy with agent teams.** Started requiring approval for all requests, over time enabling commands via `.permissions.allow[]`. For actions not in the allow list, the permission bottleneck is amplified across teammates routing through the team lead. Author jumped to `claude --dangerously-skip-permissions` (and `--worktree`) but does NOT recommend it — instead be rigorous and intentional with the allow list.

**Be mindful of cost implications from increased token usage.** Documentation states agent teams "use significantly more tokens than a single session" because each teammate gets its own context window. Team lead + three teammates each loading 10k init context = 40k vs. 10k for a single session. True for both agent teams and subagents (both use their own context window).

### Considerations with Claude Code

**Don't prompt directly in Claude Code.** Write prompts in an IDE before copy/pasting. (1) Creates impedance that forces slowing down and being more thoughtful (texting vs. handwriting a letter). (2) Gives a full log of interactions per feature, saved into structured files like `prompts_issue_003.md` — useful to learn from and to feed back to Claude Code to create skills.

**Update your documentation regularly.** After a feature, always tell Claude Code to update `SPECIFICATIONS.md` (design decisions) and `README.md` (implementation details, no sensitive info) before committing.

**Generate skills after productive sessions.** Ask Claude Code to generate a skill to codify learnings. Skills as a future where organizational best practices are codified and scaled for developer use.

**Consider model choice and effort.** Not all tasks require Opus 4.6 high effort. `/model`: Opus most capable for complex work, Sonnet best for everyday tasks, Haiku fastest for quick answers. Each adjustable for effort (low/medium/high). That said, when in flow, the author isn't thinking about token efficiency.

### Conclusion

Most feature requests are fairly simple; the agent team typically completes a first-pass implementation in 15–20 minutes. Afterwards the author may spend a few hours iterating before submitting the PR. This is not a failure of the agent team's implementation — it's a failure of specification. The author often doesn't know exactly how a feature should be implemented until iterating on it.

As a single developer, this is one pushback against running many agent teams in parallel. For larger organizations with many developers on independent, non-overlapping feature requests, the parallelism can be a powerful accelerator. Again, just because you can, doesn't mean you should.

Curious to explore more with skills and harness engineering; started playing with Claude Code remote control; building a prototype with agent platforms (to be shared in a next post).

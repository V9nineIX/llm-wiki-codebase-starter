---
title: Git Worktrees
type: concept
tags: [git, parallelism, coding-agents, claude-code, workflow]
sources:
  - "[[raw/clippings/2026-05-29-collaborating-with-agent-teams-in-claude-code]]"
created: 2026-05-29
updated: 2026-05-29
---

A git feature that lets you work on multiple branches simultaneously by mounting each branch to its own directory. A plain `git checkout -b` switches the *entire* repository to one branch; a worktree instead gives each branch a live working directory of its own — the enabling mechanism for running multiple [[Agent Teams]] in parallel.

## Mechanics

```
git worktree add -b <branch-name> <path>
git worktree add -b 003-add-memory-resource .claude/worktrees/003-add-memory-resource
```

At the repo root you stay on `main`; `cd` into the worktree directory and you are on the feature branch.

[[Claude Code]] can manage this automatically:

```
claude --worktree 003-add-memory-resource
```

It creates the worktree, operates out of that directory, commits to that branch, and can auto-clean the worktree on session exit. Omit the directory and it generates a name (reminiscent of how Docker names containers).

## Considerations

- **Remember your directory context.** A fresh worktree is like a freshly cloned repo mounted into a directory: gitignored deployment configs aren't there, so you must re-create the environment, install dependencies, init the dev database, and start backend/frontend from the *correct sub-directory*. A classic trap is running the app on `main` in one [[tmux]] window while editing the feature branch in another, then wondering why nothing changes.
- **Set branch/worktree in your IDE deliberately.** VS Code (and forks) can swap to a worktree or open a new window; a new window keeps the gitignored files (env configs, notes) from `main` visible. Track which window points at which branch.
- **Overlapping files cause conflicts.** Three teams editing a monolithic FastAPI/Vite codebase on separate issues produced branches with many merge conflicts.

## Rebase-onto-main for linear history

Reviewing/testing serially: review each PR → make subsequent commits → merge to `main` → **rebase** the next PR from `main`. The rebase stashes the branch's changes, resets to the tip of `main`, and reapplies them, resolving conflicts in the process. [[Claude Code]] can handle the conflict resolution. Preferred over merge because it keeps a linear commit history instead of long divergent paths.

## Related

- [[Agent Teams]] — what worktrees let you run in parallel
- [[tmux]] — windows/panes that hold each worktree's processes
- [[Claude Code]] — `--worktree` flag for automatic management

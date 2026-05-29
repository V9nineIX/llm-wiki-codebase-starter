---
title: tmux
type: concept
tags: [terminal, workflow, productivity, coding-agents, claude-code]
sources:
  - "[[raw/clippings/2026-05-29-collaborating-with-agent-teams-in-claude-code]]"
created: 2026-05-29
updated: 2026-05-29
---

A terminal multiplexer — "a force multiplier for terminal productivity" — and, in the agent-teams workflow, the substrate where concurrent [[Claude Code]] sessions, backend/frontend processes, and side explorations all live side by side. One of the three core tools of the setup: `brew install claude-code gh tmux`.

## Sessions → windows → panes

- **Session** — a named workspace. The author originally used one session per feature (one window each), swapping with `<ctrl+b> <s>` and naming via `:rename-session`.
- **Window** — the preferred unit now. With Claude Code the author context-switches far more often, so each *window* holds a set of panes for one use case and you flip between them fast.
- **Pane** — a split within a window (e.g. backend in one, frontend in another, an agent teammate in a third).

A representative layout: window 2 runs the agent team (one pane per teammate); window 1 runs backend + frontend for interactive UX testing; window 3 holds side exploration kept separate to avoid polluting the main context window.

## Navigation

| Keys | Action |
|---|---|
| `<ctrl+b> <s>` | Open sessions list |
| `:rename-session -t 0 <name>` | Rename a session |
| `:new-session -s <name>` | Start a new session |
| `<ctrl+b> <c>` | Create a new window |
| `<ctrl+b> <n \| p \| #>` | Next / previous / numbered window |
| `<ctrl+b> <% \| ">` | Split pane vertical / horizontal |

Custom status bars and hooks highlight the windows that need attention; the author avoids the mouse entirely.

## Environment notes

The author switched from iTerm2 to [Ghostty](https://ghostty.org/) to get Nerd-font symbols rendering correctly in neovim, and from ohmyzsh to [starship.rs](https://starship.rs/) for shell customization (ohmyzsh was wrongly suspected of cold-start issues that looked like agent-team coordination problems).

## Related

- [[Agent Teams]] — runs across tmux windows/panes
- [[Git Worktrees]] — each worktree's processes occupy their own panes
- [[Claude Code]] — the sessions tmux orchestrates

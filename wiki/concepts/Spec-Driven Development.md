---
title: Spec-Driven Development
type: concept
tags: [coding-agents, claude-code, workflow, human-in-the-loop, product-management]
sources:
  - "[[raw/clippings/2026-05-29-collaborating-with-agent-teams-in-claude-code]]"
created: 2026-05-29
updated: 2026-05-29
---

A workflow for agentic coding in which a written **specification** — typically a GitHub issue — is the unit of work handed to an agent, rather than an ad-hoc prompt. The spec carries a high-level summary, context, a set of named requirements (`R#: <requirement-name>`) each with expected behaviors, optional implementation notes, acceptance criteria, and out-of-scope items. It is the artifact that [[Agent Teams]] and subagents consume.

## The product delivery lifecycle

The author runs three traditionally distinct roles, increasingly blurred together:

1. **Product management** — define requirements as a spec. [[Claude Code]] drafts the issue to a local file (`tmp/issues/###-issue-name.md`) so the human reviews it before submitting manually. #human-in-the-loop
2. **Software development engineer** — hand the first pass to an [[Agent Teams|agent team]]: create a feature branch + [[Git Worktrees|worktree]], implement and test all requirements with no regressions, update docs, and prepare (but not submit) a PR until reviewed.
3. **UX tester** — after the team shuts down, interactively test, validate the backend, tweak the frontend, and instruct Claude Code to make updates (directly for small tasks, via subagents for large ones). New ideas surfaced here become new issues.

The interplay is not linear: testing surfaces specification gaps, which feed back into new specs.

## Specification is the bottleneck

A first-pass implementation lands in 15–20 minutes, but the human then iterates for hours. The author names the cause precisely: *not* an implementation failure but a **failure of specification** — you often don't know exactly how a feature should behave until you interact with it. This is the core argument against naively parallelizing many [[Agent Teams|agent teams]] as a single developer.

## Supporting practices

- **Don't prompt directly in Claude Code.** Write prompts in an IDE first. This adds deliberate impedance (texting vs. handwriting) that makes you more thoughtful, and produces a per-feature log (`prompts_issue_003.md`) you can learn from or feed back to generate skills.
- **Update documentation regularly.** After each feature, have the agent update `SPECIFICATIONS.md` (design decisions) and `README.md` (implementation details, no sensitive info) before committing — the same *why* vs. *what* split the [[LLM Wiki Pattern]] draws.
- **Generate skills after productive sessions** to codify learnings; skills as a vehicle for scaling organizational best practices.
- **Match model and effort to the task** — Opus for complex work, Sonnet for everyday, Haiku for quick answers; effort low/medium/high.

## Related

- [[Agent Teams]] — consumes specs as shared task lists
- [[Claude Code]] — drafts specs and implements against them
- [[LLM Wiki Pattern]] — the durable *why* alongside the codebase's *what*
- [[Context Reset]] — a written spec survives a session boundary; reasoning in chat does not

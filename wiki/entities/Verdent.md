---
title: Verdent
type: entity
tags: [company, coding-agents, ai-tooling]
sources:
  - "[[raw/clippings/2026-05-19-llm-knowledge-base-beyond-rag]]"
created: 2026-05-19
updated: 2026-05-19
---

AI tooling company focused on multi-agent coding workflows, particularly parallel agent execution using isolated git worktrees.

## Relevance

- Author of the article applying [[Andrej Karpathy]]'s [[LLM Wiki Pattern]] to coding-agent context management.
- Runs parallel agents in isolated worktrees with a dedicated compilation agent that has write access to the shared wiki; task agents have read-only access.
- This pattern prevents conflicting wiki writes while allowing all agents to share a consistent view of project context.

## Related

- [[LLM Wiki Pattern]]
- [[Context Reset]]

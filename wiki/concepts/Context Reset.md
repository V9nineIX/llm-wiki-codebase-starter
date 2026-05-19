---
title: Context Reset
type: concept
tags: [coding-agents, context-management, llm, knowledge-management]
sources:
  - "[[raw/clippings/2026-05-19-llm-knowledge-base-beyond-rag]]"
created: 2026-05-19
updated: 2026-05-19
---

The loss of accumulated reasoning that occurs when a coding agent session ends or compacts. After a reset, the next agent session can read the codebase (the *what*) but not the reasoning behind it (the *why*).

## The problem

Code documents what the system does. It does not document:

- Why a specific architectural pattern was chosen over alternatives
- What constraints shaped a decision
- What was tried and rejected

This reasoning lives in conversation context. When the session ends, it disappears. The next agent starts cold and must either re-derive this context from the code (expensive, lossy) or be re-briefed by the user.

## The token tax

Re-establishing context for a moderately complex project costs roughly 5,000–15,000 tokens before any task work begins. At 10 sessions per day, this overhead is significant — and it's lossy: manual re-explanation tends to miss edge cases and nuance from prior sessions, causing subtle downstream errors.

## The fix: compiled wiki

A compiled markdown wiki alongside the codebase — loaded via CLAUDE.md `@path` imports — makes reasoning durable across sessions. The agent reads the wiki instead of asking the user to re-explain. See [[LLM Wiki Pattern]] for the full architecture.

## Related

- [[LLM Wiki Pattern]] — the architecture that solves the context reset problem
- [[Retrieval-Augmented Generation]] — does not solve context reset; re-derives answers from scratch per query

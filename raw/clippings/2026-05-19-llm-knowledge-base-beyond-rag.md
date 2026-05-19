---
title: "LLM Knowledge Base: Beyond RAG"
type: reading
tags: [clippings, llm, knowledge-management, coding-agents, rag]
source-url: "https://www.verdent.ai/guides/llm-knowledge-base-coding-agents"
author: "[[Verdent]]"
captured-date: 2026-05-19
published: 2026-04-06
created: 2026-05-19
updated: 2026-05-19
---

Applies [[Andrej Karpathy]]'s [[LLM Wiki Pattern]] specifically to coding-agent workflows. Central argument: the same raw→compile→lint→query cycle that works for personal research knowledge bases is also the right architecture for solving the [[Context Reset]] problem in multi-agent coding sessions.

## Key claims

- RAG re-derives answers from scratch on every query — no accumulation, no cross-referencing.
- Coding agents lose the "why" (architecture rationale, decision history) at every session boundary; only the "what" (code) survives.
- A compiled markdown wiki alongside the codebase, loaded via CLAUDE.md `@path` imports, gives the next agent session durable reasoning context.
- Scale ceiling: index-file navigation works up to ~100 sources / ~400k words. Beyond that, a RAG layer is needed for broad retrieval.
- Wiki is for *why*; codebase is for *what*.

## Ingest → Compile → Query → Lint (coding context)

| Phase | Action |
|-------|--------|
| **Ingest** | ADRs, PR descriptions, post-mortems, design notes → `raw/` |
| **Compile** | Agent synthesizes into structured wiki pages with backlinks |
| **Query** | Agent loads relevant wiki sections via CLAUDE.md at session start |
| **Lint** | Periodic pass: dead links, stale code references, uncompiled raw entries |

## Tooling mentioned

- [[Obsidian]] — human browsing layer; graph view, web clipper
- Claude Code — compilation and maintenance engine
- [[Verdent]] — parallel worktree agent setup with dedicated compilation agent

## Related concepts

- [[LLM Wiki Pattern]]
- [[Retrieval-Augmented Generation]]
- [[Context Reset]]

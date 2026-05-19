---
title: LLM Wiki Pattern
type: concept
tags: [llm, knowledge-management, wiki, compounding, rag-alternative]
sources:
  - "[[raw/clippings/2026-05-14-llm-wiki]]"
created: 2026-05-14
updated: 2026-05-14
---

An architecture for building persistent, compounding personal knowledge bases where an LLM agent incrementally maintains a structured wiki between the user and immutable raw sources.

## Why it differs from RAG

- [[Retrieval-Augmented Generation]] re-derives answers from raw chunks on every query — no accumulation, no cross-referencing, no contradiction tracking.
- The wiki pattern compiles knowledge once and keeps it current: cross-references exist, contradictions are flagged, synthesis reflects the full corpus.

## Three layers

| Layer | Role | Mutability |
|---|---|---|
| **Raw sources** | Curated articles, papers, data | Immutable (user-curated, LLM-reads) |
| **The wiki** | Summaries, entities, concepts, synthesis | Mutable (LLM owns all edits) |
| **The schema** | Structure, conventions, workflows | Mutable (co-evolved with LLM) |

## Core operations

| Operation | Purpose |
|---|---|
| **Ingest** | Read a new source, discuss takeaways, create/update 10–15 wiki pages, append to log |
| **Query** | Search relevant wiki pages, synthesize answers, file valuable explorations back into the wiki |
| **Lint** | Health-check contradictions, stale claims, orphan pages, missing pages, data gaps |

## Indexing and logging

- **[[index.md]]** — content-oriented catalog of all wiki pages with summaries, used by the LLM to locate relevant pages before drilling in. Works well up to ~100 sources and hundreds of pages.
- **[[log.md]]** — chronological append-only record of ingests, queries, lint passes. Uses machine-readable prefixes for simple Unix filtering.

## Relation to Memex

The pattern is conceptually close to [[Memex|Vannevar Bush's Memex]] (1945): a private, actively curated knowledge store where associative trails between documents are as valuable as the documents themselves. Bush's unsolved problem — who does the maintenance — is handled by the LLM.

## Applied to coding agents

The same cycle directly addresses the [[Context Reset]] problem in multi-agent coding sessions. Code survives session boundaries; reasoning does not. A compiled wiki alongside the codebase makes architectural decisions, rejected alternatives, and domain constraints durable.

Practical mapping for engineering workflows:

| Phase | Coding-agent equivalent |
|-------|------------------------|
| **Ingest** | ADRs, PR descriptions, post-mortems, design discussions → `raw/` |
| **Compile** | Agent synthesizes into structured wiki pages with backlinks |
| **Query** | Agent loads relevant wiki sections via CLAUDE.md `@path` imports at session start |
| **Lint** | Periodic pass: dead links, stale code references, uncompiled raw entries |

**Division of responsibility**: the wiki holds *why* (rationale, alternatives, constraints); the codebase holds *what* (contracts, types, inline logic). Overlap creates a two-moving-parts maintenance problem.

**Scale ceiling**: index-file + summary navigation works up to roughly 100 sources / 400k words without vector infrastructure. Beyond that, a [[Retrieval-Augmented Generation|RAG]] layer for broad retrieval, with the wiki handling project-specific context, is more realistic.

**Multi-agent write coordination**: designate one compilation agent with wiki write access; task agents read-only. Prevents conflicting edits while sharing a consistent knowledge view. ([[Verdent]] runs this pattern in isolated git worktrees.)

## Tooling commonly used

- [[Obsidian]] — markdown IDE for browsing the wiki, graph view, Dataview plugin.
- Obsidian Web Clipper — browser extension to convert articles to markdown.
- qmd — optional local search engine with hybrid BM25/vector search.

## Notes

- Answers and analyses discovered during queries should be filed back into the wiki as new pages, so explorations compound rather than disappearing into chat history.
- The schema document (e.g. `CLAUDE.md`) is critical: it transforms a generic chatbot into a disciplined wiki maintainer.
- A stale wiki actively misleads agents (confident wrong context is worse than no context). Lint cadence and human ownership of significant changes are non-negotiable.

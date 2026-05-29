---
title: LLM Wiki Pattern
type: concept
tags: [llm, knowledge-management, wiki, compounding, rag-alternative]
sources:
  - "[[raw/clippings/2026-05-14-llm-wiki]]"
  - "[[raw/clippings/2026-05-19-personal-harness-llm-wiki-obsidian]]"
  - "[[raw/clippings/2026-05-29-collaborating-with-agent-teams-in-claude-code]]"
created: 2026-05-14
updated: 2026-05-29
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

**Multi-agent write coordination**: designate one compilation agent with wiki write access; task agents read-only. Prevents conflicting edits while sharing a consistent knowledge view. ([[Verdent]] runs this pattern in isolated [[Git Worktrees|git worktrees]].) The same single-writer discipline is the antidote to a failure mode seen with [[Agent Teams]]: several teammates editing a monolithic codebase across worktrees produce many merge conflicts — write contention on code is the same hazard the wiki avoids by funnelling edits through one writer.

**Docs as the durable *why***: a complementary practice from the agent-teams workflow is updating `SPECIFICATIONS.md` (design decisions) and `README.md` (implementation details) after every feature, before committing — the same *why* vs. *what* split this pattern draws, kept inside the repo. See [[Spec-Driven Development]].

## Physical implementation: Zone Separation

The three conceptual layers map to vault zones enforced by `CLAUDE.md`. See [[Zone Separation]] for the full model: `raw/` (immutable, human-curated), `wiki/` (LLM-owned), `dev/` (collaborative — ADRs, debriefs, snippets).

`CLAUDE.md` itself is a "Zone 0" schema document read at every session start. It transforms a generic LLM into a disciplined wiki maintainer by encoding zone rules, wikilink conventions, frontmatter schema, ingestion workflow, and strict limits.

## Slash commands and allowed-tools

In an Obsidian vault, imperative operations (ingest a URL, run a query) are encoded as slash commands with an `allowed-tools` field that allowlists only the specific Bash subcommands the command needs. This is the primary [[Prompt Injection Defense]] mechanism: even if malicious content in an ingested source triggers an unexpected action, the tool the model "decides" to use may not be in the allowlist. The plan-before-execute pattern (agent presents what it will do; human approves) is the human-in-the-loop gate.

## Three paths to LLM → vault connection

| Path | Mechanism | Recommended when |
|------|-----------|-----------------|
| **Direct filesystem + skills** | Claude Code opens vault directory; [[Steph Ango]]'s `kepano/obsidian-skills` teach native Obsidian syntax | Starting out; offline; portable |
| **MCP via Local REST API** | Obsidian plugin exposes `127.0.0.1:27124`; MCP server mediates | Need Dataview queries or palette commands from agent |
| **Pre-packaged plugin** | `claude-obsidian` ships with skills + commands ready | Zero-config entry; less customizable |

## Weekly daily-notes synthesis

Daily notes live in `raw/daily/` (Zone 1, immutable). Periodically, the agent reads a week's worth and produces a structured report: recurring themes, pending decisions, concepts worth promoting to wiki, possible wikilinks to existing ADRs. The agent presents the report first; no files are created until approved.

## Tooling commonly used

- [[Obsidian]] — markdown IDE for browsing the wiki, graph view, Dataview plugin.
- Obsidian Web Clipper — browser extension to convert articles to markdown.
- qmd — optional local search engine with hybrid BM25/vector search.

## Notes

- Answers and analyses discovered during queries should be filed back into the wiki as new pages, so explorations compound rather than disappearing into chat history.
- The schema document (e.g. `CLAUDE.md`) is critical: it transforms a generic chatbot into a disciplined wiki maintainer.
- A stale wiki actively misleads agents (confident wrong context is worse than no context). Lint cadence and human ownership of significant changes are non-negotiable.

---
title: Vault Log
type: log
description: Chronological append-only record of vault operations — ingests, queries, lint passes, ADR decisions
created: 2026-05-15
---

# Vault Log

Chronological record of vault evolution. Use `grep "^## \[" log.md | tail -10` to see recent entries.

## [2026-05-01] init | Vault structure scaffold

Initialized three-zone vault structure (raw/, wiki/, dev/) following CLAUDE.md conventions.

## [2026-05-14] ingest | LLM Wiki Pattern (Karpathy)

**Source:** [[raw/clippings/2026-05-14-llm-wiki|Andrej Karpathy's LLM Wiki gist]]

Created/updated concepts:
- [[LLM Wiki Pattern]] — core pattern page
- [[Memex]] — historical context (Vannevar Bush 1945)
- [[Obsidian]] — tooling/IDE

Updated index.md with new concepts and entity reference to [[Andrej Karpathy]].

**Insight:** Discovered alignment between the vault's three-zone structure and the pattern's recommended architecture (raw sources | wiki | schema/CLAUDE.md).

## [2026-05-15] decision | ADR-0001 accepted

**Status:** Accepted. Use pgvector for RAG vector storage in Kubernetes classification system.

**Key contingency:** Revisit if scale testing shows pgvector becomes bottleneck (>1M embeddings, latency threshold TBD).

**File:** [[dev/adr/ADR-0001-pgvector-vs-qdrant-for-rag]]

## [2026-05-15] lint | Synthesis week (2026-04-28 onward)

**Recurring themes identified:**
1. Persistent knowledge compilation vs. ephemeral retrieval — core to both pattern and pgvector choice
2. Human curation + LLM maintenance split — operationalized in zone structure
3. Schema as load-bearing infrastructure — CLAUDE.md drives consistency

**Pending decisions:**
1. pgvector scale testing criteria (ADR-0001 contingency)
2. Schema evolution cadence (CLAUDE.md refinement process)
3. log.md adoption (THIS ENTRY)

**Concepts proposed for development:**
- Knowledge Compilation vs. Retrieval (synthesis page)
- Vector Similarity Search (concept expansion)
- Schema-Driven Wiki Maintenance (synthesis)
- Memex Trail (concept expansion)

**Action:** Adopted log.md for future tracking.

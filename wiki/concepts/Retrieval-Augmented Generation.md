---
title: Retrieval-Augmented Generation
type: concept
tags: [llm, rag, architecture]
sources:
  - "[[raw/clippings/2026-05-14-llm-wiki]]"
created: 2026-05-14
updated: 2026-05-14
---

The conventional technique of augmenting an LLM's generation with retrieved document chunks at query time, in contrast to persistent knowledge-base approaches.

## Limitations highlighted by the LLM Wiki Pattern

| Issue | RAG behavior | LLM Wiki behavior |
|---|---|---|
| **Re-derivation** | Rebuilds answers from raw chunks every query | Synthesis is pre-compiled and kept current |
| **Cross-references** | None; fragments are isolated | Bidirectional [[wikilinks]] maintained |
| **Contradictions** | Not tracked across sources | Flagged and resolved during ingest |
| **Accumulation** | No knowledge compounding | Knowledge compounds over time |

## When RAG makes sense

RAG remains effective for large, static corpora where freshness is less important than coverage, and where queries are narrow enough that chunk retrieval is sufficient. It does not suit long-term research or evolving personal knowledge bases where synthesis matters.

## Vector database implementations

RAG requires a vector store for embedding storage and retrieval:

- [[pgvector]] — PostgreSQL extension for integrated vector search (chosen for Kubernetes classification system)
- [[Qdrant]] — Standalone vector database optimized for high-scale vector workloads

See [[dev/adr/ADR-0001-pgvector-vs-qdrant-for-rag]] for the decision rationale.

## Related

- [[LLM Wiki Pattern]] — the persistent-knowledge alternative.

---
title: pgvector
type: concept
tags: [vector-db, postgresql, rag, embedding]
sources:
  - "[[dev/adr/ADR-0001-pgvector-vs-qdrant-for-rag]]"
created: 2026-05-15
updated: 2026-05-15
---

PostgreSQL extension for vector similarity search. Adds native vector operations (cosine, L2, inner product) to Postgres, enabling vector databases within a traditional RDBMS.

## Strengths

- **Single database**: Combines relational data and vectors in one system; no separate vector DB infrastructure
- **SQL integration**: Queries can filter and join on metadata (tags, timestamps, resource type) alongside vector similarity
- **Transactional consistency**: ACID guarantees for atomic ingestion and updates
- **Developer simplicity**: Single connection string, familiar SQL interface, integrates with existing Postgres tooling
- **Cost**: No additional services or licensing; leverages existing Postgres infrastructure

## Limitations

- **Scale**: Linear query performance; specialized vector DBs like [[Qdrant]] optimize search at 10M+ vectors
- **Specialized tuning**: HNSW index configuration less mature than dedicated vector DB implementations
- **Observability**: Limited native metrics for vector DB operations (recall efficiency, index stats)

## When to use

pgvector suits early-stage RAG systems, MVP deployments, and use cases with <1M vectors or moderate query volume. Excellent for systems where metadata filtering is essential or where existing Postgres infrastructure is already operational.

## Related

- [[Retrieval-Augmented Generation]] — RAG pattern requiring vector search
- [[Qdrant]] — alternative specialized vector database
- [[dev/adr/ADR-0001-pgvector-vs-qdrant-for-rag]] — decision to use pgvector for Kubernetes classification RAG

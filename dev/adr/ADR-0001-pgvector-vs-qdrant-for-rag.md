---
title: Use pgvector for RAG vector storage in Kubernetes classification system
type: adr
status: accepted
decision-date: 2026-05-15
deciders: [Wi9]
tags: [rag, vector-db, kubernetes, architecture]
supersedes: []
superseded-by: []
---

# ADR-0001: pgvector vs Qdrant for RAG vector storage

## Context

The Kubernetes classification project requires a vector database to support [[Retrieval-Augmented Generation|RAG]] for document retrieval and semantic search. The system will ingest API documentation, logs, and configuration examples, then retrieve relevant context at query time to augment classification models.

Two main candidates emerged:
- **pgvector**: PostgreSQL extension for vector similarity search, integrated into existing RDBMS
- **Qdrant**: Standalone vector database optimized for vector operations, cloud-native deployment

The choice affects operational complexity, deployment model, query latency, and integration with existing infrastructure.

## Decision

We will use pgvector as the vector store for initial RAG integration in the Kubernetes classification system.

## Consequences

### Positive
- Single database (PostgreSQL) reduces operational overhead and deployment complexity
- Seamless integration with existing Postgres infrastructure; no new deployment/management burden
- Queries can combine vector similarity with structured SQL filters on metadata (namespace, resource type, etc.)
- Transaction support allows atomic ingestion and metadata updates
- Simpler local development environment; pgvector works in Docker without separate services
- Lower infrastructure cost; no additional vector DB license or clusters

### Negative / trade-offs
- Vector query performance scales linearly; at high scale (>10M embeddings) or high QPS, latency may increase beyond Qdrant's optimized performance
- HNSW index tuning for pgvector is less mature than Qdrant's specialized implementation
- pgvector depends on Postgres version and extension availability; less flexibility if Postgres upgrades lag
- Less specialized observability; no native vector DB metrics (recall, index efficiency)

### Neutral
- pgvector supports all essential vector operations (cosine, L2, inner product); feature parity for typical RAG use cases
- Both pgvector and Qdrant support batch ingestion; no operational difference there

## Alternatives considered

**Qdrant (rejected)**
Why: Adds operational complexity (separate service, deployment, monitoring) and infrastructure cost. For an initial MVP targeting <1M vectors in a Kubernetes environment with existing Postgres, pgvector's all-in-one approach outweighs Qdrant's search performance specialization. Revisit after scale testing shows pgvector becomes a bottleneck.

**Pinecone (rejected)**
Why: Proprietary SaaS introduces vendor lock-in and cost scaling with vector count. Not suitable for on-premises or self-hosted deployments.

**Weaviate (rejected)**
Why: Operational footprint between pgvector and Qdrant. Chosen neither because Qdrant is more mature and pgvector integrates existing infrastructure.

## References

- [[Retrieval-Augmented Generation]] — concepts and limitations
- PostgreSQL pgvector documentation: https://github.com/pgvector/pgvector
- Qdrant documentation: https://qdrant.tech/documentation/

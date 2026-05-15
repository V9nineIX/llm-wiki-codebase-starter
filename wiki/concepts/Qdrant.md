---
title: Qdrant
type: concept
tags: [vector-db, specialized, rag, embedding, scale]
sources:
  - "[[dev/adr/ADR-0001-pgvector-vs-qdrant-for-rag]]"
created: 2026-05-15
updated: 2026-05-15
---

Standalone vector database optimized for similarity search at scale. Cloud-native design with distributed deployment, sharding, and replication.

## Strengths

- **Specialized performance**: Optimized HNSW implementation for sub-millisecond search on billions of vectors
- **Horizontal scalability**: Distributed architecture with sharding and replication for multi-node deployments
- **Vector-centric**: Purpose-built observability, tuning, and monitoring for vector workloads
- **Cloud-native**: Kubernetes-ready; managed offerings available (Qdrant Cloud)
- **Filter efficiency**: Payload-based filtering optimized for fast filtered vector search

## Limitations

- **Operational overhead**: Separate service to deploy, monitor, and maintain
- **Infrastructure cost**: Additional resources and potentially licensing
- **SQL integration**: Limited cross-database joins; metadata stored separately or as payloads
- **Setup complexity**: More moving parts than embedded solutions like [[pgvector]]

## When to use

Qdrant suits high-scale deployments (>10M vectors), high-throughput applications (100s-1000s QPS), or systems where vector search is the primary workload. Ideal for serious production systems where vector DB performance is a competitive advantage.

## Related

- [[Retrieval-Augmented Generation]] — RAG pattern requiring vector search
- [[pgvector]] — alternative embedded vector DB in PostgreSQL
- [[dev/adr/ADR-0001-pgvector-vs-qdrant-for-rag]] — decision to start with pgvector, revisit if scale demands Qdrant

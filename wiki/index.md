# Wiki Index

Global index maintained by the agent.

**Logs & Metadata:**
- [[../../log.md|Vault Log]] — Chronological record of ingests, decisions, lint passes; use `grep "^## \[" log.md | tail -10` for recent entries.

## Entities
- [[Andrej Karpathy]] — AI researcher and educator; proposer of the [[LLM Wiki Pattern]].
- [[Verdent]] — AI tooling company; applies the wiki pattern to parallel worktree coding-agent setups.
- [[Steph Ango]] — Obsidian CEO; creator of the "file over app" principle and `kepano/obsidian-skills`.
- [[Roan Brasil Monteiro]] — Developer/writer; formalized [[Zone Separation]] and the three-path vault setup model.

## Concepts
- [[LLM Wiki Pattern]] — Persistent, compounding knowledge base maintained by an LLM agent, contrasting with [[Retrieval-Augmented Generation|RAG]].
- [[Zone Separation]] — Three-zone vault architecture (raw/wiki/dev) enforcing distinct write rules per zone via `CLAUDE.md`.
- [[Prompt Injection Defense]] — Layered defenses (CLAUDE.md constraints, allowed-tools, plan gate, git revert) against malicious content in ingested sources.
- [[Context Reset]] — Loss of reasoning context when a coding agent session ends; the core problem the wiki pattern solves.
- [[Memex]] — Vannevar Bush's 1945 associative-memory machine, conceptual predecessor to the LLM Wiki Pattern.
- [[Obsidian]] — Markdown knowledge-base IDE used as the browsing layer for LLM wikis.
- [[Retrieval-Augmented Generation]] — Ephemeral chunk-retrieval approach contrasted with persistent wiki architectures.
- [[pgvector]] — PostgreSQL extension for vector similarity search; chosen for Kubernetes classification RAG.
- [[Qdrant]] — Standalone vector database optimized for high-scale vector workloads.

## Sources
- [[raw/clippings/2026-05-14-llm-wiki|2026-05-14 LLM Wiki]] — Original gist by [[Andrej Karpathy]] outlining the three-layer wiki architecture.
- [[raw/clippings/2026-05-19-llm-knowledge-base-beyond-rag|2026-05-19 LLM Knowledge Base: Beyond RAG]] — [[Verdent]] article applying the wiki pattern to coding-agent context management.
- [[raw/clippings/2026-05-19-personal-harness-llm-wiki-obsidian|2026-05-19 Building a Complete Personal Harness]] — [[Roan Brasil Monteiro]] step-by-step setup tutorial introducing [[Zone Separation]] and [[Prompt Injection Defense]].

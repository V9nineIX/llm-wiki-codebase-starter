---
title: Steph Ango
type: entity
tags: [ceo, obsidian, file-over-app, knowledge-management, open-source]
created: 2026-05-19
updated: 2026-05-19
---

CEO of [[Obsidian]] (handle: kepano); creator of the "file over app" design principle and author of the official `kepano/obsidian-skills` repository for Claude Code.

## Key contributions

- **"File over app" principle** — Design philosophy that software should produce files in open, durable formats rather than locking data inside proprietary apps. Motivates Obsidian's plain-markdown approach and underpins the [[LLM Wiki Pattern]]'s choice of markdown as the storage layer.
- **`kepano/obsidian-skills`** — Official skills repository (13.9k+ GitHub stars as of 2026-05) for teaching Claude Code to operate Obsidian natively: `obsidian-markdown`, `obsidian-bases`, `json-canvas`, `obsidian-cli`, `defuddle`. Without these, Claude defaults to standard Markdown links instead of `[[wikilinks]]`, breaking the graph view.

## Relation to vault setup

The `kepano/obsidian-skills` are the foundation layer of Path 1 vault setup described by [[Roan Brasil Monteiro]]. They translate Obsidian's "native language" (wikilinks, callouts, frontmatter properties, canvas JSON schema) for the LLM agent.

## Related

- [[Obsidian]]
- [[LLM Wiki Pattern]]
- [[Zone Separation]]

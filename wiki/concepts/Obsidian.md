---
title: Obsidian
type: concept
tags: [knowledge-management, markdown, tool, note-taking]
sources:
  - "[[raw/clippings/2026-05-14-llm-wiki]]"
created: 2026-05-14
updated: 2026-05-14
---

A markdown-based knowledge-base IDE commonly used as the browsing layer for [[LLM Wiki Pattern]] implementations.

## Key features useful for LLM wikis

- **Graph view** — visualizes links between pages, revealing hubs and orphans.
- **Obsidian Web Clipper** — browser extension that converts web articles to markdown for direct placement in `raw/`.
- **Dataview** — plugin that queries frontmatter to generate dynamic tables and lists.
- **Marp** — plugin for generating slide decks from markdown.
- **Local-first** — all files are plain markdown on disk, making them easy for LLMs to edit via filesystem tools.

## Practical tip

Configure Settings → Files and links → "Attachment folder path" to a fixed directory (e.g. `raw/assets/`), then bind "Download attachments for current file" to a hotkey. This keeps images local and LLM-accessible instead of relying on external URLs that may break.

## Related

- [[LLM Wiki Pattern]]

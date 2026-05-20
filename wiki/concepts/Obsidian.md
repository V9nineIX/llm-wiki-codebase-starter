---
title: Obsidian
type: concept
tags: [knowledge-management, markdown, tool, note-taking]
sources:
  - "[[raw/clippings/2026-05-14-llm-wiki]]"
  - "[[raw/clippings/2026-05-19-personal-harness-llm-wiki-obsidian]]"
created: 2026-05-14
updated: 2026-05-19
---

A markdown-based knowledge-base IDE commonly used as the browsing layer for [[LLM Wiki Pattern]] implementations.

## Key features useful for LLM wikis

- **Graph view** — visualizes links between pages, revealing hubs and orphans.
- **Obsidian Web Clipper** — browser extension that converts web articles to markdown for direct placement in `raw/`.
- **Dataview** — plugin that queries frontmatter to generate dynamic tables and lists.
- **Marp** — plugin for generating slide decks from markdown.
- **Local-first** — all files are plain markdown on disk, making them easy for LLMs to edit via filesystem tools.

## Official skills (kepano/obsidian-skills)

[[Steph Ango]] (Obsidian CEO) maintains `kepano/obsidian-skills` — five skills that teach Claude Code to operate Obsidian's native formats. Without them, Claude defaults to `[text](file.md)` standard Markdown links, which break the graph view.

| Skill | Purpose |
|-------|---------|
| `obsidian-markdown` | `[[wikilinks]]`, callouts, YAML frontmatter, `![[embeds]]` |
| `obsidian-bases` | `.base` files — Obsidian's native database layer (dynamic filtered tables) |
| `json-canvas` | Canvas JSON schema (infinite whiteboards with nodes, edges, groups) |
| `obsidian-cli` | `obsdmd` CLI — open vaults, run commands, manage daily notes from terminal |
| `defuddle` | Clean content extraction from URLs — strips ads and nav, reduces token usage |

## Connecting an LLM agent to Obsidian

Three paths, with different trade-offs (see [[LLM Wiki Pattern]]):

- **Path 1 (recommended):** Claude Code opens the vault folder directly; uses `kepano/obsidian-skills`. Works offline; Obsidian doesn't need to be open.
- **Path 2:** "Local REST API" plugin exposes `https://127.0.0.1:27124`; an MCP server mediates. Unlocks graph/Dataview/plugin access but requires Obsidian open. ⚠️ Plugin v3.6.x has a data-loss bug ([issue #237](https://github.com/coddingtonbear/obsidian-local-rest-api/issues/237)) where POST can silently overwrite files when metadata cache misses.
- **Path 3:** `AgriciDaniel/claude-obsidian` plugin — pre-packaged skills + commands. Zero-config entry; harder to customize later.

## Practical tip

Configure Settings → Files and links → "Attachment folder path" to a fixed directory (e.g. `raw/assets/`), then bind "Download attachments for current file" to a hotkey. This keeps images local and LLM-accessible instead of relying on external URLs that may break.

## Related

- [[LLM Wiki Pattern]]

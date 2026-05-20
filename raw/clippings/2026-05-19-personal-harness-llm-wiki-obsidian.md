---
title: "Building a Complete Personal Harness: LLM Wiki + Developer's Second Brain in Obsidian"
type: reading
tags: [clippings, llm-wiki, knowledge-management, obsidian, second-brain, vault-architecture]
source-url: "https://medium.com/@roanmonteiro/building-a-complete-personal-harness-llm-wiki-developers-second-brain-in-obsidian-d7b61c7398ff"
author: "[[Roan Brasil Monteiro]]"
published: 2026-05-03
captured-date: 2026-05-19
created: 2026-05-19
updated: 2026-05-19
---

Step-by-step tutorial by [[Roan Brasil Monteiro]] for setting up an Obsidian vault as a personal LLM harness — combining [[Andrej Karpathy]]'s [[LLM Wiki Pattern]] with a developer's "second brain" (ADRs, debriefs, projects). Second article in a trilogy on personal knowledge infrastructure.

## Core contribution: Zone Separation

The article's main architectural idea is [[Zone Separation]]: three physical vault zones with strictly different write rules enforced by `CLAUDE.md`. See that concept page for the full model.

## Three setup paths

| Path | Description | Trade-off |
|------|-------------|-----------|
| **1 — Direct filesystem + skills** | Claude Code opens vault as a directory; uses [[Obsidian]] official skills | Recommended start; portable, offline, debuggable |
| **2 — MCP via Local REST API** | Obsidian plugin exposes `127.0.0.1:27124`; MCP server mediates | Unlocks graph/Dataview/plugin access; requires Obsidian open; v3.6.x has data-loss bug ([issue #237](https://github.com/coddingtonbear/obsidian-local-rest-api/issues/237)) |
| **3 — claude-obsidian plugin** | Pre-packaged plugin with 7 skills + 4 slash commands | Zero-config entry; harder to customize |

## Key patterns introduced

- **`CLAUDE.md` as Zone 0** — "Agent's reptilian brain," read every session. Defines who can write where, wikilink conventions, frontmatter schema, ingestion workflow, and strict limits.
- **Skills vs. slash commands** — Skills are *descriptive* (how we do X), slash commands are *imperative* (do X now). Slash commands carry `allowed-tools` allowlists as a security layer.
- **`allowed-tools` security** — Restricting which Bash subcommands a slash command can call limits damage from malformed instructions or prompt injection.
- **Weekly daily-notes synthesis** — Periodic agent review of `raw/daily/` to identify recurring themes, pending decisions, and concepts worth promoting to wiki; agent presents as a report before creating any files.

## Security: [[Prompt Injection Defense]]

Article has a full section (Part 7) on defense-in-depth against malicious vault content, versioning discipline, and context cost management. See concept page.

## References (from article)

- [[Andrej Karpathy]] — original LLM Wiki gist
- [[Steph Ango]] — `kepano/obsidian-skills`, "file over app" principle

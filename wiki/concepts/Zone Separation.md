---
title: Zone Separation
type: concept
tags: [vault-architecture, knowledge-management, llm-wiki, obsidian, second-brain]
sources:
  - "[[raw/clippings/2026-05-19-personal-harness-llm-wiki-obsidian]]"
created: 2026-05-19
updated: 2026-05-19
---

A vault architecture pattern that assigns each folder a distinct write policy, enforced by `CLAUDE.md`, to prevent the LLM agent from corrupting user-curated sources and prevent the user from accidentally destabilizing the agent-maintained wiki.

## The four zones

| Zone | Path | Owner | Write rule |
|------|------|-------|------------|
| **Zone 0 — Schema** | `CLAUDE.md` | Co-evolved | Read every session; never edited by agent unilaterally |
| **Zone 1 — Raw** | `raw/` | Human | LLM reads only; never edits, renames, or moves |
| **Zone 2 — Wiki** | `wiki/` | LLM | Agent owns; creates/edits/refactors freely |
| **Zone 3 — Dev** | `dev/` | Collaborative | Human drives; agent is co-pilot; accepted ADRs immutable |

## Why physical separation matters

The separation is *functional*, not aesthetic. When `CLAUDE.md` encodes the rules, the agent has an unambiguous policy for ambiguous requests ("organize that papers folder" → asks before touching `raw/`). Without the policy, gradual drift corrupts sources: a well-meaning edit to a clipped article erases the ground truth the wiki was synthesized from.

## Relation to LLM Wiki Pattern

Zone Separation is the physical implementation layer of [[LLM Wiki Pattern]]'s three-layer model. The LLM Wiki Pattern defines the conceptual roles (raw sources / compiled wiki / schema); Zone Separation defines the file-system boundaries that make those roles durable across sessions.

## Zone 3 special rules

`dev/` is the zone that differentiates developer vaults from pure PKM vaults. Key rule: **accepted ADRs are immutable** (status can change to `superseded`, but content is never rewritten). If the agent finds a contradiction between two ADRs, it reports rather than resolves unilaterally.

## CLAUDE.md as enforcement mechanism

`CLAUDE.md` (Zone 0) is read at every session start. Its zone rules become the agent's operational policy. Combined with `allowed-tools` in slash commands, which limit which filesystem operations are available, the enforcement is layered: declarative policy in `CLAUDE.md` + tool allowlists in commands.

See also: [[Prompt Injection Defense]], [[LLM Wiki Pattern]], [[Obsidian]]

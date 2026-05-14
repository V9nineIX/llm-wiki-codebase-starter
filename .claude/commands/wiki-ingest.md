---
description: Ingest a URL or file into the vault, distilling to the wiki
argument-hint: <URL | file path>
allowed-tools: Bash(curl:*), Bash(cat:*), Bash(ls:*), WebFetch
---

I'll ingest **$ARGUMENTS** into the vault, following the ingestion workflow
defined in CLAUDE.md.

Execute in order:

1. **Determine source type:**
   - URL → use `defuddle` skill to extract clean content
   - Local file → read directly with `cat`
   - If ambiguous, ask.

2. **Save raw content:**
   - Path: `raw/clippings/YYYY-MM-DD-slug.md`
   - Slug derived from title (kebab-case, max 60 chars)
   - Frontmatter includes: source-url, captured-date, title, author (if inferable)

3. **Analysis:**
   - Identify 3-7 key concepts
   - Identify 1-3 entities (people/companies)
   - Check wiki/concepts/ and wiki/entities/ for pre-existing

4. **Present plan** BEFORE creating/editing pages:
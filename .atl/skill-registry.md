# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| Building web components, pages, UI artifacts | frontend-design | /Users/darell/.claude/skills/frontend-design/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | /Users/darell/.claude/skills/go-testing/SKILL.md |
| Automatically fetch latest library/framework documentation | context7-auto-research | /Users/darell/.claude/skills/context7-auto-research/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### frontend-design
- No generic fonts (Inter, Roboto, Arial); choose distinctive, characterful typefaces
- Commit to cohesive aesthetic direction; no timid evenly-distributed palettes
- CSS variables for consistency; dominant colors with sharp accents
- Animations: prioritize CSS-only; use Motion for React when available
- High-impact page load with staggered reveals over scattered micro-interactions
- Unexpected layouts, asymmetry, overlap, diagonal flow, generous negative space
- NEVER use purple gradients on white, predictable layouts, or cookie-cutter design

### go-testing
- Table-driven tests for multiple test cases (standard Go pattern)
- Use teatest for Bubbletea TUI component testing
- Golden file testing for expected output comparisons
- Coverage: `go test -cover` (built-in)

### context7-auto-research
- Use `context7_resolve-library-id` before `context7_query-docs`
- Do not call context7-query-docs more than 3 times per question
- If no good matches after 3 calls, use best result available

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | /Users/darell/.config/opencode/AGENTS.md | Global agent instructions |

No project-level convention files detected (empty project).
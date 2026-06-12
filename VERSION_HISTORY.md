# VERSION_HISTORY

This is the global version history for Grammar Tree Coach. Current and archived static app versions link back to this single file so releases share one source of truth.

## v2.0.1 — 2026-06-12 — Current

Semantic version: `MAJOR.MINOR.PATCH`

### Changed
- Replaced runtime generic learning-card generation with reviewed profile-based learning cards for every Grammar Map topic.
- Strengthened validation so low-quality factory phrases, unrelated quiz distractors, duplicate ids, orphan cards, missing cards, and incomplete examples are reported.
- Added `tools/validate-content.js` so reviewed-card checks can run before release.
- Added Grammar Map card-status badges and expanded the Parent/Teacher content quality report.
- Updated the analyser wording for phrasal-verb particles to avoid overgeneralising them as ordinary adverbs.

### Archived previous version
- `archive/v2.0.0/` preserves the strict-schema baseline before the reviewed-card content-quality patch.

## v2.0.0 — 2026-06-12 — Archived

Semantic version: `MAJOR.MINOR.PATCH`

### Added
- Strict learning-card schema with ids, category, meanings, examples, non-examples, spotting guidance, mistakes, mini quizzes, teacher prompts, age level, and status.
- Content quality validation at startup for missing fields, missing cards, cards needing review, and banned placeholder phrases.
- Parent/Teacher Mode content quality report showing total cards, complete cards, missing cards, cards needing review, and banned placeholder phrase findings.
- Complete topic-specific learning cards for all Grammar Map topics, plus a dedicated Sentence card.

### Changed
- Replaced generic fallback learning-card content with explicit missing-card warnings when a card is absent.
- Replaced the Gender card with a modern-English explanation of natural gender, pronoun choice, and the difference from grammatical gender in other languages.
- Improved glossary schema and glossary entries so each entry uses childMeaning, formalMeaning, example, and commonMistake.
- Version selector marked v2.0.0 as current, kept v1.1.0 as an archived release, and moved classroom packs to planned v2.1.0.

### Removed
- Removed poor fallback wording such as generic grammar-tree placeholder text from current and archived data files.

### Archived previous version
- `archive/v1.1.0/` preserves the examples/analyser/printable-tree release before the v2.0.0 content-quality release.

## v1.1.0 — 2026-06-12 — Archived

Semantic version: `MAJOR.MINOR.PATCH`

### Added
- More child-friendly grammar examples across the Learning Path, Practice Studio, Grammar Map learning cards, and glossary.
- Highlighted key grammar word(s) in example sentences so pupils can immediately see the target feature.
- Expanded Sentence Analyser examples with sentence patterns, phrase/clause jobs, word-level jobs, and spotting clues.
- Clearer demonstratives teaching: separate explanations for demonstrative determiners and demonstrative pronouns.
- Printable Grammar Tree button and print stylesheet for classroom handouts.

### Changed
- Version selector marked v1.1.0 as current, kept v1.0.0 as an archived release, and moved classroom packs to planned v1.2.0.
- Learning Path examples used complete example sentences rather than isolated fragments.

### Archived previous version
- `archive/v1.0.0/` preserves the first complete static app release before the v1.1.0 improvements.

## v1.0.0 — 2026-06-12 — Archived

Semantic version: `MAJOR.MINOR.PATCH`

### Added
- Complete static HTML/CSS/vanilla JavaScript educational app for ages 9–12.
- Home Dashboard, Grammar Map, Learning Path, Sentence Analyser, Practice Studio, Glossary, Progress Dashboard, and Parent/Teacher Notes.
- Local progress tracking with `localStorage` only.
- Version selector with current, archived, and future version states.
- Archive folder for the previous repository starter snapshot.

### Archived previous version
- `archive/v0.0.0/` records the pre-app repository starter state and links back to this global history.

## v0.0.0 — 2026-06-12 — Archived

### Notes
- Starter repository contained only a minimal README and no runnable Grammar Tree Coach app.
- Preserved as the previous version before the first full educational release.

## v2.1.0 — Future

### Planned
- Printable classroom worksheets beyond the grammar tree.
- Optional teacher-authored custom quiz packs stored in browser storage.
- More paragraph-level analyser passages.

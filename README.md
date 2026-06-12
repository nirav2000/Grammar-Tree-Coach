# Grammar Tree Coach

Grammar Tree Coach is a calm, child-friendly static web app for pupils aged 9–12. It teaches grammar as a hierarchy:

**Letters → Words → Phrases → Clauses → Sentences → Paragraphs → Texts**

The central teaching idea is repeated throughout the app:

- Words have classes.
- Phrases are groups of words.
- Clauses contain a verb.
- Sentences are complete ideas.
- Grammar labels explain jobs inside writing.

## What the app includes

- **Home Dashboard** with quick navigation and a global version history preview.
- **Grammar Map** with an expandable/collapsible grammar tree and learning cards.
- **Learning Path** with eight levels, examples, quizzes, and score tracking.
- **Sentence Analyser** with clickable words, word classes, phrase groups, and explanations.
- **Practice Studio** with tap, build, expand, fix, and zoom activities.
- **Glossary** with searchable child-friendly and formal definitions.
- **Progress Dashboard** using browser `localStorage` only.
- **Parent/Teacher Notes** toggle with teaching tips and prompts.
- **Version selector** for current, archived, and planned future versions.

## Files

- `index.html` — app shell and all major sections.
- `styles.css` — responsive, accessible, child-friendly styling.
- `app.js` — navigation, rendering, quiz feedback, and localStorage progress.
- `grammar-data.js` — app version, version registry, grammar tree, lessons, analyser data, practice data, and glossary content.
- `VERSION_HISTORY.md` — global semantic version history.
- `archive/v0.0.0/` — archived previous repository starter version.

## Run locally

No build step is required. Use any static file server from the repository root, for example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly in a browser, although the version history preview uses `fetch()` and works best through a local server or GitHub Pages.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Choose **Deploy from a branch**.
5. Select the `main` branch and the repository root.
6. Save. GitHub Pages will publish the static app.

## Version history

The current app version is **v1.1.0**. See [`VERSION_HISTORY.md`](VERSION_HISTORY.md) for the global history shared by current and archived app versions.

When releasing a new version:

1. Follow semantic versioning: `MAJOR.MINOR.PATCH`.
2. Move or copy the previous release into `archive/<version>/`.
3. Update `APP_VERSION` and `VERSION_REGISTRY` in `grammar-data.js`.
4. Update visible examples so each one is a complete example sentence with the key grammar word(s) highlighted.
5. Update `VERSION_HISTORY.md` with release notes and archive notes.
6. Commit and push the release.

## Future improvements

- Printable worksheets for classrooms beyond the printable grammar tree.
- More paragraph-level sentence analyser passages.
- Teacher-created custom quizzes stored locally in the browser.
- More accessibility preferences such as dyslexia-friendly font mode.
- Export/import progress as a local JSON file.

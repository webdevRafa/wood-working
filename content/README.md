# Guide corpus

`guides.json` is generated from the 500-item roadmap in `PROJECT_BLUEPRINT.md` and then improved through editorial review.

Every generated record intentionally begins as:

- `status: draft`
- `indexStatus: noindex`
- `evidenceStatus: brief`

Generation creates a substantial, topic-aware editorial draft—not permission to publish. Before a guide can move to `published` and `index`, it needs original evidence, primary sources, verified measurements/cut lists where applicable, human technical review, and qualified safety review when the subject requires it.

Regenerate a batch with:

```bash
node scripts/generate-content.mjs --limit=100
```

Validate a batch with:

```bash
node scripts/validate-content.mjs content/guides.json --expected=100
```

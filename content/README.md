# Guide corpus

`guides.json` is generated from the 500-item roadmap in `PROJECT_BLUEPRINT.md` and then improved through editorial review.

Every generated record intentionally begins as:

- `status: draft`
- `indexStatus: index`
- `evidenceStatus: brief`

Generation creates a substantial, topic-aware public editorial preview—not permission to label it published or reviewed. Previews are crawlable so every canonical guide path can participate in discovery, while their draft and evidence labels remain visible. Before a guide can move to `published`, it still needs original evidence, primary sources, verified measurements/cut lists where applicable, human technical review, and qualified safety review when the subject requires it.

Regenerate a batch with:

```bash
node scripts/generate-content.mjs --limit=100
```

Validate a batch with:

```bash
node scripts/validate-content.mjs content/guides.json --expected=100
```

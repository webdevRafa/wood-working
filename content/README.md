# Guide corpus

`guides.json` is generated from the 500-item roadmap in `PROJECT_BLUEPRINT.md` and then improved through editorial review.

Every generated record begins as:

- `status: review`
- `indexStatus: index`
- `evidenceStatus: brief`

Generation creates reader-facing public guidance with topic-specific sections, literal title fulfillment, concrete project plans, buying criteria, safety checks, and contextual related reading. Internal workflow fields are not rendered as article copy. First-hand testing claims remain prohibited unless the model, method, date, material, results, and limitations are documented.

Run `npm run content:audit` before import. The audit rejects internal instructions, repeated public paragraphs, unsupported experience claims, missing project plans, incomplete numbered or budget promises, weak buying criteria, and broken related-guide relationships.

Regenerate a batch with:

```bash
node scripts/generate-content.mjs --limit=100
```

Validate a batch with:

```bash
node scripts/validate-content.mjs content/guides.json --expected=100
```

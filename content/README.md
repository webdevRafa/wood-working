# Guide corpus

`guides.json` contains the 500-topic Built True Workshop roadmap. Accessibility and indexability are deliberately separate:

- `status: published` + `indexStatus: index` means the guide passed the current evidence, safety, title-promise, sourcing, and editorial gates.
- `status: review` + `indexStatus: noindex` means the URL remains openable as a clearly labeled working draft, but it is excluded from the sitemap and search index.
- `evidenceStatus: research-reviewed` means the central guidance is traceable to the sources shown on the page. It does not mean hands-on testing.
- `evidenceStatus: brief` means the page is not publication-ready.

This separation prevents a large generated roadmap from being mistaken for 500 independently verified articles. It also keeps every planned URL available for continued editing without presenting unreviewed dimensions, loads, product facts, or safety procedures as finished guidance.

Use the curated source records in `src/data/guides.ts` for the reviewed launch set, then apply them to the corpus with:

```bash
npm run content:curate-launch
```

Run the gates before import:

```bash
npm run content:audit
npm run content:validate
```

The audit rejects unsupported first-hand claims, internal editorial residue, indexable evidence briefs, missing sources, incomplete title promises, broken related-guide relationships, and repeated public paragraphs. It intentionally does not enforce a target word count; completeness and reader outcome matter more than padding.

Only set a working draft to `published` after its central technical claims have current sources, the procedure has topic-specific safety controls, dimensions and calculations close, the title promise is fulfilled, limitations are visible, and the page adds value beyond a reusable template.

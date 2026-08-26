# Guide corpus

`guides.json` contains the 500-guide Built True Workshop production library. Accessibility and indexability remain separate so a future unfinished record cannot enter search accidentally:

- `status: published` + `indexStatus: index` means the guide passed the current evidence, safety, title-promise, sourcing, and editorial gates.
- `status: review` + `indexStatus: noindex` means the URL remains openable as a clearly labeled working draft, but it is excluded from the sitemap and search index.
- `evidenceStatus: research-reviewed` means the central guidance is traceable to the sources shown on the page. It does not mean hands-on testing.
- `evidenceStatus: brief` means the page is not publication-ready.

The current corpus contains 500 `published`, `index`, `research-reviewed` records. “Research-reviewed” means the central guidance is traceable to the listed sources and has passed the automated editorial gates; it does not claim that Built True Workshop physically tested every tool, finish, joint, or plan.

Rebuild the production corpus from the topic-aware editorial and project-plan rules with:

```bash
npm run content:publish-production
```

Run the gates before import:

```bash
npm run content:audit
npm run content:validate
```

The audit rejects unsupported first-hand claims, internal editorial residue, indexable evidence briefs, missing sources, incomplete title promises, broken related-guide relationships, and repeated public paragraphs. It intentionally does not enforce a target word count; completeness and reader outcome matter more than padding.

Only set a future working draft to `published` after its central technical claims have current sources, the procedure has topic-specific safety controls, dimensions and calculations close, the title promise is fulfilled, limitations are visible, and the page adds value beyond a reusable template.

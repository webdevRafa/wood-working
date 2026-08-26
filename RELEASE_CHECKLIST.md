# Built True Workshop release checklist

## Current handoff state

- The React/Vite application, original brand assets, Firebase client integration, SEO prerenderer, security rules, and content pipeline are committed to `main`.
- Firestore contains 500 full guide records and 500 lightweight discovery records.
- All 500 guides are `published`, `index`, and `evidenceStatus: research-reviewed`.
- The complete corpus passes the content audit: title promises, sources, project plans, buying criteria, safety context, related paths, and duplicate public paragraphs are checked before import.
- The production build emits 500 prerendered guide routes plus independent static JSON fallbacks, so article access and crawlable HTML do not depend on a successful client-side Firestore request.

## Firebase console setup

1. In Authentication → Sign-in method, enable Google.
2. In Authentication → Settings → Authorized domains, add the final Vercel domain and any custom domain.
3. Give the deployment identity permission to use project services and manage Firebase rules/indexes. The current identity is missing `serviceusage.services.use` (normally provided by **Service Usage Consumer**).
4. Deploy the committed rules and indexes:

   ```bash
   npx firebase-tools deploy --only firestore:rules,firestore:indexes,storage --project wood-working-c2184
   ```

5. Confirm that an unsigned visitor can read `review` and `published` guides, cannot read `draft` records, and sees the correct evidence label and robots directive on each state.

## Vercel setup

Import the seven `VITE_FIREBASE_*` values from `.env.local` into Preview and Production. Also set:

```text
VITE_SITE_URL=https://your-production-domain.example
```

Do not upload the Firebase Admin service-account JSON to Vercel and do not expose any admin credential through a `VITE_` variable.

Use these commands as the Vercel defaults:

```text
Build command: npm run build
Output directory: dist
```

## Publishing a guide

Before changing a record to `published` and `index`, complete the quality gate in `PROJECT_BLUEPRINT.md`: verify measurements and cut lists, add original evidence and primary sources, conduct technical and safety review where required, confirm affiliate claims and links, and proofread the rendered page.

Then regenerate or edit `content/guides.json`, validate it, and run the idempotent importer. The importer updates both the full guide and its lightweight discovery record without deleting documents.

```bash
npm run content:publish-production
npm run content:audit
npm run content:validate
npm run content:import:dry
npm run content:import
npm run content:verify
```

After publishing, rebuild Vercel so the sitemap and prerendered SEO pages include the complete reviewed, indexable library.

# Built True Workshop

Practical woodworking projects, honest tool guidance, and shop-building resources. The application uses Vite, React, TypeScript, Tailwind CSS, Firebase, and Vercel.

## Local setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide the Firebase web-app values. `.env.local` is explicitly ignored by Git.

## Checks

```bash
npm run lint
npm run build
```

The production build prerenders public routes, adds page metadata and structured data, and writes `dist/sitemap.xml` plus `dist/robots.txt`. On Vercel it uses `VERCEL_PROJECT_PRODUCTION_URL`; a custom canonical origin can be supplied as `VITE_SITE_URL`.

## Content workflow

The long-term source is `content/guides.json`. All bulk-created records default to `draft` and `noindex` until they pass the editorial quality gate in `PROJECT_BLUEPRINT.md`.

```bash
npm run content:validate
npm run content:import:dry
```

The write command requires `FIREBASE_SERVICE_ACCOUNT_PATH` to point to a credential file outside the repository:

```bash
npm run content:import
```

The import is idempotent by stable guide ID, uses merge semantics, records an import receipt, and never deletes Firestore documents. It writes full documents to `guides` and lightweight discovery records to `guideIndex`; the React app automatically merges published Firestore content into its search, hubs, finder, saved page, and dynamic guide routes.

## Firebase security

Firestore and Storage rules are defined in `firestore.rules` and `storage.rules`. Deploy them with an identity that has Firebase Rules and Service Usage permissions. Client reads of guides and discovery records are limited to `status = published`; personal saved guides are limited to the signed-in owner.

The Firebase Admin service-account file must never be copied into this repository, bundled into the browser, or added to Vercel as a `VITE_` variable.

## Strategy

See `PROJECT_BLUEPRINT.md` for the brand system, page wireframes, SEO architecture, editorial quality gate, Firestore model, launch phases, and 500-page content backlog.

See `RELEASE_CHECKLIST.md` for the remaining Firebase Console and Vercel launch steps, plus the guide publication workflow.

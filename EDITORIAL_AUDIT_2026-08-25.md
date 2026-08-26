# Built True Workshop editorial, woodworking, and SEO audit

Date: 2026-08-25  
Scope: site copy, guide corpus, publication states, evidence labels, crawl directives, structured data, affiliate disclosure, and primary conversion paths.

## Reference handling

The supplied woodworking document was used as a technical and editorial reference, not as authority to override the project request or exact tool/product instructions. The supplied SEO and marketing file is a summary/manifest that points to a separate sandbox download that was not included in the attachment. Its listed safeguards were applied together with current primary guidance from Google Search Central and the FTC.

## Verdict

Revise before treating the complete 500-page roadmap as published.

The site architecture, canonical paths, prerendering, images, navigation, affiliate disclosure placement, and openable Firestore routes were strong. The central blocker was publication integrity: 500 pages were indexable while every record still carried `status: review`, `evidenceStatus: brief`, empty sources, and no reviewers. Many pages were expanded from reusable templates, and some safety-sensitive project titles received generic dimensions rather than validated designs.

That combination creates three material risks:

1. Readers can mistake preliminary dimensions and procedures for validated woodworking instruction.
2. The site can imply research or expertise it has not documented.
3. Large numbers of substantially automated pages can resemble scaled content created for search rather than distinctive reader value.

## P0 corrections applied

- Preserved all 500 URLs as openable pages while separating accessibility from indexability.
- Published and indexed an eight-guide source-backed launch set.
- Marked the remaining 492 pages as accessible working drafts with `noindex,follow` and removed them from the sitemap.
- Added a prominent evidence-status panel to every guide.
- Added visible source lists and research limits to published guides.
- Removed the inert email form and replaced it with an immediate, no-email-gate guide CTA.
- Removed public privacy copy that described a newsletter collection path that did not exist.
- Added an About page that explains authorship, automated-draft limits, evidence labels, and commercial independence without inventing a woodworker biography.
- Added a functioning public correction path through GitHub issues.
- Stopped Firestore rules and client queries from treating `draft` documents as public.

## P1 technical and SEO corrections applied

- Updated the build audit so an evidence brief cannot be indexable and a published guide cannot lack sources or a reviewer.
- Removed the artificial 750-word publication threshold; the gate now checks completeness instead of encouraging padding.
- Added `citation` data and breadcrumb structured data to guide pages.
- Kept self-referential canonicals and prerendered HTML for all guide URLs.
- Limited sitemap membership to reviewed, indexable guides and public hubs.
- Added automated checks for correct `index,follow` versus `noindex,follow` behavior.
- Made source-backed and working-draft states visible on cards and library counts.

## Current launch set

- Woodworking for Absolute Beginners
- The First 10 Woodworking Tools to Buy
- Board-Foot Calculator and Lumber Buying Guide
- Table Saw Basics
- Trim Router vs. Full-Size Router
- Jointer vs. Planer
- Wood Sandpaper Grits Explained
- Beginner Coffee Table With a Lower Shelf

These guides are labeled research-reviewed, cite at least two authoritative sources, avoid hands-on claims, and link only to other reviewed launch guides in their related-reading blocks.

## Remaining editorial program

The 492 working drafts should move to `published` in focused clusters, not as a bulk status change. For each cluster:

1. Define the exact reader job and primary intent.
2. Build a claim ledger and verify central claims from primary sources.
3. Replace generic procedures with topic-specific mechanisms, decisions, and failure checks.
4. Validate dimensions, unit chains, movement allowances, hardware geometry, and load paths.
5. Put safety controls next to the hazardous step.
6. Remove or redesign safety-critical seating, children's furniture, climbing, structural, electrical, and wall-mounted plans unless a verified design basis exists.
7. Add original value such as a calculation, diagram, documented test, decision matrix, or failure analysis.
8. Add actual merchant links only after product model, availability, compatibility, disclosure, and `rel="sponsored"` checks are complete.
9. Run the publication gates, then change the individual page to `published` and `index`.

The strongest next cluster is beginner foundations because it supports every later project and tool decision. Safety-critical furniture and product-model roundups should remain later in the queue until the required design validation or current product research exists.

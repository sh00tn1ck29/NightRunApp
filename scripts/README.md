Run `npm run optimize:assets` after adding or replacing JPEG photos or changing Japanese text. Commit the generated files in `src/shared/assets` and `src/app/styles/japanese-fonts.css` together with the source changes.

Original photos remain available for regeneration. Vite resolves their imports to the largest generated WebP; `ResponsiveImage` supplies smaller variants using `srcSet` and `sizes`. Give card images an appropriate `sizes` value when adding new layouts.

Run `npm test`, `npm run lint`, and `npm run build` before committing. Route tests check landmarks, focus and titles; gallery tests cover loading, failed requests, retry, stale responses and unmount cleanup. Animation tests require a real browser for visual verification.

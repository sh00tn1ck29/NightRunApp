# TOUGE SPIRIT

A responsive SPA built with React and TypeScript to explore Japanese performance cars and the culture behind them. The experience combines a custom Blender animation controlled by scrolling, an interactive machine archive, and editorial stories about JDM history.

---

### Key Features

- **Scroll-Controlled Hero:** A custom AE86 animation rendered in Blender, synchronized with scrolling through GSAP ScrollTrigger.
- **Animated Telemetry:** Speed, RPM, a tachometer needle, and a progress indicator linked to the hero animation.
- **Machine Archive:** Six JDM icons with shared vehicle data, brand filters, instant search, result counts, and a resettable empty state.
- **Interactive Showcase:** Machine selection on the home page synchronized with URL query parameters.
- **Culture Page:** Editorial sections covering JDM origins, key milestones, Initial D, touge, tuning, and the community’s global legacy.
- **Motion & Interaction:** Scroll reveals, image zoom, and pointer-driven 3D tilt effects, with reduced-motion support for entrance and hover animations.
- **Responsive UI:** Adaptive layouts, mobile video framing, shared navigation, and reusable footer variants.

---

### Tech Stack

- **Framework & Language:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Animation:** [GSAP & ScrollTrigger](https://gsap.com/), [GSAP React](https://gsap.com/resources/React/)
- **Styling:** [Sass (SCSS)](https://sass-lang.com/), [BEM](https://en.bem.info/methodology/)
- **Architecture:** [Feature-Sliced Design](https://feature-sliced.design/)
- **Build & Quality:** [Vite](https://vite.dev/), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- **3D & Video Assets:** [Blender](https://www.blender.org/), [FFmpeg](https://ffmpeg.org/)

---

### Project Structure

```text
src/
  app/       # Application setup, routing, fonts, and global styles
  pages/     # Home, Legends, Culture, and Not Found pages
  widgets/   # Header, footer, showcase, archive, and other page blocks
  entities/  # Shared machine data, types, images, and photo credits
```

- **Layer Dependencies:** Modules import from lower layers: `app → pages → widgets → entities`.
- **Public API:** Cross-slice imports use each slice’s `index.ts`.
- **Local Logic:** Animation and filtering hooks live in `model`; components and SCSS live in `ui`.
- **Shared Data:** The home showcase and Legends archive use the same local machine catalog. No backend or vehicle API is required.

---

### Breakpoint Management

- **Desktop:** Full layouts, with section-specific adjustments around `1024px` and `1100px`.
- **Tablet:** Intermediate layouts from `768px`, with adjustments based on each section.
- **Mobile:** Below `768px`.
- **Portrait Video:** Dedicated framing below `1024px` in portrait orientation.

---

### Getting Started

```sh
npm install
npm run dev
```

```sh
npm run build    # Type-check and create the production build
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

Routes: `/`, `/legends`, and `/culture`. Unknown routes display the Not Found page.

For deployment, configure the host to serve `index.html` for client-side routes so direct links and page refreshes work correctly.

---

### Media Credits

Vehicle and editorial image credits are stored alongside their assets or displayed below the images. Additional source details are listed in `src/pages/culture/assets/SOURCES.md` and `src/widgets/culture/assets/SOURCES.md`.

---

### Author

- **Maksym Shavryhin** — _Main Developer_ ([GitHub Profile](https://github.com/sh00tn1ck29))

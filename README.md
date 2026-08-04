# ALEJANDRO UMILA — Portfolio

A single-page portfolio built with React, themed after the game OMORI.

Three sections — **About Me**, **Projects**, **Contact Me** — on one scrolling
page, navigated by three White Space doors. The lightbulb in the hero toggles
the whole site between White Space and Black Space; the choice is remembered
between visits.

## Running it

```bash
npm install
```

```bash
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build (needed to test the PWA) |
| `npm run lint` | ESLint |
| `npm run icons` | Regenerate the PWA icon PNGs from the pixel sprite in `scripts/generate-icons.mjs` |

## Built with

React 19, Vite 8, Tailwind CSS v4, React Router 7, `vite-plugin-pwa`.

## Placeholder content

The bio, project entries, and all images are placeholders. To replace them:

- Bio — `BIO` in `src/sections/AboutMe.jsx`
- Projects — `src/data/projects.js`
- Contact links — `src/data/links.js`
- Images — swap the `<Placeholder>` components in `src/sections/AboutMe.jsx`
  and `src/components/ProjectCard.jsx` for real `<img>` tags

## How the theming works

Every color in the site resolves to two CSS custom properties, `--ink` and
`--void`, declared in `src/index.css`. `[data-space='black']` swaps them, so
the two spaces are a genuine inversion rather than two separately maintained
palettes. Components use only `text-ink`, `bg-void`, `border-ink`, and
`text-muted` — never a hardcoded color.

`src/index.css` also contains `@source not '../docs'`. Tailwind v4 scans the
whole project by default, which would otherwise pull the class names quoted in
the design documents into the production bundle.

## A note on the React Router version

`npm audit` reports one high-severity advisory against `react-router@7.18.2`
(RSC Mode CSRF Bypass). It is **not reachable from this app** — it affects
React Router's RSC server mode, and this is a static client-only SPA using
`BrowserRouter` with two routes and no actions or loaders.

Do not run `npm audit fix --force`. It downgrades to `react-router@7.11.0`,
which trades this one inapplicable advisory for fourteen real ones, including
RCE and XSS.

The clean fix is React Router 8, which requires Node >= 22.22.0. This project
was built on Node 22.13.1, so npm resolved to the 7.x line instead. Upgrading
Node and then running `npm install react-router@^8` clears the advisory.

## Deployment

Deployed on Vercel. `vercel.json` sets two things that the defaults get wrong
for this project:

- `outputDirectory: "dist"` — Vite builds to `dist`, but the project was
  configured to look for `build`, so deploys failed with "No Output Directory
  named build found" even though the build itself succeeded.
- A catch-all rewrite to `/index.html`, so React Router's routes survive a
  direct hit or a refresh. Without it, anything other than `/` would 404 at the
  CDN before React ever loaded. Vercel matches real files first, so the hashed
  assets, `sw.js` and the manifest are unaffected.

## Assets

`src/assets/` contains the OMORI game fonts (`OMORI_GAME2.ttf` for dialogue,
`OMORI_GAME.ttf` for the jagged text), the animated lightbulb, the pointing
hand and the red-hands animation. These are game assets, included here for a
student coursework project — they are not covered by this repository's licence
and should not be reused elsewhere.

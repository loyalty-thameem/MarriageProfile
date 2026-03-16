# Deployment

## Vercel (GitHub Auto-Deploy)

This project is a Vite app. Vercel will deploy it as a static site from `dist/`.

1. Push this repo to GitHub.
2. In Vercel: **New Project** -> **Import Git Repository** -> select this repo.
3. Configure:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy.

After the repo is connected:
- Every push to `main` triggers a Production deployment.
- Every pull request triggers a Preview deployment.

Notes:
- `vite.config.js` uses base `/` by default (correct for Vercel).
- GitHub Pages build uses `npm run build:gh` to set the correct `base` path.


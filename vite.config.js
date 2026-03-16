import { defineConfig } from "vite";

function normalizeBasePath(basePath) {
  if (!basePath) return "/";
  let normalized = basePath.trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (!normalized.endsWith("/")) normalized = `${normalized}/`;
  return normalized;
}

function githubPagesBase() {
  // Allow overriding base explicitly (useful for local GH Pages builds).
  if (process.env.GH_PAGES_BASE) return normalizeBasePath(process.env.GH_PAGES_BASE);

  // In GitHub Actions, derive `/<repo>/` automatically.
  const repo = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
  if (repo) return `/${repo}/`;

  // Fallback: keep the site functional even if repo env is missing.
  return "/MarriageProfile/";
}

export default defineConfig(({ mode }) => ({
  // Default build/dev is root-based, which is what Vercel expects.
  // GitHub Pages project sites need `/<repo>/` as the base.
  base: mode === "github" ? githubPagesBase() : "/"
}));

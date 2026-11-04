import { execSync } from 'node:child_process';

// Date of the latest commit, used as the site-wide "last modified" value for the sitemap and
// structured data. Works with a shallow clone (the deploy workflow) because it only needs HEAD.
// Returns undefined when git is unavailable, so builds never fail because of it.
export function gitLastModified() {
  try {
    const out = execSync('git log -1 --format=%cI', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

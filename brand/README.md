# The Standards.gg layer

This repository is the Standards.gg fork of [wowsims/forever](https://github.com/wowsims/forever), the open-source
(MIT) World of Warcraft: Forever simulator. The fork hosts the same site under the Standards.gg name and feeds fixes
back upstream. Everything that differs from upstream is this layer, kept to the files below so that
`git merge upstream/master` meets as few edits of ours as possible.

## The files

Ours alone (new files, never in conflict):

| File                                            | What it is                                                                                                                                                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/sim/constants/brand.ts`                     | Every name, link and image of the site (`BRAND`), the upstream credit (`UPSTREAM`), and the strings that name the site (`BRAND_STRINGS`: landing title and description, spec header label, tour welcome) |
| `ui/app/brand/BrandMark.tsx`                    | The mark, name and tagline in the landing header and footer                                                                                                                                              |
| `ui/app/brand/BrandFooter.tsx`                  | The landing footer: site links, the WoWSims credit with its licence and source, the legal line. Nothing fetched                                                                                          |
| `tools/vite/brand_html.mts`                     | Rewrites the page heads at build time: title, description, canonical and social tags, icons; drops Google Analytics, the wowsims.com footer stylesheet and the schema.org block                          |
| `assets/img/brand/`                             | The s.gg mark (SVG from the standards.gg theme), its 512 and 180 px renders and the favicon                                                                                                              |
| `brand/vercel.json`, `brand/sync.sh`, this file | Hosting config and the update routine                                                                                                                                                                    |

Upstream files with an edit of ours (each a few lines, a merge conflict here is small):

| File                                    | The edit                                                |
| --------------------------------------- | ------------------------------------------------------- |
| `vite.config.mts`                       | imports and registers `brandHtml()` after `specPages()` |
| `ui/i18n/config.ts`                     | lays `BRAND_STRINGS` over the English locale after init |
| `ui/app/landing/LandingHeader.tsx`      | `BrandMark` in place of `LandingBrand`                  |
| `ui/app/landing/LandingPage.tsx`        | `BrandFooter` in place of `LandingFooter`               |
| `ui/app/landing/LandingHeader.test.tsx` | the brand link test expects `BRAND.url`                 |
| `ui/sim/constants/other.ts`             | `DISCORD_URL` and `GITHUB_ORG_URL` read `BRAND`         |

Untouched on purpose: `ui/index.html` and `ui/index_template.html` (the plugin rewrites them), the locale files, the
spec pages, and `LandingBrand`/`LandingFooter` (still upstream's; only no longer rendered). The spec pages' header
keeps upstream's GitHub icon on `wowsims/forever`, and the footer credits WoWSims on every landing page: the MIT
licence asks that the notice stays with the code, and a visible link back is the fork's own rule.

What the site does not do: no Google Analytics (`gtag` is a no-op), no fetch of `wowsims.com/versions.json`, no issue
links in the toolbar (`VITE_GITHUB_REPOSITORY` is unset; set `GITHUB_REPOSITORY=wowsims/forever` at build time to send
reports upstream, or the fork's name once its Issues tab is on).

## Hosting

Static files only, no server and no per-request compute: that is the cost gate every Standards.gg tool keeps, and
the sim needs nothing else. The build writes `dist/forever/` (the base path is `/forever/`, like upstream's GitHub
Pages), and `dist/` is what gets deployed, with `brand/vercel.json` copied in as `dist/vercel.json`:

- `/` redirects to `/forever/`; bare spec paths get their trailing slash (Vercel `trailingSlash`), which the
  dev server and GitHub Pages do too.
- `/forever/bundle/*` is content-hashed and cached for a year; `lib.wasm.gz` is served as `application/gzip` and
  the worker inflates it itself (it sniffs the magic bytes, so a host that inflates it first is fine too).

Vercel (account `standards-gg`, like forevertalent and forevercodex): `vercel link` once from `dist/` (project
`foreversim`), then `vercel deploy --prod` from `dist/` on every sync; attach `sim.standards.gg` in the project's
Domains tab and add the CNAME to `cname.vercel-dns.com` in the Cloudflare zone (DNS only, no proxy, as the siblings
do). The Hobby plan serves this within its limits: the whole site is ~25 MB on disk (the WASM engine 5.4 MB gzipped,
the item database 7 MB), and nothing runs server-side. Cloudflare Pages (`wrangler pages deploy dist`) serves the same
tree with no bandwidth cap if Vercel's ever binds; Pages projects also keep a `_redirects`/`_headers` pair in place of
`vercel.json`.

`BRAND.origin` in `ui/sim/constants/brand.ts` is the host the canonical and social-preview links name; change it with
the domain.

GitHub Actions stay disabled on the fork: upstream's workflows release, deploy to `wowsims/pages-deploy` and update
the database on a schedule and on every push to master, none of which may run under this account. The build and the
deploy run from the working copy.

## Updating from upstream

`brand/sync.sh` runs the routine; `--no-deploy` stops before the deploy and the push.

1. `git fetch upstream master && git merge upstream/master`. A conflict is in one of the six edited files above;
   keep both sides' intent, commit, run the script again.
2. `npm ci --ignore-scripts`, then `make dist/forever/.dirstamp` (protoc, protoc-gen-go, Go and Node on the PATH as
   the project note lists them).
3. The layer's gates: `npx vitest run ui/app/brand ui/app/landing`, and no `index.html` under `dist/forever` may
   still name `www.wowsims.com` (the plugin fails the build itself when a tag it rewrites is gone from a template).
4. `cp brand/vercel.json dist/ && (cd dist && vercel deploy --prod --yes)`, then `git push origin master`.

Commits are made as `standards-gg <329816702+standards-gg@users.noreply.github.com>` (the script refuses another
author) and carry no agent trailers, as upstream's conventions ask too.

# Isoline website

Static site for the Isoline apps: landing page, Privacy Policy, Terms of Use / EULA,
open-source licences, support and company (trader) information, in Croatian (default),
English and Russian. Plain HTML/CSS, one small optional script, no build step to serve,
no cookies, no analytics, no external requests (fonts are self-hosted).

Published at **https://isoline.conciergegroup.pro/** (GitHub Pages, repository
the company repository (`$ISO_SITE_REPO`), served from the repository root = the contents of this folder).

## Base URL — the one constant

All links between pages and to assets are **relative**, so the site works under any path.
Absolute URLs appear only where they must be absolute: `<link rel="canonical">`,
`<link rel="alternate" hreflang>`, Open Graph tags, `sitemap.xml`, `robots.txt`, and the
`<base href>` of `404.html` (GitHub Pages serves 404.html at any depth).

They all come from one constant:

```
BASE = "https://isoline.conciergegroup.pro/"     # tools/site/build.py, line ~21
```

To move to a custom domain (for example `https://isoline.conciergegroup.pro/`):

1. In the app source repository set `BASE` in `tools/site/build.py` (keep the trailing `/`).
2. Run `python3 tools/site/build.py` — it rewrites every page, `sitemap.xml`, `robots.txt`, `404.html`.
3. Add a `CNAME` file with the domain to this folder, commit, push.
4. Update the store URLs in `docs/store/` (apple `*_url.txt`, google listing) to the new domain.

## URL map

| Page | hr (default) | en | ru |
|---|---|---|---|
| Landing | `/` | `/en/` | `/ru/` |
| Privacy Policy | `/privacy/` | `/en/privacy/` | `/ru/privacy/` |
| Data deletion (Play) | `/privacy/#data-deletion` | `/en/privacy/#data-deletion` | `/ru/privacy/#data-deletion` |
| Terms of Use / EULA | `/terms/` | `/en/terms/` | `/ru/terms/` |
| Open-source licences | `/licenses/` | `/en/licenses/` | `/ru/licenses/` |
| Support | `/support/` | `/en/support/` | `/ru/support/` |
| For VPN providers | `/support/#providers` | `/en/support/#providers` | `/ru/support/#providers` |
| Company / trader info | `/company/` | `/en/company/` | `/ru/company/` |

Paths are relative to `BASE`. `x-default` hreflang points to the English version.

## Editing

The pages in this folder are generated. Edit the sources in the app source repository and regenerate:

- `tools/site/content/<hr|en|ru>/<page>.html` — front matter (`title`, `description`, `h1`, `lead`,
  `kicker`, `version`) + body HTML. Tokens: `{{root}}` (path to site root), `{{page:privacy}}`
  (link to a page in the same language), `{{icon:qr}}` (inline icon from `assets/icons`),
  `{{email}}`, `{{phone}}`, `{{include:lic-go}}` (shared fragment from `content/_shared`).
- `tools/site/content/_shared/lic-*.html` — licence table rows (Go rows were generated from
  `core/go.mod` and the module licence files; regenerate when dependencies change).
- `tools/site/build.py` — layout, header/footer, `BASE`, `UPDATED` (date on legal pages).
- `assets/css/site.css`, `assets/js/site.js` — edited directly here.

Keep the policy in sync with the apps: `docs/SPEC.md` (O3, 7.3a, S9/S10), the in-app privacy
text, `docs/store/google/data-safety.md`, `apple/App-Shared/PrivacyInfo.xcprivacy`. When the data
handling changes, bump `version:` in the privacy front matter and the in-app policy version.

## Check locally

```sh
python3 tools/site/build.py
mkdir -p /tmp/iso-serve && ln -sfn "$PWD/site" /tmp/iso-serve/isoline
(cd /tmp/iso-serve && python3 -m http.server 8765 --bind 127.0.0.1) &
python3 tools/site/check.py http://127.0.0.1:8765/isoline/
```

The checker verifies every page in the sitemap plus `404.html`: internal links, anchors and
assets resolve, nothing loads from another origin, every page has `lang`, title, description and
a matching canonical, hreflang sets are complete and reciprocal, images have `alt`, ids are unique.

## Assets

- `assets/fonts/` — Old Standard TT, Onest, JetBrains Mono (SIL OFL 1.1, texts `OFL-*.txt`),
  converted from `design/fonts` to WOFF2 with fontTools, glyphs unchanged.
- `assets/icons/` — the 24 engraved icons from `design/freeze/v1-2026-11-22/icons` (inlined at build).
- `assets/img/app-*-{en,ru}.webp` — iPhone 17e simulator screenshots of the Debug build
  (status bar 9:41, local test points renamed by region, no real IPs or provider names):
  `o1` onboarding, `o3` data statement, `bench` (+`-dark`), `add` add-a-point sheet,
  `tunnel` (+`-dark`). hr pages use the English screenshots (the app has no Croatian UI).
- `assets/img/og-image.png` (1200×630), `assets/img/icon-512.png`, `favicon.svg` (light/dark),
  `favicon.ico`, `apple-touch-icon.png` — from the frozen app icon.
- `licenses/texts/` — licence texts linked from the licences page.

Design tokens follow `design/freeze/v1-2026-11-22` (palette «Купюра», motion from
`isoline-motion.css`); dark theme via `prefers-color-scheme`, animations off with
`prefers-reduced-motion`.

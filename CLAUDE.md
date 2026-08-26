# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal academic/portfolio site for Yunus Emre Danabaş, built with Jekyll on the [al-folio](https://github.com/alshedivat/al-folio) theme. Deployed via GitHub Pages to https://yunusemredanabas.com. Content is almost entirely Markdown + Liquid front matter; there is no application code to build or test in the traditional sense — most work here is content edits, and correctness is checked via link-checking, formatting, and a Jekyll build rather than unit tests.

## Common commands

Build and serve (Ruby/Jekyll):

```bash
bundle install                  # install gems (first time / after Gemfile changes)
bundle exec jekyll build        # build the site into _site/
bundle exec jekyll serve --livereload   # serve locally with live reload
```

Formatting (Prettier, enforced in CI on every push/PR):

```bash
npx prettier . --check          # check formatting (what CI runs)
npx prettier . --write          # auto-fix formatting
```

Prettier config: `.prettierrc` (uses `@shopify/prettier-plugin-liquid` for `.liquid` files, 150-char print width). `.prettierignore` excludes minified/vendored assets and a couple of legacy posts.

Link checking (lychee, mirrors CI):

```bash
# check source markdown/html for broken links (same args as .github/workflows/broken-links.yml)
lychee --user-agent 'curl/7.54' --timeout 30 --exclude-path README.md --exclude-path CUSTOMIZE.md \
  --exclude-path FAQ.md --exclude-path _pages/404.md --verbose --no-progress './**/*.md' './**/*.html'
```

Known-flaky/excluded hosts live in `.lycheeignore` (with comments explaining why, e.g. bot-protected or intermittently-down hosts) — add new entries there with a reason rather than papering over failures elsewhere.

Deploy (manual/legacy path — normally CI on `deploy.yml` handles this):

```bash
bin/deploy   # builds, purges unused CSS, force-pushes _site/ to gh-pages
```

There is no test suite; there is no linter beyond Prettier. Do not invent test/lint commands.

## CI (GitHub Actions, `.github/workflows/`)

- `deploy.yml` — builds with Jekyll (`JEKYLL_ENV=production`), purges unused CSS with `purgecss`, deploys `_site/` to GitHub Pages on push to `main`.
- `broken-links.yml` — lychee check over source `.md`/`.html` on every push/PR.
- `broken-links-site.yml` — runs after a successful deploy; lychee-checks the _built_ `_site/` offline.
- `prettier.yml` — runs `prettier --check` on every push/PR; on failure it generates and uploads an HTML diff artifact.
- `axe.yml` — manual (`workflow_dispatch`) accessibility audit of the built site via `@axe-core/cli`.

When editing content, keep these in mind: broken links and Prettier formatting are hard CI failures, not just style nits.

## Content architecture

- `_pages/` — top-level pages (`about.md` is the home page via `permalink: /`, plus `cv.md`, `projects.md`, `404.md`).
- `_projects/` — one Markdown file per project, rendered via the `projects` collection. Front matter fields in use: `layout: page`, `title`, `description`, `permalink` (under `/projects/...`), `date`, `collection: projects`, `importance` (controls sort order), `category`, `tags`, `img`. Follow the existing files' structure (numbered `##` sections, GitHub repo link buttons at the top) when adding a new project.
- `_data/socials.yml` — social links data, rendered by `_includes/social.liquid`.
- `_cv/` — CV source: `_cv/latex/` holds the LaTeX CV (`YunusEmreDanabas_CV.tex`, `build.sh`, `sections/`) that produces `assets/pdf/YunusEmreDanabas_CV.pdf`, plus `_cv/github-profile-readme.md`. The rendered `/cv` page pulls from `_includes/cv/` and `_layouts/cv.liquid`, not directly from the LaTeX source.
- `_includes/`, `_layouts/`, `_sass/` — theme structure (headers, footers, page/about/cv layouts, styles). Only touch these for site-wide behavior/styling changes, not content edits.
- `_plugins/` — small custom Jekyll plugins (cache-busting, `<details>` support, third-party asset downloading, accent stripping, file-exists checks).
- `_config.yml` — central site configuration: identity/contact info, SEO/Open Graph, analytics IDs, Giscus comments config, feature toggles. Site title/description/keywords and the `contact_note` email live here.

## Content conventions

- Personal/biographical facts (degrees, roles, affiliations, dates) should be treated as sensitive to get right — verify against `_pages/about.md` and existing project pages before changing dates, titles, or claims, and avoid overstating unverifiable claims (see existing commit history for precedent, e.g. softening unverifiable claims, crediting borrowed figures).
- Do not add a personal phone number to any public-facing page or data file.
- When adding external links, prefer ones that are stable; if a host is known to be flaky or bot-gated, exclude it in `.lycheeignore` with a comment rather than removing the link outright.
- Follow existing Markdown/Liquid formatting patterns in `_projects/*.md` (front matter block, `<div class="mb-3">` button row for repo links, `##`-numbered sections, tables via `<div class="table-responsive" markdown="1">`).

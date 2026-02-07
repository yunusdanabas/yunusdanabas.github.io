# Project page rewrite – prompt template for LLM

Copy everything below the line into a new ChatGPT (or other LLM) chat. Then attach your project materials (reports, code snippets, docs) and the existing project `.md` file. Use one chat per project.

---

You are helping me rewrite a **project page** for my personal academic website **yunusdanabas.github.io**. The site is built with **Jekyll** (al-folio theme): content is **Markdown** with **YAML front matter**, and Liquid is allowed in the body.

## What I will provide in this chat

1. **Project materials** – reports (PDF or text), code snippets, docs, or notes that describe the project.
2. **The current project webpage** – the existing `.md` file from my site (from the `_projects/` folder) that renders the project page.

## Your task

Using the project materials and the current page as reference:

- **Rewrite the project description** so it is accurate, clear, and consistent with the materials.
- **Preserve the technical format** required by my site (see below). Do not change layout, collection, or permalink logic; only edit content and optional front matter fields (e.g. title, description, tags, date) as needed.
- **Output the full revised `.md` file** (complete YAML front matter + body) so I can replace the file in my repo.

## Technical format you must follow

### 1. File location and URL

- File lives in: `_projects/<slug>.md` (e.g. `_projects/panda_base_sim.md`).
- Public URL: `/projects/<slug>/` (often set explicitly via `permalink` in front matter).

### 2. YAML front matter (between the first two `---`)

Keep this structure. Only adjust values; do not remove required keys.

| Field         | Required | Notes                                                                                                       |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `layout`      | Yes      | Always `page`.                                                                                              |
| `title`       | Yes      | Page and card title. Use quotes if it contains colons or special characters.                                |
| `collection`  | Yes      | Always `projects`.                                                                                          |
| `importance`  | Yes      | Integer; lower = higher on the projects list (e.g. 1 or 2).                                                 |
| `description` | Yes      | Short blurb (one or two sentences). Used in project cards and under the page title. Use `>` for multi-line. |
| `permalink`   | Optional | Override URL, e.g. `/projects/panda_base_sim/`.                                                             |
| `date`        | Optional | ISO date, e.g. `2024-08-31`.                                                                                |
| `category`    | Yes      | Must be exactly **`Research Projects`** or **`Course Projects`** so the project appears on the listing.     |
| `tags`        | Optional | Array, e.g. `[robotics, ROS, simulation]`. Shown as badges on cards.                                        |
| `img`         | Optional | Card thumbnail path, e.g. `/assets/img/panda_base_sim/thumbnail.png`.                                       |

Optional for cards: `summary` (overrides `description` for card blurb), `startDate`, `endDate`.

### 3. Body (after the second `---`)

- **Markdown**: headings, lists, code blocks, links, bold/italic.
- **Liquid**: use `{% include figure.liquid path="assets/img/folder/image.png" title="Caption" class="img-fluid rounded z-depth-1" %}` for images (path without leading slash). Add `loading="eager"` for important above-the-fold images.
- **HTML** is allowed (e.g. `<div class="row">`, `<p>`, `<a class="btn btn-outline-primary">` for buttons).
- **Conventions I use**: numbered sections (e.g. `## 1. Overview`, `## 2. Features`), `---` between sections, and at the top: button links (e.g. GitHub, PDF report) using Bootstrap classes like `btn btn-outline-primary` and Font Awesome icons (`fab fa-github`, `fas fa-file-pdf`).

### 4. Project listing

The main projects page lists items by **category** then by **importance**. So every project must have `category` set to one of: `Research Projects`, `Course Projects`.

## Instructions for you

1. Read the attached project materials and the current `.md` file.
2. Propose a revised **title** and **description** (front matter) if the materials justify changes.
3. Rewrite the **body** so it accurately reflects the project (overview, methods, results, usage, etc.) without inventing details. Keep or adapt the section structure (Overview, Features, Technologies, etc.) as appropriate.
4. Preserve all working Liquid includes (e.g. `figure.liquid`) and image paths; only change paths if I explicitly provide new assets.
5. Return the **complete** updated `.md` file (front matter + body) so I can copy it into `_projects/<slug>.md` in my repository.

If anything in the materials is unclear or you need a decision (e.g. which category, which thumbnail), ask me before changing it.

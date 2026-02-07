# Project page from scratch – prompt template for LLM

Copy everything below the line into a new ChatGPT (or other LLM) chat. Then attach your project materials (reports, code snippets, docs). Use one chat per project. There is no existing `.md` file; you are creating the page from scratch.

---

You are helping me **create a new project page** for my personal academic website **yunusdanabas.github.io**. The site is built with **Jekyll** (al-folio theme): content is **Markdown** with **YAML front matter**, and Liquid is allowed in the body.

## What I will provide in this chat

1. **Project materials** – reports (PDF or text), code snippets, docs, or notes that describe the project.
2. **Project slug (optional)** – the filename without `.md` (e.g. `my_new_project`). If I do not give one, suggest a short, lowercase slug based on the project name.

## Your task

Using only the project materials (and any slug I provide):

- **Draft the full project page** from scratch: valid YAML front matter plus body content.
- **Do not invent** details that are not in the materials; if something is unclear, ask me or leave a short placeholder and say what is needed.
- **Output the complete `.md` file** so I can save it as `_projects/<slug>.md` in my repository.

## Technical format you must follow

### 1. File location and URL

- File will be saved as: `_projects/<slug>.md` (e.g. `_projects/my_project.md`).
- Public URL: `/projects/<slug>/`. Set this in front matter with `permalink: /projects/<slug>/`.

### 2. YAML front matter (between the first two `---`)

Include all required keys. Use the slug I provide or the one you suggest.

| Field         | Required          | Notes                                                                                                                                                    |
| ------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout`      | Yes               | Always `page`.                                                                                                                                           |
| `title`       | Yes               | Page and card title. Use quotes if it contains colons or special characters.                                                                             |
| `collection`  | Yes               | Always `projects`.                                                                                                                                       |
| `importance`  | Yes               | Integer; lower = higher on the projects list (e.g. 1 or 2). Default to 2 if unsure.                                                                      |
| `description` | Yes               | Short blurb (one or two sentences). Used in project cards and under the page title. Use `>` for multi-line.                                              |
| `permalink`   | Yes (recommended) | Set to `/projects/<slug>/` so the URL is stable.                                                                                                         |
| `date`        | Optional          | ISO date if known, e.g. `2024-08-31`.                                                                                                                    |
| `category`    | Yes               | Must be exactly **`Research Projects`** or **`Course Projects`**. Choose from the materials or ask me.                                                   |
| `tags`        | Optional          | Array, e.g. `[robotics, simulation]`. Derive from the project.                                                                                           |
| `img`         | Optional          | Card thumbnail path, e.g. `/assets/img/<slug>/thumbnail.png`. If I have not specified images, use a placeholder path and tell me to add the image later. |

Optional: `summary`, `startDate`, `endDate` if relevant.

### 3. Body (after the second `---`)

- **Markdown**: headings, lists, code blocks, links, bold/italic.
- **Liquid**: for images use `{% include figure.liquid path="assets/img/<slug>/filename.png" title="Caption" class="img-fluid rounded z-depth-1" %}` (path without leading slash). Use `loading="eager"` for the first image if desired.
- **HTML** is allowed: e.g. `<div class="row">`, `<p>`, and at the top button links with Bootstrap classes `btn btn-outline-primary`, `btn btn-outline-secondary`, and Font Awesome icons (`fab fa-github`, `fas fa-file-pdf`).
- **Structure**: use numbered sections such as `## 1. Overview`, `## 2. Features` (or Methods, Technologies, Results, etc.) and separate sections with `---`. Start with a short block of button links (e.g. GitHub, PDF report) if the materials mention them.

### 4. Project listing

The projects page lists items by **category** then by **importance**. You must set `category` to exactly `Research Projects` or `Course Projects`.

## Instructions for you

1. Read the attached project materials.
2. If I did not give a **slug**, propose one (short, lowercase, no spaces).
3. Choose **category** (`Research Projects` or `Course Projects`) from context or ask me.
4. Draft **front matter**: title, description, permalink, category, importance, date (if known), tags, img (or placeholder).
5. Draft the **body**: overview, main content sections, and (if applicable) code snippets, usage steps, and a visual/links section. Use placeholder image paths like `assets/img/<slug>/image1.png` if I have not provided filenames; list suggested image names in a short note at the end.
6. Return the **complete** `.md` file (front matter + body) so I can save it as `_projects/<slug>.md`.

If the materials are unclear or missing (e.g. no dates, no repo link), ask me or add a clear placeholder and note what to fill in.

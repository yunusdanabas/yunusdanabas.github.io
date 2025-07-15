---
layout: page
title: projects
permalink: /projects/
description: >
  A curated collection of my work—from extracurricular initiatives to course-based assignments.
  Click on any card for full details.
nav: true
nav_order: 3
display_categories: ["Extracurricular Projects", "Course Projects"]
---

<div class="projects">

{% comment %}
  Iterate over the requested categories in order
{% endcomment %}
{% for category in page.display_categories %}
  <a id="{{ category | slugify }}" href=".#{{ category | slugify }}">
    <h2 class="category mt-5 mb-4">{{ category }}</h2>
  </a>

  {% assign cat_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = cat_projects | sort: "importance" %}

  <div class="row g-4">
  {% for project in sorted_projects %}
    <div class="col-md-12 col-lg-6 d-flex">

      {%- assign img_src = project.img | default: "/assets/img/placeholder-640x360.svg" -%}
      <div class="card shadow-sm flex-fill">

        <a href="{{ project.url }}" class="stretched-link">
          <img src="{{ img_src }}"
               class="card-img-top img-fluid"
               alt="{{ project.title }} thumbnail"
               style="height:260px; object-fit:cover;">
        </a>

        <div class="card-body">

          <h4 class="card-title mb-2">
            <a href="{{ project.url }}" class="text-decoration-none">
              {{ project.title }}
            </a>
          </h4>

          {%- comment -%}
            Prefer explicit summary; otherwise truncate description to ~30 words for a richer blurb.
          {%- endcomment -%}
          {% assign blurb = project.summary | default: project.description %}
          {% if blurb %}
            <p class="card-text mb-3">
              {{ blurb | strip_html | truncatewords: 60 }}
            </p>
          {% endif %}

          {% if project.tags %}
            {% for t in project.tags limit:5 %}
              <span class="badge bg-light text-dark me-1">{{ t }}</span>
            {% endfor %}
          {% endif %}

          {% if project.startDate or project.endDate %}
            <p class="text-muted small mb-0 mt-2">
              <em>
                {{ project.startDate }}
                {% if project.endDate %} – {{ project.endDate }}{% endif %}
              </em>
            </p>
          {% endif %}

        </div> <!-- card-body -->
      </div>   <!-- card -->

    </div>     <!-- col -->
  {% endfor %}
  </div>       <!-- row -->
{% endfor %}
</div>

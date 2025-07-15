---
layout: page
title: projects
permalink: /projects/
description: >
  A curated collection of my work—from extracurricular initiatives to course-based assignments.
  Click on a project for full details.
nav: true
nav_order: 3
display_categories: ["Extracurricular Projects", "Course Projects"]
---

<div class="projects">

{% comment %}
  Iterate over the two requested categories in the given order.
{% endcomment %}
{% for category in page.display_categories %}
  <a id="{{ category | slugify }}" href=".#{{ category | slugify }}">
    <h2 class="category mt-5">{{ category }}</h2>
  </a>

  {% assign cat_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = cat_projects | sort: "importance" %}

  {% for project in sorted_projects %}
    <div class="project-row d-flex align-items-start flex-wrap mb-4">

      {%- assign img_src = project.img | default: "/assets/img/placeholder-320x200.svg" -%}
      <div class="project-thumb me-3 mb-2">
        <a href="{{ project.url }}">
          <img src="{{ img_src }}" alt="{{ project.title }} thumbnail"
               class="img-fluid rounded" style="max-width:220px;">
        </a>
      </div>

      <div class="project-body flex-grow-1">
        <h3 class="mt-0 mb-1">
          <a href="{{ project.url }}">{{ project.title }}</a>
        </h3>

        {% if project.summary %}
          <p class="mb-1">{{ project.summary }}</p>
        {% endif %}

        {% if project.startDate or project.endDate %}
          <p class="text-muted small">
            <em>
              {{ project.startDate }}{% if project.endDate %}&nbsp;–&nbsp;{{ project.endDate }}{% endif %}
            </em>
          </p>
        {% endif %}
      </div>

    </div>
  {% endfor %}
{% endfor %}
</div>

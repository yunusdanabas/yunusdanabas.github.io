---
layout: page
title: projects
permalink: /projects/
description: >
  A curated collection of my projects—from extracurricular endeavors to course-based work.
  Each project includes a concise overview and key details. Click on a project for full information.
nav: true
nav_order: 3
display_categories: ["Extracircular Projects", "Course Projects"]
horizontal: false
---


<div class="projects">
  {% if site.enable_project_categories and page.display_categories %}
    {% for category in page.display_categories %}
      <a id="{{ category }}" href=".#{{ category }}">
        <h2 class="category">{{ category }}</h2>
      </a>
      {% assign categorized_projects = site.projects | where: "category", category %}
      {% assign sorted_projects = categorized_projects | sort: "importance" %}
      {% if page.horizontal %}
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2">
          {% for project in sorted_projects %}
            <div class="col">
              <div class="project-card">
                <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
                <p>{{ project.summary }}</p>
                {% if project.startDate or project.endDate %}
                  <p><em>{{ project.startDate }}{% if project.endDate %} - {{ project.endDate }}{% endif %}</em></p>
                {% endif %}
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
      {% else %}
      <div class="row row-cols-1 row-cols-md-3">
        {% for project in sorted_projects %}
          <div class="col">
            <div class="project-card">
              <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
              <p>{{ project.summary }}</p>
              {% if project.startDate or project.endDate %}
                <p><em>{{ project.startDate }}{% if project.endDate %} - {{ project.endDate }}{% endif %}</em></p>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
      {% endif %}
    {% endfor %}
  {% else %}
    {% assign sorted_projects = site.projects | sort: "importance" %}
    {% if page.horizontal %}
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2">
        {% for project in sorted_projects %}
          <div class="col">
            <div class="project-card">
              <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
              <p>{{ project.summary }}</p>
              {% if project.startDate or project.endDate %}
                <p><em>{{ project.startDate }}{% if project.endDate %} - {{ project.endDate }}{% endif %}</em></p>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
    </div>
    {% else %}
    <div class="row row-cols-1 row-cols-md-3">
      {% for project in sorted_projects %}
        <div class="col">
          <div class="project-card">
            <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
            <p>{{ project.summary }}</p>
            {% if project.startDate or project.endDate %}
              <p><em>{{ project.startDate }}{% if project.endDate %} - {{ project.endDate }}{% endif %}</em></p>
            {% endif %}
          </div>
        </div>
      {% endfor %}
    </div>
    {% endif %}
  {% endif %}
</div>

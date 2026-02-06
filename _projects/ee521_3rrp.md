---
layout: page
title: "3RRP Mechanism — Kinematic & Dynamic Analysis"
collection: projects
importance: 2
description: "A full symbolic and numerical study of a 3-RRP planar parallel manipulator: closed-form kinematics, workspace and isotropy metrics, and Kane vs Lagrange dynamics validated in Simulink."
permalink: /projects/3rrp_analysis/
date: 2025-01-15
category: Course Projects
tags: [robotics, kinematics, dynamics, simulation]
img: /assets/img/3rrp/rrp_systemImage2.png
---

<!-- Course Projects  -->  
<p>
  <a href="/assets/pdf/3rrp/YunusEmreDanabas_RRP_ProjectReport.pdf"
     class="btn btn-outline-secondary" role="button" target="_blank">
    <i class="fas fa-file-pdf"></i> Full Report&nbsp;(PDF)
  </a>
</p>

## 1&nbsp;·&nbsp;Overview & Motivation

The **3-RRP planar parallel manipulator** offers high stiffness and full planar dexterity using three *revolute–revolute–prismatic* legs.  
Between **Oct 2024 – Jan 2025** (EE 521 · *Kinematics & Dynamics of Machines*, Sabancı University) I performed an end-to-end analysis to

* derive **closed-form forward & inverse kinematics**,
* map the **largest symmetric workspace** and its **Global Isotropy Index (GII)**,
* formulate **equations of motion** with **Kane’s** and **Lagrange (Baumgarte-stabilised)** methods, and
* **validate** both models in **MATLAB / Simulink** under small force & torque perturbations.

<br>

## 2&nbsp;·&nbsp;Modeling Workflow

| Stage | Toolchain | Outcome |
|-------|-----------|---------|
| Symbolic kinematics | Autolev + manual algebra | Closed-form FK / IK |
| Workspace sampling | MATLAB (`parfor`) | ≈ 230 mm-radius reach |
| Isotropy metric | MATLAB · SVD(J) | **GII = 0.46** |
| Dynamics (Kane) | Autolev → MATLAB | Compact ODEs |
| Dynamics (Lagrange) | Autolev + λ, Baumgarte | DAE system |
| Validation | Simulink | Stable under 0.001 N/N·m |

<br>

### Pipeline Snapshot

<div align="center">
  {% include figure.liquid loading="eager"
     path="assets/img/3rrp/rrp_systemImage.png"
     title="Labeled 3-RRP schematic"
     class="img-fluid rounded z-depth-1" %}
</div>

<br>

## 3&nbsp;·&nbsp;Key Results

| Metric | Value / Observation |
|--------|--------------------|
| **Workspace** | Circular, *R* ≈ 230 mm (link length 200 mm) |
| **Global Isotropy Index** | **0.46** (min σ / max σ) |
| **Dynamics drift** | < 0.5 % state error over 5 s |
| **RHS eval (Kane)** | ~20 µs (MATLAB R2024a) |

<br>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="assets/img/3rrp/rrp_workspace.jpeg"
       title="Reachable Workspace"
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="assets/img/3rrp/rrp_forceSimulation.jpeg"
       title="Small-Load Response"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Left: reachable workspace scatter. Right: end-effector trace under 0.001 N load (−X).
</div>

<br>

## 4&nbsp;·&nbsp;Kane vs Lagrange — Quick Take

| Aspect | **Kane’s Method** | **Lagrange + λ** |
|--------|------------------|------------------|
| Constraint handling | Implicit (partial velocities) | Explicit multipliers |
| Symbolic length | Shorter | Longer |
| Numerical stiffness | Low | Moderate (α, β tuning) |
| Physical intuition | Force / velocity | Energy focus |
| Best use | Real-time control | Energy shaping |

<br>

## 5&nbsp;·&nbsp;Deliverables & Next Steps

* **Simulink library** – drag-and-drop FK, IK, Jacobian, dynamics blocks  
* **MATLAB scripts** – workspace & isotropy samplers, disturbance demos  
* **Full PDF** – derivations, listings, discussion  

**Future work:** add joint friction & compliance, design Jacobian-weighted impedance control, and build a benchtop prototype for hardware correlation.

> *Solo term project for **EE 521 — Kinematics & Dynamics of Machines (Fall 2024, Sabancı University)**.*

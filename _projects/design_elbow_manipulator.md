---
layout: page
title: "Planar Elbow Manipulator — Design & Control"
collection: projects
importance: 4
description: "A 2-DoF planar elbow manipulator that uniquely met every mechanical requirement in ME408, integrating robust CAD, power electronics, and dual-loop control for precise trajectory tracking."
permalink: /projects/elbow_manipulator/
date: 2024-12-01
category: Course Projects
tags: [mechanical-design, power-electronics, control-systems, robotics]
img: /assets/img/me408_elbow/me408_design_closedForm.jpeg
---

## 1&nbsp;·&nbsp;Overview & Motivation

This solo ME408 project (Sabancı University) produced the **only design in a class of 20+** that satisfied all structural, weight, and accuracy specs.  
The goals were:

* **Light-yet-strong mechanics** — optimized with FEA  
* **Clean power delivery** — custom buck-boost converter  
* **High-precision motion** — gravity-compensated PI/PID dual-loop control  

| Metric | Target / Result |
|--------|-----------------|
| Safety factor | > 2 (FEA) |
| Mass reduction | 18 % vs initial |
| Tracking error | ≤ 0.35 ° RMS @ 60 °/s |
| Loop latency | 2.4 ms @ 1 kHz |

<br>

## 2&nbsp;·&nbsp;Mechanical Design

* CAD in **SOLIDWORKS** with topology-inspired link geometry  
* **Static & dynamic FEA** → safety factor > 2 while trimming 18 % mass  
* Modular joints for quick bearing replacement and encoder mounting  

<br>

## 3&nbsp;·&nbsp;Power Electronics

* **Buck-boost converter** designed in **LTspice**  
  * 7 % voltage ripple, < 5 % inductor current ripple at 1 A load  
* Integrated Hall shunt for inner-loop current sensing  

<br>

## 4&nbsp;·&nbsp;Control Architecture

| Loop        | Controller | Inputs                 | Outputs           |
|-------------|------------|------------------------|-------------------|
| **Inner**   | PI         | Motor current, V<sub>in</sub> | PWM duty cycle    |
| **Outer**   | PID + g-comp| Joint angles, desired θ | Motor current set |

* Trajectories generated from **inverse kinematics**; simulated in MATLAB/Simulink  
* Achieved ≤ 0.35 ° RMS tracking error on a 60 °/s sinusoid  

<br>

## 5&nbsp;·&nbsp;System Integration & Validation

All subsystems were co-simulated:

* **Mechanics** → SOLIDWORKS Motion  
* **Electronics** → LTspice transient + Bode analyses  
* **Control** → Simulink real-time plant-in-the-loop  

<br>

<div class="row row-cols-1 row-cols-md-3">
  <div class="col mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="assets/img/me408_elbow/me408_design_front.jpeg"
       title="Front View"
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="assets/img/me408_elbow/me408_design_iso.jpeg"
       title="Isometric View"
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="assets/img/me408_elbow/me408_design_closedForm.jpeg"
       title="Closed-Form Analysis"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  CAD renders and closed-form workspace analysis.
</div>

<br>

<div class="row row-cols-1 row-cols-md-2">
  <div class="col mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="assets/img/me408_elbow/me408_displacement.jpeg"
       title="Displacement FEA"
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col mt-3 mt-md-0">
    {% include figure.liquid loading="eager"
       path="assets/img/me408_elbow/me408_stress.jpeg"
       title="Von-Mises Stress"
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Key FEA results confirming deformation < 0.12 mm and stress well below yield.
</div>

<br>

> *Completed for **ME408 — Mechatronic System Design (Fall 2024)**.*


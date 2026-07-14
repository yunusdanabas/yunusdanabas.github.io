---
layout: page
title: Baxter manipulation with ROS Noetic and object rearrangement
description: Group project on Bayesian Optimization with transfer learning for sequential object placement and rearrangement on cluttered surfaces. I worked on the physical robot side and ported the Baxter codebase to ROS Noetic.
permalink: /projects/baxter/
date: 2024-12-01
collection: projects
importance: 6
category: Research Projects
tags: [robotics, ROS, Baxter, manipulation, Gazebo, MoveIt]
img: /assets/img/baxter_robot.png
---

<div class="mb-3">
  <a href="https://github.com/yunusdanabas/baxter_noetic" class="btn btn-outline-primary" role="button" target="_blank">
    <i class="fab fa-github"></i> GitHub Repo
  </a>
</div>

## 1. Overview

We developed an algorithm using **Bayesian Optimization with transfer learning** for sequential object placement and rearrangement with collision-free arrangements on cluttered surfaces. The goal is to plan where and in what order to place or move objects (e.g. on a desk or table) so that the robot can complete tasks without collisions and with fewer trials. Transfer learning helps reuse experience across similar scenes to speed up planning. The system targets efficient manipulation planning in complex, real-world environments.

## 2. My contribution

I worked on the **physical robot side**. The original Baxter SDK targeted older ROS versions and Python 2, so I updated the codebase to run on **ROS Noetic** with Python 3. That included the core interface and tools (enable/disable, tuck/untuck, cameras), example scripts, and the **Gazebo** simulation stack so the team can test in simulation before deploying on the real robot. **MoveIt** is used for motion planning in both settings. Having the same stack on sim and hardware lets us develop and debug the Bayesian optimization pipeline in Gazebo, then run it on the physical Baxter with minimal changes.

## 3. Technical context

We use the **Baxter Research Robot** (dual-arm, from Rethink Robotics) with its standard SDK packages: interface and action servers for the arms and grippers, operational tools, and the Gazebo-based simulator. The workflow is to develop and tune algorithms in Gazebo, then run them on the real robot using the same ROS Noetic workspace.

## 4. Media

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/baxter_gazebo.jpg" title="Baxter in Gazebo Simulation" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/baxter_robot.png" title="Real Baxter Robot" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

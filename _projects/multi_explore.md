---
layout: page
title: "Multiexplorer — Multi-Robot Frontier Exploration with TurtleBot3"
collection: projects
importance: 7
description: "My first ROS project: a Gazebo-based study comparing single-, double-, and triple-robot frontier exploration, SLAM, and map-merging with TurtleBot3."
permalink: /projects/multiexplorer/
date: 2023-09-15
category: "Research Projects"
tags: ["robotics", "ROS", "Gazebo", "SLAM", "multi-robot"]
img: /assets/img/multiexplorer/multiexplore_map.png
---

<p>
  <a href="https://github.com/yunusdanabas/multiexplorer_yunusdanabas" class="btn btn-outline-primary" role="button" target="_blank">
    <i class="fab fa-github"></i> GitHub Repo
  </a>
  &nbsp;
  <a href="https://www.canva.com/design/DAGe6rFLM7U/w38mwYjYpvIZk73nA4x4lg/view" class="btn btn-outline-secondary" role="button" target="_blank">
    <i class="fas fa-file-powerpoint"></i> Canva Slides
  </a>
</p>

## 1. Overview and Motivation

**Multiexplorer** is my **first ROS project**, built after a 2-week ROS boot camp and ~2 additional weeks of focused project work at **TÜBİTAK BİLGEM**. The goal was intentionally practical and learning-driven:

- build an end-to-end **autonomous exploration** pipeline in ROS,
- scale it from **one** TurtleBot3 to **two** and **three** robots,
- learn the "glue" that makes multi-robot systems work in ROS: **namespaces, TF, launch design, and topic remapping**.

The entire project is **simulation-only** (Gazebo + RViz), so it is easy to reproduce and extend.

---

## 2. What the System Does

At a high level, each robot repeatedly:

1. builds a local map,
2. finds "frontiers" (boundaries between known and unknown space),
3. sends navigation goals toward those frontiers,
4. and contributes its local map to a global merged map.

### Core building blocks

- **Frontier exploration:** `explore_lite` (frontier detection + goal selection)
- **Navigation:** `move_base` with **DWA** local planner (path planning + obstacle avoidance)
- **2D SLAM:** `gmapping` (per robot)
- **Map merging:** `multirobot_map_merge` (fuses `/tb3_i/map` into a merged `/tb3/map`)

---

## 3. Multi-Robot ROS Design

Scaling from one to multiple robots in ROS required consistent separation and a clean "shared world" interface.

### Namespaces + TF prefixes

Each robot runs in its own namespace (e.g., `tb3_0`, `tb3_1`, `tb3_2`) so that SLAM, navigation, and TF do not conflict.

Typical patterns used throughout the package:

- **Per-robot topics:**
  - `/tb3_0/scan`, `/tb3_0/odom`, `/tb3_0/map` (and similarly for `tb3_1`, `tb3_2`)
- **Per-robot frames:**
  - `tb3_0/base_footprint`, `tb3_0/odom` (etc.)
- **Merged map topic:**
  - `/tb3/map` (used as the shared "global" map for exploration/navigation)

### Map merging strategy

`multirobot_map_merge` is configured to subscribe to each robot's map topic and publish a merged occupancy grid. For the multi-robot experiment launch, the merge node is set up with:

- `known_init_poses: true` (uses the Gazebo spawn poses as initial alignment priors)
- a merged map published on `tb3/map`
- static transforms connecting the world `map` frame to each robot's map frame

This structure makes the "multi-robot" part largely a launch/config problem: once topics and frames are isolated, the same SLAM+exploration pipeline can be replicated per robot.

---

## 4. Launch Scenarios Included

The package provides one-command launches to reproduce the main scenarios:

- **Single robot exploration:** SLAM + `explore_lite` + navigation
- **Two robots:** same pipeline for two namespaces + map merge
- **Three robots:** same pipeline for three namespaces + map merge
- **Map-merge only:** run `multirobot_map_merge` over any set of `/map` topics
- **Experimental fiducial SLAM mode:** ArUco detection + `fiducial_slam` in an ArUco-enabled world (for exploration/localization experiments)

> Tip: pass `gui:=false` (when supported) for headless Gazebo runs.

---

## 5. Key Parameters I Tuned (Process Focus)

A large part of this project was learning how to make a full pipeline behave _reasonably_ in simulation by iterating on parameters.

Examples of parameters used in the multi-robot launch:

### `explore_lite`

- `planner_frequency`, `progress_timeout` (how often to replan / when to give up on a frontier)
- `min_frontier_size` (filters tiny frontiers)
- `potential_scale`, `gain_scale`, `orientation_scale` (frontier scoring)

### `move_base` (DWA)

- per-robot costmap and DWA configs (kept separate to avoid cross-talk)
- local planner behavior tuned through YAML parameter sets

### `gmapping`

- namespaced frames (`base_frame`, `odom_frame`, `map_frame`)
- SLAM sensitivity and update thresholds (especially relevant once robots start moving faster)

---

## 6. Setup and Usage

Tested in simulation with common ROS1 TurtleBot3 stacks (Ubuntu 20.04 / 22.04, ROS Melodic / Noetic).

```bash
# ❶ Clone & build (catkin)
cd ~/catkin_ws/src
git clone https://github.com/yunusdanabas/multiexplorer_yunusdanabas.git
cd ~/catkin_ws
rosdep install --from-paths src --ignore-src -r -y
catkin_make
source devel/setup.bash

# ❷ Run experiments
roslaunch multiexplorer_yunusdanabas single_robot_exp.launch   # 1 robot
roslaunch multiexplorer_yunusdanabas double_robotexp.launch    # 2 robots
roslaunch multiexplorer_yunusdanabas multi_robotexp.launch     # 3 robots
```

---

## 7. Lessons Learned

- **Namespacing and TF discipline** matter more than anything else for multi-robot ROS1 setups.
- **Map merging is a real system component**, not just a visualization step: topic choices, frame conventions, and update rates affect exploration stability.
- **Parameter iteration is unavoidable**: exploration behavior is highly sensitive to frontier thresholds, replanning logic, and navigation costmaps.

---

## 8. Visual Gallery

<div class="row">
  <div class="col mt-3 mt-md-0">
      {% include figure.liquid path="assets/img/multiexplorer/multiexplore_map.png" title="Single-Robot Map" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row">
  <div class="col mt-3 mt-md-0">
      {% include figure.liquid path="assets/img/multiexplorer/multiexplore_map_comp.png" title="Merged Map (3 robots)" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row">
  <div class="col mt-3 mt-md-0">
      {% include figure.liquid path="assets/img/multiexplorer/multiexplore_simulation.png" title="Gazebo Snapshot" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  From top to bottom: map built by a single robot, merged map from three robots, and the live Gazebo view.
</div>

---

## 9. Resources

- <a href="https://github.com/yunusdanabas/multiexplorer_yunusdanabas" target="_blank"><strong>GitHub Repository</strong></a>
- <a href="https://www.canva.com/design/DAGe6rFLM7U/w38mwYjYpvIZk73nA4x4lg/view" target="_blank"><strong>Canva Presentation Slides</strong></a>

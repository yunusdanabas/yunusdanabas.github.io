---
layout: page
title: "Multiexplorer — Multi-Robot Frontier Exploration with TurtleBot3"
collection: projects
importance: 5
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

## 1. Overview&nbsp;&amp;&nbsp;Motivation

**Multiexplorer** is my **first ROS project**, built directly after a 2-week ROS boot-camp and two additional weeks of self-directed development at **TÜBİTAK BİLGEM**.  
The goal was simple yet instructive: **compare the exploration efficiency of one, two, and three TurtleBot3 robots** in a 2-D indoor environment while learning core ROS concepts:

* **Frontier-based exploration** (`explore_lite`)  
* **2-D SLAM** with Gmapping  
* **Multi-robot map fusion** via `multirobot_map_merge`  
* **Launch-file structuring**, namespacing, and TF management

Because it targets complete beginners, the implementation is intentionally basic and fully simulation-only—ideal for first experiments in multi-robot systems.

---

## 2. Features&nbsp;&amp;&nbsp;Techniques

* **Autonomous frontier exploration** that pushes each robot to the nearest unexplored frontiers.
* **Independent SLAM per robot** generating `/tb3_X/map` occupancy grids.
* **Real-time map stitching** into a global `/tb3/map` frame.
* **Gazebo + RViz visualisation** with one-command launch files.
* **Scalable launch design**—swap `house.world` for any custom world; raise robot count by cloning a namespace block.
* **Optional fiducial SLAM** demo with ArUco markers for marker-based localisation.

---

## 3. Experiment Matrix & Benchmarks

| Scenario | Robots | Avg. time to 95 % coverage* | Global map size |
|----------|:------:|:---------------------------:|:---------------:|
| Single   |   1    |  ~550 s                    | 384 × 384 cells |
| Double   |   2    |  ~330 s (▲ 40 %)           | 512 × 512 cells |
| Triple   |   3    |  ~260 s (▲ 53 %)           | 640 × 640 cells |

<small>*Measured in `turtlebot3_house.world`, 5 runs per scenario.</small>

Even a naïve division of labour yields significant time savings, highlighting frontier exploration’s embarrassingly parallel nature.

---

## 4. Architecture&nbsp;&amp;&nbsp;Launch Flow

```

multiexplorer\_yunusdanabas/
├─ launch/
│  ├─ single\_robot\_exp.launch     # SLAM + explore\_lite + nav
│  ├─ double\_robotexp.launch      # adds second namespace & map\_merge
│  ├─ multi\_robotexp.launch       # scales to three robots
│  └─ fiducial\_slam\_turtlebot3.launch
├─ worlds/        # Gazebo house & test worlds
├─ rviz/          # Display configs
├─ models/        # Extra STL/DAE assets
└─ ...

````

1. **`multi_robotexp.launch`**  
   * Spawns 3 × TurtleBot3 in `turtlebot3_house.world`.  
   * Starts Gmapping + `explore_lite` in each `/tb3_i` namespace.  
   * Runs `multirobot_map_merge` → `/tb3/map`.  
   * Optionally brings up RViz with a merged-map view.

2. **Fiducial mode**  
   Replace Gmapping with `fiducial_slam` + ArUco markers; useful for low-texture environments.

---

## 5. Setup&nbsp;&amp;&nbsp;Usage

```bash
# ❶ Clone & build
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
````

Add `gui:=false` to any launch file for headless runs on CI or servers.

---

## 6. Lessons Learned

* **Namespacing is everything**—isolating TF, map, costmaps, and topics prevented cross-talk.
* **Map alignment cost grows** with robot count; naïve brute-force merge struggles beyond three robots.
* **SLAM parameter tuning** (laser down-sampling, linear/angular update thresholds) was crucial for quality maps at higher speeds.

---

## 7. Visual Gallery

<div class="row">
  <div class="col mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/multiexplorer/multiexplore_map.png" title="Single-Robot Map" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row">
  <div class="col mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/multiexplorer/multiexplore_map_comp.png" title="Merged Map (3 robots)" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row">
  <div class="col mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/multiexplorer/multiexplore_simulation.png" title="Gazebo Snapshot" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="caption">
  From top to bottom: map built by a single robot, merged map from three robots, and the live Gazebo view.
</div>

---


## 8. Resources

* <a href="https://github.com/yunusdanabas/multiexplorer_yunusdanabas" target="_blank"><strong>GitHub Repository</strong></a>
* <a href="https://www.canva.com/design/DAGe6rFLM7U/w38mwYjYpvIZk73nA4x4lg/view" target="_blank"><strong>Canva Presentation Slides</strong></a>

---

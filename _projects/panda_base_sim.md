---
layout: page
title: "Panda-Base Digital Twin — ROS Noetic / Gazebo Package"
collection: projects
importance: 2
description: >
  ROS Noetic package that provides a Gazebo 11 + RViz digital twin of a Franka Emika Panda mounted on a custom aluminium-profile base.
  Built as a reusable simulation workspace for URDF/Xacro iteration, controller bring-up, and safe pre-hardware validation.
permalink: /projects/panda_base_sim/
date: 2024-08-31
category: Research Projects
tags: [robotics, ROS, Gazebo, RViz, franka_ros, ros_control, URDF, xacro]
img: /assets/img/panda_base_sim/pandaBaseSim_simulation.png
---

<p>
  <a href="https://github.com/yunusdanabas/panda_base_sim" class="btn btn-outline-primary" role="button" target="_blank">
    <i class="fab fa-github"></i> GitHub Repo
  </a>
  &nbsp;
  <a href="/assets/pdf/panda_base_sim/YunusEmreDanabas_report.pdf" class="btn btn-outline-secondary" role="button" target="_blank">
    <i class="fas fa-file-pdf"></i> Forschungspraxis Report (PDF)
  </a>
</p>

## 1. Overview

**panda_base_sim** is a **ROS Noetic** package that launches a **Gazebo 11** simulation and **RViz** visualization for a **Franka Emika Panda** mounted on a custom **aluminium-profile base** (including a force-torque sensor placeholder in the model).

The focus of this repository is the **ROS package itself**: robot description, launch system, controller configuration, and an RViz-based interactive tele-operation workflow—so that most integration work can be iterated in simulation before touching hardware.

---

## 2. What the Package Provides

- **Gazebo + RViz "one-command" bring-up** via `panda_base_sim.launch`.
- **Modular URDF/Xacro robot description**:
  - `base_panda.urdf.xacro` as the main entry point (base + Panda arm + optional hand).
  - `base_sensor_urdf.urdf` as a lightweight, base-only model for fast checks.
- **ros_control + Franka Gazebo integration** (`FrankaHWSim`) with controller configs pre-wired.
- **Interactive marker tele-operation** (auto-enabled for the Cartesian impedance example controller) to move an equilibrium pose in RViz and stream it to the controller topic.

---

## 3. Repository Structure (Key Folders)

```text
panda_base_sim/
├── config/      # Franka HW sim + controller YAMLs
├── launch/      # Gazebo/RViz launch files
├── robots/      # xacro macros + RViz config
├── meshes/      # STL/DAE visuals (CAD exports)
├── scripts/     # interactive_marker.py
└── urdf/        # base_panda.urdf.xacro + base_sensor_urdf.urdf
```

---

## 4. Launch Files and Runtime Flow

### 4.1 `panda_base_sim.launch` (full stack)

This is the main entry point. It:

1. Starts **Gazebo** (GUI or headless; optionally paused).
2. Generates `robot_description` from **`urdf/base_panda.urdf.xacro`**.
3. Loads YAML parameters from `config/` (hardware sim + controllers).
4. Spawns the robot into Gazebo via `gazebo_ros/spawn_model`.
5. Spawns controllers via `controller_manager/spawner`:

   * `franka_state_controller`
   * one selected example controller (default: `cartesian_impedance_example_controller`)
   * optionally `franka_gripper`
6. Starts `robot_state_publisher` / `joint_state_publisher`.
7. Optionally launches **RViz** with `robots/panda_base_sim.rviz`.
8. Enables the **interactive marker node** automatically when the Cartesian impedance controller is selected.

Useful arguments exposed by the launch file include:

* `headless`, `paused`, `world`, `rviz`
* `use_gripper`, `controller`
* spawn pose args (`spawn_x/y/z`, `spawn_roll/pitch/yaw`)

### 4.2 `onlybase_gazebo.launch` (fast base-only checks)

This launch file is intentionally minimal for quick iteration on the mechanical model:

* Launches an empty Gazebo world
* Spawns `urdf/base_sensor_urdf.urdf` (**base + sensor placeholder, no arm**)
* Publishes a static TF `base_link → base_footprint`
* Publishes `/calibrated` as `true` (to satisfy nodes that expect calibration gating)

---

## 5. Controllers and Interactive Marker Tele-Op

Controller definitions and Franka simulation parameters live in `config/` (e.g., hardware sim config, state controller, trajectory controllers, and example controllers).

When using `cartesian_impedance_example_controller`, the package can run `scripts/interactive_marker.py`:

* Reads the current end-effector pose
* Lets you drag a 6-DoF marker in RViz
* Publishes the target to the controller topic (equilibrium pose), with workspace bounding for safer interaction

---

## 6. Workflow & Usage

1. **Clone & build (catkin / Noetic)**

   ```bash
   cd ~/catkin_ws/src
   git clone https://github.com/yunusdanabas/panda_base_sim.git
   cd ~/catkin_ws
   rosdep install --from-paths src --ignore-src -r -y
   catkin_make
   source devel/setup.bash
   ```

2. **Run the full digital twin**

   ```bash
   roslaunch panda_base_sim panda_base_sim.launch
   ```

   Common toggles:

   ```bash
   roslaunch panda_base_sim panda_base_sim.launch headless:=true rviz:=false
   roslaunch panda_base_sim panda_base_sim.launch use_gripper:=false
   roslaunch panda_base_sim panda_base_sim.launch controller:=joint_position_example_controller
   ```

3. **Spawn only the base model**

   ```bash
   roslaunch panda_base_sim onlybase_gazebo.launch
   ```

---

## 7. Visual Gallery

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_simulation.png" title="Gazebo + RViz snapshot (digital twin running)" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_front.png" title="CAD render — front view of the base assembly" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_iso.png" title="CAD render — isometric view (base + mounting stack)" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_side.png" title="CAD render — side view" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_real_base.jpg" title="Real aluminium-profile base (hardware reference)" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_sensor.jpg" title="Force-torque sensor used as the modeling reference" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Simulation snapshot, CAD renders, and the physical base/sensor references used to guide the URDF/Xacro model.
</div>

---

## 8. Resources

* <a href="https://github.com/yunusdanabas/panda_base_sim" target="_blank"><strong>GitHub Repository</strong></a>
* <a href="/assets/pdf/panda_base_sim/YunusEmreDanabas_report.pdf" target="_blank"><strong>Forschungspraxis Report (PDF)</strong></a>

---

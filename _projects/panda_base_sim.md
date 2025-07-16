---
layout: page
title: "Panda-Base Digital Twin — Modular Simulation of a High-Moment Manipulation Setup"
collection: projects
importance: 2
description: Modular Gazebo-based digital twin of a Franka Emika Panda arm mounted on a custom aluminium-profile base. Developed during a TUM-MIRMI research internship, it enables controller tuning and moment-load evaluation entirely in simulation.
permalink: /projects/panda_base_sim/
date: 2024-08-31
category: Research Projects
tags: [robotics, ROS, Gazebo, simulation]
img: /assets/img/panda_base_sim/pandaBaseSim_simulation.png
---

<p>
  <a href="https://github.com/yunusdanabas/panda_base_sim" class="btn btn-outline-primary" role="button" target="_blank">
    <i class="fab fa-github"></i> GitHub Repo
  </a>
  &nbsp;
  <a href="/assets/pdf/panda_base_sim/YunusEmreDanabas_report.pdf" class="btn btn-outline-secondary" role="button" target="_blank">
    <i class="fas fa-file-pdf"></i> Final Report (PDF)
  </a>
</p>


## 1. Overview & Objective

**Panda-Base Digital Twin** is a Gazebo/RViz simulation that mirrors a Franka Emika Panda arm mounted on a custom aluminium-profile base used at **TUM-MIRMI**.
The goal is to **validate high-moment manipulation controllers and sensor placements entirely in software**—eliminating risky, time-consuming on-robot trials while achieving real-time performance.

---

## 2. Features & Design Highlights

* **Full-physics Gazebo 11 world** of base + Panda arm + **FTE-Omega-160-IP60 SI-1000-120 6-DoF force-torque sensor stub** with accurate inertias and collision geometry.
* **Modular Xacro/URDF stack**—`common`, `base`, `arm`, `sensor`—for rapid reuse or hardware redesign.
* **Pre-tuned controller suite** (joint-position, effort, trajectory, Cartesian-impedance) with gains matched to the twin’s dynamics.
* **Interactive RViz tele-operation** via `interactive_marker.py`; streams a 6-DOF equilibrium-pose marker at 200 Hz and clamps motion inside safe limits.
* **One-command startup**: `roslaunch panda_base_sim panda_base_sim.launch` launches Gazebo, controllers, RViz, and the marker node.
* **Comprehensive documentation & MIT license** make it an open template for Panda manipulation research.

---

## 3. Architecture & Pipeline

**Package structure**

```
panda_base_sim/
├── config/      # controller & hardware YAMLs
├── launch/      # Gazebo / RViz launch files
├── robots/      # Xacro macros: common, base, arm, sensor
├── meshes/      # STL / DAE visuals from SolidWorks
├── scripts/     # interactive_marker.py
└── urdf/        # generated URDFs & CAD-export variants
```

**Launch flow**

1. `panda_base_sim.launch`

   * Loads Gazebo (headless or GUI).
   * Generates `robot_description` from `urdf/base_panda.urdf.xacro`.
   * Pushes controller parameters from `config/*.yaml`.
   * Spawns the robot model into Gazebo at preset joint angles.
   * Starts `controller_manager` spawners (state, trajectory, Cartesian-impedance).
   * Optionally launches RViz with `robots/panda_base_sim.rviz`.
   * Runs **interactive marker node** for live equilibrium-pose commands.

2. `onlybase_gazebo.launch`

   * Spawns the static base + arm without controllers/RViz for quick visualization.

*The force-torque sensor placeholder matches the real **FTE-Omega-160-IP60 SI-1000-120** unit used in hardware tests, ensuring mass and inertia fidelity.*

**Interactive marker pipeline**

```
Gazebo ←→ controller_manager ←→ cartesian_impedance_example_controller
                                       ↑
              equilibrium_pose  (geometry_msgs/PoseStamped)
                                       ↑
                          interactive_marker.py
```

The Python node reads the current Panda end-effector pose, enforces XYZ bounds, and publishes updates at 200 Hz, enabling smooth, safe tele-op inside RViz.

---

## 4. Technologies Used

* **ROS Noetic** (`gazebo_ros`, `controller_manager`, `franka_ros`, `interactive_markers`)
* **Gazebo 11** physics engine
* **Franka Gazebo** plugin (`FrankaHWSim`) for realistic dynamics
* **RViz** with saved display config for live visualization
* **SolidWorks** for CAD design and inertia extraction of the aluminium base
* **Xacro ⁄ URDF** for parameterised robot descriptions
* **Python 3** (+ `rospy`) for the interactive marker node
* **CMake / catkin** build system for ROS packaging

---


## 5. Workflow & Usage

1. **Clone & build**

   ```bash
   cd ~/catkin_ws/src
   git clone https://github.com/yunusdanabas/panda_base_sim.git
   cd ~/catkin_ws
   rosdep install --from-paths src --ignore-src -r -y
   catkin_make           # or: colcon build
   source devel/setup.bash
   ```

2. **Run the full twin**

   ```bash
   roslaunch panda_base_sim panda_base_sim.launch
   ```

   This single command starts **Gazebo + controllers + RViz** and spawns a 6-DOF interactive marker for Cartesian-impedance control.

3. **Minimal spawn**

   ```bash
   roslaunch panda_base_sim onlybase_gazebo.launch
   ```

   Spawns the static base-arm pair in Gazebo without controllers or RViz—ideal for quick visual checks.

4. **Tele-operate**

   * Drag the **Equilibrium Pose** marker in RViz for real-time impedance control (clamped workspace).
   * Or publish your own poses:

   ```bash
   rostopic pub /equilibrium_pose geometry_msgs/PoseStamped ...
   ```

---

## 6. Results & Impact

* **Zero on-robot risk** – 100 % of controller tuning and load-case checks completed in simulation.
* **Real-time performance** – ≈ 1 × wall-clock speed (≥ 60 FPS) on a mid-tier desktop with the full controller stack active.
* **Adopted by peers** – 3 MIRMI researchers now use this twin as a baseline for force-torque sensor scaling studies.
* **Open resource** – MIT-licensed code released on GitHub for the robotics community.

---

## 7. Visual Gallery

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_simulation.png" title="Gazebo + RViz Snapshot" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_front.png" title="Front View" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_iso.png" title="Isometric View" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_side.png" title="Side View" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_real_base.jpg" title="Real Aluminium-Profile Base" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/panda_base_sim/pandaBaseSim_sensor.jpg" title="FTE-Omega-160-IP60 SI-1000-120 Sensor" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  CAD renders (front, iso, side), live Gazebo + RViz snapshot, real base photo, and force-torque sensor image
</div>

---

## 8. Resources

* <a href="https://github.com/yunusdanabas/panda_base_sim" target="_blank"><strong>GitHub Repository</strong></a>
* <a href="/assets/pdf/panda_base_sim/YunusEmreDanabas_report.pdf" target="_blank"><strong>Full Forschungspraxis Report (PDF)</strong></a>

---

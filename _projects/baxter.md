---
layout: page
title: "Baxter Research Robot: ROS Noetic and ROS 2 Jazzy"
description: >
  Two complementary Baxter software stacks: a simulation-first ROS 2 Jazzy environment with Gazebo Harmonic,
  ros2_control, and MoveIt 2, plus a ROS Noetic/Python 3 port of the legacy SDK and operational tools.
permalink: /projects/baxter/
date: 2026-08-25
collection: projects
importance: 6
category: Research Projects
tags: [robotics, ROS, ROS 2, Baxter, Gazebo, MoveIt]
img: /assets/img/baxter_robot.png
---

<div class="mb-3">
  <a href="https://github.com/yunusdanabas/baxter_ros2_jazzy" class="btn btn-outline-primary" role="button" target="_blank" rel="noopener noreferrer">
    <i class="fab fa-github"></i> ROS 2 Jazzy Repository
  </a>
  <a href="https://github.com/yunusdanabas/baxter_noetic" class="btn btn-outline-secondary" role="button" target="_blank" rel="noopener noreferrer">
    <i class="fab fa-github"></i> ROS Noetic Repository
  </a>
</div>

## 1. Overview

This project maintains two complementary software paths for the dual-arm **Baxter Research Robot**. The current focus is a modern, simulation-first stack for **ROS 2 Jazzy**. A separate **ROS Noetic** repository preserves the legacy Baxter SDK workflow while moving it to Python 3 and a reproducible containerized environment.

<div class="table-responsive" markdown="1">

| Stack           | Core environment                                        | Main purpose                                                                         | Current boundary                                                   |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **ROS 2 Jazzy** | Ubuntu 24.04, Gazebo Harmonic, `ros2_control`, MoveIt 2 | Modern simulation, planning, and controller integration                              | Simulation is validated; real-hardware motion is unsupported       |
| **ROS Noetic**  | Ubuntu 20.04, Gazebo Classic, MoveIt, Python 3          | Legacy SDK compatibility, operational tools, simulation, and existing Baxter systems | Noetic is end-of-life; Docker is the recommended reproducible path |

</div>

Keeping the stacks separate avoids hiding the architectural differences between ROS generations. It also gives Baxter users a practical legacy path while the ROS 2 implementation develops against modern control and planning interfaces.

---

## 2. ROS 2 Jazzy: Modern Simulation Stack

The ROS 2 repository provides a hardware-free Baxter environment built around standard Jazzy components:

- **Gazebo Harmonic** simulation with a fixed pedestal model and both arms exposed through `ros2_control`.
- Separate left- and right-arm **joint trajectory controllers** with measured joint-state feedback.
- **MoveIt 2** planning configuration, RViz MotionPlanning visualization, pose-goal clients, and IK queries for both gripper frames.
- Small, reversible example motions, including `sim_tiny_trajectory`, for bounded integration checks.
- A pinned upstream Baxter description dependency so the default build remains reproducible.

The package structure deliberately separates model bring-up, simulation, examples, planning configuration, and the experimental hardware shim. The default build skips the imported ROS 1 bridge package and does not require a robot connection.

### Verified simulation path

The workspace was locally validated by building all nine applicable packages, loading the generated robot description, starting both arm controllers, and executing the reversible trajectory example. Both arms reached the bounded target and returned to their measured starting positions within approximately **0.01 rad**. Gazebo with the MoveIt RViz profile was also checked with the planning and trajectory action interfaces available.

<div class="row">
  <div class="col mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/baxter/ros2_gazebo.png" title="Baxter running in the ROS 2 Jazzy and Gazebo Harmonic simulation" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row">
  <div class="col mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/baxter/ros2_moveit2_rviz.png" title="Gazebo Harmonic and the MoveIt 2 MotionPlanning view in RViz" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 3. ROS Noetic: Legacy Compatibility Stack

The Noetic repository ports the Baxter SDK ecosystem to **ROS Noetic and Python 3**. It retains the pieces needed by existing Baxter installations while providing a simulation-first path for users without access to the robot:

- Baxter interface libraries, messages, services, and action servers.
- Robot enable/disable, tuck/untuck, and camera configuration tools.
- Gazebo Classic simulation, simulated hardware interfaces, and kinematics.
- MoveIt planning configuration and example scripts.
- A local Docker/Compose workflow for running this end-of-life ROS distribution on newer hosts.

The repository was locally checked through a clean Docker image build, six smoke tests, four kinematics tests, key Gazebo and MoveIt launch-file parsing, and Compose configuration validation.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/baxter_gazebo.jpg" title="Baxter in the ROS Noetic Gazebo Classic simulation" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/baxter_robot.png" title="The physical Baxter Research Robot" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 4. Support Boundary

The supported ROS 2 profile is intentionally conservative:

- **Supported and validated:** Gazebo simulation, joint-state feedback, both arm trajectory controllers, reversible arm trajectories, MoveIt 2 visualization, pose goals, and IK queries.
- **Experimental:** the ROS 2 hardware bridge code and mock-test scaffolding.
- **Not implemented in the ROS 2 profile:** camera integration, gripper commands, and tuck/untuck tools.
- **Unsupported:** supervised or autonomous motion on a physical Baxter using the current ROS 2 revision.

The Noetic stack remains the appropriate repository when the legacy camera, gripper, robot-state, or operational tooling is required. Any physical-robot work still requires robot-specific networking, e-stop checks, and an independently reviewed workspace safety procedure.

---

## 5. Engineering Focus

The work across the two repositories centers on maintainable robotics infrastructure rather than a single demonstration:

- separating repeatable simulation checks from hardware-only assumptions,
- translating Baxter's controller and planning model into current ROS 2 interfaces,
- keeping imported dependencies pinned and license boundaries documented,
- making unsupported capabilities visible instead of silently implying parity,
- and providing small motion tests that can detect integration regressions without requiring a full application.

The result is a bridge between a mature but end-of-life ROS 1 ecosystem and a modern ROS 2 simulation environment, with each repository documenting exactly what has been validated.

## 6. Repositories

- [Baxter ROS 2 Jazzy](https://github.com/yunusdanabas/baxter_ros2_jazzy): Gazebo Harmonic, `ros2_control`, MoveIt 2, examples, and experimental bridge scaffolding.
- [Baxter ROS Noetic](https://github.com/yunusdanabas/baxter_noetic): Python 3 SDK port, operational tools, Gazebo Classic, MoveIt, and Docker/Compose setup.

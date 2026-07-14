---
layout: page
title: "2-DOF Manipulator — Model-Based Real-Time Control"
collection: projects
importance: 3
description: "MATLAB/Simulink and TI C2000 control stack: computed-torque, PD with gravity compensation, and joint/task-space transforms for millimetre-level trajectory tracking on a 5-link planar robot in real time."
permalink: /projects/2dof_manipulator/
date: 2024-05-31
category: Course Projects
tags: [robotics, control, real-time]
img: /assets/img/403project/403_project.jpeg
---

## 1. Overview & Motivation

This project—completed for **ME403 — Introduction to Robotics (Spring 2024, Sabancı University)**—developed a **model-based real-time controller** for a **planar 2-DOF, 5-link manipulator**.  
Key goals:

- Achieve **sub-millimetre end-effector accuracy** on dynamic paths
- Bridge **simulation (SIL)** and **embedded deployment (HIL)** seamlessly
- Provide a **re-usable MATLAB/Simulink template** for undergraduate robotics labs

<br>

<div align="center">
  {% include figure.liquid
     path="assets/img/403project/403_project.jpeg"
     title="CAD view and joint layout of the 5-link manipulator"
     class="img-fluid rounded z-depth-1" %}
</div>

<br>

## 2. Control Architecture

The stack follows a **computed-torque framework** augmented with a **PD + gravity compensator**.  
Software is split into **three Simulink model hierarchies** that map 1-to-1 onto TI C2000 peripherals.

| Layer              | Role                                    | Runs On           |
| ------------------ | --------------------------------------- | ----------------- |
| Task-Space Planner | Generates x-y trajectories              | Host PC (SIL/HIL) |
| Controller Core    | Inverse kinematics + computed-torque PD | TI C2000 (HIL)    |
| Motor Interface    | PWM output + encoder decoding           | TI C2000 (HIL)    |

### Control Loop (1 kHz)

1. **Trajectory Sample** – desired end-effector pose
2. **Inverse Kinematics** – joint targets (θ<sub>des</sub>, ẋ<sub>des</sub>)
3. **Computed-Torque Law** – τ = _M_(q)\[\*\]α + _V_ + _G_
4. **PD + G Compensation** – fine-tunes stiffness & damping
5. **PWM Generation** – duty cycles to H-bridges
6. **Encoder Feedback** – closes joint-space loop

```matlab
% Simulink MATLAB Function: Computed-Torque PD
tau = M(q)*(qdd_des + Kd*(qd_des - qd) + Kp*(q_des - q)) ...
      + V(q, qd) + G(q);
```

<br>

## 3. Simulation & Real-Time Testing

| Stage                     | Environment                                        | Purpose                                                               |
| ------------------------- | -------------------------------------------------- | --------------------------------------------------------------------- |
| **SIL**                   | Simscape Multibody + MATLAB ODE45                  | Verify kinematics, dynamics, and controller logic without I/O latency |
| **Processor-in-the-Loop** | TI C2000 F28379D + external mode                   | Measure computation time (< 180 µs / step)                            |
| **HIL**                   | Full manipulator with DC motors & optical encoders | Validate closed-loop tracking and load tolerance                      |

> _Total transition time from SIL to validated HIL: **< 3 hours** thanks to code-gen-friendly model structure._

<br>

> _Completed for **ME403 — Introduction to Robotics (Spring 2024, Sabancı University)**._

---
layout: page
title: "Hand-Steer Sim — Real-Time Gesture Teleoperation for Mobile Robots"
collection: projects
importance: 1
description: >
  Hand-Steer Sim is a vision-only teleoperation stack that converts webcam/RealSense video into ROS
  geometry_msgs/Twist commands for differential-drive robots. It supports two modes—(1) discrete
  hand-sign driving and (2) a steering-wheel metaphor that gates turn commands behind a Holding Wheel
  pose—using MediaPipe landmarks and compact TFLite models. Includes data recording GUI,
  training notebooks, Docker (CPU/GPU), and Gazebo integration.
permalink: /projects/hand_steer_sim/
date: 2025-05-31
category: Course Projects
tags: [robotics, computer-vision, HRI, ROS, Gazebo, MediaPipe, TensorFlow-Lite, Docker]
img: /assets/img/hand_steer_sim/recorder_gui.png
---

<p>
  <a href="https://github.com/yunusdanabas/hand_steer_sim" class="btn btn-outline-primary" role="button" target="_blank">
    <i class="fab fa-github"></i> GitHub Repo
  </a>
  &nbsp;
  <a href="/assets/pdf/hand_steer_sim/EE417_FinalReport_YunusEmreDanabas.pdf" class="btn btn-outline-secondary" role="button" target="_blank">
    <i class="fas fa-file-pdf"></i> Final Report (PDF)
  </a>
</p>

{% include figure.liquid
  path="assets/img/hand_steer_sim/recorder_gui.png"
  title="Recorder GUI used for real-time landmark visualization and fast gesture labeling."
  class="img-fluid rounded z-depth-1"
  loading="eager"
%}

---

## 1. Overview & Motivation

**Hand-Steer Sim** is a gesture-based robot teleoperation system that uses a simple webcam (or RealSense) to control differential-drive robots in real time—no joystick required.

Two control modes are supported:

- **Static (discrete) mode**: single-frame hand signs are translated into incremental `Twist` updates (forward/back, turning, stop).
- **Steering mode**: a "hands-on-wheel" pose enables dynamic steering gestures, while static gestures control speed.

It combines **MediaPipe hand tracking** with lightweight neural models to recognize both **static commands** (e.g., *Stop*, *Speed Up*) and **steering gestures** (e.g., *Turn Left*). Outputs are published to `/cmd_vel` for use in **Gazebo or real robots**.

This project was developed as a **solo capstone for EE417: Computer Vision** at **Sabancı University (Spring 2025)** with the goal of making robot teleop:
- **Cheaper** – no special hardware
- **Smarter** – hybrid gesture control
- **Faster** – 13 ms latency on GPU
- **Reproducible** – Docker & training notebooks included

---

## 2. System Design

Hand-Steer Sim is structured as a **modular ROS Noetic pipeline**, with each major component—vision input, gesture inference, command fusion, and velocity output—implemented as an independent ROS node.

### Topic flow

- **Camera**: `hsim_camera_pub` publishes `sensor_msgs/Image` on `/image_raw` (webcam or RealSense).
- **Static mode**: `hsim_hand_sign` publishes `/gesture/hand_sign`; `hsim_gest2twist` subscribes and publishes `Twist` to the robot controller.
- **Steering mode**: `hsim_steer_sign` publishes `/gesture/steering_static` and `/gesture/steering_dyn`; `hsim_wheel2twist` subscribes to both and publishes `Twist` (turn commands only when *Holding Wheel* is active).

### Gesture-to-Velocity Pipeline

1. **Camera Input** – Streams 960×540 RGB frames at 30 FPS
2. **Landmark Extraction** – MediaPipe Hands detects 21 hand keypoints per frame
3. **Dual-Branch Inference**:
   - *Static MLP* → detects one-shot gestures:  
     `Stop`, `Holding Wheel`, `Speed Up`, `Speed Down`
   - *Dynamic LSTM* → processes 16-frame MCP trajectories for:  
     `Turn Left`, `Turn Right`, `Forward`
4. **Gesture Fusion** – Steering gestures only apply when *Holding Wheel* is detected
5. **ROS Mapping** – Translates gestures into `geometry_msgs/Twist` velocity commands
6. **Actuation** – Commands sent to Gazebo or a real robot (default topic: `/robot_diff_drive_controller/cmd_vel`)

{% include figure.liquid
  path="assets/img/hand_steer_sim/detailed_system_diagram2.png"
  title="Full architecture showing ROS nodes and topic flow."
  class="img-fluid rounded z-depth-1"
%}

### ROS Node Breakdown

| Node | Role | Publishes / Subscribes |
|------|------|------------------------|
| `hsim_camera_pub` | Camera to ROS image stream | Pub: `/image_raw` |
| `hsim_hand_sign` | Static recognizer (single-frame) | Sub: `/image_raw` · Pub: `/gesture/hand_sign` |
| `hsim_gest2twist` | Discrete gesture to Twist | Sub: `/gesture/hand_sign` · Pub: `/robot_diff_drive_controller/cmd_vel` |
| `hsim_steer_sign` | Steering recognizer (static + dynamic) | Sub: `/image_raw` · Pub: `/gesture/steering_static`, `/gesture/steering_dyn` |
| `hsim_wheel2twist` | Gated fusion to Twist | Sub: `/gesture/steering_static`, `/gesture/steering_dyn` · Pub: `/robot_diff_drive_controller/cmd_vel` |
| `gazebo_ros_control` | Optional sim controller | Sub: `/robot_diff_drive_controller/cmd_vel` |

### Launching the System

```bash
roslaunch hand_steer_sim sign_control.launch \
           control_mode:=steering \
           show_image:=true \
           use_gpu:=true
```

- Set `control_mode:=static` for discrete hand-sign driving.
- `show_image:=true` enables the OpenCV overlay windows.
- `use_gpu:=true` enables the TFLite GPU delegate where supported.

---

## 3. Gesture-to-Velocity Mapping

Gesture labels are converted to `geometry_msgs/Twist` increments for a differential-drive robot:

| Gesture | Linear velocity (m/s) | Angular velocity (rad/s) |
|---------|----------------------:|-------------------------:|
| Stop | 0.00 | 0.00 |
| Speed Up | +0.08 | No change |
| Speed Down | −0.08 | No change |
| Turn Left | No change | +0.05 |
| Turn Right | No change | −0.05 |
| Forward | No change | No change |

Turn Left/Right are applied only when **Holding Wheel** is active. Outputs are clamped for safety (e.g., `|v| ≤ 2.0 m/s`, `|ω| ≤ 2.0 rad/s` in steering mode).

---

## 4. Models & Data

Hand-Steer Sim uses a **dual-branch neural architecture**: **static gestures** from a single frame, and **dynamic gestures** from short motion trajectories. Both branches are small and run with **TensorFlow Lite** for real-time deployment on CPU or GPU.

### Neural Models

#### Static Gesture Classifier (MLP)
- **Input:** 42-D vector (21 hand landmarks × 2D, wrist-normalized and scaled)
- **Classes:** `Stop`, `Holding Wheel`, `Speed Up`, `Speed Down`
- **Architecture:** 20 → 10 → 4 neurons
- **Size:** ~1.1k parameters → 4.4 kB (TFLite, FP16)

#### Dynamic Steering Classifier (LSTM)
- **Input:** 128-D vector (16 frames × 4 MCP joints × 2D); MCP joints: indices 5, 9, 13, 17
- **Classes:** `Turn Left`, `Turn Right`, `Forward`
- **Architecture:** LSTM(32) → Dense(32) → 3-class Softmax
- **Size:** ~6.4k parameters → 25 kB (TFLite, FP16)

**Inference latency:** GPU (RTX 4060 Ti) ~8.5 ms total (both branches); CPU (ThinkPad E14) ~20 ms total.

### Gesture Types

| Branch | Gesture | Purpose |
|--------|---------|---------|
| Static | Stop | Freeze all movement |
| | Holding Wheel | Enable dynamic gestures |
| | Speed Up | Increment linear velocity |
| | Speed Down | Decrement linear velocity |
| Dynamic | Turn Left | Adjust angular velocity (+) |
| | Turn Right | Adjust angular velocity (−) |
| | Forward | Maintain direction (no turn) |

*All dynamic outputs are gated by the Holding Wheel gesture. Temporal smoothing (majority vote over 16 frames) reduces flicker.*

### Dataset Overview

Collected using a custom GUI that overlays landmarks and allows fast class labeling. All data was captured using a RealSense D435 or webcam at 960×540 @ 30 FPS. Data split: **train/val/test = 60% / 15% / 25%** (single split; no cross-validation).

| Gesture Type | Classes | Total Samples |
|--------------|---------|---------------|
| Static | 4 | ~4,600 |
| Dynamic | 3 | ~1,700 |

---

## 5. Results & Performance

Benchmarks are for **gesture accuracy**, **latency**, and **real-time responsiveness**. Both classifiers were evaluated on held-out test sets. *Caveat: data from a single participant and a single split.*

### Accuracy (Test Set)

**Static MLP** – 4-class: **99.65%** accuracy, macro-F1 **1.00**.  
**Dynamic LSTM** – 3-class: **99.77%** accuracy, macro-F1 **1.00**.

<details markdown="1">
<summary><strong>Confusion Matrix — Static MLP</strong></summary>

| True \ Pred | Stop | Hold | Up | Down |
|-------------|-----:|-----:|---:|-----:|
| **Stop** | **464** | 0 | 0 | 0 |
| **Hold** | 0 | **125** | 0 | 0 |
| **Up** | 0 | 0 | **279** | 0 |
| **Down** | 0 | 0 | 1 | **287** |
</details>

<details markdown="1">
<summary><strong>Confusion Matrix — Dynamic LSTM</strong></summary>

| True \ Pred | Left | Right | Forward |
|-------------|-----:|------:|--------:|
| **Left** | **128** | 0 | 0 |
| **Right** | 0 | **126** | 0 |
| **Forward** | 0 | 1 | **174** |
</details>

### Latency Benchmarks

Measured on 960×540 @ 30 FPS. End-to-end includes camera decode, inference, and display/publish overhead.

| Platform | Decode (ms) | Inference (ms) | Display (ms) | Total E2E (ms) | FPS |
|----------|------------:|---------------:|-------------:|----------------:|----:|
| **GPU (RTX 4060 Ti)** | 0.5 | 8.6 | 4.0 | **13.2** | 76 |
| ThinkPad E14 (CPU) | 0.5 | 20.1 | 4.3 | 25.0 | 39 |
| ThinkPad E14 + Gazebo | 4.7 | 94.1 | 10.7 | 109.6 | 9 |

The core pipeline runs in real time on CPU; **Gazebo adds significant load** on laptop-class CPU, so GPU is the practical option for smooth simulation.

### Practical Notes & Limitations

- **Forward gesture**: Although offline metrics are high, *Forward* is harder to hold steadily in real time because it is more symmetric than lateral turns; small deviations can be misread as steering. A **dead-zone filter** in the mapping node is a natural next step.
- **Steering metaphor**: A "wheel" metaphor fits **Ackermann steering** better than differential drive; switching the simulated vehicle model could improve usability.
- **Generalization**: Broader validation across users, lighting, and camera placement is needed for claims beyond this prototype.

---

## 6. Deployment

Hand-Steer Sim is containerized and runs with one ROS launch or Docker command. Pretrained models and configuration files are included, with reproducible training notebooks.

### Run It

**Native ROS (recommended):**

```bash
roslaunch hand_steer_sim sign_control.launch \
           control_mode:=steering \
           use_gpu:=true \
           show_image:=false
```

**Docker (GPU example):**

```bash
docker run -it --rm --gpus all \
  --network host \
  -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix \
  -v $(pwd)/hand_steer_sim/model:/ws/src/hand_steer_sim/model \
  yunusdanabas/hand_steer_sim:gpu
```

### Demo Videos

<div align="center">
  <iframe src="https://drive.google.com/file/d/1TVqnACMAsV_UAXI_ogMS3fXAkhr-mNMN/preview"
          width="640" height="360" allow="autoplay"></iframe>
  <p><em>Live inference overlay with gesture predictions and FPS.</em></p>
  <br/>
  <iframe src="https://drive.google.com/file/d/1TkqudJsSXfxzetYAVJHKoW3ILWf8vWRE/preview"
          width="640" height="360" allow="autoplay"></iframe>
  <p><em>Driving demonstration in Gazebo using gestures only.</em></p>
</div>

---

Hand-Steer Sim was built as a **solo capstone project** for **EE417 — Computer Vision (Spring 2025, Sabancı University)**.

> *No license restrictions — feel free to fork, adapt, and improve.*

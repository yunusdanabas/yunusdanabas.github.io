---
layout: page
title: "Hand-Steer Sim — Real-Time Gesture Teleoperation for Mobile Robots"
collection: projects
importance: 1
description: Hand-Steer Sim is a webcam-driven teleoperation stack that translates hand gestures into ROS /cmd_vel commands in real time. MediaPipe landmarks feed a 1 k-param MLP for four static actions and a 6 k-param LSTM for steering trajectories, achieving 99 % accuracy with 13 ms end-to-end latency. One launch or Docker run controls a Gazebo (or real) differential-drive robot—no joystick required.
permalink: /projects/hand_steer_sim/
date: 2025-05-31
category: Course Projects
tags: [robotics, computer-vision, HRI]
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


## 1. Overview & Motivation

**Hand-Steer Sim** is a gesture-based robot teleoperation system that uses a simple webcam (or RealSense) to control differential-drive robots in real time—no joystick required.

It combines **MediaPipe hand tracking** with lightweight neural models to recognize both **static commands** (e.g., *Stop*, *Speed Up*) and **steering gestures** (e.g., *Turn Left*). Outputs are published to `/cmd_vel` for use in **Gazebo or real robots**.

This project was developed as a **solo capstone for EE417: Computer Vision** at **Sabancı University (Spring 2025)** with the goal of making robot teleop:
- **Cheaper** – no special hardware
- **Smarter** – hybrid gesture control
- **Faster** – 13 ms latency on GPU
- **Reproducible** – Docker & training notebooks included
```


<br>

## 2. System Design

Hand-Steer Sim is structured as a **modular ROS Noetic pipeline**, with each major component—vision input, gesture inference, command fusion, and velocity output—implemented as an independent ROS node. This modularity allows easy deployment, testing, and integration with both simulation and real robots.


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
6. **Actuation** – Commands sent to Gazebo or a real robot via `/cmd_vel`

<br>

<div align="center">
  <img src="/assets/img/hand_steer_sim/detailed_system_diagram2.png"
       width="88%" alt="System Diagram">
  <p><em>Figure – Full architecture showing ROS nodes and topic flow.</em></p>
</div>

<br>

### ROS Node Breakdown

| Node              | Role                                      | Publishes / Subscribes |
|-------------------|-------------------------------------------|-------------------------|
| `hsim_camera_pub` | Streams camera frames                     | `/image_raw`           |
| `hsim_steer_sign` | Landmark detection + MLP/LSTM inference   | `/gesture/static`, `/gesture/dynamic` |
| `hsim_wheel2twist`| Gated fusion + velocity output            | `/cmd_vel`             |
| `gazebo_ros_control` | Simulated diff-drive robot controller  | `/cmd_vel` input       |

<br>

### Launching the System

```bash
roslaunch hand_steer_sim sign_control.launch \
           control_mode:=steering \
           show_image:=true \
           use_gpu:=true
```

This command starts the full loop:

* Webcam or RealSense input
* Gesture recognition
* Fusion and velocity mapping
* Gazebo simulation (optional)

You can toggle between static-only or steering control via `control_mode`.

<br>


## 3. Models & Data

Hand-Steer Sim uses a **dual-branch neural architecture** to recognize two gesture types:  
**Static gestures** from a single frame, and  
**Dynamic gestures** from short motion trajectories.

Each branch is optimized for speed and low memory, allowing real-time deployment on CPU or GPU—even in simulation.

### Neural Models

#### Static Gesture Classifier (MLP)
- **Input:** 42-D vector (21 hand landmarks × 2D, wrist-normalized and scaled)  
- **Classes:** `Stop`, `Holding Wheel`, `Speed Up`, `Speed Down`  
- **Architecture:** 20 → 10 → 4 neurons  
- **Size:** ~1.1k parameters → 4.4 kB (TFLite, FP16)

#### Dynamic Steering Classifier (LSTM)
- **Input:** 128-D vector (16 frames × 4 MCP joints × 2D)  
- **Classes:** `Turn Left`, `Turn Right`, `Forward`  
- **Architecture:** LSTM(32) → Dense(32) → 3-class Softmax  
- **Size:** ~6.4k parameters → 25 kB (TFLite, FP16)

**Inference latency:**  
- GPU (RTX 4060 Ti): ~8.5 ms total (both branches)  
- CPU (ThinkPad E14): ~20 ms total


### Gesture Types

| Branch   | Gesture        | Purpose                            |
|----------|----------------|------------------------------------|
| Static   | Stop           | Freeze all movement                |
|          | Holding Wheel  | Enable dynamic gestures            |
|          | Speed Up       | Increment linear velocity          |
|          | Speed Down     | Decrement linear velocity          |
| Dynamic  | Turn Left      | Adjust angular velocity (+)        |
|          | Turn Right     | Adjust angular velocity (–)        |
|          | Forward        | Maintain direction (no turn)       |

*Note: All dynamic outputs are gated by the Holding Wheel gesture.*


### Dataset Overview

Collected using a custom GUI that overlays landmarks and allows fast class labeling.  
All data was captured using a RealSense D435 or webcam at 960 × 540 @ 30 FPS.

| Gesture Type | Classes | Total Samples | Train / Val / Test Split |
|--------------|---------|----------------|---------------------------|
| Static       | 4       | ~4,600         | 60% / 15% / 25%           |
| Dynamic      | 3       | ~1,700         | 60% / 15% / 25%           |

<br>

<div align="center">
  <img src="/assets/img/hand_steer_sim/recorder_gui.png"
       width="70%" alt="Recorder GUI"/>
  <p><em>Figure – Real-time recording interface used for data collection.</em></p>
</div>


<br>

## 4. Results & Performance

Hand-Steer Sim was benchmarked for **gesture accuracy**, **latency**, and **real-time responsiveness** under both CPU and GPU conditions. Both classifiers were tested on held-out test sets with no data leakage across splits.


### Accuracy (Test Set)

**Static MLP** – 4-class classification  
- Accuracy: **99.65%**  
- Macro-F1: **1.00**  

**Dynamic LSTM** – 3-class classification  
- Accuracy: **99.77%**  
- Macro-F1: **1.00**


<details markdown="1">
<summary><strong>Confusion Matrix — Static MLP</strong></summary>

| True \ Pred | Stop | Hold | Up | Down |
|-------------|-----:|-----:|---:|-----:|
| **Stop**    | **464** | 0 | 0 | 0 |
| **Hold**    | 0 | **125** | 0 | 0 |
| **Up**      | 0 | 0 | **279** | 0 |
| **Down**    | 0 | 0 | 1 | **287** |
</details>

<details markdown="1">
<summary><strong>Confusion Matrix — Dynamic LSTM</strong></summary>

| True \ Pred | Left | Right | Forward |
|-------------|-----:|------:|--------:|
| **Left**    | **128** | 0 | 0 |
| **Right**   | 0 | **126** | 0 |
| **Forward** | 0 | 1 | **174** |
</details>

<br>

### Latency Benchmarks

All timing was measured on 960 × 540 input frames at 30 FPS.

| Platform         | MediaPipe + Inference | Full Loop (E2E) | FPS  |
|------------------|------------------------|------------------|------|
| **GPU (RTX 4060 Ti)** | 8.6 ms                | **13.2 ms**       | 75   |
| CPU (ThinkPad E14)    | 20.1 ms               | 25.0 ms           | 39   |
| CPU + Gazebo Sim      | 94.1 ms               | 109.6 ms          | 9    |

- All gestures were recognized well within real-time limits.
- Temporal smoothing (majority voting over 16 frames) ensured stable behavior.

<br>

### Observations

- **Forward** gesture was hardest to maintain continuously due to its symmetry; proposed dead-zone filtering may improve robustness.  
- **Steering gestures** were intuitive once the Holding Wheel condition was learned.  
- Control was responsive even on CPU-only systems, especially without simulation load.

<br>


## 5. Deployment & Future Work

Hand-Steer Sim is fully containerized and runs with one ROS launch or Docker command.  
Pretrained models and configuration files are included, with reproducible training notebooks.


### Run It

**Native ROS (recommended):**

```bash
roslaunch hand_steer_sim sign_control.launch \
           control_mode:=steering \
           use_gpu:=true \
           show_image:=false
```

**Or via Docker:**

```bash
docker run --rm -it --gpus all \
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


### Future Work

* **Ackermann steering** – make wheel gestures feel more intuitive
* **Two-handed control** – enable lights, indicators, emergency stop
* **User studies** – evaluate learnability and gesture fatigue
* **Attention models** – explore finer finger/hand nuance detection

<br>

---

Hand-Steer Sim was built as a **solo capstone project** for
**EE417 — Computer Vision (Spring 2025, Sabancı University)**.

> *No license restrictions — feel free to fork, adapt, and improve.*

````markdown
---
layout: page
title: "Hand-Steer Sim — Real-Time Gesture Teleoperation for Mobile Robots"
collection: projects
importance: 1
permalink: /projects/hand_steer_sim/
date: 2025-05-31
category: Course Projects
tags: [robotics, computer-vision, HRI]
image:
  path: /assets/img/hand_steer_sim/recorder_gui.png
  alt: Data-collection GUI
links:
  - label: "GitHub Repo"
    icon: "fab fa-github"
    url: https://github.com/yunusdanabas/hand_steer_sim
  - label: "Final Report (PDF)"
    icon: "fas fa-file-pdf"
    url: /assets/pdf/hand_steer_sim/EE417_FinalReport_YunusEmreDanabas.pdf
---

<div align="center">
  <img src="/assets/img/hand_steer_sim/detailed_system_diagram2.png"
       width="88%" alt="System overview"/>
</div>

Hand-Steer Sim turns an off-the-shelf **webcam / Intel RealSense** into a steering wheel for differential-drive robots.  
The complete loop—**camera → landmarks → dual-branch NN → ROS / cmd_vel**—executes in **13 ms** on consumer GPUs (≈ 25 ms CPU-only) with **99 % macro-F1 accuracy**.

---

## 🚀 Why bother?

| Challenge | Traditional fix | Hand-Steer Sim solution |
|-----------|-----------------|-------------------------|
| **Hardware cost & cables** | Joystick / wheel | <$20 webcam |
| **Limited accessibility**  | Requires fine motor skills | Natural hand gestures |
| **Setup friction**         | Drivers, pairing, wiring | One-command Docker |

---

## ⚙️ How it works

1. **Capture** – 960 × 540 @ 30 FPS camera frames.  
2. **Landmarks** – MediaPipe Hands returns 21 key-points in ~3 ms.  
3. **Dual-branch inference**  
   - *Static MLP* (1 k params) → **Stop · Holding-Wheel · Speed ±**  
   - *Dynamic LSTM* (6 k params) → **Turn L/R · Forward**  
4. **Gesture fusion** – Dynamic turns are accepted **only** while *Holding-Wheel* is active (prevents accidental yaws).  
5. **Twist mapping** – Discrete speed steps (±0 .08 m s⁻¹) and angular increments (±0 .05 rad s⁻¹) are clamped for safety.  
6. **Actuation** – Same `Twist` topic drives Gazebo **or** a real robot.

<details markdown="1">
<summary><strong>ROS node graph 📈</strong></summary>

| Node | Description | Pub → Sub |
|------|-------------|-----------|
| **hsim_camera_pub** | Camera ↗ `sensor_msgs/Image` | `/image_raw` |
| **hsim_steer_sign** | Landmark + NN inference | `/gesture/static`<br>`/gesture/dynamic` |
| **hsim_wheel2twist** | Fuse & map to velocity | `/cmd_vel` |
| **gazebo plugins** | Diff-drive simulation | `/robot_diff_drive_controller/cmd_vel` |
</details>

---

## 🧠 Model snapshots

|   | Static MLP | Dynamic LSTM |
|---|------------|--------------|
| **Input** | 42-D wrist-normalised vector | 128-D (16 × 4 MCP × x,y) |
| **Topology** | 20-10-4 | 32-Dense-3 |
| **Size** | 1 114 params (4 kB) | 6 403 params (25 kB) |
| **Quantisation** | FP-16 TFLite | FP-16 TFLite |

---

## 📊 Key results

| Metric | GPU (RTX 4060 Ti) | Laptop CPU |
|--------|------------------|-----------|
| **Latency** (E2E) | **13 ms** | 25 ms |
| **Throughput** | 75 FPS | 39 FPS |
| **Accuracy** | 99 % (static) · 99 % (dynamic) | — |

### Confusion matrices

<details markdown="1">
<summary>Static MLP (4 classes)</summary>

| True \ Pred | Stop | Hold | Up | Down |
|-------------|----:|----:|---:|----:|
| **Stop**    | **464** | 0 | 0 | 0 |
| **Hold**    | 0 | **125** | 0 | 0 |
| **Up**      | 0 | 0 | **279** | 0 |
| **Down**    | 0 | 0 | 1 | **287** |
</details>

<details markdown="1">
<summary>Dynamic LSTM (3 classes)</summary>

| True \ Pred | L | R | F |
|-------------|--:|--:|--:|
| **L**       | **128** | 0 | 0 |
| **R**       | 0 | **126** | 0 |
| **F**       | 0 | 1 | **174** |
</details>

---

## 📚 Data at a glance

| Split | Static samples | Dynamic samples |
|-------|---------------:|----------------:|
| Train | 3  –  4 k | ~1 k |
| Val   |  ~700 |  250 |
| Test  | 1  176 |  429 |

*Recorded with the GUI below (hand landmarks & class ID shown live).*

<div align="center">
  <img src="/assets/img/hand_steer_sim/recorder_gui.png"
       width="70%" alt="Recorder GUI"/>
</div>

---

## 🏃‍♂️ Quick start

```bash
# native or Docker – both work
roslaunch hand_steer_sim sign_control.launch \
           control_mode:=steering \
           show_image:=true
````

*Need Docker?* `docker pull yunusdanabas/hand_steer_sim:gpu`

---

## 🎬 Demo clips

<div align="center">
  <iframe src="https://drive.google.com/file/d/1TVqnACMAsV_UAXI_ogMS3fXAkhr-mNMN/preview"
          width="640" height="360" allow="autoplay"></iframe>
  <br><em>Live inference overlay (fps + predictions).</em><br><br>
  <iframe src="https://drive.google.com/file/d/1TkqudJsSXfxzetYAVJHKoW3ILWf8vWRE/preview"
          width="640" height="360" allow="autoplay"></iframe>
  <br><em>Driving a diff-drive robot in Gazebo.</em>
</div>

---

## 🔭 What’s next?

* Ackermann-steered vehicle for truer “wheel” behaviour
* Two-handed gestures (lights, horn, e-stop)
* User study on intuitiveness & fatigue

---

Developed as a **solo capstone** for **EE417 — Computer Vision** (Spring 2025, Sabancı University).
Built with MediaPipe, TensorFlow Lite, ROS Noetic and Gazebo.

> *No explicit license — feel free to fork, modify, and share.*
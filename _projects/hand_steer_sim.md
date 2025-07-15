---
title: "Hand-Steer Sim: Real-Time Gesture Teleoperation for Mobile Robots"
collection: projects
permalink: /project/hand_steer_sim/
date: 2025-05-31
tags: [robotics, computer-vision, HRI]
category: Course Projects
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
  <img src="/assets/img/hand_steer_sim/detailed_system_diagram.png" width="90%" alt="Detailed system diagram"/>
</div>

Hand-Steer Sim is a **camera-only gesture-teleoperation stack** that converts live webcam or Intel® RealSense™ frames into velocity commands for differential-drive robots.  
The entire loop—vision → neural inference → ROS `Twist`—runs in **13 ms** on consumer GPUs (≈ 25 ms CPU-only) while sustaining **99 % classification accuracy**.

---

## 1. Motivation & Problem Statement
Physical controllers (joysticks, steering wheels) add cost, cables and accessibility barriers, especially in education and field robotics.  
**Goal:** *Replace dedicated hardware with a <$20 webcam* **without sacrificing latency or control granularity.**

Key requirements:

| ID | Requirement | Target |
|----|-------------|--------|
| **R1** | Real-time operation @ 30 FPS | E2E latency ≤ 30 ms |
| **R2** | High recognition accuracy | ≥ 97 % macro-F1 |
| **R3** | Hybrid control | 4 static + 3 proportional steering gestures |
| **R4** | Turn-key reproducibility | One-command Docker launch |

---

## 2. System Architecture

```

```
  +-------------+      +---------------------+      +------------------+
```

RGB → | MediaPipe   | -->  |  Dual-Branch Inference | --> |  Gesture Fusion  |
frame | 21 landmarks|      |  • Static MLP (4 cls) |      |  • Gating logic  |
+-------------+      |  • Dynamic LSTM (3)  |      +---------+--------+
\| ROS  /gesture/\*  |
+---------v--------+
|
\| mapping
+---------+--------+
\|  Twist Mapper    |
\|  (/cmd\_vel)      |
+---------v--------+
|
+---------+--------+
\| Gazebo / Robot  |
+------------------+

````

* **Vision front-end:** MediaPipe Hands (21 landmarks @ 30 FPS).  
* **Inference:**  
  * **Static branch** – 42-D feature → 1 k-param MLP  
  * **Dynamic branch** – 128-D trajectory → 6 k-param LSTM  
* **Fusion:** Dynamic turn commands are *gated* by the *Holding Wheel* pose.  
* **ROS nodes:** Each stage is an isolated Python node; launch files chain them.

| Node | Role | Topic IO |
|------|------|----------|
| `hsim_camera_pub` | Webcam / RealSense → ROS `Image` | `/image_raw` |
| `hsim_steer_sign` | Landmark extraction + dual-branch inference | `/gesture/static`, `/gesture/dynamic` |
| `hsim_wheel2twist` | Gesture fusion + velocity mapping | `/cmd_vel` |
| `gazebo_ros_control` | Diff-drive simulation | `/robot_diff_drive_controller/cmd_vel` |

---

## 3. Data Collection & Dataset

<div align="center">
  <img src="/assets/img/hand_steer_sim/recorder_gui.png" width="75%" alt="Recorder GUI"/>
  <p><em>Figure 1 – High-FPS recorder annotates gestures in real time.</em></p>
</div>

* One participant, controlled lighting, 960 × 540 @ 30 FPS  
* **Static**: wrist-normalised 42-D vector (21 × x,y)  
* **Dynamic**: 16-frame history of 4 MCP joints → 128-D

### Dataset split

| Branch | Label | Train | Val | Test | Total |
|--------|-------|------:|----:|-----:|------:|
| Static | Stop | 1 089 | 269 | 464 | 1 822 |
|        | Holding Wheel | 344 | 78 | 125 | 547 |
|        | Speed Up | 618 | 167 | 279 | 1 064 |
|        | Speed Down | 723 | 180 | 288 | 1 191 |
| Dynamic | Turn Left | 301 | 82 | 129 | 512 |
|         | Turn Right | 283 | 87 | 134 | 504 |
|         | Forward | 443 | 88 | 166 | 697 |

---

## 4. Feature Engineering

```python
# 42-D static vector (pseudo-code)
pts -= pts[0]                      # wrist-relative
vec = pts.flatten()                # x1,y1,x2,y2,...
vec /= np.abs(vec).max()           # scale to ±1

# 128-D dynamic vector
mcp_hist -= mcp_hist[0,0,:]        # origin = first MCP
mcp_hist[:,:,0] /= img_w
mcp_hist[:,:,1] /= img_h
vec = mcp_hist.reshape(-1)         # 16 × 4 × 2
````

* **Temporal smoothing:** majority vote across the last **16 frames** of dynamic predictions.
* **Quantisation:** FP16 TFLite → 4.4 kB (MLP) & 25 kB (LSTM).

---

## 5. Model Architectures

| Static MLP          | Output shape |    Params |
| ------------------- | ------------ | --------: |
| Input (42)          | –            |         – |
| Dense (20) + ReLU   | 20           |       860 |
| Dense (10) + ReLU   | 10           |       210 |
| Dense (4) + Softmax | 4            |        44 |
| **Total**           | –            | **1 114** |

| Dynamic LSTM        | Output shape |    Params |
| ------------------- | ------------ | --------: |
| Reshape (16, 8)     | –            |         0 |
| LSTM (32)           | 32           |     5 248 |
| Dense (32) + ReLU   | 32           |     1 056 |
| Dense (3) + Softmax | 3            |        99 |
| **Total**           | –            | **6 403** |

*Training:* Adam 0.001, early-stop on val-loss; \~100 epochs (MLP), 36 epochs (LSTM).

---

## 6. Results

### Confusion matrices

#### Static (MLP)

| True\Pred   |    Stop | Holding |      Up |    Down |
| ----------- | ------: | ------: | ------: | ------: |
| **Stop**    | **464** |       0 |       0 |       0 |
| **Holding** |       0 | **125** |       0 |       0 |
| **Up**      |       0 |       0 | **279** |       0 |
| **Down**    |       0 |       0 |       1 | **287** |

#### Dynamic (LSTM)

| True\Pred |       L |       R |       F |
| --------- | ------: | ------: | ------: |
| **L**     | **128** |       0 |       0 |
| **R**     |       0 | **126** |       0 |
| **F**     |       0 |       1 | **174** |

### Latency (1000 frames, 960 × 540)

| Platform     | Decode |  Inference | Display |   **Total** |  FPS |
| ------------ | -----: | ---------: | ------: | ----------: | ---: |
| RTX 4060 Ti  | 0.5 ms | **8.6 ms** |  4.0 ms | **13.2 ms** | 75.7 |
| ThinkPad CPU |    0.5 |       20.1 |     4.3 |        25.0 | 39.5 |
| CPU + Gazebo |    4.7 |       94.1 |    10.7 |       109.6 |  9.7 |

---

## 7. Deployment & Usage

```bash
# launch everything (camera → gestures → /cmd_vel → Gazebo)
roslaunch hand_steer_sim sign_control.launch \
           control_mode:=steering \
           use_gpu:=true \
           show_image:=false
```

*Linear velocity* is increased/decreased in **0.08 m s⁻¹** steps.
*Angular velocity* changes by **0.05 rad s⁻¹** while *Holding Wheel* is active.

### Docker images

| Tag                               | Base                     | Purpose              |
| --------------------------------- | ------------------------ | -------------------- |
| `yunusdanabas/hand_steer_sim:cpu` | Ubuntu 22.04, ROS Noetic | Quick CPU demo       |
| `yunusdanabas/hand_steer_sim:gpu` | CUDA 11.8, cuDNN 8       | TF-Lite GPU delegate |

---

## 8. Demo Videos

<div align="center">
  <iframe src="https://drive.google.com/file/d/1TVqnACMAsV_UAXI_ogMS3fXAkhr-mNMN/preview" width="640" height="360" allow="autoplay"></iframe>
  <p><em>Live inference overlay (FPS, predictions).</em></p>
  <br/>
  <iframe src="https://drive.google.com/file/d/1TkqudJsSXfxzetYAVJHKoW3ILWf8vWRE/preview" width="640" height="360" allow="autoplay"></iframe>
  <p><em>Driving demonstration in Gazebo.</em></p>
</div>

---

## 9. Future Work

* **Ackermann-steered robot** to match the steering-wheel metaphor
* **Two-handed gestures** for auxiliary commands (lights, horn, e-stop)
* **User study** on learnability, fatigue & accessibility
* **Attention-based models** to capture finer finger motion

---

Hand-Steer Sim was developed as a **solo capstone project** for **EE417 — Computer Vision (Spring 2025, Sabancı University)**.
It builds on MediaPipe, TensorFlow Lite, ROS Noetic and Gazebo.

> *No explicit license — feel free to fork, modify and share.*

```
```

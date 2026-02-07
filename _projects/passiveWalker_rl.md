---
layout: page
title: "Passive Walker RL — Curriculum-Driven Biped Locomotion in JAX & Brax"
collection: projects
importance: 4
description: |
  A three-stage pipeline (≤ 300 LoC per stage) that bootstraps a passive-dynamic biped
  from a finite-state expert to a GPU-scale PPO policy in minutes.  MuJoCo supplies
  fidelity; Brax pushes > 1 M env-steps s⁻¹ for massive sweeps, yielding smooth,
  sample-efficient walking with a single 1 M-param network.
permalink: /projects/passive_walker_rl/
date: 2025-05-30
category: Research Projects
tags: [reinforcement-learning, robotics, jax, brax]
img: /assets/img/passive_walker_rl/xml_passive_walker.png     # social share banner
author: Yunus Emre Danabaş
---

<p>
  <a class="btn btn-outline-primary" target="_blank"
     href="https://github.com/yunusdanabas/passive_walker_rl">
    <i class="fab fa-github"></i> Source&nbsp;Code
  </a>
  <a class="btn btn-outline-secondary" target="_blank"
     href="/assets/pdf/passive_walker_rl/ENS492_Final.pdf">
    <i class="fas fa-file-pdf"></i> Full&nbsp;Report
  </a>
  &nbsp;
  <a class="btn btn-outline-secondary" target="_blank"
     href="/assets/pdf/passive_walker_rl/ENS492_Presentation.pdf">
    <i class="fas fa-file-powerpoint"></i> Slides
  </a>
</p>

## 1 · Overview & Motivation

> **Problem statement —** *How can a passive-dynamic biped learn a stable downhill gait in **fewer than 10⁶ simulation steps** on commodity hardware?*

Bipedal walking is an under-actuated, contact-rich control problem; naïve RL burns millions of samples.  
**Passive Walker RL** solves this with a **three-component curriculum**, each **≤ 300 lines of code**, executed end-to-end in JAX.

| Stage | Engine & Size | Core Idea | One-Sentence Takeaway | Wall-Clock † |
|-------|---------------|-----------|-----------------------|--------------|
| **Finite-State Expert** | MuJoCo XML · 100 LoC | Hip swing ±0.3 rad, knees retract on contact | Generates **≈ 30 k** fault-tolerant demos in 30 s | < 30 s |
| **Behaviour Cloning** | 2-layer MLP (~10 k params) · Equinox | Supervised fit (MSE / Huber / L1) from 11-D proprio to 3 joint targets | Delivers a “walk-from-boot” policy scoring **0.26 Δx step⁻¹** | 2–3 min (CPU) |
| **PPO Fine-Tuning** | Brax 2 · Optax | BC-initialised actor + critic, imitation loss β(t)→0 | Reaches **steady gait in 10⁵ steps, 5× faster** than scratch | 8 min (RTX 4060 Ti) |

† Measured on AMD Ryzen 7 5800H + RTX 4060 Ti, physics Δt = 1 ms.

Why it matters  
: *Curriculum beats brute force* (an order-of-magnitude fewer samples);  
  *MuJoCo fidelity + Brax speed* (> 1 M env-steps s⁻¹);  
  *Compact yet expressive* (1 M-param policy);  
  *Reproducible* (hash-named artefacts, one-command replay);  
  *Open* (≈ 6 k LoC, MIT).

---

## 2 · Physics Model & Environment

The walker (Fig.&nbsp;1) is a five-body planar biped with seven DoF—slide-x, slide-z, yaw, one hip hinge, two prismatic knees—walking down an 11.5° virtual slope.

<table>
<tr>
  <td width="48%">
    <img src="/assets/img/passive_walker_rl/fsm/joint_kinematics.png"
         alt="Joint angles and velocities over a gait cycle" width="100%">
  </td>
  <td width="48%">
    <img src="/assets/img/passive_walker_rl/fsm/body_motion.png"
         alt="Torso pitch angle and forward speed evolution" width="100%">
  </td>
</tr>
<tr>
  <td width="48%">
    <img src="/assets/img/passive_walker_rl/fsm/foot_height.png"
         alt="Swing- and stance-foot height versus time" width="100%">
  </td>
  <td width="48%">
    <img src="/assets/img/passive_walker_rl/fsm/com_path.png"
         alt="Center-of-mass path in the sagittal plane" width="100%">
  </td>
</tr>
</table>

**Fig.&nbsp;1 —** Finite-state expert trajectories: cyclic joint timing, stable torso pitch, periodic CoM track.

---

## 3 · Curriculum Stages

### 3.1 Finite-State Expert  
Two hip states and a knee retraction FSM produce demonstrations at 1 kHz; **≈ 30 000** state-action pairs per run.

### 3.2 Behaviour Cloning  
**Observation Vector (11 Dimensions)**
Each timestep provides the following standardized features:

* **Positional state:** `x`, `z`, torso pitch angle
* **Velocities:** `ẋ`, `ż`, hip angular velocity, knee linear velocities
* **Joint positions:** hip angle, left/right knee extensions
* **Joint velocities:** hip q̇, left/right knee q̇

All features are extracted from MuJoCo in physical units and z-score normalised (zero mean, unit variance).



<div align="center">
  <img src="/assets/img/passive_walker_rl/bc/method_comparison.png"
       alt="Comparison of BC loss functions: training curves, final rewards, and runtime"
       width="85%">
  <p><em>Figure 3 — Performance comparison of behaviour cloning variants across loss types.</em></p>
</div>

**Table 1 — Final MSE and Reward for Each Loss Variant**

| Loss Function  | Final MSE      | Mean Δx per Step |
| -------------- | -------------- | ---------------- |
| MSE            | **4.7 × 10⁻⁴** | 0.25             |
| Huber          | 5.0 × 10⁻⁴     | **0.26**         |
| L1             | 7.1 × 10⁻⁴     | 0.23             |
| Combined (Avg) | 5.4 × 10⁻⁴     | 0.25             |

> Huber loss achieved the best trade-off, yielding the highest downstream reward despite slightly higher MSE.


### 3.3 PPO Fine-Tuning  

*Reward function*   \(r_t = x_{t+1} - x_t\) (forward progress).  
*Termination* — episode ends if  

* torso z < 0.5 m *(height drop)*, or  
* \|pitch\| > 0.8 rad *(excessive tilt)*.

PPO hyper-parameters:

| Parameter | Value | Notes |
|-----------|-------|-------|
| γ | 0.99 | discount |
| λ | 0.95 | GAE |
| ε | 0.2 | clip |
| Entropy cost | 0.01 | exploration |
| Batch | 64 | update minibatch |
| Roll-out length | 128 | per env |
| Actor LR | 1e-3 | best in sweep |

---

## 4 · Brax Vectorisation & Hyper-parameter Sweep

`convert_xml.py` freezes the MJCF into `System.pkl.gz`; `jax.vmap` batches 128–1024 walkers → **> 1 M env-steps s⁻¹**.

<table>
<tr>
  <td width="48%">
    <img src="/assets/img/passive_walker_rl/brax/reward_scale.png"
         alt="Final reward versus reward-scale (0.5 vs 1.0)" width="100%">
  </td>
  <td width="48%">
    <img src="/assets/img/passive_walker_rl/brax/lr_reward.png"
         alt="Final reward versus learning rate across architectures" width="100%">
  </td>
</tr>
</table>

**Fig.&nbsp;2 —** 120-run grid shows a sweet-spot: reward-scale 0.5, LR 1e-3, “medium” (~1 M params) network.

---

## 5 · Results

| Metric | BC-Seeded PPO | Scratch PPO |
|--------|---------------|-------------|
| Steps to first stable gait | **1 × 10⁵** | 5 × 10⁵ |
| Final mean Δx step⁻¹ | **0.28 ± 0.02** | 0.24 ± 0.05 |
| GPU wall-clock | **≈ 8 min** | 25 min |

<video autoplay muted loop playsinline controls style="width: 100%; max-height: 500px; border-radius: 8px; margin-top: 1rem;">
  <source src="/assets/video/passive_walker_rl/walking_video.mp4" type="video/mp4">
</video>

<p class="text-center mt-2"><em><strong>Video 1 —</strong> 30-second deterministic MuJoCo replay using the best Brax-trained policy (no falls).</em></p>


---

## 6 · Reproduce It (One Command)

```bash
python -m passive_walker.ppo.bc_init.run_pipeline \
       --init results/bc/hip_knee_mse/policy_1000hz.eqx \
       --device gpu \
       --total-steps 5000000 \
       --hz 1000
````

All artefacts land in `results/passive_walker_rl/<timestamp>/` with SHA-256 config hashes.

---

## 7 · Future Work

* Uneven-terrain randomisation for sim-to-real
* Energy-aware rewards to penalise **torque peaks**
* TPU `pmap` training for > 10 M env-steps s⁻¹
* Hardware validation on a planar biped rig

---

<div align="center"><em>Solo capstone (ENS 492) · Sabancı University · MIT License</em></div>

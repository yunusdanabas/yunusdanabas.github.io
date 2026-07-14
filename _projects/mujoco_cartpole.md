---
layout: page
title: "DiffSwing: Neural Cart-Pole Control with JAX & MuJoCo"
collection: projects
importance: 5
description: A hybrid control system that combines neural network energy shaping with classical LQR stabilization for cart-pole swing-up. Trained end-to-end in differentiable JAX simulation with real-time MuJoCo deployment achieving 98% success rate and 1.9s swing-up time.
permalink: /projects/mujoco_cartpole/
date: 2025-01-01
category: Research Projects
tags: [control, reinforcement-learning, robotics, neural-networks, jax]
img: /assets/img/MuJoCo_CartPole.png
---

<div class="project-header">
  <p>
    <a href="https://github.com/yunusdanabas/MuJoCo_CartPole" class="btn btn-outline-primary" role="button" target="_blank">
      <i class="fab fa-github"></i> GitHub Repository
    </a>
    &nbsp;
    <a href="/assets/pdf/ME58006_Project2.pdf" class="btn btn-outline-secondary" role="button" target="_blank">
      <i class="fas fa-file-pdf"></i> Technical Report
    </a>
    &nbsp;
    <a href="#quick-start" class="btn btn-outline-info" role="button">
      <i class="fas fa-rocket"></i> Quick Start
    </a>
  </p>
</div>

---

## 1. Overview

**DiffSwing** is a hybrid control system that solves the classic cart-pole swing-up problem by combining:

- **Neural energy shaping** for robust swing-up from arbitrary initial conditions
- **Classical LQR control** for precise stabilization around the upright position
- **End-to-end differentiable training** in JAX for sample-efficient policy learning

### Key Achievements

- **98% success rate** across wide initial pose/velocity distributions
- **1.9s average swing-up time** from pendant position
- **Real-time deployment** at 1 kHz in MuJoCo 3.x
- **Training efficiency**: < 5 minutes on CPU using analytical gradients

<div align="center">
  {% include figure.liquid path="assets/img/MuJoCo_CartPole.png" title="Real-time MuJoCo simulation during neural network control phase" class="img-fluid rounded z-depth-1" %}
  <p><em>Real-time MuJoCo simulation during neural network control phase</em></p>
</div>

---

## 2. Technical Approach

### System Dynamics

The cart-pole system is parameterized as:

| Parameter | Description                | Value     |
| --------- | -------------------------- | --------- |
| M         | Cart mass                  | 1.0 kg    |
| m         | Pole mass                  | 0.1 kg    |
| l         | Pole half-length           | 0.5 m     |
| g         | Gravitational acceleration | 9.81 m/s² |

**State representation**: `[x, cos(θ), sin(θ), ẋ, θ̇]` — trigonometric encoding ensures smooth gradients across angle wrapping.

### Hybrid Control Architecture

| Controller     | Purpose                   | Implementation           | Parameters     |
| -------------- | ------------------------- | ------------------------ | -------------- |
| **Neural MLP** | Energy shaping & swing-up | 2×64 hidden layers, tanh | ~9k parameters |
| **LQR**        | Upright stabilization     | Riccati solution         | Q, R matrices  |
| **Linear**     | Baseline comparison       | Direct state feedback    | 4 gains        |

### Training Objective

The neural policy optimizes:

$$J = \sum_t \left[ w_E (E(t) - E_{\text{target}})^2 + w_x x(t)^2 + w_u u(t)^2 \right]$$

where $E_{\text{target}} = 2mgl$ (energy difference between upright and hanging positions).

---

## 3. Implementation

### Software Architecture

```
DiffSwing/
├── env/
│   └── cartpole.py           # Dynamics & energy functions
├── controller/
│   ├── linear_controller.py  # Differentiable linear control
│   ├── lqr_controller.py     # Riccati-based LQR
│   └── nn_controller.py      # Neural network policy
├── lib/
│   └── trainer.py            # Training loop & curriculum
└── scripts/
    ├── train_nn_controller.py    # Training script
    ├── nn_mujoco.py             # MuJoCo deployment
    └── run_simulation.py        # Controller comparison
```

### Key Technologies

- **JAX**: Automatic differentiation through dynamics
- **Equinox**: Neural network framework
- **Diffrax**: ODE integration with gradients
- **MuJoCo**: Physics simulation and real-time control
- **Optax**: Gradient-based optimization (Adam)

---

## 4. Results

### Performance Comparison

| Metric                              | Neural Network | Linear | LQR (stabilization) |
| ----------------------------------- | -------------- | ------ | ------------------- |
| **Success Rate** (−π...π, ±2 rad/s) | **98%**        | 82%    | N/A                 |
| **Swing-up Time** (mean)            | **1.9s**       | 3.1s   | —                   |
| **Cart Deviation** (RMS)            | 0.14m          | 0.22m  | **0.05m**           |
| **Peak Control Force**              | 12N            | 11N    | **6N**              |

### Control Strategy

1. **Phase 1**: Neural network performs energy pumping until `|θ| < 12°`
2. **Phase 2**: Seamless handoff to LQR controller for fine stabilization
3. **Result**: Combines the neural network's robust swing-up with LQR's optimal stabilization

---

## 5. Quick Start {#quick-start}

### Installation

```bash
pip install jax equinox optax diffrax mujoco mujoco-python-viewer matplotlib numpy
```

### Training

```bash
# Train neural network controller (~5 minutes)
python scripts/train_nn_controller.py

# Monitor training progress
tensorboard --logdir logs/
```

### Deployment

```bash
# Deploy trained model in MuJoCo
python scripts/nn_mujoco.py --model trained_nn.eqx

# Compare different controllers
python scripts/run_simulation.py --controller neural
python scripts/run_simulation.py --controller lqr
python scripts/run_simulation.py --controller linear
```

### Configuration

Key training parameters in `config.py`:

- Learning rate: 1e-3 (Adam)
- Batch size: 256 initial states
- Training steps: 5000
- Weight schedule: Energy (1.0) → Position (0.1) → Control (0.01)

---

## 6. Future Directions

### Technical Improvements

- **Adaptive handoff**: Smooth weighted blending between controllers
- **Model predictive control**: Receding-horizon energy shaping layer
- **Domain randomization**: Robust policies for sim-to-real transfer

### Experimental Validation

- **Hardware implementation**: Low-cost setup with Teensy 4.1 microcontroller
- **Real-world testing**: Validation on physical cart-pole system
- **Comparative studies**: Benchmarking against other swing-up methods

---

**License**: MIT — contributions and extensions welcome!

---

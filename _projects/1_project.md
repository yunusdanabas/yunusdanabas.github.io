---
layout: page
title: "Project 1: Advanced Cart-Pole Swing-Up Control"
description: "A project that combines classical control with deep learning using JAX, MuJoCo and more."
img: assets/img/MuJoCo_CartPole.png
importance: 1
category: Extracircular Projects
related_publications: true
---

<h1>Advanced Cart-Pole Swing-Up Control with JAX and MuJoCo</h1>

<p>
This project develops advanced controllers for the classic cart-pole swing-up task by merging classical control techniques with deep learning. I implemented neural network (MLP), linear, and LQR controllers to drive the system from a challenging initial state to an upright equilibrium. The NN controller maps a 5D state—comprising cart position, cos(θ), sin(θ), cart velocity, and pole angular velocity—to a control force and is trained using an energy-shaping and cart-deviation cost function.
</p>

<p>
Leveraging JAX for automatic differentiation and JIT optimization, Equinox for managing the NN architecture, and Diffrax for differentiable ODE simulation, the project achieves efficient end-to-end gradient-based training. Real-time simulations and interactive visualizations were performed using MuJoCo and mujoco_viewer, and performance comparisons among the controllers were rigorously analyzed.
</p>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/MuJoCo_CartPole.png" title="MuJoCo Simulation Snapshot" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  A representative simulation snapshot from the MuJoCo visualization.
</div>

<!-- Additional photo suggestions:
     - Trajectory plots comparing the performance of NN, linear, and LQR controllers.
     - Cost analysis graphs over the training epochs.
     - Interactive simulation screenshots showing control overlays and disturbances. -->

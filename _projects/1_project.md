---
layout: page
title: "Project 1: Advanced Cart-Pole Swing-Up Control"
description: "A project that combines classical control with deep learning using JAX, MuJoCo and more."
img: assets/img/MuJoCo_CartPole.png
importance: 1
category: work
related_publications: true
---


<h1>Advanced Cart-Pole Swing-Up Control with JAX and MuJoCo</h1>

<p>
This project focuses on developing advanced controllers for the classic cart-pole swing-up task by combining both classical control techniques and modern deep learning approaches. I implemented a neural network controller (MLP) that maps a 5D state—consisting of cart position, cos(θ), sin(θ), cart velocity, and pole angular velocity—to a scalar control force. To ensure the system accumulates the appropriate energy for the pole to reach an upright position while keeping the cart near the center, I designed a specialized energy-shaping and cart-deviation cost function.
</p>

<p>
Leveraging JAX for automatic differentiation and JIT compilation, the training process was optimized, while Equinox was used to build and manage the neural network architecture in a functional style. The project further integrated Diffrax for differentiable ODE simulation, enabling end-to-end gradient-based optimization. Real-time simulations and interactive visualizations were conducted using MuJoCo and mujoco_viewer, and extensive comparisons were made between the neural network, linear, and LQR controllers through detailed cost analysis and trajectory plotting.
</p>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="Simulation Snapshot 1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="Simulation Snapshot 2" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="Trajectory Plot" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Simulation snapshots and trajectory plots illustrating the controller performance.
</div>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/6.jpg" title="Neural Network Architecture" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/11.jpg" title="Cost Analysis Comparison" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Additional visualizations, including the neural network architecture and cost analysis comparisons.
</div>

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
In this project, I developed a sophisticated control system for the classic cart-pole swing-up task by integrating classical control methods with modern deep learning techniques. The system employs a blend of linear, LQR, and neural network controllers to manage the challenging dynamics inherent in swinging up a pendulum from a downward position. The neural network controller (MLP) is trained end-to-end using differentiable simulation based on an energy-shaping and cart-deviation cost function.
</p>

<p>
Key to this project is the use of JAX for fast automatic differentiation and JIT compilation, along with Equinox for constructing the NN architecture, and Diffrax for efficient ODE integration. These tools together enable robust gradient-based optimization, allowing the NN to learn complex nonlinear behaviors necessary for both swing-up and stabilization phases. Real-time simulations and interactive visualizations were carried out using MuJoCo and mujoco_viewer, providing clear insights into controller performance and system dynamics.
</p>

<p>
Extensive experiments compared the performance of the NN, linear, and LQR controllers through trajectory plots, cost analyses, and control force evaluations. The results demonstrate the strengths and limitations of each approach, offering valuable lessons for future improvements in hybrid control strategies.
</p>

<h2>Resources</h2>
<ul>
  <li><a href="https://github.com/yunusdanabas/MuJoCo_CartPole" target="_blank">View the project on GitHub</a></li>
  <li><a href="assets/pdf/ME58006_Project2.pdf" target="_blank">Download the Project Report (PDF)</a></li>
</ul>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/MuJoCo_CartPole.png" title="MuJoCo Simulation Snapshot" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  A representative snapshot from the MuJoCo simulation, showcasing real-time visualization of the cart-pole dynamics.
</div>

<!-- Additional photo suggestions:
     - Simulation snapshots highlighting the transition phases between swing-up and stabilization.
     - Trajectory plots comparing the performance of the NN, linear, and LQR controllers.
     - Graphs of training loss progression and cost analysis across different control strategies.
     - Screenshots of interactive simulation interfaces with control overlays.
-->

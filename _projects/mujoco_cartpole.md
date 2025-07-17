---
layout: page
title: "Advanced Cart-Pole Swing-Up Control with JAX and MuJoCo"
description: "Combining classical and deep learning control techniques using JAX, MuJoCo, and more."
img: /assets/img/MuJoCo_CartPole.png
importance: 3
category: Research Projects
---


<p>
This project implements sophisticated controllers for the classic cart-pole swing-up task, blending traditional control methods (Linear and LQR) with modern neural network approaches. The goal is to drive the pole from a downward or arbitrary position to an upright equilibrium, injecting precisely calculated energy while keeping the cart near the track's center.
</p>

<h2>Controllers Developed</h2>
<ul>
  <li><strong>Linear Controller:</strong> A state-feedback controller trained using differentiable simulations in JAX, optimized to minimize state deviations and control effort.</li>
  <li><strong>LQR Controller:</strong> A classic optimal controller derived through linearization of the system dynamics and solution of the algebraic Riccati equation.</li>
  <li><strong>Neural Network Controller (MLP):</strong> Trained via differentiable simulation with an energy-shaping and cart-deviation cost, mapping a 5D state vector <code>[x, cos(θ), sin(θ), ẋ, θ̇]</code> to the necessary control force for the swing-up task.</li>
</ul>

<h2>Technologies & Libraries</h2>
<ul>
  <li><strong>JAX:</strong> Automatic differentiation and efficient computation.</li>
  <li><strong>Equinox:</strong> Lightweight, functional neural network modeling.</li>
  <li><strong>Optax:</strong> Gradient-based optimization algorithms.</li>
  <li><strong>Diffrax:</strong> Differentiable ODE solvers for training and simulation.</li>
  <li><strong>MuJoCo and mujoco_viewer:</strong> High-fidelity physics simulations and interactive real-time visualization.</li>
</ul>

<h2>Project Structure</h2>
<ul>
  <li><strong><code>controller/</code></strong> Controllers implementations (Linear, LQR, Neural Network).</li>
  <li><strong><code>env/</code></strong> Dynamics and simulation wrappers for the cart-pole system.</li>
  <li><strong><code>lib/</code></strong> Training utilities, loss computation, and helper functions for visualization and initial state sampling.</li>
  <li><strong>Main Scripts:</strong> Simulation scripts to deploy trained controllers and perform comparative analyses between methods.</li>
</ul>

<h2>Workflow & Usage</h2>
<ul>
  <li>Train controllers using differentiable simulations and cost functions optimized by gradient descent.</li>
  <li>Deploy and evaluate controller performance through detailed real-time simulations in MuJoCo.</li>
  <li>Interactive simulations allow disturbance testing, state observation, and control force visualization.</li>
</ul>

<h2>Results & Analysis</h2>
<p>
Extensive comparative analyses were conducted, assessing controller robustness, swing-up efficiency, stabilization performance, and energy management across various initial conditions and disturbances. Results demonstrated each controller's unique strengths, guiding future hybrid controller design and improved transition mechanisms.
</p>

<h2>Resources</h2>
<ul>
  <li><a href="https://github.com/yunusdanabas/MuJoCo_CartPole" target="_blank">GitHub Repository</a></li>
  <li>
    <a href="{{ '/assets/pdf/ME58006_Project2.pdf' | relative_url }}" target="_blank">
      <strong>Download the Full Project Report (PDF)</strong>
    </a>
  </li>
</ul>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/MuJoCo_CartPole.png" title="MuJoCo Simulation Snapshot" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Simulation snapshot from MuJoCo showing real-time visualization of the cart-pole system.
</div>

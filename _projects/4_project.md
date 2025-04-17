---
layout: page
title: Panda Base Simulator
description: Digital‑twin of a custom aluminum‑profile base carrying a Franka Emika Panda arm, used to study force/torque‑sensor placement and high‑moment loading.
img: /assets/img/pandaBaseSim_front.png
importance: 3
category: Extracircular Projects
---

<p>
  This simulation was developed during my Forschungspraxis internship at the Munich Institute of Robotics and Machine Intelligence (Technical University of Munich) for the project
  <em>“Investigating Force and Moment Scaling in Robotic Force‑Torque Sensors.”</em>
  It provided a digital twin of the Panda arm and custom aluminum‑profile base to study sensor placement and high‑moment loading prior to hardware tests.
</p>

<p>
  <strong>panda_base_sim</strong> is a ROS package that simulates a custom aluminum‑profile base carrying a Franka Emika Panda arm in Gazebo. It uses modular URDF/xacro models and integrated controller configs to deliver realistic dynamics, interactive RViz markers, and easy customization of both base and arm.
</p>

<h2>Features</h2>
<ul>
  <li><strong>Gazebo Simulation:</strong> Full 3D simulation of a rigid base with Panda arm and FT‑sensor placeholder.</li>
  <li><strong>Modular Models:</strong> URDF/xacro files split by common, base, arm, and sensor elements for rapid edits.</li>
  <li><strong>Integrated Controllers:</strong> Joint, trajectory, and Cartesian‑impedance controllers pre‑tuned for the digital twin.</li>
  <li><strong>RViz Visualization:</strong> Custom RViz preset with interactive equilibrium‑pose marker for safe teleoperation.</li>
</ul>

<h2>How to Launch</h2>
<pre><code>roslaunch panda_base_sim panda_base_sim.launch</code></pre>

<h2>Simulation Screenshot</h2>
<p>
  <img src="assets/img/pandaBaseSim_simulation.png" alt="In-Simulation View" class="img-fluid rounded z-depth-1">
</p>

<h2>Design Photos</h2>
<ul>
  <li><strong>Front View:</strong> <img src="assets/img/pandaBaseSim_front.png" alt="Front View" class="img-fluid rounded z-depth-1"></li>
  <li><strong>Isometric View:</strong> <img src="assets/img/pandaBaseSim_iso.png" alt="Isometric View" class="img-fluid rounded z-depth-1"></li>
  <li><strong>Side View:</strong> <img src="assets/img/pandaBaseSim_side.png" alt="Side View" class="img-fluid rounded z-depth-1"></li>
</ul>




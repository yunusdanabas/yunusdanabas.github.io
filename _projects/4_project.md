---
layout: page
title: "Panda Base Simulator"
description: "Digital‑twin of a custom aluminum‑profile base carrying a Franka Emika Panda arm, used to study force/torque‑sensor placement and high‑moment loading."
img: assets/img/pandaBaseSim_front.png
importance: 3
category: Extracircular Projects
---

<p>
This simulation was developed during my Forschungspraxis internship at the Munich Institute of Robotics and Machine Intelligence (Technical University of Munich) for the project  
<em>“Investigating Force and Moment Scaling in Robotic Force‑Torque Sensors.”</em>  
It provides a digital twin of the Panda arm mounted on a bespoke aluminum‑profile base—complete with FT‑sensor placeholder—to validate sensor placement, controller tuning, and high‑moment loading prior to hardware tests.
</p>

<h2>Project Context</h2>
<p>
As commercial 6‑DoF force‑torque sensors struggle with large tilting moments, this twin enables offline experimentation of sensor mounting positions and load cases up to 280 Nm. By mirroring the real URDF/xacro stack and Gazebo+RViz environment, we ensure that Gazebo‑tuned controllers and collision checks transfer directly to the physical setup.
</p>

<h2>Features</h2>
<ul>
  <li><strong>Gazebo Simulation:</strong> Full 3D physics of a rigid base + Panda arm + FT‑sensor stub.</li>
  <li><strong>Modular URDF/Xacro:</strong> Split into <code>common</code>, <code>base</code>, <code>arm</code>, and <code>sensor</code> xacros for rapid customization.</li>
  <li><strong>Integrated Controllers:</strong> Preconfigured joint, trajectory & Cartesian‑impedance loops tuned for the digital twin’s inertia.</li>
  <li><strong>RViz Interface:</strong> Equilibrium‑pose interactive marker node for safe teleoperation and stiffness tuning.</li>
</ul>

<h2>Technologies & Libraries</h2>
<ul>
  <li><strong>ROS Noetic:</strong> Core middleware, <code>gazebo_ros</code>, <code>franka_ros</code>, <code>controller_manager</code>.</li>
  <li><strong>Gazebo:</strong> High‑fidelity physics engine for simulation.</li>
  <li><strong>RViz & Interactive Markers:</strong> <code>interactive_markers</code>, <code>tf</code>, <code>rospy</code>.</li>
  <li><strong>Xacro/URDF:</strong> Parameterized robot descriptions for rapid iterations.</li>
</ul>

<h2>Workflow & Usage</h2>
<ul>
  <li>Clone & build in your Catkin workspace.</li>
  <li><code>roslaunch panda_base_sim panda_base_sim.launch</code> to start Gazebo, controllers & RViz.</li>
  <li>Use the interactive marker in RViz to test Cartesian impedance and safety limits.</li>
  <li>Alternatively, <code>roslaunch panda_base_sim onlybase_gazebo.launch</code> for static base‑arm spawn.</li>
</ul>

<h2>Results & Analysis</h2>
<p>
The digital twin enabled offline evaluation of sensor mounting strategies under moments up to 280 Nm, seamless controller gains tuning in simulation, and collision‑free workspace planning. All configurations validated in Gazebo translated directly to the real hardware tests.
</p>

<h2>Resources</h2>
<ul>
  <li><a href="https://github.com/yunusdanabas/panda_base_sim" target="_blank">GitHub Repository</a></li>
  <li><a href="{{ '/assets/pdf/YunusEmreDanbas_report.pdf' | relative_url }}" target="_blank"><strong>Full Forschungspraxis Report (PDF)</strong></a></li>
</ul>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/pandaBaseSim_front.png" title="Front View" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/pandaBaseSim_iso.png" title="Isometric View" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/pandaBaseSim_side.png" title="Side View" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Top: front, isometric and side CAD renders — Bottom: live Gazebo+RViz simulation snapshot
</div>

---
layout: page
title: "Kinematic and Dynamic Analysis of the 3RRP Mechanism"
description: "Comprehensive analysis of a 3RRP planar parallel manipulator using symbolic derivations and numerical simulations."
img: assets/img/rrp_systemImage.png
importance: 4
category: "Course Projects"
---


Between October 2024 and January 2025, as part of the EE521 "Kinematics and Dynamics of Machines" graduate course, I conducted an extensive analysis of the 3RRP planar parallel manipulator. The key contributions include:

- **Dynamic Modeling:** Developed a full dynamic model using Autolev for symbolic derivations and MATLAB/Simulink for numerical simulations.
- **Kinematics:** Derived closed-form forward and inverse kinematics and validated them using Simulink.
- **Workspace Analysis:** Computed the largest symmetric workspace and evaluated performance metrics such as the kinematic Jacobian and Global Isotropy Index (GII).
- **Equations of Motion:** Formulated the equations of motion using both Kane’s method and the Lagrangian approach, comparing their computational efficiency and stability.
- **Validation:** Validated the dynamic model under small force and torque disturbances.

Below are some illustrative images from the project:

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/rrp_workspace.jpeg" title="Computed Workspace" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/rrp_forceSimulation.jpeg" title="Force Simulation Results" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/rrp_systemImage.png" title="System Overview" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  From left to right: numerical workspace simulation, end-effector’s force response, and an overview schematic of the 3RRP mechanism.
</div>

---

## Full Project Report

For a detailed exposition of the methodology, derivations, simulation results, and analyses, please refer to the full project report:

<a href="{{ '/assets/pdf/YunusEmreDanabas_RRP_ProjectReport.pdf' | relative_url }}" target="_blank">
  <strong>Download the Full Project Report (PDF)</strong>
</a>


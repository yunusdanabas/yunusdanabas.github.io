---
layout: page
title: "Design and Control of a Planar Elbow Manipulator"
description: >
  Developed a 2-DoF planar elbow manipulator integrating mechanical design, power electronics,
  and control systems. Completed as part of the ME408 Mechatronic System Design course at Sabancı University.
img: assets/img/me408_design_front.jpeg
importance: 4
category: Course Projects
startDate: Mar 2024
endDate: May 2024
---

<p>
The <strong>Design and Control of a Planar Elbow Manipulator</strong> project was a rigorous effort undertaken during the ME408 Mechatronic System Design course at Sabancı University. Out of more than 20 designs, it uniquely met all mechanical requirements while optimizing structural integrity, weight, and precise motion control.
</p>

<h3>Mechanical Design</h3>
<ul>
  <li>Designed and assembled the manipulator in SOLIDWORKS, optimizing link geometry through stress analysis and weight reduction techniques to meet the required factor of safety.</li>
  <li>Performed static and dynamic analyses to assess stress distribution, displacement limits, and structural deformations under load.</li>
</ul>

<h3>Power Electronics</h3>
<ul>
  <li>Engineered a buck-boost converter in LTSpice to regulate motor input voltage, ensuring stable power delivery with minimal voltage ripple and reduced inductor current fluctuations.</li>
</ul>

<h3>Control Systems</h3>
<ul>
  <li>Developed PI and PID controllers in MATLAB/Simulink, incorporating gravity compensation to enhance trajectory tracking accuracy.</li>
  <li>Implemented a dual-loop control system with an inner loop managing motor current and an outer loop achieving precise joint positioning using inverse kinematics.</li>
</ul>

<h3>System Integration & Validation</h3>
<ul>
  <li>Integrated and simulated the mechanical, electrical, and control subsystems using SOLIDWORKS, LTSpice, and MATLAB/Simulink, ensuring full system performance verification.</li>
</ul>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/me408_design_front.jpeg" title="Front View of the Manipulator" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/me408_design_iso.jpeg" title="Isometric View" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/me408_design_closedForm.jpeg" title="Closed Form Analysis" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Various views of the design showcasing optimized geometry and robust mechanical integrity.
</div>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/me408_displacement.jpeg" title="Displacement Analysis" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/me408_stress.jpeg" title="Stress Distribution" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Detailed displacement and stress distribution analyses under operational loads.
</div>

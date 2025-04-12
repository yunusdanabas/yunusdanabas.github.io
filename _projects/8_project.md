---
layout: page
title: FPGA-AirHockey
description: A two-player digital air-hockey game implemented on the Nexys A7 FPGA board using Verilog.
img: assets/img/fpga_board.jpeg
importance: 5
category: Course Projects
---

FPGA-AirHockey is a two-player digital air-hockey game designed and implemented on the Nexys A7 FPGA board using Verilog. The project simulates a moving puck on a 5×5 grid by driving LEDs and seven-segment displays to show the puck's position and player scores. I developed detailed state diagrams, implemented robust debouncing and clock division modules, and verified the design using simulation testbenches before deployment on hardware.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/fpga_board.jpeg" title="Nexys A7 Board with FPGA-AirHockey loaded" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    FPGA-AirHockey in action on the Nexys A7 board.
</div>

<p>
    <video width="600" controls>
        <source src="assets/video/Gameplay.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</p>
<div class="caption">
    Full gameplay demonstration of the FPGA-AirHockey project.
</div>

<p>
    Explore the <a href="https://github.com/yunusdanabas/FPGA-AirHockey" target="_blank">GitHub repository</a> for source code, design details, and further documentation.
</p>

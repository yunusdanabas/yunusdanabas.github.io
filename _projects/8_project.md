---
layout: page
title: FPGA-AirHockey
description: A two-player digital air-hockey game implemented on the Nexys A7 FPGA board using Verilog.
img: assets/img/fpga_board.jpeg
importance: 5
category: Course Projects
---

**FPGA-AirHockey** is a two-player digital air-hockey game developed on the Nexys A7 FPGA board using Verilog. The project simulates a moving puck on a 5×5 grid using LED arrays for motion and seven-segment displays for showing coordinates and player scores. The design evolved through multiple phases—from concept and design (detailed in *Phase1.pdf*) to full-scale implementation and testing.

### Project Phases

- **Phase 1 – Design & Logic:**  
  Detailed design diagrams and state machine flow were created to outline how the game responds to player inputs. As shown in *Phase1.pdf*, the game’s logic includes:
  - **Input Handling:**  
    Players use BTNL for Player A and BTNR for Player B, along with slide switches to select puck coordinates and direction.
  - **State Transitions:**  
    A timer-driven state machine validates inputs, moves the puck across the LED grid, and updates scores. For instance, if the puck reaches an endpoint or a player misses their hit, control shifts to the opponent.
  
- **Phase 2 – Core Implementation:**  
  The core game logic was implemented in Verilog. This phase involved writing modules to control LED sequences, update seven-segment displays, and manage scoring, all verified via simulation (using *hockey_tb.v*).

- **Phase 3 – Integration & Support Modules:**  
  Essential support modules such as a clock divider, debouncer, and seven-segment display driver were integrated. These modules ensure stable timing and reliable hardware interfacing, with full synthesis and deployment on the Nexys A7 board using constraint files (e.g., *project.xdc*).

### Features

- **Interactive Two-Player Gameplay:**  
  Each player controls the puck’s trajectory using dedicated buttons and switches.
- **Dynamic Visual Feedback:**  
  LED arrays simulate the puck moving across a digital 5×5 grid while seven-segment displays provide live score updates.
- **Customizable Settings:**  
  Options include adjusting puck speed (0.5s or 1s per move) and modifying the winning goal threshold.
- **Robust Modular Design:**  
  Structured into design, implementation, and integration phases, this project was validated with simulation testbenches and deployed on FPGA hardware.
- **Detailed Documentation:**  
  Refer to *Phase1.pdf* for an in-depth view of the state machine logic and overall game flow.

### How It Works

1. **Initialization:**  
   At startup, the game displays an initial score of 0-0 and waits for Player A to press their button to begin.

2. **Gameplay Loop:**  
   - **Player Input:**  
     Players select puck direction and coordinate using slide switches and press their respective buttons (BTNL for Player A, BTNR for Player B) to launch or hit the puck.
   - **Puck Movement:**  
     The state machine (as shown in *Phase1.pdf*) controls the puck’s movement: LEDs light sequentially to simulate motion across the grid.
   - **Scoring:**  
     If a player misses the puck (by not pressing the button or selecting an invalid coordinate), the opponent scores a point. The game then displays the updated score before switching turns.

3. **Winning Condition:**  
   The match ends when a player reaches a predefined goal count (e.g., 3 goals). The final score is displayed, and victory is signaled with blinking LEDs.

### Setup & Deployment

- **Simulation:**  
  Run the provided testbench (*hockey_tb.v*) to confirm correct state transitions and timing before deployment.
- **Synthesis:**  
  Use Xilinx Vivado (or your preferred FPGA toolchain) along with the provided constraint file (*project.xdc*) to synthesize the design for the Nexys A7 board.
- **Programming:**  
  Program the FPGA and witness the interactive game using the onboard LEDs, switches, and seven-segment displays.

### Demo & Additional Resources

<div class="row">
  <div class="col-sm mt-3 mt-md-0" style="max-width:300px;">
    {% include figure.liquid loading="eager" path="assets/img/fpga_board.jpeg" title="Nexys A7 Board with FPGA-AirHockey loaded" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  FPGA-AirHockey running on the Nexys A7 board.
</div>

<p>
  For a full demonstration, please view the 
  <a href="assets/videos/Gameplay.mp4" target="_blank">Gameplay Video</a>.
</p>

<p>
  Explore more details, source code, and supporting documentation (including *Phase1.pdf*) in the 
  <a href="https://github.com/username/FPGA-AirHockey" target="_blank">GitHub repository</a>.
</p>

**Acknowledgments:**  
- **Course:** Logic & Digital System Design – Fall 2023-2024  
- **Instructor:** Atıl Utku Ay  
- **Special Thanks:** To the Nexys A7 community and Digilent for comprehensive resources and support.

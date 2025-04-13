---
layout: page
title: FPGA-AirHockey
description: A two-player digital air-hockey game implemented on the Nexys A7 FPGA board using Verilog.
img: assets/img/fpga_board.jpeg
importance: 5
category: Course Projects
---

**FPGA-AirHockey** is a two-player digital air-hockey game developed on the Nexys A7 FPGA board using Verilog. The project simulates a moving puck on a 5×5 grid with LED arrays for motion and seven-segment displays for real-time scores and coordinates. The design evolved through several phases—from initial concept and detailed state machine design (refer to *Phase1.pdf*) to full implementation, simulation, and hardware deployment.

### Project Phases

- **Phase 1 – Design & Logic:**  
  Detailed design diagrams and a state machine flow were created to establish how the game responds to player inputs. As documented in *Phase1.pdf*, the game’s logic includes:
  - **Input Handling:**  
    Players use BTNL (Player A) and BTNR (Player B), along with slide switches, to select puck coordinates and determine its direction.
  - **State Transitions:**  
    A timer-driven state machine validates inputs, drives LED sequences across the grid, and updates scores. When the puck reaches an endpoint or a player misses their hit, control shifts to the opponent.
  
- **Phase 2 – Core Implementation:**  
  The core game logic was implemented in Verilog. Modules were developed to control LED sequences, update seven-segment displays, and manage scoring. These components were rigorously verified via simulation (using *hockey_tb.v*).

- **Phase 3 – Integration & Support Modules:**  
  Essential support modules—such as a clock divider, debouncer, and seven-segment display driver—were integrated for stable timing and reliable performance. The complete design was synthesized and deployed on the Nexys A7 board using the provided constraint file (*project.xdc*).

### Features

- **Interactive Two-Player Gameplay:**  
  Dedicated buttons and switches enable each player to control the puck’s trajectory and initiate play.
- **Dynamic Visual Feedback:**  
  LED arrays simulate the puck’s movement across a digital 5×5 grid while seven-segment displays show live scores and coordinates.
- **Customizable Settings:**  
  Adjustable puck speeds (0.5s or 1s per move) and configurable winning thresholds allow versatile gameplay.
- **Robust Modular Architecture:**  
  The project is organized into clear phases, validated via simulation testbenches, and successfully deployed on FPGA hardware.
- **Detailed Documentation:**  
  Comprehensive design details, including state machine logic and game flow, are available in *Phase1.pdf*.

### How It Works

1. **Initialization:**  
   On startup, the game displays an initial score of 0-0 and waits for Player A to press their button to begin.

2. **Gameplay Loop:**  
   - **Player Input:**  
     Players use slide switches to select the puck’s trajectory and press their respective buttons (BTNL for Player A, BTNR for Player B) to launch or hit the puck.
   - **Puck Movement:**  
     The state machine (as detailed in *Phase1.pdf*) controls the puck’s movement by sequentially lighting LEDs to simulate motion across the grid.
   - **Scoring:**  
     If a player misses (by not pressing the button in time or selecting an invalid coordinate), the opponent scores a point. The updated score is then displayed before switching turns.

3. **Winning Condition:**  
   The match ends when a player reaches the predefined goal count (e.g., 3 goals). The final score is displayed, and victory is signaled with blinking LEDs.

### Setup & Deployment

- **Simulation:**  
  Run the provided testbench (*hockey_tb.v*) to verify proper state transitions and timing.
- **Synthesis:**  
  Use Xilinx Vivado (or your preferred FPGA toolchain) with *project.xdc* to synthesize the design for the Nexys A7 board.
- **Programming:**  
  Program the FPGA and witness the interactive game using the onboard LEDs, switches, and seven-segment displays.

## GitHub Repository

<p>
  Explore more details, source code, and supporting documentation in the
  <a href="https://github.com/yunusdanabas/FPGA-AirHockey" target="_blank">GitHub repository</a>.
</p>

### Demo & Additional Resources

<div class="row">
  <div class="col-sm mt-3 mt-md-0" style="max-width:500px;">
    {% include figure.liquid loading="eager" path="assets/img/fpga_board.jpeg" title="Nexys A7 Board with FPGA-AirHockey loaded" class="img-fluid rounded z-depth-1" style="height:500px; object-fit:cover;" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path="assets/video/Gameplay.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true style="height:500px;" %}
  </div>
</div>
<div class="caption">
  FPGA-AirHockey demonstration: FPGA board and gameplay video displayed side by side.
</div>


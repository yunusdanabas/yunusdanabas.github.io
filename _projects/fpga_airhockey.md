---
layout: page
title: "FPGA-AirHockey — Digital Showdown on Nexys A7"
collection: projects
importance: 5
description: "Two-player air-hockey game on a Nexys A7 FPGA: Verilog state machine drives a 5×5 LED rink and real-time score displays."
permalink: /projects/fpga_airhockey/
date: 2024-01-15
category: Course Projects
tags: [fpga, verilog, embedded-systems, game]
img: /assets/img/fpga_airhockey/fpga_board.jpeg
---

<p>
  <a href="https://github.com/yunusdanabas/FPGA-AirHockey" class="btn btn-outline-primary" role="button" target="_blank">
    <i class="fab fa-github"></i> GitHub Repo
  </a>
  &nbsp;
  <a href="/assets/pdf/fpga_airhockey/Phase1.pdf" class="btn btn-outline-secondary" role="button" target="_blank">
    <i class="fas fa-file-pdf"></i> Design Diagrams (PDF)
  </a>
</p>

## 1&nbsp;·&nbsp;Overview & Motivation

**FPGA-AirHockey** brings the classic arcade game to digital hardware: a 5 × 5 LED “rink,” dual seven-segment scoreboards, and responsive two-button controls—all **written in pure Verilog** and deployed on a **Digilent Nexys A7**.  
Originally built for **CS303 – Logic & Digital System Design** (Sabancı University, _Fall 2023-24_), the goal was to master:

- **Finite-state machine (FSM) design** for interactive gameplay
- **Hardware debouncing & clock division** for clean timing
- **Simulation-driven development** before FPGA synthesis

<br>

## 2&nbsp;·&nbsp;System Architecture

<div align="center">
  {% include figure.liquid
     path="assets/img/fpga_airhockey/system_block_diagram.png"
     title="Top-level architecture: clock, input, game FSM, and display drivers"
     class="img-fluid rounded z-depth-1" %}
</div>

The design is modular:

| Module            | Role                                                      |
| ----------------- | --------------------------------------------------------- |
| `clk_divider.v`   | Lowers the 100 MHz board clock to game-friendly ticks     |
| `debouncer.v`     | Generates single clean pulses from push-buttons           |
| `hockey_fsm.v`    | **One-hot FSM** handling serves, returns, goals, victory  |
| `ssd_driver.v`    | Time-multiplexes 8 seven-segment digits for scores/coords |
| `top_airhockey.v` | Glue logic, pin assignments (see `project.xdc`)           |

_All RTL is simulation-verified via `hockey_tb.v` before synthesis._

<br>

## 3&nbsp;·&nbsp;Gameplay Logic

1. **Serve** – Player A hits **BTNL**; puck traverses the LED grid toward Player B.
2. **Return** – Player B presses **BTNR** when the puck reaches their chosen coordinate (set by slide switches).
3. **Score** – Missed returns award a goal; score flashes, turns swap.
4. **Win** – First to the configurable goal limit (default = 3) triggers a celebratory LED blink pattern.

Timing is governed by a selectable puck speed (0.5 s or 1 s per cell) via `PUCK_SPEED_SEL`.

<br>

## 4&nbsp;·&nbsp;Key Features

- **Interactive Two-Player Mode** — Simple BTNL/BTNR buttons act as paddles
- **Dynamic Visuals** — 25 LEDs animate puck motion; seven-segment HUD shows `[X,Y]` and running scores
- **Customisable Gameplay** — On-board switches tweak puck speed and goal limit
- **Robust Timing** — Clean debounced inputs, parameterised clock divider, synchronous FSM
- **Portable HDL** — Vendor-agnostic Verilog; only the constraint file is board-specific

<br>

## 5&nbsp;·&nbsp;Build & Deployment

| Step          | Action                                                     |
| ------------- | ---------------------------------------------------------- |
| **Simulate**  | `vivado -mode tcl -source run_tb.tcl` (runs `hockey_tb.v`) |
| **Synthesis** | Flow Navigator ▶ _Run Synthesis_                          |
| **Implement** | Flow Navigator ▶ _Run Implementation_                     |
| **Bitstream** | Flow Navigator ▶ _Generate Bitstream_                     |
| **Program**   | Connect Nexys A7 via JTAG ➜ _Program Device…_              |

A ready-made Vivado project (`FPGA-AirHockey.xpr`) is included for 2023.1+.

<br>

## 6&nbsp;·&nbsp;Demo

<div class="row">
  <div class="col-sm mt-3 mt-md-0" style="max-width:500px;">
    {% include figure.liquid
       path="assets/img/fpga_airhockey/fpga_board.jpeg"
       title="Nexys A7 with FPGA-AirHockey loaded"
       class="img-fluid rounded z-depth-1"
       style="height:500px; object-fit:cover;" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include video.liquid path="assets/video/fpga_airhockey/Gameplay.mp4"
       class="img-fluid rounded z-depth-1" controls=true autoplay=true
       style="height:500px;" %}
  </div>
</div>
<div class="caption">
  Side-by-side board photo and live gameplay video.
</div>

<br>

> _Completed for **CS303 — Logic & Digital System Design (Fall 2023–24)**._

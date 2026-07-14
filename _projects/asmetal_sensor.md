---
layout: page
title: "AT42QT1011 Capacitive Grip/Touch Sensor PCB"
collection: projects
importance: 4
description: >
  AT42QT1011-based capacitive grip/touch sensor PCB work for industrial gripper applications,
  designed in KiCad and fabricated in-house on an LPKF S63.
permalink: /projects/asmetal_sensor/
category: Research Projects
tags: [pcb, electronics, capacitive-sensing, industrial-grippers, kicad, lpkf, at42qt1011]
img: /assets/img/asmetal_sensor/thumbnail.png
---

## 1. Overview

This project documents the capacitive grip/touch sensing hardware I developed at **As Robotics (COMAU Turkey)** for industrial gripper applications. The prototype is built around the **Microchip AT42QT1011** and was designed to provide a compact digital touch signal that could be integrated into a robot end-effector.

The main motivation was practical: the intended sensor IC was **not available locally in Turkey**, so I sourced an **AT42QT1011**, adapted the circuit around the available component, and produced the PCB in-house.

---

## 2. What I did

- Designed the schematic and layout in **KiCad** for an AT42QT1011-based capacitive grip/touch sensor
- Implemented a compact **reference-style front-end** with tuning/RC parts, decoupling, and a simple output header
- Fabricated the board in-house using an **LPKF S63** and hand-soldered the SMD components
- Integrated the PCB into a robot end-effector as a capacitive sensing prototype for gripper interaction
- Used the build to strengthen the full PCB workflow from schematic capture to fabrication and bench testing

---

## 3. Circuit (brief)

The **AT42QT1011** drives a charge-transfer capacitive measurement between **SNS** and **SNSK**. The external pad connects via **R1** (10 kΩ) and forms the sense electrode; **C2** (10 nF) between SNS/SNSK tunes the charge-transfer timing. **C1** (0.1 µF) decouples VDD. The IC outputs a digital **OUT** when touch is detected. The header exposes **PAD**, **OUT**, **VCC**, and **GND** for easy integration.

---

## 4. Images and media

### Schematic

<div class="row justify-content-center my-3">
  <div class="col-md-10">
    {% include figure.liquid path="assets/img/asmetal_sensor/kicad_schematic.png"
      title="Schematic (AT42QT1011 minimal circuit)."
      class="img-fluid rounded z-depth-1"
      %}
  </div>
</div>
<p class="text-muted small">Minimal reference design: AT42QT1011 with R1, C1, C2, and 4-pin header (PAD, OUT, VCC, GND).</p>

### PCB layout

<div class="row justify-content-center my-3">
  <div class="col-md-10">
    {% include figure.liquid path="assets/img/asmetal_sensor/pcb_layout.png"
      title="PCB layout (KiCad)."
      class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<p class="text-muted small">Single-layer routing and component placement for the compact board.</p>

### PCB renders

<style>
  .asmetal-renders-row figure img { height: 340px; width: auto; max-width: 100%; object-fit: contain; }
</style>
<div class="row mt-3 asmetal-renders-row">
  <div class="col-sm-6 text-center">
    {% include figure.liquid path="assets/img/asmetal_sensor/pcb_render.png"
      title="PCB render (top view)."
      class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 text-center">
    {% include figure.liquid path="assets/img/asmetal_sensor/pcb_render2.png"
      title="PCB render (angled view)."
      class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<p class="text-muted small">3D renders from KiCad before fabrication.</p>

### Soldering

<div class="row justify-content-center my-3">
  <div class="col-md-10">
    {% include figure.liquid path="assets/img/asmetal_sensor/soldering.jpg"
      title="Soldering the components."
      class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<p class="text-muted small">Hand-soldering SMD components on the bare PCB.</p>

### Final assembly

<div class="row justify-content-center my-3">
  <div class="col-md-10">
    {% include figure.liquid path="assets/img/asmetal_sensor/final_grip.jpg"
      title="Sensor mounted on robot grip."
      class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<p class="text-muted small">Capacitive grip/touch sensor integrated into the robot end-effector.</p>

### Videos

<style>
  .asmetal-videos-row video { height: 480px; width: auto; max-width: 100%; object-fit: contain; }
</style>
<div class="row mt-3 asmetal-videos-row">
  <div class="col-sm-6 text-center">
    <video controls style="border-radius: 8px;">
      <source src="/assets/video/asmetal_sensor/lpkf_prod_h264.mp4" type="video/mp4">
    </video>
    <p class="text-muted small mt-1">LPKF S63 PCB fabrication.</p>
  </div>
  <div class="col-sm-6 text-center">
    <video controls style="border-radius: 8px;">
      <source src="/assets/video/asmetal_sensor/testing_h264.mp4" type="video/mp4">
    </video>
    <p class="text-muted small mt-1">Touch sensor testing.</p>
  </div>
</div>

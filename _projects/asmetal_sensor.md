---
layout: page
title: "AT42QT1011 Touch Sensor PCB Prototype"
collection: projects
importance: 4
description: >
  A small AT42QT1011-based capacitive touch sensor PCB designed in KiCad and fabricated on an LPKF S63.
  A hands-on exercise in schematic capture, PCB layout, and in-house prototyping.
permalink: /projects/asmetal_sensor/
category: Research Projects
tags: [pcb, electronics, capacitive-sensing, kicad, lpkf, at42qt1011]
img: /assets/img/asmetal_sensor/thumbnail.png
---

## 1. Overview

This is a **basic capacitive touch sensor PCB** built around **Microchip AT42QT1011**.  
The main motivation was practical: the intended sensor IC was **not available locally in Turkey**, so I sourced an **AT42QT1011** and produced the PCB myself.

---

## 2. What I did

- Designed the schematic + layout in **KiCad**
- Implemented a **minimal reference-style front-end** (AT42QT1011 + tuning/RC parts + decoupling)
- Fabricated the board using an **LPKF S63**
- Used this project to practice **PCB design workflow** and learn **LPKF S63 prototyping**

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
      loading="eager" %}
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
<p class="text-muted small">Capacitive touch sensor integrated into the robot end-effector.</p>

### Videos

<div class="row">
  <div class="col-sm-6 mt-3 mt-md-0">
    <video controls style="width: 100%; max-width: 320px; max-height: 500px; border-radius: 8px;">
      <source src="/assets/video/asmetal_sensor/lpkf_prod_h264.mp4" type="video/mp4">
    </video>
    <p class="text-muted small mt-1">LPKF S63 PCB fabrication.</p>
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    <video controls style="width: 100%; max-width: 320px; max-height: 500px; border-radius: 8px;">
      <source src="/assets/video/asmetal_sensor/testing_h264.mp4" type="video/mp4">
    </video>
    <p class="text-muted small mt-1">Touch sensor testing.</p>
  </div>
</div>

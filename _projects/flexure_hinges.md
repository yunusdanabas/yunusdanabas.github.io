---
layout: page
title: "Crossed-Flexure Pivot Study — Process-Driven Modeling & Prototyping"
collection: projects
importance: 1
description: >
  Process-focused study of crossed-flexure (cross-spring) pivots as compliant stages for
  force–torque sensing: literature grounding (parasitic center-shift, lateral loading),
  dimensionless modeling, Newton–Raphson MATLAB solver, CAD to prototype iterations, and
  vision-based deformation tracking. Conducted at TUM-MIRMI under Mehmet Can Yıldırım and Prof. Sami Haddadin.
permalink: /projects/flexure_hinge_torque_sensor/
date: 2024-10-08
category: Research Projects
tags: [robotics, sensing, force-torque, flexures, compliant-mechanisms, MATLAB, computer-vision]
img: /assets/img/flexure_hinge/RealLifeDeformationOfFlexureHingeUnder30DegreeBendingComputerVision.png
author: Yunus Emre Danabaş
mathjax: true
---

<div class="mb-3">
  <a class="btn btn-outline-primary" href="https://www.mirmi.tum.de/" target="_blank" rel="noopener noreferrer">
    <i class="fas fa-university"></i> TUM MIRMI
  </a>
  <a class="btn btn-outline-secondary" target="_blank"
     href="/assets/pdf/flexure_hinge/YunusEmreDanabas_report.pdf">
    <i class="fas fa-file-pdf"></i> Full&nbsp;Report
  </a>
</div>

<div class="row justify-content-center my-4">
  <div class="col-md-10 text-center">
    {% include figure.liquid loading="eager"
       path="assets/img/flexure_hinge/ForceTorqueSensor_Graph.png"
       title="Market scan: how force capacity, moment capacity, size, and practical resolution trade off across commercial 6-DoF force–torque sensors (compiled during the internship)."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

## 1. Overview

The work explored a recurring constraint in **6-DoF force–torque sensing**: increasing structural stiffness to support **higher moments** often pushes the **force range** up as well, which can degrade tactility for low-force interactions. To evaluate a compliant alternative, I studied a **crossed-flexure (cross-spring) pivot** as a candidate mechanism and built an end-to-end workflow from literature, equations, MATLAB solver, prototype, and measurement.

---

## 2. Workflow (milestones)

1. **Market / systems framing**
   - Normalized FT sensor specs (force/moment ranges, size) and collected representative robotics constraints.

2. **Literature grounding to equations**
   - Crossed-flexure pivot (CFP) basics: stiffness varies with load, and the **crossing point** can significantly change behavior (Wittrick).
   - Lateral-loading CFP modeling: realistic scenarios include external forces (not only pure couples), and **parasitic center-shift** becomes central for sensing and crosstalk (Zelenika & Bona).

3. **MATLAB implementation**
   - Built a dimensionless formulation and a numerical solver for the nonlinear equilibrium.
   - Added utilities to compute derived kinematics (e.g., center drift) and to visualize predicted hinge shapes.

4. **CAD to prototype iteration**
   - CAD assembly to enforce consistent strip alignment and clamping and to enable repeatable measurement.

5. **Measurement pipeline (vision)**
   - MATLAB image processing for quick iteration: ROI selection, edge detection, curve fitting.
   - Used as a debugging and comparison aid, not as final metrology.

6. **Strain-gauge instrumentation (prep)**
   - Placement, bonding, wiring, and pitfalls documented for follow-on experimental validation.

---

## 3. Mechanism: crossed-flexure (cross-spring) pivot

A crossed-flexure pivot realizes compliant rotation by elastic bending of two intersecting leaf springs. **Wittrick (1951)** showed that rotational stiffness is not constant but varies with applied load, and that the **point at which the strips cross** strongly influences stability and stiffness variation. The mechanism is a useful testbed because it exhibits:

- **nonlinear stiffness** (especially under side forces),
- **parasitic translation (“center-shift”)** during rotation, which matters for sensing crosstalk and calibration.

<style>
  .flexure-wittrick-row figure img { height: 420px; width: auto; max-width: 100%; object-fit: contain; }
</style>
<div class="row mt-4 flexure-wittrick-row">
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/WitteickCrossedFlexurePivot_Front.png"
       title="Crossed-flexure pivot geometry (front view)."
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/WitteickCrossedFlexurePivot_Side.png"
       title="Loads and rotation illustration (side view)."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row justify-content-center my-4">
  <div class="col-md-10 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/TheBendingofaSingleStrip.png"
       title="Modeling starts from single-strip bending, then extends to the crossed configuration."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 4. Equations and methods (from literature to solver to derived kinematics)

This section explains the *modeling steps* used in the project, with pointers to the cited literature.

### 4.1 What the lateral-loading CFP model solves

**Zelenika & Bona (2002)** extended analytical models to high-precision pivots under **lateral loads** $H$ and $V$ (horizontal and vertical force components), rather than pure couples. That is the formulation used here. The mechanism state is described with:

- end deflections $\delta_1$, $\delta_2$ (lateral deflections of each strip end),
- axial shortenings / eccentricities $e_1$, $e_2$,
- internal reaction forces and moments (e.g., $P_1$, $P_2$, $F_1$, $F_2$, $M_{B1}$, $M_{B2}$),
- the rotation $\theta$.

This gives **11 unknowns**, so **11 compatibility and equilibrium equations** are needed to determine the configuration. The nonlinear relationship between internal forces and moments comes from integrating the beam curvature equation, accounting for the influence of axial loads on the elastic line.

### 4.2 Dimensionless variables

To keep the model scalable across strip sizes and materials (and to improve numerical conditioning), the solver uses a dimensionless form. Following the parameterization used in the literature (e.g., Zelenika & Bona; see also *Theoretical Framework and Scaling Optimization of Crossed-Flexure Architectures for Precision Sensing*), the project uses:

$$
h=\frac{H L^{2}}{EI}\csc\alpha,\quad
v=\frac{V L^{2}}{EI}\sec\alpha,\quad
\xi=\frac{2\delta}{\theta L}-1
$$

- $L$: characteristic strip length  
- $EI$: bending rigidity  
- $\alpha$: strip orientation angle  
- $h$, $v$: dimensionless horizontal and vertical loads  
- $\xi$: dimensionless deflection variable (used per strip, e.g., $\xi_1$, $\xi_2$)

A derived quantity used in back-substitution is $\lambda$, which captures geometry and shortening effects in terms of the stiffness parameters $\beta$ and $\xi$:

$$
\lambda=\frac{1}{4}\left(3-\coth^{2}\beta+\frac{\coth\beta}{\beta}+4\xi\right)
$$

### 4.3 Why Newton–Raphson

With large deflections and axial effects, closed-form solutions are not practical. The equilibrium expressions contain **transcendental hyperbolic functions** (e.g. \\(\coth(\beta)\\)), so the stiffness parameters \\(\beta_1\\), \\(\beta_2\\) cannot be solved analytically. The standard approach in the literature is to converge \\(\beta_1\\), \\(\beta_2\\) numerically via **Newton–Raphson** iterations.

### 4.4 Newton–Raphson implementation (MATLAB solver)

The implementation follows the usual pattern:

1. Define a residual \\(F(\beta_1,\beta_2;\theta,h,v)=0\\) encoding the coupled nonlinear equilibrium.
2. Approximate the Jacobian numerically (finite differences).
3. Update \\([\beta_1,\beta_2]\\) until the step is sufficiently small.

Conceptually, the code structure is:

```matlab
F_val = F(beta1, beta2, theta, h, v);

dF_dbeta1 = (F(beta1 + eps, beta2, theta, h, v) - F_val) / eps;
dF_dbeta2 = (F(beta1, beta2 + eps, theta, h, v) - F_val) / eps;

J = [dF_dbeta1, dF_dbeta2];
delta = -J \ F_val;

beta1 = beta1 + delta(1);
beta2 = beta2 + delta(2);
```

Project scripts: `newton_raphson_solution.m` (solver and parameters), `merge_simulation_and_real_data.m` (comparison with measurement-derived curves).

### 4.5 Back-substitution: from \\(\beta\\) to center shift and geometry

Once \\(\beta_1\\), \\(\beta_2\\) have converged, the solver computes:

- strip-wise deflection parameters \\(\xi_1\\), \\(\xi_2\\),
- the derived \\(\lambda\\) term per strip for kinematic reconstruction.

The **parasitic translation** (center drift) is then obtained from the reconstructed displacement components \\(d_x\\), \\(d_y\\):

$$
d=\sqrt{d_x^2+d_y^2}
$$

This step turns solver convergence into interpretable behavior: how much the center drifts during rotation and how the strips bend for the chosen loading.

---

## 5. CAD to prototype (iteration-focused)

CAD was used as an **experimental enabler**, emphasizing:

- repeatable strip alignment and crossing geometry,
- clamp seating and slip mitigation,
- camera access and lighting consistency,
- space for strain gauges and wiring strain relief.

<div class="row mt-4">
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/SolidWorks assembly of the flexure hinge.png"
       title="CAD assembly (overall)."
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/SolidWorks assembly of the flexure hinge Front View.png"
       title="Front view (clamping and alignment details)."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

The physical build made non-idealities visible: sensitivity to alignment and clamp seating, fixture compliance, and deformation patterns that helped debug the model and measurement pipeline.

<div class="row justify-content-center my-4">
  <div class="col-md-8 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/FinalPrototypeOfTheFlexuralPivotWithSensorsOnIt.png"
       title="Prototype used for iterative measurement and debugging."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 6. Measurement pipeline (vision-first, used for iteration)

Vision was used as a **fast feedback loop** to compare predicted and observed hinge shapes during iteration, not as final metrology.

### 6.1 MATLAB computer-vision steps

Pipeline structure (as in `hinge_comp_vis.m`):

1. **ROI selection** (interactive; mask applied to image)
2. **Preprocessing** (grayscale, median filtering, contrast improvement)
3. **Morphology** (open/close to strengthen edges)
4. **Canny edge detection** (plus cleanup: remove small objects, fill holes)
5. **Curve fitting** (second-order polynomial; inlier filtering to reduce artifacts)

<div class="row justify-content-center my-4">
  <div class="col-md-8 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/ApplyingTheCannyEdgeDetectionAlgorithm.png"
       title="Vision workflow: ROI to preprocessing to edge extraction to curve fitting (from the report)."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### 6.2 Qualitative checkpoints (shape comparison)

Representative bending configurations (e.g., 15° and 30°) were used as checkpoints to verify that the solver produced plausible curvature shapes, that extraction was stable enough for iteration, and that fixture changes had the expected effect—without emphasizing numeric fit metrics.

<div class="row mt-4">
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/MATLAB_ModelPlotOfFlexureHingeUnder15DegreeBending.png"
       title="Model output (checkpoint A)."
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/RealLifeDeformationOfFlexureHingeUnder15DegreeBendingComputerVision.png"
       title="Vision-extracted curve (checkpoint A)."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row mt-4">
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/MATLAB_ModelPlotOfFlexureHingeUnder30DegreeBending.png"
       title="Model output (checkpoint B)."
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/RealLifeDeformationOfFlexureHingeUnder30DegreeBendingComputerVision.png"
       title="Vision-extracted curve (checkpoint B)."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 7. Strain-gauge instrumentation (prepared for follow-on work)

To support repeatable experiments beyond camera-based curves, the project documented a strain-gauge workflow: placement on flexures, surface prep and bonding, wiring strain relief, and practical pitfalls.

<div class="row mt-4">
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/InstalledStrainGauge.JPG"
       title="Gauge bonded and wired on the flexure."
       class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-6 text-center">
    {% include figure.liquid
       path="assets/img/flexure_hinge/Strain Gauge Manual All Kit.JPG"
       title="Reference material used during the installation workflow."
       class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## 8. Literature connections (design implications)

The literature guided what to try next:

- **Crossing-point sensitivity (Wittrick):** Changing where the strips cross alters stability and stiffness variation.
- **Center-shift as a constraint:** Parasitic translation matters for sensing crosstalk and calibration; it is a central outcome of the lateral-loading formulation (Zelenika & Bona).
- **Large-stroke and reduced-parasitic topologies:** Work such as **Gunnink et al.** (performance optimization of large-stroke flexure hinges) and **TRIVOT**-style designs (Thalmann & Henein) motivate future mechanism choices when center-shift or support-stiffness degradation becomes limiting.

---

## 9. Integration exploration

The report also documents design work for a robot-base measurement setup: adapter concept for a Franka Panda scenario with an external 6-DoF FT sensor (FTE-Omega family), a SCADA/measurement stack, and a Gazebo digital-twin setup for simulation.

---

## References

- **Wittrick, W. H.** (1951). *The properties of crossed flexure pivots and the influence of the point at which the strips cross*. Aeronautical Quarterly, Cambridge Core.
- **Zelenika, S., & Bona, F. D.** (2002). *Analytical and experimental characterisation of high-precision flexural pivots subjected to lateral loads*. Precision Engineering. [University of Arizona mirror](https://wp.optics.arizona.edu/optomech/wp-content/uploads/sites/53/2016/10/Zelenika-2002.pdf).
- **Gunnink, K., Aarts, R., & Brouwer, D.** (2013). *Performance optimization of large stroke flexure hinges for high stiffness and eigenfrequency*. Precision Engineering.
- **Thalmann, P., & Henein, S.** (TRIVOT / zero parasitic center-shift kinematic design). EPFL Infoscience.
- *Theoretical Framework and Scaling Optimization of Crossed-Flexure Architectures for Precision Sensing* — analytical foundations, dimensionless parameterization, and literature synthesis used to guide the modeling approach.

---

<div align="center">
  <p><em>Research conducted at TUM-MIRMI (2024) • Supervisor: Mehmet Can Yıldırım • Chair: Prof. Sami Haddadin</em></p>
</div>

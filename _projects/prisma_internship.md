---
layout: page
title: "PRISMA Lab Internship — Posture-Capable Suspension Concept for a Lunar Micro-Rover"
collection: projects
importance: 1
description: >
  Summer 2025 research internship at PRISMA Lab (Univ. of Naples Federico II): I developed and justified
  a per-side actuated suspension concept for a compact lunar rover (heave + roll, passive pitch averaging)
  and delivered a simulation-first implementation roadmap (ROS 2 + Gazebo) for posture-aware autonomy.
permalink: /projects/prisma_lunar_rover_internship/
date: 2025-10-20
category: Research Projects
tags: [robotics, rovers, suspension, lunar, ros2, gazebo, ros2_control, simulation, autonomy]
img: /assets/img/prisma_lunar_rover_internship/MobileRobotReconfigurations_A_LowGroundClearance_B_HighGroundClearance_C_LeveledConfiguration_HJiang.png
mathjax: true
author: Yunus Emre Danabaş
startDate: 2025-06-01
endDate: 2025-10-20
---

<div class="mb-3">
  <a class="btn btn-outline-primary" href="https://prisma.dieti.unina.it/" target="_blank" rel="noopener noreferrer">
    <i class="fas fa-university"></i> PRISMA Lab
  </a>
  <a class="btn btn-outline-secondary" href="/assets/pdf/prisma_lunar_rover_internship/YunusEmreDanabas_PRISMA_Report.pdf" target="_blank" rel="noopener noreferrer">
    <i class="fas fa-file-pdf"></i> Technical summary (PDF)
  </a>
</div>

## 1. Introduction and Project Goal

This report presents the design rationale, system architecture, and simulation plan for a posture-capable suspension system on a compact lunar micro-rover. This work builds directly on a prior literature survey that identified a critical gap between the simple reliability of passive rover suspensions and the prohibitive complexity of fully actuated systems. The core design philosophy is to merge the best of both worlds: leveraging the proven stability of **passive terrain conformity** while adding **targeted, selective actuation** to enable new mission capabilities.

### The Engineering Problem: The Need for Posture Authority

Small lunar rovers must operate safely and effectively on uneven terrain with strict mass and power constraints. A purely passive suspension, while robust, cannot be commanded to change its stance, leading to significant operational limitations. This project addresses three key drivers that necessitate active posture control:

- **Safety and Stability:** The ability to actively regulate chassis roll is critical for maintaining stability on side-slopes and preventing tip-over events.
- **Traversability:** The capacity to adjust ride height allows the rover to increase ground clearance for overcoming obstacles or to reduce its center of gravity for added stability.
- **Science Operations:** The requirement to lower the chassis to a precise, low standoff is essential for placing instruments in contact with the lunar surface for in-situ analysis.

The engineering challenge is to achieve these functions without incurring the high mass, power, and sealing burden of conventional, fully active suspensions.

### The Proposed Solution: Per-Side Actuation

The selected architecture is a **per-side actuated suspension** that provides full control over chassis heave and roll while preserving the predictable, rocker-like behavior of **passive pitch-averaging**. The mechanism uses one actuator per side at a mid-hinge, enabling two distinct modes of control:

- **Symmetric Actuation** (both actuators move together) commands chassis **heave**, adjusting the rover's ride height.
- **Differential Actuation** (actuators move in opposition) commands chassis **roll**, allowing for active leveling on slopes.

This approach is enabled by the choice of a **self-locking linear actuator**, which can hold a desired posture—particularly the low-standoff science pose—with near-zero steady power consumption, a critical advantage for energy-constrained missions.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/ParameterModelActiveSuspension_HJiang.png"
  title="Conceptual model of the per-side actuated suspension. A linear actuator (L_c) controls the linkage geometry, enabling commanded changes in chassis height (H) and roll while preserving the passive rocker-like kinematics for pitch stability. From Jiang et al. (2019)."
  class="img-fluid rounded z-depth-1"
  loading="eager"
%}
</div>

---

## 2. Design Rationale and Technology Survey

Choosing a mobility system for a compact lunar rover is a critical design decision that requires balancing off-road performance against mechanical complexity, power consumption, and overall reliability. This section surveys existing rover suspension designs to justify the system chosen for this project. The analysis examines the spectrum of technologies, from simple, reliable passive systems to complex, fully actuated ones, to identify an optimal architecture that combines the natural terrain-following ability of passive designs with the targeted control needed for mission success.

### 2.1 Passive Systems (The Heritage Baseline)

Passive suspension systems are the established foundation for planetary rovers, prized for their simplicity and robustness. The **Rocker-Bogie Suspension**, used on the Mars Exploration Rovers (MER), is the canonical example. Its defining feature is a mechanical differential linkage that averages the pitch of the two sides, ensuring all wheels remain in contact with the ground over uneven terrain. While this provides predictable stability and excellent terrain conformity, it offers no ability to command the rover's posture, a critical limitation for near-ground science.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/PitchAveragingBehaviorWhenSurmountingObstacle_top_and_DifferentialKinematics_bottom.jpg"
  title="The passive rocker-bogie mechanism. The differential linkage (bottom) ensures that as one rocker goes up, the other goes down, averaging the chassis pitch and keeping all wheels on the ground when surmounting obstacles (top). This provides excellent passive stability but no active posture control."
  class="img-fluid rounded z-depth-1"
%}
</div>

### 2.2 Fully Actuated Systems (The High-Capability Bound)

At the other end of the spectrum are fully actuated systems that provide the highest degree of posture control. Architectures like **Per-Corner Actuation** or **Wheel-on-Leg** systems offer full authority over heave, roll, and pitch. This allows for advanced maneuvers like "walking" over obstacles or precisely leveling the chassis on complex slopes. However, this capability comes at a steep price: a high actuator count (4, 6, or more), a significant increase in mass and power consumption, and a complex sealing and harnessing challenge. For a compact, resource-constrained lunar rover, these architectures are prohibitively complex.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/DesignDrawingDimension_TianxiangLan.jpg"
  title="A design drawing of a four-wheeled rover with per-corner active suspension, providing full posture control but with high mechanical complexity."
  class="img-fluid rounded z-depth-1"
%}
</div>

### 2.3 The Selected Approach: Per-Side Actuation

The optimal solution for this project lies between the two extremes. A **per-side actuated suspension** provides the necessary posture authority for the mission without incurring the penalties of a fully actuated system. By adding just one actuator per side while retaining a passive differential for pitch, the design achieves a "best of both worlds" capability. This philosophy of **selective actuation** allows for targeted control over heave and roll, which is essential for science and safety, while preserving the predictable passive behavior that makes rocker-style systems so reliable.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/SimplifiedPracticalModel_HJiang.jpg"
  title="A simplified practical model of a per-side actuated suspension. This concept uses a minimal number of actuators to achieve roll and height adjustments, representing a balanced approach to posture control."
  class="img-fluid rounded z-depth-1"
%}
</div>

### 2.4 Comparative Analysis

The decision to adopt a per-side actuation architecture is summarized in the comparative analysis below. This approach provides the best balance of capability, complexity, and power efficiency for a compact lunar science rover. It delivers the essential heave and roll authority needed for the mission while remaining simple, robust, and energy-efficient.

| Architecture | Actuator count | Steady hold power | Sealing complexity | Posture authority | Key characteristics and suitability |
|:---|:---:|:---:|:---:|:---:|---|
| Passive Rocker-Bogie (MER / ExoMars) | 0 | N/A | Low | None | Highly reliable, excellent passive terrain conformity. No commanded posture. High suitability as a baseline. |
| **Per-Side Actuation (Our Concept)** | **2** | **Very low (&lt;1 W)** | **Medium** | **Heave + Roll** | **Optimal balance: Provides critical heave/roll control while preserving passive pitch. Low power and complexity. Very high suitability (Selected).** |
| Per-Corner Actuation (Lan / Gratton) | 4+ | Medium | High | Full (Heave, Roll, Pitch) | Maximum posture authority for extreme terrain, but at a high cost of mass, power, and control complexity. Medium suitability. |
| Wheel-on-Leg (MMX) | 6+ | High | Very high | Full + Leg Placement | Unparalleled adaptability for highly discontinuous terrain. Prohibitively complex for a compact lunar mission. Very low suitability. |

---

## 3. System Architecture and Mechanical Design

Building on the design rationale established above, this section details the concrete architecture and mechanical embodiment of the posture-capable rover. It transitions from the "why" to the "what," defining the physical implementation of the suspension system, its operational context within a multi-robot mission, and the quantitative performance targets that guide its design and validation.

### 3.1 High-Level System Overview

The actuated suspension is a specialized system designed for a specific role within a heterogeneous robotic team. This mission concept, inspired by the DLR ARCHES campaign, divides labor across three compact rovers to manage complexity and maximize mission efficiency:

- **Rover A (Scout):** Equipped with long-range perception, this rover performs initial reconnaissance and mapping. It utilizes a fully passive suspension for maximum simplicity and endurance.
- **Rover B (Contact):** This is the specialized science rover, equipped with the per-side actuated suspension to perform near-ground contact tasks.
- **Rover C (Logistics):** A simple, passive rover designed to transport payload boxes, provide mobile charging, or act as a communications relay.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/ARCHES_TeamOfRobotsScenario.jpg"
  title="The ARCHES space-analogue mission, which demonstrates the effectiveness of a heterogeneous team of robotic assets (flying, driving, manipulating) collaborating on a complex science task. This provides the operational blueprint for our three-rover concept."
  class="img-fluid rounded z-depth-1"
%}
</div>

### 3.2 Mechanical Embodiment

#### Actuator and Transmission

The core of the system is the actuator that drives the mid-hinge bogie. The primary requirement is the ability to hold a static load with zero power. Based on extensive research, a **self-locking leadscrew mechanism** driven by a brushed DC motor is the selected embodiment. This choice is justified by:

- **Zero-Power Hold:** The inherent friction in a low-helix-angle leadscrew (like an Acme screw) prevents back-driving, allowing the rover to hold its Contact-Low posture indefinitely without consuming power.
- **High Load Capacity:** Leadscrews offer a significant mechanical advantage, enabling a small motor to generate the high forces needed to lift and support the rover chassis.
- **Robustness:** The mechanism is mechanically simple and has extensive flight heritage in space applications.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/AdjustableSideFrame_HJiang.jpg"
  title="Diagram of the per-side actuated mechanism, showing the linear actuator integrated into the side frame to control the bogie linkage."
  class="img-fluid rounded z-depth-1"
%}
</div>

#### Environmental Hardening

To ensure reliability in the harsh lunar environment, a multi-layer dust mitigation strategy is employed:

- A flexible **bellows** will provide the primary seal, enclosing the leadscrew to protect it from abrasive dust.
- Labyrinth seals will be used at the actuator interfaces to further prevent particle ingress.
- All materials will be selected for their tolerance to wide temperature swings and vacuum conditions.

### 3.3 Operational Architecture

#### Performance Targets

The system is designed to meet a set of specific, quantifiable performance targets. These values are derived from mission requirements for science operations and safe traversal.

| Parameter | Target value | Rationale |
|---|:---:|---|
| Ride height range | 100–250 mm | Provides sufficient range for both obstacle clearance (High Traverse) and near-ground science (Contact-Low). |
| Steady hold power | &lt; 1.0 W | Critical for power efficiency during long-duration science, enabled by the self-locking leadscrew. |
| Posture transition time | 5–15 s | Ensures quasi-static, controlled motion to maintain stability and protect the mechanism. |
| Residual roll error | &lt; 1.0 deg | Required for stable instrument pointing and safety on side-slopes up to 15 degrees. |
| Actuator force (static) | 500–1000 N | Sized to support the rover's mass and handle expected load distribution. |

#### Operational Posture Presets

To simplify operations, the suspension will be commanded using three discrete posture presets:

- **High Traverse:** Maximizes ground clearance for negotiating obstacles.
- **Level Traverse:** The nominal driving posture, used with active roll leveling for stable travel on uneven or sloped terrain.
- **Contact-Low:** Lowers the rover chassis to a minimal standoff, allowing science instruments to interact with the lunar surface.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/MobileRobotReconfigurations_A_LowGroundClearance_B_HighGroundClearance_C_LeveledConfiguration_HJiang.png"
  title="The three primary operational postures enabled by the per-side actuated suspension: (a) Contact-Low for science, (b) High Traverse for obstacle clearance, and (c) Level Traverse for roll-stabilized driving on side-slopes."
  class="img-fluid rounded z-depth-1"
%}
</div>

---

## 4. Control, Simulation, and Navigation Integration

This section details the software architecture and simulation strategy for implementing and validating the posture-capable suspension system. The approach bridges the mechanical design from the previous section with a robust control framework, a high-fidelity simulation environment, and a clean interface for autonomous navigation. The goal is to create a simulation that accurately reflects the physical system and allows for the verification of key performance requirements.

### 4.1 ROS 2 Control Architecture

The control system is built on standard, community-supported ROS 2 packages to ensure modularity and reliability. A two-layer approach separates high-level logic from low-level hardware control:

- **Low-Level Control:** The industry-standard `ros2_control` framework is used for direct hardware (or simulation) interfacing. It manages standard `position_controllers` for the two mid-hinge actuators and `velocity_controllers` for the four wheel drives. This layer is responsible for executing joint commands and publishing joint states.
- **High-Level Control:** A custom **Posture Manager** node serves as the intelligent interface to the suspension. Written in Python, this node provides a ROS 2 Action server that accepts high-level posture goals (e.g., "Go to High Traverse"). Its responsibilities include:
  - Translating posture presets into coordinated joint trajectories for the two mid-hinge actuators.
  - Enforcing safety constraints, such as velocity and acceleration limits, to ensure smooth, quasi-static motion.
  - Monitoring sensor feedback (e.g., from an IMU) to manage the active roll-leveling control loop.
  - Reporting status and feedback to the navigation system.

The command flow is: **Navigation System (Behavior Tree)** sends an Action Goal to the **Posture Manager**, which issues Joint Commands to **ros2_control (Position Ctrl)**; the latter sends Effort/Position to **Gazebo Sim / Hardware**, which returns Joint States. The **IMU Sensor** feeds Roll Angle to the Posture Manager, which sends Action Feedback (dashed) back to Navigation.

### 4.2 Gazebo Simulation Environment

The validation of the rover's unique kinematics will be performed in the Gazebo simulator. A high-fidelity model is essential for this process.

#### CAD-First URDF/Xacro Pipeline

To ensure the simulated model is a perfect representation of the mechanical design, a strict **CAD-first workflow** is used. The rover model, including all link dimensions, masses, inertias, and joint limits, is defined in SolidWorks. It is then exported to a URDF/Xacro file, which serves as the single source of truth for the simulation. This prevents inconsistencies between the mechanical design and the simulated robot.

#### Custom Plugin for Passive Differential

A key feature of the design is the passive mechanical differential that averages the pitch of the chassis. Standard physics engines in Gazebo cannot natively simulate this type of closed kinematic chain. To address this, a **custom Gazebo C++ ModelPlugin** will be developed. This plugin will:

- Read the state of the bogie joints at each simulation step.
- Calculate the constraint forces required to emulate the behavior of the physical linkage.
- Apply these forces to the model, ensuring that the rover's passive pitch-averaging behavior is realistically simulated.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/LRU_KinematicSideAndTopView.jpg"
  title="Kinematic diagram of a rover with a passive differential linkage (center). The custom Gazebo plugin is designed to numerically emulate the mechanical constraints imposed by this physical linkage, which is critical for achieving a realistic simulation of the rover's passive pitch-averaging behavior."
  class="img-fluid rounded z-depth-1"
%}
</div>

### 4.3 Navigation and Autonomy Interface

To integrate posture capabilities with the rover's autonomy, a simple and robust interface is provided via a **ROS 2 Action** named `SetPosture.action`. This allows a high-level planner to command a target posture (e.g., `HIGH` or `LOW`) and monitor its execution. The Posture Manager handles all underlying complexity, including trajectory generation and safety checks. This design is well-suited for integration with modern planning systems, such as Behavior Tree-based navigators.

The action is defined with three parts: a *goal* for the client to send, a *result* to signal completion, and continuous *feedback* during the transition:

- **Goal:** `target_posture` (enum), `roll_offset_rad` (float), `heave_offset_m` (float).
- **Result:** `success` (bool).
- **Feedback:** `current_state` (enum), `percent_complete` (float).

---

## 5. Verification, Validation, and Failure Analysis

This section outlines the plan for verifying the performance of the actuated suspension system and ensuring its operational robustness. The validation will be conducted entirely within the Gazebo simulation environment, testing the system against the key performance targets established earlier. A high-level Failure Mode and Effects Analysis (FMEA) is also presented to address key failure modes.

### 5.1 Simulation-Based Validation Plan

The V&V plan confirms that the system meets its requirements through a series of targeted simulation tests. The test matrix below defines the specific metrics and success criteria for each test. These tests will be conducted in two simple Gazebo worlds: a **Flat Plane World** for baseline functional checks and a **Static Ramp World** with a 15-degree slope for quantitative performance testing of roll-leveling and stability.

<div class="text-center" style="max-width: 65%; margin: 0 auto 1.5rem auto;">
{% include figure.liquid
  path="assets/img/prisma_lunar_rover_internship/DescriptionOfGyroStabilizedQuadrupedalDriving_EricGratton.jpg"
  title="Conceptual illustration of a rover using differential actuation to stabilize its body on uneven terrain. The Roll Leveling Test is designed to quantitatively validate this exact capability in a controlled ramp scenario."
  class="img-fluid rounded z-depth-1"
%}
</div>

| Test name | Key metric(s) | Success criteria |
|---|---|---|
| **1. Preset Transition Test** (Flat Plane World) | Transition Time (s), Joint Velocity Profile | Meets the 5–15 s target. Smooth, trapezoidal velocity profile with no overshoot or oscillation. |
| **2. Roll Leveling Test** (Static Ramp World) | Residual Roll Error (deg), Steady-State Joint Effort (Nm) | Maintained at &lt; 1.0 deg while stationary on the ramp. Minimal oscillation, indicating stable controller performance. |
| **3. Low-Power Hold Test** (Static Ramp World) | Power Consumption (W), Position Drift (mm) | Near-zero (&lt;1 W) steady-state power draw in Contact-Low stance. No detectable drift over a simulated 10-minute hold period. |

### 5.2 Failure Mode and Effects Analysis (FMEA)

A preliminary FMEA was conducted to identify and mitigate potential system failures. The analysis focuses on ensuring the system prioritizes graceful degradation and fail-safe behaviors.

| Failure mode | Potential effect(s) | Mitigation strategy |
|---|---|---|
| **Actuator Seizure** | Loss of motion on one side. Inability to change posture. Potential for chassis twisting if the other actuator is commanded to move. | The Posture Manager detects the fault (via encoder timeout or high current) and immediately inhibits all motion. The system reverts to a safe, fully passive mode. |
| **IMU Failure** | Loss of accurate roll feedback. Active leveling controller could issue erratic or dangerous commands, leading to instability. | The control software will use a data-validity check and a message heartbeat timeout to detect sensor failure. Upon fault, all active leveling is disabled and the system reverts to passive mode. |
| **Dust Seal Failure** | Gradual ingress of abrasive dust into the leadscrew mechanism, leading to accelerated wear and increased friction over time. | This is a graceful degradation. The Posture Manager will monitor motor current during transitions. A significant, trending increase will trigger a health status warning, flagging the need for inspection. |

---

## 6. Conclusion and Future Work

This report has established a complete and well-justified pathway for the development of a posture-capable suspension system for a compact lunar rover. By synthesizing an extensive literature survey with a focused analysis of field-proven systems like the DLR LRU, I defined a robust architecture that intelligently balances mission capability with the strict constraints of a small-scale planetary mission. The selected design, a **per-side actuated suspension with passive pitch-averaging**, provides the necessary posture authority for science and safety while remaining simple, power-efficient, and reliable.

### 6.1 Summary of Contributions

The primary achievement of this work is the creation of a comprehensive, simulation-ready engineering plan. The key contributions are threefold:

1. **A Justified Design Rationale:** A rigorous comparative analysis of existing rover architectures has been presented, definitively justifying the selection of the per-side actuation concept as the optimal middle ground between passive and fully actuated systems.
2. **A Detailed System Architecture:** A complete mechanical and operational architecture has been defined. This includes the selection of a self-locking leadscrew mechanism for zero-power hold, a multi-layer dust mitigation strategy, and a set of quantitative performance targets to guide development.
3. **A Clear Implementation and Validation Plan:** A full plan for implementing the system in a ROS 2 and Gazebo environment has been laid out, complete with a control strategy, a custom simulation plugin, a formal navigation interface, and a rigorous validation matrix to test the design against its requirements.

### 6.2 Future Work and Next Steps

The work provides a solid foundation for the project to proceed along two parallel tracks: completing the simulation-based validation and beginning the transition to physical hardware.

**Immediate Next Steps (Simulation Phase)**

The immediate priority is to execute the simulation and validation plan outlined above to gather quantitative performance data.

- Finalize the rover's URDF model from the latest CAD version, ensuring all mass, inertia, and joint properties are accurate.
- Implement the Python-based Posture Manager node and the C++ Gazebo plugin for the passive differential.
- Execute the full Verification and Validation (V&V) test matrix in the simulated ramp and flat-plane worlds.
- Analyze the simulation results to confirm that all performance targets have been met.

**Near-Term Next Steps (Hardware Prototyping)**

Following a successful simulation campaign, the focus will shift to de-risking the hardware and physical implementation.

- Begin the detailed design and fabrication of a **physical, single-side prototype** of the actuator and bogie assembly for benchtop testing.
- Conduct physical load and power consumption tests on the prototype to validate the zero-power hold assumption and the actuator's performance under load.
- Develop and test the physical dust-sealing solution, including the flexible bellows and any additional seals at the rotating interfaces.

---

## Acknowledgements

Supervised by **Prof. Vincenzo Lippiello**, within **Prof. Bruno Siciliano's** lab at the University of Naples Federico II (PRISMA Lab).

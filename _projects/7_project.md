---
layout: page
title: "Modeling and Real-Time Control of a 2-DOF, 5-Link Manipulator"
description: "Developed and implemented a model-based, real-time control system for a 2-DOF, 5-link robotic manipulator integrating task-space and joint-space controllers for precise trajectory tracking."
importance: 4
category: "Course Projects"
---

## Project Overview

This project, completed as part of the ME403 Introduction to Robotics course at Sabancı University, focused on developing a real-time control system for a 2-DOF, 5-link robotic manipulator. The system integrates both task-space and joint-space controllers to achieve precise trajectory tracking.

### Key Features and Contributions

- **Computed Torque Control:**  
  Designed and implemented computed torque controllers in MATLAB/Simulink that enable accurate motion control in both task-space and joint-space.

- **PD + Gravity Compensation:**  
  Developed and fine-tuned a PD + Gravity compensator to ensure stable trajectory tracking along horizontal, vertical, and elliptical paths.

- **Simulation and Testing:**  
  Conducted Software-in-the-Loop (SIL) simulations using forward/inverse kinematics and dynamic models, followed by Hardware-in-the-Loop (HIL) testing with a TI C2000 microcontroller to validate controller performance.

- **Integrated Hardware Control:**  
  Implemented PWM-based motor control along with encoder-based feedback to provide precise position and velocity estimation.

- **Kinematics and Transformations:**  
  Applied joint-space and task-space transformations, allowing both independent and cooperative control of the manipulator's joints.

## Additional Details

This project brought together simulation and real-world testing to ensure robust controller performance. By combining advanced computed torque control with PD + Gravity compensation, the system effectively handled complex motion trajectories while ensuring real-time responsiveness and precision.

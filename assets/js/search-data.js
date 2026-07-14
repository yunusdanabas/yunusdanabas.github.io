// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "CV",
          description: "A concise summary of my education, work experience, projects, and skills in robotics, mechatronics, and automation.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A curated collection of my work—from Research initiatives to course-based assignments. Click on any card for full details.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "Selected open-source repositories from robotics, simulation, and embedded systems work.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-technical-reports",
          title: "Technical Reports",
          description: "Internship and research reports from PRISMA Lab and TUM MIRMI.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "Teaching assistant experience at Sabancı University.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "projects-multiexplorer-multi-robot-frontier-exploration-with-turtlebot3",
          title: 'Multiexplorer — Multi-Robot Frontier Exploration with TurtleBot3',
          description: "My first ROS project: a Gazebo-based study comparing single-, double-, and triple-robot frontier exploration, SLAM, and map-merging with TurtleBot3.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/multiexplorer/";
            },},{id: "projects-fpga-airhockey-digital-showdown-on-nexys-a7",
          title: 'FPGA-AirHockey — Digital Showdown on Nexys A7',
          description: "Two-player air-hockey game on a Nexys A7 FPGA: Verilog state machine drives a 5×5 LED rink and real-time score displays.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/fpga_airhockey/";
            },},{id: "projects-2-dof-manipulator-model-based-real-time-control",
          title: '2-DOF Manipulator — Model-Based Real-Time Control',
          description: "MATLAB/Simulink and TI C2000 control stack: computed-torque, PD with gravity compensation, and joint/task-space transforms for millimetre-level trajectory tracking on a 5-link planar robot in real time.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2dof_manipulator/";
            },},{id: "projects-tum-mirmi-panda-base-digital-twin-ros-noetic-gazebo-package",
          title: 'TUM MIRMI — Panda-Base Digital Twin — ROS Noetic / Gazebo Package',
          description: "ROS Noetic package that provides a Gazebo 11 + RViz digital twin of a Franka Emika Panda mounted on a custom aluminium-profile base. Built as a reusable simulation workspace for URDF/Xacro iteration, controller bring-up, and safe pre-hardware validation. Developed at TUM MIRMI.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/panda_base_sim/";
            },},{id: "projects-tum-mirmi-crossed-flexure-pivot-study-process-driven-modeling-amp-prototyping",
          title: 'TUM MIRMI — Crossed-Flexure Pivot Study — Process-Driven Modeling &amp;amp; Prototyping',
          description: "Process-focused study of crossed-flexure (cross-spring) pivots as compliant stages for force–torque sensing: literature grounding (parasitic center-shift, lateral loading), dimensionless modeling, Newton–Raphson MATLAB solver, CAD to prototype iterations, and vision-based deformation tracking. Conducted at TUM-MIRMI under Mehmet Can Yıldırım and Prof. Sami Haddadin.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/flexure_hinge_torque_sensor/";
            },},{id: "projects-baxter-manipulation-with-ros-noetic-and-object-rearrangement",
          title: 'Baxter manipulation with ROS Noetic and object rearrangement',
          description: "Group project on Bayesian Optimization with transfer learning for sequential object placement and rearrangement on cluttered surfaces. I worked on the physical robot side and ported the Baxter codebase to ROS Noetic.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/baxter/";
            },},{id: "projects-planar-elbow-manipulator-design-amp-control",
          title: 'Planar Elbow Manipulator — Design &amp;amp; Control',
          description: "A 2-DoF planar elbow manipulator that uniquely met every mechanical requirement in ME408, integrating robust CAD, power electronics, and dual-loop control for precise trajectory tracking.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/elbow_manipulator/";
            },},{id: "projects-diffswing-neural-cart-pole-control-with-jax-amp-mujoco",
          title: 'DiffSwing: Neural Cart-Pole Control with JAX &amp;amp; MuJoCo',
          description: "A hybrid control system that combines neural network energy shaping with classical LQR stabilization for cart-pole swing-up. Trained end-to-end in differentiable JAX simulation with real-time MuJoCo deployment achieving 98% success rate and 1.9s swing-up time.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/mujoco_cartpole/";
            },},{id: "projects-3rrp-mechanism-kinematic-amp-dynamic-analysis",
          title: '3RRP Mechanism — Kinematic &amp;amp; Dynamic Analysis',
          description: "A full symbolic and numerical study of a 3-RRP planar parallel manipulator: closed-form kinematics, workspace and isotropy metrics, and Kane vs Lagrange dynamics validated in Simulink.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3rrp_analysis/";
            },},{id: "projects-passive-walker-rl-curriculum-driven-biped-locomotion-in-jax-amp-brax",
          title: 'Passive Walker RL — Curriculum-Driven Biped Locomotion in JAX &amp;amp; Brax',
          description: "A three-stage pipeline (≤ 300 LoC per stage) that bootstraps a passive-dynamic bipedfrom a finite-state expert to a GPU-scale PPO policy in minutes.  MuJoCo suppliesfidelity; Brax pushes &gt; 1 M env-steps s⁻¹ for massive sweeps, yielding smooth,sample-efficient walking with a single 1 M-param network.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/passive_walker_rl/";
            },},{id: "projects-hand-steer-sim-real-time-gesture-teleoperation-for-mobile-robots",
          title: 'Hand-Steer Sim — Real-Time Gesture Teleoperation for Mobile Robots',
          description: "Hand-Steer Sim is a vision-only teleoperation stack that converts webcam/RealSense video into ROS geometry_msgs/Twist commands for differential-drive robots. It supports two modes—(1) discrete hand-sign driving and (2) a steering-wheel metaphor that gates turn commands behind a Holding Wheel pose—using MediaPipe landmarks and compact TFLite models. Includes data recording GUI, training notebooks, Docker (CPU/GPU), and Gazebo integration.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hand_steer_sim/";
            },},{id: "projects-at42qt1011-capacitive-grip-touch-sensor-pcb",
          title: 'AT42QT1011 Capacitive Grip/Touch Sensor PCB',
          description: "AT42QT1011-based capacitive grip/touch sensor PCB work for industrial gripper applications, designed in KiCad and fabricated in-house on an LPKF S63.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/asmetal_sensor/";
            },},{id: "projects-prisma-lab-internship-posture-capable-suspension-concept-for-a-lunar-micro-rover",
          title: 'PRISMA Lab Internship — Posture-Capable Suspension Concept for a Lunar Micro-Rover',
          description: "Summer 2025 research internship at PRISMA Lab (Univ. of Naples Federico II): I developed and justified a per-side actuated suspension concept for a compact lunar rover (heave + roll, passive pitch averaging) and delivered a simulation-first implementation roadmap (ROS 2 + Gazebo) for posture-aware autonomy.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/prisma_lunar_rover_internship/";
            },},{id: "projects-dobot-robotics-lab-open-source-teaching-package-for-magician-amp-mg400",
          title: 'Dobot Robotics Lab — Open-Source Teaching Package for Magician &amp;amp; MG400',
          description: "An open (Apache-2.0) robotics teaching package built for ME403 Introduction to Robotics: four progressive labs — forward kinematics, Jacobian/inverse kinematics, path planning, and image-based visual servoing — on a simulation-first stack that runs the Dobot Magician and MG400 with no hardware attached. 138 tests pass in 17 seconds on a laptop with no robot in the room.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/dobot_robotics_lab/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%75%6E%75%73%64%61%6E%61%62%61%73@%73%61%62%61%6E%63%69%75%6E%69%76.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/yunusdanabas", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/yunus-emre-danabas", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

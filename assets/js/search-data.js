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
          title: "cv",
          description: "A concise summary of my education, work experience, projects, and skills in robotics, mechatronics, and automation.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A curated collection of my work—from Research initiatives to course-based assignments. Click on any card for full details.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "post-a-post-with-image-galleries",
      
        title: "a post with image galleries",
      
      description: "this is what included image galleries could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/photo-gallery/";
        
      },
    },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "Posts",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-a-post-with-tabs",
      
        title: "a post with tabs",
      
      description: "this is what included tabs in a post could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/tabs/";
        
      },
    },{id: "post-a-post-with-typograms",
      
        title: "a post with typograms",
      
      description: "this is what included typograms code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/typograms/";
        
      },
    },{id: "post-a-post-that-can-be-cited",
      
        title: "a post that can be cited",
      
      description: "this is what a post that can be cited looks like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/post-citation/";
        
      },
    },{id: "post-a-post-with-pseudo-code",
      
        title: "a post with pseudo code",
      
      description: "this is what included pseudo code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/pseudocode/";
        
      },
    },{id: "post-a-post-with-code-diff",
      
        title: "a post with code diff",
      
      description: "this is how you can display code diffs",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/code-diff/";
        
      },
    },{id: "post-a-post-with-vega-lite",
      
        title: "a post with vega lite",
      
      description: "this is what included vega lite code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/vega-lite/";
        
      },
    },{id: "post-a-post-with-geojson",
      
        title: "a post with geojson",
      
      description: "this is what included geojson code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/geojson-map/";
        
      },
    },{id: "post-a-post-with-echarts",
      
        title: "a post with echarts",
      
      description: "this is what included echarts code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/echarts/";
        
      },
    },{id: "post-a-post-with-chart-js",
      
        title: "a post with chart.js",
      
      description: "this is what included chart.js code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/chartjs/";
        
      },
    },{id: "post-a-post-with-tikzjax",
      
        title: "a post with TikZJax",
      
      description: "this is what included TikZ code could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/tikzjax/";
        
      },
    },{id: "post-a-post-with-bibliography",
      
        title: "a post with bibliography",
      
      description: "an example of a blog post with bibliography",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/post-bibliography/";
        
      },
    },{id: "post-a-post-with-jupyter-notebook",
      
        title: "a post with jupyter notebook",
      
      description: "an example of a blog post with jupyter notebook",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/jupyter-notebook/";
        
      },
    },{id: "post-a-post-with-table-of-contents-on-a-sidebar",
      
        title: "a post with table of contents on a sidebar",
      
      description: "an example of a blog post with table of contents on a sidebar",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/sidebar-table-of-contents/";
        
      },
    },{id: "post-a-post-with-audios",
      
        title: "a post with audios",
      
      description: "this is what included audios could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/audios/";
        
      },
    },{id: "post-a-post-with-videos",
      
        title: "a post with videos",
      
      description: "this is what included videos could look like",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/videos/";
        
      },
    },{id: "post-displaying-beautiful-tables-with-bootstrap-tables",
      
        title: "displaying beautiful tables with Bootstrap Tables",
      
      description: "an example of how to use Bootstrap Tables",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/tables/";
        
      },
    },{id: "post-a-post-with-table-of-contents",
      
        title: "a post with table of contents",
      
      description: "an example of a blog post with table of contents",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2023/table-of-contents/";
        
      },
    },{id: "post-a-post-with-giscus-comments",
      
        title: "a post with giscus comments",
      
      description: "an example of a blog post with giscus comments",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2022/giscus-comments/";
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "post-a-post-with-redirect",
      
        title: "a post with redirect",
      
      description: "you can also redirect to assets like pdf",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/assets/pdf/example_pdf.pdf";
        
      },
    },{id: "post-a-post-with-diagrams",
      
        title: "a post with diagrams",
      
      description: "an example of a blog post with diagrams",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2021/diagrams/";
        
      },
    },{id: "post-a-post-with-twitter",
      
        title: "a post with twitter",
      
      description: "an example of a blog post with twitter",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2020/twitter/";
        
      },
    },{id: "post-a-post-with-disqus-comments",
      
        title: "a post with disqus comments",
      
      description: "an example of a blog post with disqus comments",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/disqus-comments/";
        
      },
    },{id: "post-a-post-with-math",
      
        title: "a post with math",
      
      description: "an example of a blog post with some math",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/math/";
        
      },
    },{id: "post-a-post-with-code",
      
        title: "a post with code",
      
      description: "an example of a blog post with some code",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/code/";
        
      },
    },{id: "post-a-post-with-formatting-and-links",
      
        title: "a post with formatting and links",
      
      description: "march &amp; april, looking forward to summer",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2015/formatting-and-links/";
        
      },
    },{id: "projects-at42qt1011-touch-sensor-pcb-prototype",
          title: 'AT42QT1011 Touch Sensor PCB Prototype',
          description: "A small AT42QT1011-based capacitive touch sensor PCB designed in KiCad and fabricated on an LPKF S63. A hands-on exercise in schematic capture, PCB layout, and in-house prototyping.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/asmetal_sensor/";
            },},{id: "projects-how-can-a-robot-place-an-item-on-a-cluttered-desk",
          title: 'How can a robot place an item on a cluttered desk?',
          description: "PAGE WİLL BE UPDATED",
          section: "Projects",handler: () => {
              window.location.href = "/projects/baxter/";
            },},{id: "projects-multiexplorer-multi-robot-frontier-exploration-with-turtlebot3",
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
            },},{id: "projects-prisma-lab-internship-posture-capable-suspension-concept-for-a-lunar-micro-rover",
          title: 'PRISMA Lab Internship — Posture-Capable Suspension Concept for a Lunar Micro-Rover',
          description: "Summer 2025 research internship at PRISMA Lab (Univ. of Naples Federico II): I developed and justified a per-side actuated suspension concept for a compact lunar rover (heave + roll, passive pitch averaging) and delivered a simulation-first implementation roadmap (ROS 2 + Gazebo) for posture-aware autonomy.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/prisma_lunar_rover_internship/";
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

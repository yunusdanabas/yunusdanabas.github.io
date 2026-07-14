# Copy Review Report

Report-only review of flagged copy issues on yunusemredanabas.com. **No prose was edited** as part of the site cleanup; this document is for your follow-up.

---

## 1. Unbacked superlative on elbow manipulator page

**File:** `_projects/design_elbow_manipulator.md` (line 16)

**Issue:** The page claims this was the **"only design in a class of 20+"** that met all specs, alongside precise figures (0.35° RMS, 2.4 ms, 18% mass reduction) with no plots, logs, or video on the page — unlike most other projects.

**Suggestion:** Add supporting media (validation plots, timing logs, comparison table) or soften the claim to something verifiable from the page content.

---

## 2. PRISMA card rank vs. deliverable status

**File:** `_projects/prisma_internship.md` (`importance: 1` in Research Projects)

**Issue:** PRISMA leads the Research section, but the page describes its primary achievement as a **"comprehensive, simulation-ready engineering plan"** (§6.1). §6.2 lists URDF finalization, Posture Manager node, and Gazebo plugin as **immediate next steps** — not yet built. By contrast, `flexure_hinges` (importance 2) and `panda_base_sim` (importance 3) document measured deliverables and working artifacts.

**Suggestion:** Consider re-ranking PRISMA below projects with completed hardware/simulation outcomes, or add a clear "roadmap / in progress" label on the card.

---

## 3. PRISMA figure attribution

**File:** `_projects/prisma_internship.md`

**Issue:** Filenames indicate literature figures from other researchers:

| Filename suffix | Count |
|-----------------|-------|
| `_HJiang` | 4 |
| `_TianxiangLan` | 1 |
| `_EricGratton` | 1 |

Only one caption explicitly says "From Jiang et al." A reader cannot tell which figures are original work vs. cited literature.

**Suggestion:** Add inline attribution on every borrowed figure (e.g., "Adapted from Jiang et al., …") and distinguish your own CAD/diagrams.

---

## 4. About page closing CTA

**File:** `_pages/about.md` (line 24)

**Issue:** The closing paragraph — *"I like building things that work… feel free to reach out"* — repeats themes already covered by 14 project pages and buries the call to action. Contact info (`yunusdanabas@sabanciuniv.edu`) appears only in the profile sidebar.

**Suggestion:** Add an explicit action block near the top or end of the about page: **Download CV · Email · GitHub · LinkedIn**.

---

## 5. Solo vs. team contribution ambiguity

**Files:** `_projects/fpga_airhockey.md`, `_projects/me403_manipulator.md`, `_projects/mujoco_cartpole.md`

**Issue:** These pages do not state whether the work was solo or team-based. `baxter.md` sets a good precedent: *"Group project… I worked on the physical robot side."*

| Project | Current state |
|---------|---------------|
| `fpga_airhockey` | No solo/team statement |
| `me403_manipulator` | Course project named, no team/solo |
| `mujoco_cartpole` | No solo/team statement (ME58006 course context implied only via PDF link) |

**Suggestion:** Add one sentence each clarifying authorship scope, matching the baxter pattern.

---

## 6. Baxter project stub

**File:** `_projects/baxter.md` (43 lines)

**Issue:** Shortest full card on the projects grid. Now has `date: 2024-12-01` (added during cleanup) but still lacks performance metrics, media beyond one Gazebo screenshot, and depth compared to peer Research Projects.

**Suggestion:** Expand with concrete outcomes (objects rearranged, sim vs. real results, BO pipeline metrics) or demote `importance` until content catches up.

---

*Generated as Phase 7 of the site-wide cleanup. Review and edit at your discretion.*

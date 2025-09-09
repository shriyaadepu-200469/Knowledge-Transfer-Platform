const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// @route   POST /api/projects/create
// @route   POST /api/projects/create
router.post("/create", async (req, res) => {
  try {
    const { _id, name, status, stack, updated_at, team, team_lead_name } = req.body;

    // Check if a project with the same ID already exists
    const existingProject = await Project.findOne({ _id });
    if (existingProject) {
      return res.status(400).json({ msg: "Project with this ID already exists" });
    }

    // ✅ Optional: Check if a team lead is already assigned to this project ID (defensive)
    const existingWithSameTeamLead = await Project.findOne({
      _id,
      team_lead_name: { $exists: true, $ne: null },
    });

    if (existingWithSameTeamLead && team_lead_name) {
      return res.status(400).json({
        msg: "Team lead already assigned for this project. One project can have only one team lead.",
      });
    }

    const project = new Project({
      _id,
      name,
      status,
      stack,
      updated_at,
      team,
      team_lead_name,
    });

    await project.save();
    res.status(201).json({ msg: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ msg: "Failed to create project", error: error.message });
  }
});



// @route   GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch projects", error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// POST /api/teams/create
router.post("/create", async (req, res) => {
  try {
    const { _id, name, project_id, members, domain } = req.body;

    const team = new Team({
      _id,
      name,
      project_id,
      members,
      domain,
    });

    await team.save();
    res.status(201).json({ msg: "Team created successfully", team });
  } catch (error) {
    res.status(500).json({ msg: "Failed to create team", error: error.message });
  }
});

// GET /api/teams => all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch teams", error: error.message });
  }
});

// GET /api/teams/by-project/:project_id => teams under one project
router.get("/by-project/:project_id", async (req, res) => {
  try {
    const { project_id } = req.params;
    const teams = await Team.find({ project_id });
    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch teams", error: error.message });
  }
});

module.exports = router;

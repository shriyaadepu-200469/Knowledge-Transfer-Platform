const express = require("express");
const router = express.Router();
const {
  createResource,
  getResourcesByProject,
  searchResources,
} = require("../controllers/resourceController");

// Create a new resource
router.post("/create", createResource);

// Get resources by project
router.get("/project/:projectId", getResourcesByProject);

// Search resources (for chatbot support)
router.get("/search", searchResources);

module.exports = router;

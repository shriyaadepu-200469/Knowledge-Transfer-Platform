const Resource = require("../models/Resource");

const createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    return res.status(201).json({ message: "Resource created", resource });
  } catch (error) {
    console.error("Create Resource Error:", error);
    return res.status(500).json({ message: "Failed to create resource" });
  }
};

const getResourcesByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const resources = await Resource.find({ project_id: projectId });
    return res.status(200).json(resources);
  } catch (error) {
    console.error("Fetch Resources Error:", error);
    return res.status(500).json({ message: "Failed to fetch resources" });
  }
};

// 🧠 For chatbot: Search resources by keyword/tag/content
const searchResources = async (req, res) => {
  const { query } = req.query;
  try {
    const resources = await Resource.find({
      $or: [
        { title: new RegExp(query, "i") },
        { content: new RegExp(query, "i") },
        { tags: { $in: [query.toLowerCase()] } },
        { category: new RegExp(query, "i") },
      ],
    });
    return res.status(200).json(resources);
  } catch (error) {
    console.error("Search Resources Error:", error);
    return res.status(500).json({ message: "Failed to search resources" });
  }
};

module.exports = {
  createResource,
  getResourcesByProject,
  searchResources,
};

const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String, // New field for chatbot search
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String, // e.g., Documentation, Notion, GitHub
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String, // New field: Frontend, Backend, DevOps, etc.
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;

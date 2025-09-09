const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "maintenance"],
    default: "active",
  },
  stack: {
    type: [String],
    default: [],
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  teams: {
    type: [String],
    default: [],
  },
  team_lead_name: {
  type: String,
  required: true,
  unique: false // not globally unique; uniqueness is per project
}
,
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;

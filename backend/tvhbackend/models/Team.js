const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
  domain: {
    type: String,
    default: "",
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;

const mongoose = require("mongoose");

const githubActivitySchema = new mongoose.Schema({
  type: String,
  number: Number,
  title: String,
  author: String,
  tags: [String],
  link: String,
  updated_at: Date,
  project_id: String
});

const GithubActivity = mongoose.model("GithubActivity", githubActivitySchema);
module.exports = GithubActivity;

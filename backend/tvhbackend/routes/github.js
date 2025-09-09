const express = require('express');
const axios = require('axios');
const router = express.Router();
const GithubActivity = require('../models/githubActivity');

const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  'User-Agent': 'project-dashboard'
};

// Save activity to DB inline
async function saveActivitiesToDB(activities) {
  try {
    for (const activity of activities) {
      await GithubActivity.updateOne(
        { number: activity.number, type: activity.type },
        { $set: activity },
        { upsert: true }
      );
    }
    console.log("GitHub activity saved/updated in DB");
  } catch (error) {
    console.error("Error saving GitHub activity:", error.message);
  }
}

router.get('/github-activity/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  const { project_id } = req.query;

  try {
    const pulls = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, { headers });
    const issues = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, { headers });

    const data = [...pulls.data, ...issues.data].map(item => ({
      type: item.pull_request ? 'pull_request' : 'issue',
      number: item.number,
      title: item.title,
      author: item.user.login,
      tags: item.labels.map(label => label.name),
      link: item.html_url,
      updated_at: item.updated_at,
      project_id
    }));

    await saveActivitiesToDB(data);

    res.json({ success: true, payload: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "GitHub fetch failed" });
  }
});

module.exports = router;

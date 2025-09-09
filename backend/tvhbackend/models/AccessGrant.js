const mongoose = require('mongoose');

const accessGrantSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  project_id: { type: String, required: true },
  permissions: [{ type: String, enum: ['edit', 'upload'] }],
  granted_by: { type: String, required: true },
  granted_at: { type: Date, default: Date.now },
  expires_at: { type: Date, default: null }
});

module.exports = mongoose.model('AccessGrant', accessGrantSchema);

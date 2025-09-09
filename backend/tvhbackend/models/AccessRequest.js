const mongoose = require('mongoose');

const accessRequestSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  project_id: { type: String, required: true },
  resource_id: { type: String, default: null },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  requested_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessRequest', accessRequestSchema);

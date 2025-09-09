const AccessRequest = require('../models/AccessRequest');
const AccessGrant = require('../models/AccessGrant');

// POST: Request Access
exports.requestAccess = async (req, res) => {
  try {
    const { user_id, project_id, resource_id, reason } = req.body;

    const request = new AccessRequest({
      user_id,
      project_id,
      resource_id: resource_id || null,
      reason
    });

    await request.save();
    res.status(200).json({ message: 'Access request submitted.' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: View All Pending Requests for a Project
exports.getPendingRequests = async (req, res) => {
  try {
    const { project_id } = req.query;

    const requests = await AccessRequest.find({ project_id, status: 'pending' });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Approve Access Request
exports.approveRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { lead_id } = req.body;

    const request = await AccessRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.status = 'approved';
    await request.save();

    const grant = new AccessGrant({
      user_id: request.user_id,
      project_id: request.project_id,
      permissions: ['edit', 'upload'],
      granted_by: lead_id
    });

    await grant.save();
    res.status(200).json({ message: 'Access granted.' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Check Permissions
exports.getPermissions = async (req, res) => {
  try {
    const { user_id, project_id } = req.query;

    const grant = await AccessGrant.findOne({ user_id, project_id });
    if (!grant) return res.status(200).json({ permissions: [] });

    res.status(200).json({ permissions: grant.permissions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

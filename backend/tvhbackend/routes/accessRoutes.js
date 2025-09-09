const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');

// Request Access
router.post('/access-requests', accessController.requestAccess);

// View Pending Requests
router.get('/access-requests', accessController.getPendingRequests);

// Approve Access
router.post('/access-requests/:id/approve', accessController.approveRequest);

// Check Permissions
router.get('/permissions', accessController.getPermissions);

module.exports = router;

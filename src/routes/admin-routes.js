const express = require('express');
const { dashboard } = require('../controllers/admin-controller');
const { authenticateToken } = require('../middlewares/auth-middleware');
const { authorizeRoles } = require('../middlewares/role-middleware');

const router = express.Router();

router.get('/dashboard', authenticateToken, authorizeRoles('admin'), dashboard);

module.exports = router;

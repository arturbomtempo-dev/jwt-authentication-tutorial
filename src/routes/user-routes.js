const express = require('express');
const { profile, publicPage } = require('../controllers/user-controller');
const { authenticateToken } = require('../middlewares/auth-middleware');
const { authorizeRoles } = require('../middlewares/role-middleware');

const router = express.Router();

router.get('/public', publicPage);

router.get('/profile', authenticateToken, authorizeRoles('user', 'admin'), profile);

module.exports = router;

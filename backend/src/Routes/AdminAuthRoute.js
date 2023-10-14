const express = require('express');
const router = express.Router();
const adminAuthController = require('../Controllers/AdminAuthController'); // Create this admin controller if not already done
const { adminVerification } = require('../Middlewares/AdminAuthMiddlewares');

router.post('/signup', adminAuthController.adminSignup);
router.post('/login', adminAuthController.adminLogin);
router.post('/', adminVerification);

module.exports = router;

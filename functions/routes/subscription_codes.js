const express = require('express');
const router = express.Router();
const generateSubscriptionCode = require('../controllers/management/generate_subscription_code');
const consumeSubscriptionCode = require('../controllers/users/consume_subscription_code');
const authenticateUser = require('../controllers/users/authenticate');
const authenticateManagement = require('../controllers/management/authenticate');

router.put('/', authenticateManagement);
router.put('/', generateSubscriptionCode);

router.post('/:subscription_code', authenticateUser);
router.post('/:subscription_code', consumeSubscriptionCode);

module.exports = router;

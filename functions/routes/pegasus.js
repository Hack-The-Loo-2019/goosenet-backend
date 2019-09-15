const express = require('express');
const router = express.Router();
const pegasus_controllers = require('../controllers/pegasus');

router.get('/addCode', pegasus_controllers.addCode);
router.get('/addFriend', pegasus_controllers.addFriend);
router.get('/reset', pegasus_controllers.reset);

module.exports = router;

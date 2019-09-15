const express = require('express');
const router = express.Router();
const users_controllers = require('../controllers/users');
const auth_controllers = require('../controllers/users/authenticate')

router.use(auth_controllers)
router.get('/:id', users_controllers.getById);

module.exports = router;

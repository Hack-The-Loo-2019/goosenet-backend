const express = require('express');
const router = express.Router();
const users_controllers = require('../controllers/users');

router.get('/:id', users_controllers.getById);

module.exports = router;

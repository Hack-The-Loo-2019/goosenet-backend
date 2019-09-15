const express = require('express');
const router = express.Router();
const users_controllers = require('../controllers/users');

router.put('/self', users_controllers.addFriend);
router.get('/:id', users_controllers.getById);

module.exports = router;

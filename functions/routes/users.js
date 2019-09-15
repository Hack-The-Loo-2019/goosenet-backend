const express = require('express');
const user = require('../controllers/users')

const router = express.Router();

router.get('/:id', user.getById);

module.exports = router;
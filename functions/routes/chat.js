const express = require('express');
const router = express.Router();
const chat_controllers = require('../controllers/chat');
const auth_controllers = require('../controllers/users/authenticate');

router.use(auth_controllers);
router.post('/:chatroom_id', chat_controllers.addChatroomMessage);
router.get('/:chatroom_id', chat_controllers.getChatroomMessages);

module.exports = router;

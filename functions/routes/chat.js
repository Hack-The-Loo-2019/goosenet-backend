const express = require('express');
const router = express.Router();
const chat_controllers = require('../controllers/chat');
const auth_controllers = require('../controllers/users/authenticate');
const announcement_controllers = require('../controllers/announcements');

router.use(auth_controllers);
// router.use('/:chatroom_id', chat_controllers.checkChatroomPermission);
router.post('/:chatroom_id', chat_controllers.addChatroomMessage);
router.get('/:chatroom_id', chat_controllers.getChatroomMessages);

router.get('/:chatroom_id/announcements', announcement_controllers.getAnnouncements);
router.post('/:chatroom_id/announcements', announcement_controllers.addAnnouncement);

module.exports = router;

const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const get_user_data = require('../utils/get_user_data');

module.exports = async (req, res, next) => {
    const { chatroom_id } = req.params;
    const { message, message_id } = req.body;
    if (!req.userRef) await get_user_data(req);
    const data = {
        chatroom_ref: db.collection('Chatrooms').doc(chatroom_id),
        message,
        message_ref: message_id ? db.collection('Messages').doc(message_id) : null,
        user_ref: req.userId,
        timestamp: new Date(),
    };

    try {
        data.fake_ref = (await req.userRef
            .collection('Fakes').orderBy('created_at', 'desc')
            .limit(1).get()).id;
    } catch (e) {
        console.error(e.stack);
        return next(build_error(e, 500));
    }

    try {
        await db.collection('Messages').add(data);
        return res.sendStatus(204);
    } catch (e) {
        console.error(e.stack);
        return next(build_error(e, 500));
    }
};

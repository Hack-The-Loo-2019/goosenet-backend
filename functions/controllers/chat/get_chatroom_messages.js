const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const get_user_data = require('../utils/get_user_data');

module.exports = async (req, res, next) => {
    const { chatroom_id } = req.params;
    if (!req.userRef) await get_user_data(req);

    const chatroomRef = db.collection('Chatrooms').doc(chatroom_id);
    const messageRefs = db.collection('Messages')
        .where('chatroom_ref', '==', chatroomRef)
        .orderBy('timestamp', 'desc');

    const messageDatas = (await messageRefs.get()).map(snapshot => snapshot.data());

    res.status(200).send({ data: messageDatas });
};

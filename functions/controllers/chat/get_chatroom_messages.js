const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const get_user_data = require('../utils/get_user_data');

module.exports = async (req, res, next) => {
    const { chatroom_id } = req.params;
    if (!req.userRef) await get_user_data(req);

    const chatroomRef = db.collection('Chatrooms').doc(chatroom_id);
    const messageRefs = chatroomRef.collection('Messages').orderBy('timestamp', 'desc');
    console.log('hey')
    const messageSnaps = (await messageRefs.get()).docs
    console.log('huhh')
    const messageDatas = messageSnaps.map(snapshot => snapshot.data());
    console.log('henloo')
    res.status(200).send({ data: messageDatas });
};

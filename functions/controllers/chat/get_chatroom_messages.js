const db = require('firebase-admin').firestore();
const config = require('../../config/config');
const build_error = require('../utils/build_error');
const get_user_data = require('../utils/get_user_data');
const areFriends = require('../utils/are_friends');

module.exports = async (req, res, next) => {
    const { chatroom_id } = req.params;
    if (!req.userRef) await get_user_data(req);

    const chatroomRef = db.collection('Chatrooms').doc(chatroom_id);
    const messageRefs = chatroomRef.collection('Messages').orderBy('timestamp', 'desc');
    const messageSnaps = (await messageRefs.get()).docs;
    const messageDataPromises = messageSnaps.map(async snapshot => {
        const data = {};
        data.id = snapshot.id;
        const rawData = snapshot.data();
        const showFake = rawData.user_ref.id !== req.userRef.id && !await areFriends(req, rawData.user_ref.id);

        if (showFake) {
            const fakeSnapshot = await rawData.fake_ref.get();
            const fakeData = fakeSnapshot.data();
            data.user = {
                id: fakeSnapshot.id,
                name: fakeData.name
            };
        } else {
            const userSnapshot = await rawData.user_ref.get();
            const userData = userSnapshot.data();
            data.user = {
                id: rawData.user_ref.id,
                name: userData.name
            };
        }
        data.message = rawData.message;

        data.replies = [];
        const repliesRefs = chatroomRef.collection('Messages')
            .doc(snapshot.id)
            .collection('Replies')
            .orderBy('timestamp', 'desc');
        const repliesSnaps = (await repliesRefs.get()).docs;
        const repliesDataPromises = repliesSnaps.map(async snapshot => {
            const newReplyData = {};
            newReplyData.id = snapshot.id;
            const rawData = snapshot.data();
            const showFake = rawData.user_ref.id !== req.userRef.id && !await areFriends(req, rawData.user_ref.id);
            if (showFake) {
                const fakeSnapshot = await rawData.fake_ref.get();
                const fakeData = fakeSnapshot.data();
                newReplyData.user = {
                    id: fakeSnapshot.id,
                    name: fakeData.name
                };
            } else {
                const userSnapshot = await rawData.user_ref.get();
                const userData = userSnapshot.data();
                newReplyData.user = {
                    id: rawData.user_ref.id,
                    name: userData.name
                };
            }
            newReplyData.message = rawData.message;
            newReplyData.timestamp = new Date(rawData.timestamp._seconds * 1000);
            data.replies.push(newReplyData);
        });
        await Promise.all(repliesDataPromises);

        data.timestamp = new Date(rawData.timestamp._seconds * 1000);
        return data;
    });
    const messageDatas = await Promise.all(messageDataPromises);
    res.status(200).send({ data: messageDatas });
};

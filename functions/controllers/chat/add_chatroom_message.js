const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const get_user_data = require('../utils/get_user_data');
const fakeClient = require('../utils/fakeClient')

module.exports = async (req, res, next) => {
    const { chatroom_id } = req.params;
    const { message, message_id } = req.body;
    if (!req.userRef) await get_user_data(req);
    const data = {
        message,
        message_ref: message_id ? db.collection('Messages').doc(message_id) : null,
        user_ref: req.userRef,
        timestamp: new Date(),
    };

    try {
        const yesterday = new Date() - 1000 * 3600 * 24;

        const fake = await req.userRef
            .collection('Fakes')
            .orderBy('created_at', 'desc')
            .endAt(yesterday)
            .limit(1)
            .get();

        if (fake.docs.length > 0) {
            const fakeId = fake.docs[0].id
            data.fake_ref = await req.userRef.collection('Fakes').doc(fakeId)
        }
        else {
            const fakeRef = await req.userRef
                .collection('Fakes')
                .add(fakeClient());
            data.fake_ref = fakeRef;
        }  
    } catch (e) {
        console.error(e.stack);
        return next(build_error(e, 500));
    }

    try {
        console.log('insert goddamn')
        await db
            .collection('Chatrooms')
            .doc(chatroom_id)
            .collection('Messages')
            .add(data);
        return res.sendStatus(204);
    } catch (e) {
        console.error(e.stack);
        return next(build_error(e, 500));
    }
};

const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const get_user_data = require('../utils/get_user_data');

module.exports = async (req, res, next) => {
    const { chatroom_id } = req.params;
    if (!req.userRef) await get_user_data(req);
    const chatroomRef = db.collection('Chatrooms').doc(chatroom_id);
    const unitsRef = chatroomRef.collection('Units');
    const unitsSnaps = (await unitsRef.get()).docs;
    const memberRef = chatroomRef.collection('Members').doc(req.userRef.id);
    let chatroomPermission = false;
    if (unitsSnaps && unitsSnaps.length > 0) {
        const unitSnapsPromises = unitsSnaps.map(async snapshot => {
            if (chatroomPermission) return;
            const unitRef = unitsRef.doc(snapshot.id);
            const occupantsRef = unitRef.collection('Occupants');
            const occupantsSnaps = (await occupantsRef.get()).docs;
            const occupantsSnapsPromises = occupantsSnaps.map(async snapshot => {
                if (snapshot.id === req.userRef.id) {
                    chatroomPermission = true;
                }
            });
            await Promise.all(occupantsSnapsPromises);
        });
        await Promise.all(unitSnapsPromises);
    } else if ((await memberRef.get()).exists) {
        chatroomPermission = true;
    }
    if (!chatroomPermission) {
        return res.status(401).send('Unauthorized');
    }
    return next();
};

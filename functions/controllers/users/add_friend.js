const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const verify_user_id = require('./utils/verify_user_id');

module.exports = async (req, res, next) => {
    const friendId = req.body.friend_ref;
    if (!friendId) {
        return next(build_error('Empty friend_ref', 400));
    }
    if (!await verify_user_id(friendId)) {
        return next(build_error('User does not exist', 404));
    }
    const friendsCollection = db.collection('Users').doc(req.userId).collection('Friends');
    let friendRef;
    try {
        friendRef =  await friendsCollection.doc(friendId).get();
        if (friendRef.exists) {
            res.sendStatus(204);
        } else {
            await friendsCollection.set(friendId);
        }
    } catch (e) {
        console.error(e.stack)
        return next(build_error(e, 500));
    }
};

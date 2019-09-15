const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const config = require('../../config/config');

module.exports = async (req, res, next) => {
    const userRefA = db.collection('Users').doc('ruben');
    const userRefB = db.collection('Users').doc('toby');
    const friendsCollection = userRefA.collection('Friends');
    let friendRef =  await friendsCollection.doc(friendId).get();
    if (friendRef.exists) {
        return res.sendStatus(204);
    } else {
        await friendsCollection.set('toby');
    }
    res.sendStatus(204);
};

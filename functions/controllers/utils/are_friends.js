const db = require('firebase-admin').firestore();
const getUserData = require('./get_user_data');

module.exports = async (req, friend_id) => {
    try {
        if (!req.userRef) await getUserData(req);
        return (await req.userRef.collection('Friends').doc(friend_id).get()).exists;
    } catch (e) {
        console.error(e);
        return false;
    }
};

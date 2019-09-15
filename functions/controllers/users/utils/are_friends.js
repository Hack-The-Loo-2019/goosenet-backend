const db = require('firebase-admin').firestore();
const getUserData = require('./get_user_data');

module.exports = async (req, friend_ref) => {
    try {
        let userAData = req.userData;
        if (!userAData) {
            userAData = getUserData(req);
        }
        return userAData.friend_refs && userAData.friend_refs.includes(friend_ref);
    } catch (e) {
        console.error(e);
        return false;
    }
};

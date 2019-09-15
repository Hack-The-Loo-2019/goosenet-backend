const db = require('firebase-admin').firestore();

module.exports = async (req) => {
    try {
        req.userData = (await db.collection('Users').doc(req.userId).get()).data();
        return req.userData;
    } catch (e) {
        console.error(e);
        return null;
    }
};

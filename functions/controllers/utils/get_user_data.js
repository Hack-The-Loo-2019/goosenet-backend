const db = require('firebase-admin').firestore();

module.exports = async (req) => {
    try {
        req.userRef = db.collection('Users').doc(req.userId);
        req.userData = (await req.userRef.get()).data();
        return req.userData;
    } catch (e) {
        console.error(e);
        return null;
    }
};

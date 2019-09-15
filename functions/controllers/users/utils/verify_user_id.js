const db = require('firebase-admin').firestore();

module.exports = async (user_id) => {
    try {
        const userRef = await db.collection('Users').doc(req.userId).get();
        return userRef.exists;
    } catch (e) {
        console.error(e);
        return false;
    }
};

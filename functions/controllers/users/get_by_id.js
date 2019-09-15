const db = require('firebase-admin').firestore();

module.exports = async (req, res, next) => {
    try {
        console.log(`params id: ${req.params.id}`);
        const usersCollection = db.collection('Users');
        const userDoc = usersCollection.doc(req.params.id);
        const doc = await userDoc.get();
        console.log(doc.exists);
        res.send(doc.exists);
    } catch (e) {
        console.error(e.stack);
        return next();
    }
};

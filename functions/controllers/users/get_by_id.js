const firebase_admin = require('firebase-admin');

const db = firebase_admin.firestore();

module.exports = async (req, res, next) => {
    try {
        const doc = await db
            .collection('Users')
            .doc(req.params.id)
            .get();
        res.send({ data: doc.data() });
    }
    catch (e) {
        console.log(e.stack);
        return next();
    }
};

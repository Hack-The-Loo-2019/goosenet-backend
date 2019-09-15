const firebase_admin = require('firebase-admin');

const db = firebase_admin.firestore();

// For now, header only needs to be
// { x-auth: ${userId} }
// Can upgrade later on
module.exports = async (req, res, next) => {
    const authHeader = req.header('x-auth');
    if (!authHeader) {
        res.status(401).json({ error: `Missing auth header` });
    }
    console.log(authHeader);
    const doc = await db
        .collection('Users')
        .doc(authHeader)
        .get();
    if (doc.exists) {
        req.userId = authHeader;
        return next();
    }
    else {
        res.status(401).json({ error: `User ${authHeader} does not exist` });
    }
};

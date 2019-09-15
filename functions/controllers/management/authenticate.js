const firebase_admin = require('firebase-admin');

const db = firebase_admin.firestore();

// For now, header only needs to be
// { x-auth: ${managementId} }
// Can upgrade later on
module.exports = async (req, res, next) => {
    const authHeader = req.header('x-auth');
    if (!authHeader) {
        res.status(401).json({ error: `Missing auth header` });
    }
    const doc = await db
        .collection('Managements')
        .doc(authHeader)
        .get();
    if (doc.exists) {
        req.managementId = authHeader;
        return next();
    }
    else {
        res.status(401).json({ error: `Management ${authHeader} does not exist` });
    }
};

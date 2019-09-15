const db = require('firebase-admin').firestore();

module.exports = async (req) => {
    try {
        req.managementRef = db.collection('Managements').doc(req.managementId);
        req.managementData = (await req.managementRef.get()).data();
        return req.managementData;
    } catch (e) {
        console.error(e);
        return null;
    }
};

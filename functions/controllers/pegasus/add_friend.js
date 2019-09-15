const db = require('firebase-admin').firestore();

module.exports = async (req, res, next) => {
    const userRefA = db.collection('Users').doc('ruben');
    const userRefB = db.collection('Users').doc('toby');
    const friendsCollection = userRefA.collection('Friends');
    await friendsCollection.doc('toby').set({});
    res.sendStatus(204);
};

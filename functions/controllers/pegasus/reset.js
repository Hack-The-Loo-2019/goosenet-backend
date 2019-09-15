const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const config = require('../../config/config');

module.exports = async (req, res, next) => {
    const userRef = db.collection('Users').doc('ruben');
    await userRef.collection('Friends').doc('toby').delete();
    config.showChat = false;
    res.sendStatus(204);
};

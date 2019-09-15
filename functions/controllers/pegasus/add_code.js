const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const config = require('../../config/config');

module.exports = async (req, res, next) => {
    const userRef = db.collection('Users').doc('ruben');
    config.showChat = true;
    res.sendStatus(204);
};

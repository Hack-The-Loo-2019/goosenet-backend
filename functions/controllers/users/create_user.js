const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const verify_user_id = require('../utils/verify_user_id');
const get_user_data = require('../utils/get_user_data');

module.exports = async (req, res, next) => {
    const { name, email } = req.body;
    const userRef = db.collection('Users').doc()
};

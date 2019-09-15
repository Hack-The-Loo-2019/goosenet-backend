const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const verify_user_id = require('../utils/verify_user_id');
const get_user_data = require('../utils/get_user_data');

module.exports = async (req, res, next) => {
    const { subscription_code } = req.params;
    if (!req.userRef) await get_user_data(req);
    const subscriptionCodeRef = db.collection('SubscriptionCodes').doc(subscription_code);
    if (!(await subscriptionCodeRef.get()).exists) {
        return next(build_error('Code not found', 404));
    } else {
        const subscriptionCodeData = (await subscriptionCodeRef.get()).data();
        const unitRef = subscriptionCodeData.unit_ref;
        const slot = subscriptionCodeData.slot;
        const occupantRef = unitRef.collection('Occupants').doc(String(slot));
        await occupantRef.set({
            user_ref: req.userRef,
        });
        return res.sendStatus(204);
    }
};

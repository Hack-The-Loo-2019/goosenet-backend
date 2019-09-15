const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const get_management_data = require('../utils/get_management_data');

module.exports = async (req, res, next) => {
    const { building_id } = req.params;
    const { name, address } = req.body;
    if (!req.managementRef) await get_management_data(req);
    const buildingRef = req.managementRef.collection('Buildings').doc(building_id);
    try {
        if ((await buildingRef.get()).exists) {
            return next(build_error('Building already exists', 409));
        } else {
            await buildingRef.set({name, address});
            return res.sendStatus(204);
        }
    } catch (e) {
        console.error(e);
        return next(build_error(e, 500));
    }
};

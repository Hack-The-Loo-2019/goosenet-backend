const db = require('firebase-admin').firestore();
const build_error = require('../utils/build_error');
const get_management_data = require('../utils/get_management_data');

module.exports = async (req, res, next) => {
    const { building_id, unit_id } = req.params;
    const { name } = req.body;
    if (!req.managementRef) await get_management_data(req);
    const buildingRef = req.managementRef.collection('Buildings').doc(building_id);
    const unitRef = buildingRef.collection('Units').doc(unit_id);
    try {
        if ((await unitRef.get()).exists) {
            return next(build_error('Unit already exists', 409));
        } else {
            await unitRef.set({name});
            return res.sendStatus(204);
        }
    } catch (e) {
        console.error(e);
        return next(build_error(e, 500));
    }
};

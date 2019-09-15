const express = require('express');
const router = express.Router();
const managements_controllers = require('../controllers/management');

router.use(managements_controllers.authenticateManagement);
router.put('/:building_id', managements_controllers.addBuilding);
router.put('/:building_id/:unit_id', managements_controllers.addUnit);

module.exports = router;

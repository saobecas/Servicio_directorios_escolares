const express = require('express');
const router = express.Router();
//middleware
const regionValidator = require("../middleware/validatorManager");
const auth = require('../middleware/auth');
//controller
const RegionController = require('../controllers/Region_controller');
//prueba de fina¿dall user con roles y roles con users
const validate = require('../middleware/validateUser');

//router.post('/api/v1/region',validate.isAdmin,regionValidator.bodyRegionValidator,RegionController.createRegion);
router.post('/api/v1/region',auth.validateToken,validate.isAdmin,regionValidator.bodyRegionValidator,RegionController.createRegion);
router.get('/api/v1/regiones',RegionController.allRegion);
router.get('/api/v1/region/:id',auth.validateToken,RegionController.allRegionId);
router.put('/api/v1/region/:id',auth.validateToken,validate.isAdmin,regionValidator.bodyRegionValidator, RegionController.updateRegion);
router.delete('/api/v1/region/:id',auth.validateToken, validate.isAdmin,RegionController.deleteRegion);

router.get('/api/v1/regiones/:id/municipios',auth.validateToken,RegionController.getRegioMunicipios);

module.exports = router;
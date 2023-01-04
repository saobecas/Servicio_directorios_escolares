const express = require('express');
const router = express.Router();
//middlewar
const auth = require('../middleware/auth');
const validate = require('../middleware/validateUser');
//controller
const EmpController = require('../controllers/Employee_controller');

router.get('/api/employee-user',auth.validateToken,validate.isAdmin, EmpController.allEmpleadoUser);
router.put('/api/employee-data/:id',auth.validateToken, EmpController.updateEmployee)

module.exports = router;
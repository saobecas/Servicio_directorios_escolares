const express = require('express');
const router = express.Router();
//middleware
const auth = require('../middleware/auth');

const SupervisorController = require('../controllers/Supervisor_controller');


router.put('/api/v1/supervisorUpdate/:id',auth.validateToken, SupervisorController.updateSupervisor);
//router.delete('/api/users/delete/:id',auth.validateToken,validate.isAdmin,UserController.deleteUser);
module.exports = router;
const express = require('express');
const router = express.Router();
//middleware
const auth = require('../middleware/auth');

const validate = require('../middleware/validateUser');
const { validateCreate, bodyLoginValidator } = require('../validator/UserValidator');
//controller
const UserController = require('../controllers/User_controller');


router.get('/api/users',auth.validateToken, validate.isAdmin,UserController.allUsers);
router.get('/api/users/employee',auth.validateToken, validate.isAdmin,UserController.allUserEmpleado);
router.get('/api/users/roles',auth.validateToken,validate.isAdmin,UserController.allUserRole);
router.get('/api/user-data/:id',auth.validateToken, UserController.getUser);

router.post('/api/users/signin',bodyLoginValidator,UserController.SignIn);
router.post('/api/users/logout', UserController.logout);
router.post('/api/users/signup',validateCreate,validate.checkExisted,UserController.createCou);
//ruta para actualizar la contraseña
router.put('/api/users/update/:id',auth.validateToken, UserController.updateUser);
//ruta para actualizar el rol del usuario
router.put('/api/user-role/update/:id',auth.validateToken,validate.isAdmin, UserController.updateRoleUser);
router.delete('/api/users/delete/:id',auth.validateToken,validate.isAdmin,UserController.deleteUser);
//saber que modificacion puede hacer el usuario normal y el usuario admin
module.exports = router;
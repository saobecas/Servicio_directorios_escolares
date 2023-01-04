const express = require('express');
const router = express.Router();
//middleware
const auth = require('../middleware/auth');

const DirectorController = require('../controllers/Director_controller');


router.put('/api/v1/directorUpdate/:id',auth.validateToken, DirectorController.updateDirector);
//router.delete('/api/users/delete/:id',auth.validateToken,validate.isAdmin,UserController.deleteUser);
module.exports = router;
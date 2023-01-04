const { check,body } = require('express-validator') //TODO <---
const { validateResult } = require('../validator/validateHelper')

const validateCreate = [ //TODO:name, age, email
//body('username').trim().notEmpty().exists(),
body('password').trim().notEmpty().exists(),
body('email', 'El email para el usuario es incorrecto').trim().isEmail().normalizeEmail(),
//body('roleId').trim().isEmpty().isNumeric(),

validateEmployee = [

body('full_name').trim().notEmpty().exists(),
body('email',' El email para el empleado es incorrecto').trim().isEmail().normalizeEmail(),
body('number_phone').trim().notEmpty().exists(),
body('oficina').trim().notEmpty().exists(),
],
(req, res, next) => {
    validateResult(req, res, next)
}
]

const bodyLoginValidator = [
        body('email', "Formato incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail()
            .notEmpty(),
        body( 'password', "Minimo 6 caracteres").trim().isLength({ min: 6}),
        (req, res, next)=> {validateResult(req,res,next)}
    ];
module.exports = { validateCreate, bodyLoginValidator }
const { check,body } = require('express-validator') //TODO <---
const { validateResult } = require('../validator/validateHelper')

const validateCreateSchool = [ //TODO:name, age, email
body('name_school').trim().notEmpty().exists(),
body('cct').trim().notEmpty().exists(),
body('nivel').trim().notEmpty().exists(),
body('calle').trim().notEmpty().exists(),
body('noExterior').trim().notEmpty().exists(),
body('numeroInterior').trim().notEmpty().exists(),
body('asentamiento').trim().notEmpty().exists(),
body('email_school').trim().isEmail().normalizeEmail(),
body('telefono').trim().notEmpty(),

    validateDirector = [
        body('name_director').trim().notEmpty().exists(),
        validateSupervisor = [
            body('name_supervisor').trim().notEmpty().exists(),
        ],
    ],

(req, res, next) => {
    validateResult(req, res, next)
}
]
module.exports = { validateCreateSchool }
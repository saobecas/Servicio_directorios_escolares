const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const db = require('../models');
const cookieParser = require('cookie-parser');
const expireIn = parseInt(process.env.AUTH_EXPIRES);
module.exports = { 

    async generarToken(req, res, next){
        // Creamos el token
        let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires
        });

       /* res.cookie("refreshToken", token, {
            httpOnly: true,
            secure:true,
            expires: new Date(Date.now() + expiresIn * 1000)
        })*/
    },
    async validateToken(req, res, next) {

    console.log(req.headers);

    // Comprobar que existe el token
    if(!req.headers.authorization) {
        res.status(403).json("Acceso no autorizado" );
    } else {

        // Comrpobar la validez de este token
        let token = req.headers.authorization.split(" ")[1];

        // Comprobar la validez de este token
        jwt.verify(token, authConfig.secret, (err, decoded) => {

            if(err) {
                res.status(500).json("Ha ocurrido un problema al verificar el token", err );
            } else {
                db.user.findByPk(decoded.user.id, { include: 'role' }).then(user => {
                   
                    req.user = user;
                    next();
                });
                /*
                req.user = decoded;
                next();
                */
            }

        })
    }

},
  async generateCookieToken( id, res){
 try {
    const cookieToken = jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expires
        });
        res.cookie("refreshToken", cookieToken, {
            httpOnly: true,
            secure:true,
            expires: new Date(Date.now() + expireIn * 1000)
        })
 } catch (error) {
    console.log(error)
 }
        
    }
}

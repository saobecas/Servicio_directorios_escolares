const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth'); 
const { generateCookieToken } = require('../middleware/auth');
const db = require('../models'); 
module.exports = {

//Login-----------------------------------------------------------------------
async SignIn(req, res) {
    try {
        let { email, password } = req.body;
    // Buscar usuario
await db.user.findOne({
    where: {
        email: email
    },
    include: [ 'employee', 'role']
 /* include: [ {
        all:true
    } ]*/

}).then(user => {

    if (!user) {
        res.status(401).json( "Usuario con estess correo no encontrado" );
    } else {

        if (bcrypt.compareSync(password, user.password) ) {

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
          //  generateCookieToken(user.id, res);
           return res.status(200).json({user:user, token:token}); 
         
          //.then(usuario => res.status(200).send(usuario))
       //   return res.status(200).json({token: token});
        } else {

            // Unauthorized Access
            res.status(401).json("Contraseña incorrecta" )
        }

    }})
    
    } catch (error) {
         res.status(500).json(error);
    }
},
//Crear cuenta --------------------------------------------------------------------------
    async createCou(req, res) {
    
        // Encriptamos la contraseña
        let contraseña = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        //varialbles
        const {email,} = req.body
        const {full_name, number_phone, oficina} = req.body
        //const role = req.role;
        let idrole = req.role
        await db.user.create({
            email,
            password: contraseña,
            roleId: idrole.id,
            employee: {
                full_name,
                email,
                number_phone,
                oficina
            }
        },
        {
            include: [ 'employee' ]
        }
        ).then(user => {

           // Creamos el token
           let token = jwt.sign({ user: user }, authConfig.secret, {
               expiresIn: authConfig.expires
           });

           res.status(200).json({
               user: user,
               token: token,
           });

       }).catch(err => {
           res.status(500).json(err);
       });
   },

//trae todos los usuarios con su respectivo role -------------------------------------
async allUserRole(req, res) {
    let user = await db.user.findAll({
        include: [ 'role' ]
    })
    res.status(200).json(user) 
},
//trae todos los usuarios
async allUsers(req, res) {
let user = await db.user.findAll({
include: ['role','employee']
})
res.status(200).json({users:user }) ;

},
//Usuario + sus datos como empleado
async allUserEmpleado(req, res) {
    let emp = await db.user.findAll(
        {
            include: ['employee']
        }
    )
    res.status(200).json({employees:emp}) 

},
//obtiene al usuario y sus datos ------------------------------
async getUser(req, res) {
    let user = await db.user.findByPk(req.params.id,
        {
         //  include: [ { all: true } ]
         include: [       
        'role','employee'
         ]
        });

        if(!user) {
            //!!MANERA CORRECTA DE MANDAR EL ERROR PARA MOSTRARLO EN FLUTTER
            res.status(401).json("El usuario no ha sido encontrado" );
        } else {
            res.status(200).json([{user: user}]);
        }
    },

//actuazilar datos de usuario------------CONTRASEÑA-------------------------------------
async updateUser(req, res) {

         try {
            let contraseña = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        
            const {id} = req.params;

            const users = await db.user.findByPk(id);

            if(!users){
                return res.status(404).json( "El Usuario No Existe");
            } else 
                users.password = contraseña;
                await users.save();
                return res.status(200).json(users);

        } catch (error) {
            console.log(error);
            return res.status(500).json( "error del servidor");
        }   
},


//actuazilar rol del usuario--
async updateRoleUser(req, res) {
        try {
            let role = req.body.roleId;
        
            const {id} = req.params;

            const users = await db.user.findByPk(id);

            if(!users){
                return res.status(404).json( "El Usuario No Existe");
            } else 
                users.roleId = role;
                await users.save();
                return res.status(200).json(users);

        } catch (error) {
            console.log(error);
            return res.status(500).json( "error del servidor");
        }   
         
                /*users.password = contraseña;
                await users.save();
                return res.status(200).json(users);*/

       
},
//eliminar usuario-------------------------------------------------
async deleteUser(req, res) {
    let user = await db.user.findByPk(req.params.id,{
        include: [ 'employee' ]
    });
    let empleado = user.employee
    //let iduser = user.id
    
    if(!user) {
        res.status(401).json( "El usuario no ha sido encontrado" );
    } else {
       
        //res.json({user, empleado})
        empleado.destroy();
        user.destroy().then(user=> {
        res.status(200).json( "El usuario ha sido eliminado ");
        });
    }
},

//cerrar sesion
    async logout(req, res){
        const { token } = req.user;
        res.clearCookie('refreshToken')
        res.json({ok: true})
    }
}

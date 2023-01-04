const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth'); 
const db = require('../models'); 
module.exports = {


//asosciacion de prueba para los empleados
async allEmpleadoUser(req, res) {
    let emp = await db.employee.findAll(
        {
            include: ['user']
        }
    )
    res.json(emp) 

},

 async updateEmployee(req, res){

        try {
    
            const {id} = req.params;
    
            const employee = await db.employee.findOne({
                where: {id},
                include: [{ all: true}]
            })
           
           if(!employee ){
                return res.status(404).json("Error al Actualizar Los Datos");
                
            }else
    
    
            employee.set(req.body);
            await employee.save();
    
            return res.status(200).json(employee);
    
        } catch (error) {
             console.log(error);
        return res.status(500).json( "error del servidor"); 
        }
    
    },

}

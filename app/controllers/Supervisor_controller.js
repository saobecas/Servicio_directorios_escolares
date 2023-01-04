
const db = require('../models'); //prueba exitosa pero con difine

module.exports = {
    async updateSupervisor(req, res){

        try {
    
            const {id} = req.params;
    
            const supervisor = await db.supervisor.findOne({
                where: {id},
                include: [{ all: true}]
            })
           
           if(!supervisor ){
                return res.status(404).json( "Error al Actualizar, datos del supervisor No Existen");
                
            }else
    
    
            supervisor.set(req.body);
            await supervisor.save();
    
            return res.status(200).json(supervisor);
    
        } catch (error) {
             console.log(error);
        return res.status(500).json("error del servidor"); 
        }
    
    },

}

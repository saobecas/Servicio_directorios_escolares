const db = require('../models'); //prueba exitosa pero con difine

module.exports = {
    async updateDirector(req, res){

        try {
    
            const {id} = req.params;
    
            const director = await db.director.findOne({
                where: {id},
                include: [{ all: true}]
            })
           
           if(!director ){
                return res.status(404).json("Error al Actualizar el Director No Existe");
                
            }else
    
    
            director.set(req.body);
            await director.save();
    
            return res.status(200).json(director);
    
        } catch (error) {
             console.log(error);
        return res.status(500).json( "error del servidor"); 
        }
    
    },

}
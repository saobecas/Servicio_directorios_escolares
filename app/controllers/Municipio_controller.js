const db = require('../models'); //prueba exitosa pero con difine

module.exports = {
    async createMunicipio(req, res) {
        const { name, regionId} = req.body;
        
        try {
            const municipio = await db.municipio.create({ 
            name,
            regionId,
            createdAt: new Date(),
            updatedAt: new Date()})
            return res.status(200).json(municipio); 
        } catch (error) {
            console.log(error);
            return res.status(500).json( "error del servidor"); 
        }
},

    async allMunicipios(req,res){
        try {
            const municipios = await db.municipio.findAll({
                include: ['region']
            });
            return res.status(200).json({municipios:municipios})
        } catch (error) {
            console.log(error);
            return res.status(500).json( "error del servidor"); 
        }
   
},

    async allMunicipioId(req,res){
        const {id} = req.params;
        try {
            const municipio = await db.municipio.findOne({
                where:{id},
                include: ['region']
            });

            if(!municipio) {
                return res.status(404).json( "El Municipio No Existe");
            }else 
            return res.status(200).json({mumicipio:municipio});
        } catch (error) {
            console.log(error);
            return res.status(500).json( "error del servidor"); 
        }
    //**otra forma de hacerlo*/ */
    /*
    const {id} = req.params;
    const municipio = await db.municipio.findOne({
        where:{
            id
        }
    })
    res.status(203).json(municipio);
    */
},

    async updateMunicipio(req, res){

        try {
            const {id} = req.params;
         const municipio = await db.municipio.findOne({
            where: {id},
            include: ['region']
         });
            if (!municipio) {
                 return res.status(404).json( "El Municipio No Existe");
            } else 
            
            municipio.set(req.body);
            await municipio.save();

            return res.status(200).json(municipio);

        } catch (error) {
            console.log(error);
            return res.status(500).json("error del servidor"); 
        }
},

    async deleteMunicipio(req, res){
        const {id} = req.params;
        try {
            const municipio = await db.municipio.findByPk(id);
            if (!municipio) {
                 return res.status(404).json("No Existe El Municipio");
            } else {
                await db.municipio.destroy({
                where:{
                    id,
                }
            });
            
            return res.status(200).json( "El Municipio Ha Sido Eliminad0");
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json( "error Del servidor"); 
        }

},

async getMunicipioLocalidades(req, res){
    try {
        const {id} = req.params;
        const localidades = await db.localidad.findAll({
            where: {municipioId: id},
            include: ['municipio']
        }) ;
        return res.status(200).json({localidades:localidades});
    
    } catch (error) {
        console.log(error);
        return res.status(500).json("error del servidor"); 
       // return res.status(500).json({error: "error del servidor"}); 
    }
}

}
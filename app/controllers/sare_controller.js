const { query } = require('express');
const { body } = require('express-validator');
const { sequelize } = require('../models');
const db = require('../models'); //prueba exitosa pero con difine
module.exports = {

async createSare(req, res) {
    
    const {idSare, nameSare, nameJefeSare, telefono, email, longitud, latitud, localidadId, region } = req.body;
 
    try {

        const sare = await db.sare.create({
        idSare,
        nameSare,
        nameJefeSare,
        telefono,
        email,
        longitud,
        latitud,
        localidadId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
        );
    //{include: ['regions']});

    //succesfull 
    const result = await sare.addRegiones(region, { through: { selfGranted: false }});
    
    return res.status(200).json({sare: sare ,result: result});
    } catch (error) {
        console.log(error);
        return res.status(500).json("error del servidor"+error); 
    }
   
},

async allSare (req,res) {
    try {
         const sares = await db.sare.findAll({
            
            //include: [{all:true}]
            include: ['Regiones','localidad',{
                association: db.sare.associations.localidad,
                include: [ 'municipio',
            {
                association: db.localidad.associations.municipio,
                include: ['region'] 
            } ]}]
         }
         );
         return res.status(200).json({sares :sares});
        //return res.status(202).json(sares); 
      } catch (error) {
          console.log(error);
           return res.status(500).json({error: "error del servidor"});
      }
   
},

async allSareId (req, res){
    const {id} = req.params;
    try {
      const sare = await db.sare.findByPk(id); 
      
      if(!sare){
        return res.status(404).json( "La Region No Existe");
      } else return res.status(200).json({sare: sare});
    } catch (error) {
         console.log(error);
        return res.status(500).json( "error del servidor"); 
    }
},
async getRegionSareId(req, res){
    const {id} = req.params;
    
    try {
        const sares = await db.sare.findOne({
            where: {
                id: id
            },
           //include: [{all:true}]
           include: ['regions']
        }
        );
        return res.status(200).json({sares :sares});
       //return res.status(202).json(sares); 
     } catch (error) {
         console.log(error);
          return res.status(500).json({error: "error del servidor"});
     }
},

//Actualizar regiones atendidas
async addRegionSare(req, res){
    const {id} = req.params;
    //const region = req.body;
    try {
        const sares = await db.sare.findOne({
            where: {
                id: id
            },
           //include: [{all:true}]
           include: ['regions']

           
        }
        );
        
        const [results, metadata] = await sequelize.query('delete from regionsares where "sareId" ='+id);
        
        const addR = await sares.addRegion([1,2,3], { through: { selfGranted: false }});
        
        const n = await db.sare.findOne({
            where: {
                id: id
            },
           //include: [{all:true}]
           include: ['regions']
        });
            return res.status(200).json({regiones : n});
        
        
     } catch (error) {
         console.log(error);
          return res.status(500).json({error: "error del servidor"});
     }
},


async updateSare (req, res){
    
    const {id} = req.params;
    

    try {
        
        const sare = await db.sare.findByPk(id);

        if(!sare){
        return res.status(404).json( "La Region No Existe");
      } else 

        sare.set(req.body);
        await sare.save();

        return res.status(200).json(sare);

    } catch (error) {
         console.log(error);
        return res.status(500).json( "error del servidor");
    }

},

async deleteSare (req, res){

    const {id} = req.params;

    try {
        const sares = await db.sare.findByPk(id);
         if (!sares){
            return res.status(404).json( "No Existe La Region");
         } else{
            await db.sare.destroy({
            where:{id}
        });
        return res.status(200).json( "La Region Ha Sido Eliminada ");
         }
    

    } catch (error) {
          console.log(error);
            return res.status(500).json( "error del servidor"); 
    }
},



}
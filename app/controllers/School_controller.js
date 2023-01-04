const db = require('../models'); //prueba exitosa pero con difine

module.exports = {

//crear directorio
//! checar las tablas anidadas de director y supervisor porq no se eliminan cunado se elimina una escuela.

async createSchool(req, res){

    try {
         const { name_school, cct, nivel, calle, 
            noExterior, numeroInterior, asentamiento,
            email_school, telefono, localidadId} = req.body;
    const {name_director, sindicato, telephone, puesto, email_director,status, atencion} = req.body
    const {name_supervisor, telephone_supervisor,email_supervisor, recuperado, directorio_recuperado} = req.body
    const {lat, long} = req.body;
            let iduser = req.user
    let school = await db.school.create({
        name_school,
        cct,
        nivel,
        calle,
        noExterior,
        numeroInterior,
        asentamiento,
        email: email_school,
        telefono,
        localidadId,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: iduser.id,
        ubicacion:{
            longitud:long,
            latidud: lat,
        },
        director: {
            name: name_director,
            sindicato,
            telephone,
            puesto,
            email: email_director,
            status,
            atencion,
            supervisor: [{
                name: name_supervisor,
                telephone: telephone_supervisor,
                email:email_supervisor,
                recuperado,
                directorio_recuperado
            }] 
        } 
    },
    {
       include: ['ubicacion',{
          association: db.school.associations.director,
          include: [ 'supervisor' ],
          
        }]
      }
 
    );
    return res.status(200).json(school);
    } catch (error) {
        console.log(error);
        return res.status(500).json("error del servidor"); 
    }

   
},

async allSchool(req,res){
    try {
        let school = await db.school.findAll({
            
        include: [ 
           /* {
 all: true,
        }*/
          'usuario','localidad','ubicacion', {
           //'localidad','ubicacion', {
             association: db.school.associations.director,
               include: [ 'supervisor' ],
                
           
           
        }
           //'usuario'
         ]
    })
    return res.status(200).json({schols:school});
    } catch (error) {
       console.log(error);
        return res.status(500).json("error del servidor"); 
    }
   
},

async allSchoolId (req, res){

const {id} = req.params;

try {

    const school = await db.school.findOne({
        where: {id},
        include: [
            'ubicacion','localidad',{
                association: db.school.associations.director,
                include: [ 'supervisor' ]

            }]
       /* include: [{
            all: true
        }]*/
    });

    if(!school){
        return res.status(404).json("La Escuela No Existe");
    }else{
        return res.status(200).json({school: school});
    }
    
} catch (error) {
    console.log(error);
    return res.status(500).json( "error del servidor"); 
}

},
//!! no modifca bien los datos de las tablas anidadas director and supervisor correguir
async updateSchool(req, res){

    try {

        const {id} = req.params;

        const school = await db.school.findOne({
            where: {id},
            include: [{ all: true}]
        })
        if(!school){
            return res.status(404).json("La Escuela No Existe");
        }else

        school.set(req.body);
        await school.save();

        return res.status(200).json(school);

    } catch (error) {
         console.log(error);
    return res.status(500).json("error del servidor"); 
    }

},

async deleteSchool (req, res){
    try {
        
        const {id} = req.params;

        const school = await db.school.findByPk(id);
        if(!school){
            return res.status(404).json("No Existe La Escuela");
        }else{
            await db.school.destroy({
                where: {id}
            });
            return res.status(200).json("La Escuela Ha Sido Eliminada");
      }
    
    } catch (error) {
        console.log(error);
        return res.status(500).json("error del servidor"); 
    }
}

}
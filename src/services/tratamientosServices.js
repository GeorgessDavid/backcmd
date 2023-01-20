const path = require('path')
const db = require('../../database/models');


const controlador = {

    apiListar: (req,res) => {
        db.Tratamiento.findAll({
        }).then((tratamiento) => {
            res.json({"data": tratamiento})
        })
    },

    create: (req, res) => {

        db.Tratamiento.create({nombre: req.body.tratamiento}).then((tratamiento) => {
            let data = {
                "estado": "Creado exitosamente",
                "status": 201,
                "data": "Se ha creado el tratamiento de " + tratamiento.nombre
            }
            return res.redirect('/prestadores/admin/practicasMedicas')
            
/*             return res.status(201).json(data) */
        }).catch(err => {
            console.log(err)
        })
    },

    delete: (req,res) => {
        db.Tratamiento.destroy({where: {id: req.params.id}}).then(results => {
            let data ={
                "state": "Eliminado",
                "status": 200
            }
            return res.redirect('/prestadores/admin/practicasMedicas')
            /* return res.json(data) */
        }).catch(err => {
            console.log(err)
        })
    },
    
    update: (req, res) => {
        db.Tratamiento.update({nombre: req.body.practicaNombre}, {where: {id: req.params.id}}).then(results => {
            let data ={
                "state": "Actualizado",
                "data": results.nombre + "actualizado.",
                "status": 200
            }
            return res.redirect('/prestadores/admin/practicasMedicas')
            /* return res.json(data) */
        }).catch(err => {
            console.log(err)
        })
    }

}

module.exports = controlador

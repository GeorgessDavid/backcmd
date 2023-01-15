const db = require('../../database/models')

let profesionales = {
    get: async (req, res) => {
        try {
            const profesionales = await db.Usuario.findAll({include: [{association: 'especialidad'}, {association: 'rol'}]})

            let especialistas = []

            for(x of profesionales){
                
                if (x.Rol_id == 3){
                    especialistas.push(x)
                }
            }

            res.json({"data": especialistas})
        } catch (error){
            res.render(error);
            console.log(error)
        }
    }
}

module.exports = profesionales
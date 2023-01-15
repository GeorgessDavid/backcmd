const db = require('../../database/models')

let usuarios = {
    getAllUsers: async (req,res) =>{
        try {
            const usuarios = await db.Usuario.findAll({include: [{association: 'especialidad'}, {association: 'rol'}, {association: 'obra_social'}]})


            let data = {
                "data": usuarios,
                "status": 200,                
            }
            res.json(data)

        } catch(err){
            res.render(err)
            console.log(err)
        }

    },

    getAdmins: async (req, res) => {
        try {
            const usuarios = await db.Usuario.findAll({include: [{association: 'especialidad'}, {association: 'rol'}, {association: 'obra_social'}]})

            let administradores = []

            for (x of usuarios){
                if (x.Rol_id == 1){
                    administradores.push(x)
                }
            }

            let data = {
                "data": administradores,
                "status": 200
            }

            res.json(data)
        } catch (err){
            res.render(err)
            console.log(err)
        }
    },

    getSecretarias: async(req, res) => {
        try{
            const usuarios = await db.Usuario.findAll({include: [{association: 'especialidad'}, {association: 'rol'}, {association: 'obra_social'}]})

            let secretarias = []

            for(x of usuarios){
                if (x.Rol_id == 2){
                    secretarias.push(x)
                }
            }
            
            let data = {
                "data": secretarias,
                "status": 200
            }

            res.json(data)
        } catch (err){
            res.render(err)
            console.log(err)
        }
    },


    getProfesionales: async (req, res) => {
        try {
            const profesionales = await db.Usuario.findAll({include: [{association: 'especialidad'}, {association: 'rol'}]})

            let especialistas = []

            for(x of profesionales){
                
                if (x.Rol_id == 3){
                    especialistas.push(x)
                }
            }

            res.json({"data": especialistas, "status": 200})
        } catch (error){
            res.render(error);
            console.log(error)
        }
    },

    getPacientes: async(req, res) => {
        try {
            const usuarios = await db.Usuario.findAll({include: [{association: 'especialidad'}, {association: 'rol'}, {association: 'obra_social'}]})

            let pacientes = []

            for(x of usuarios){
                
                if (x.Rol_id == 4){
                    pacientes.push(x)
                }
            } 

            let data = {
                "data": pacientes,
                "status": 200 
            }

            res.json(data)
        } catch (err){
            res.render(err)
            console.log(err)
        }
    }
}

module.exports = usuarios
const path = require('path')
const db = require('../../database/models')

const controlador = { 
    index: (req,res) => {
        // prueba modelo clinica
        db.Tratamiento.findAll().then((data)=>{
            let datosEncontrados = [];
            for ( let x of data){
                let objetoDatoEncontrado = {
                    id: x.id,
                    nombre: x.nombre
                }
                datosEncontrados.push(objetoDatoEncontrado)
            }
            console.log(datosEncontrados)
        }
    )
        res.render("index")
    
    },
}

module.exports = controlador

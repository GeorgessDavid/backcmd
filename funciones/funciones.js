const multer = require('multer');
const fs = require('fs')

let publicMedicos = require('../datos/publicMedicos.json')

const funciones = {
    agregarMedicoPublico: (req, res) =>{
        let nuevoMedico = {     
            id: "CMD" + Date.now() + "P" ,  
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            especialidad: [req.body.especialidad, req.body.especialidad2],
            sexo: req.body.sexo,
            estudios: req.body.estudios,
            profileImg: req.file
            };
    
        publicMedicos.push(nuevoMedico)
        
        fs.writeFileSync("./datos/publicMedicos.json", JSON.stringify(publicMedicos, null, " "));
        
        res.redirect("/prestadores/home")
    }
}

module.exports = funciones
const funciones = {
    agregarMedicoPublico: (req, res) =>{
        let nuevoMedico = {       
            nombre: req.body.name,
            apellido: req.body.apellido,
            especialidad: [req.body.especialidad, req.body.especialidad2],
            sexo: req.body.sexo,
            estudios: req.body.estudios
            };
    
        medicos.push(nuevoMedico)
        
        fs.writeFileSync("./datos/publicMedicos.json", JSON.stringify(medicos, null, " "));
        
        res.redirect("/home")
    }
}

module.exports = funciones
const db = require('../../database/models')
const moment = require('moment')

const controlador = {
    profile:  async (req, res) => {
        const usuarios = await db.Usuario.findAll({where: {alias: req.params.id}, include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'obra_social' }, { association: 'tratamiento' }] })

        let fechaNac = moment(usuarios[0].nacimiento).format('DD-MM-YYYY')

        let object = {
            id: usuarios[0].id,
            alias: usuarios[0].alias,
            nombre: usuarios[0].nombre,
            apellido: usuarios[0].apellido,
            dni: usuarios[0].dni,
            email: usuarios[0].email,
            matricula: usuarios[0].matricula ? usuarios[0].matricula : 'No disponible.',
            sexo: usuarios[0].sexo == true ? 'Masculino' : 'Femenino',
            domicilio: usuarios[0].domicilio,
            telefono: usuarios[0].telefono,
            imagen: usuarios[0].imagen,
            Obra_Social_id: usuarios[0].Obra_Social_id ? usuarios[0].obra_social.nombre : 'No disponible',
            rol: usuarios[0].rol.nombre,
            nacimiento: fechaNac,
            especialidad: usuarios[0].especialidad.length != 0 ? usuarios[0].especialidad[0].nombre : 'No disponible',
            tratamiento: usuarios[0].tratamiento.length != 0 ? usuarios[0].tratamiento.nombre : 'No dsiponible'
        }

        return res.render('profile', {user: object})
    }
}

module.exports = controlador
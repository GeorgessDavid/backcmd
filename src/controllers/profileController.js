const db = require('../../database/models')

const controlador = {
    profile:  async (req, res) => {
        const usuarios = await db.Usuario.findAll({where: {alias: req.params.id}},{ include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'obra_social' }, { association: 'tratamiento' }] })

        return res.render('profile', {user: usuarios})
    }
}

module.exports = controlador
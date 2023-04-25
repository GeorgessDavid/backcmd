const { body } = require('express-validator')

const validaciones = {

    addEspecialidad: [
        body('especialidadNombre').notEmpty().trim().withMessage('Debe completar este campo.').isLength({ min: 5, max: 30 }).withMessage('La especialidad debe tener entre 5 y 30 caraceteres.')
    ],
    addUsuario: [
        body('alias').notEmpty().trim().withMessage('Debe introducir un nombre de usuario'),
        body('password').notEmpty().withMessage('Debe introducir una contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener 6 caracteres como mínimo.'),
        body('email').notEmpty().withMessage('Debe introducir un email.').isEmail().withMessage('Debe introducir una dirección de email válida.'),
        body('dni').notEmpty().withMessage('Debe introducir el número de documento.').isLength({ min: 5, max: 8 }).withMessage('Número de documento inválido, revise la información.'),
        body('telefono').notEmpty().withMessage('Debe escribir un número de teléfono.'),
        body('nombre').notEmpty().withMessage('Debe introducir un nombre.'),
        body('domicilio').notEmpty().withMessage('Debe introducir un domicilio.'),
        body('apellido').notEmpty().withMessage('Debe introducir un apellido.'),
        // CUSTOMS
        body('userType').custom((value, { req }) => {
            let userType = req.body.userType

            if (!userType) {

                throw new Error('Debe seleccionar un tipo de usuario')
            }

            return true
        }),
        body('sexo').custom((value, { req }) => {
            let sexo = req.body.sexo;

            if (!sexo) {

                throw new Error('Debe seleccionar el sexo');

            }

            return true
        })
        
    ],
    addPaciente: [
        body('alias').notEmpty().trim().withMessage('Debe introducir un nombre de usuario.'),
        body('email').notEmpty().trim().withMessage('Debe introducir una dirección de email.').isEmail().withMessage('Debe introducir una dirección de email válida.'),
        body('dni').notEmpty().trim().withMessage('Debe introducir el número de documento.'),
        body('telefono').notEmpty().trim().withMessage('Debe introducir un número de teléfono.'),
        body('domicilio').notEmpty().trim().withMessage('Debe introducir un domicilio.'),
        body('nombre').notEmpty().trim().withMessage('Debe introducir un nombre.'),
        body('apellido').notEmpty().trim().withMessage('Debe introducir un apellido.'),
        // CUSTOMS
        body('sexo').custom((value, {req}) => {
            let sexo = req.body.sexo;

            if (!sexo) {

                throw new Error ('Debe seleccionar el sexo.');

            }
            return true
        }),
        body('nacimiento').custom((value, {req}) => {
            let nacimiento = req.body.nacimiento;

            if(!nacimiento) {

                throw new Error  ('Debe introducir una fecha de nacimiento.')
            }

            return true
        })
    ]
}


module.exports = validaciones;
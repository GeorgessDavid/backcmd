const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

function validateToken(req, res, next) {
    const token = req.session.token;
    if (!token) {
        return res.status(401).json({ message: 'Token no encontrado' });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("Token valido, usuario" + decoded.userId);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token expirado' });
    }
}

let userLoginValidation = {
    defaultLocals: (req, res, next) => {
        res.locals.isLogged = false;

        if (req.session.usuario) {
            res.locals.isLogged = true;
        }
        next()
    },

    loggedHome: (req, res, next) => {
        if (req.session.usuario && validateToken(req, res, next)) {
            res.locals.isLogged = req.session.usuario
            res.locals.userType = req.session.userType

            if (req.session.userType == 1) {
                return res.redirect('/prestadores/admin/home')
            } else if (req.session.userType == 2) {
                return res.redirect('/prestadores/secretaria/home')
            } else if (req.session.userType == 3) {
                return res.redirect('/prestadores/profesional/home')
            } else {
                return res.redirect('/')
            }


        } else if (req.cookies.rememberMe) {
            req.session.usuario = req.cookies.rememberMe
            res.locals.isLogged = req.session.usuario;

            req.session.userType = req.cookies.rememberMe.Rol_id;

            let tipoUsuario = req.cookies.rememberMe.Rol_id;

            req.session.token = req.session.rememberMeToken

            if (tipoUsuario == 1) {
                return res.redirect('/prestadores/admin/home')
            } else if (tipoUsuario == 2) {
                return res.redirect('/prestadores/secretaria/home')
            } else if (tipoUsuario == 3) {
                return res.redirect('/prestadores/profesional/home')
            } else {
                return res.redirect('/')
            }
        }
        next()

    },
    needLogin: (req, res, next) => {
        if (!req.session.usuario) {
            return res.redirect('/pacientes/login')
        }
        next()
    },
    selfProfile: (req, res, next) => {
        if (req.params.id != req.session.usuario.alias) {
            return res.redirect('/profile/' + req.session.usuario.alias)
        }
        next()
    },
    apiKey: (req, res, next) => {
        const apiKey = req.query.apiKey

        if(!req.session.usuario || apiKey !== process.env.API_KEY){
            console.log('Petición rechazada.')
            return res.json({"status": "502", "msg": "access denied."})
        }
        next()
    }
}

module.exports = userLoginValidation
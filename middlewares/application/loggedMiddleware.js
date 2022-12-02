let userLoginValidation = {
    defaultLocals: (req, res, next) => {
        res.locals.isLogged = false;

        if (req.session.usuario) {
            res.locals.isLogged = true;
        }
        next()
    },

    loggedHome: (req, res, next) => {
        if (req.session.usuario) {
            res.locals.isLogged = req.session.usuario

            if (req.session.userType == 1) {
                return res.redirect('/prestadores/home')
            } else if (req.session.userType == 2) {
                return res.redirect('/secretaria/home')
            } else if (req.session.userType == 3) {
                return res.redirect('/prestadores/home')
            } else {
                return res.redirect('/')
            }
        } else if (req.cookies.rememberMe) {
            req.session.usuario = req.cookies.rememberMe
            res.locals.isLogged = req.session.usuario;

            req.session.userType = req.cookies.rememberMe.Rol_id;

            let tipoUsuario = req.cookies.rememberMe.Rol_id;

            if (tipoUsuario == 1) {
                return res.redirect('/prestadores/home')
            } else if (tipoUsuario == 2) {
                return res.redirect('/secretaria/home')
            } else if (tipoUsuario == 3) {
                return res.redirect('/prestadores/home')
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
    }
}

module.exports = userLoginValidation
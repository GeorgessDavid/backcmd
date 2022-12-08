let userTypeAuth = {
    admin: (req, res, next) => {
        if (req.session.usuario.Rol_id != 1) {
            return res.render('error/accessDenied')
        }

        next();
    },
    secretaria: (req, res, next) => {
        if(req.session.usuario.Rol_id !=2) {
            return res.render('error/accessDenied')
        };

        next();
    },
    medic: (req,res,next) => {
        if(req.session.usuario.Rol_id != 3){
            return res.render('error/accessDenied')
        };

        next();
    },
    public: (req,res,next) => {
        if(req.session.usuario.Rol_id !=4){
            return res.render('error/accessDenied')
        }

        next();
    }

}

module.exports = userTypeAuth
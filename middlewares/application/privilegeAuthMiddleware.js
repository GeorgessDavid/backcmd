let userTypeAuth = {
    admin: (req, res, next) => {
        if (req.session.usuario.Rol_id != 1) {
            return res.redirect('/')
        }

        next();
    },
    secretaria: (req, res, next) => {
        if(req.session.usuario.Rol_id !=2) {
            return res.redirect('/')
        };

        next();
    },
    medic: (req,res,next) => {
        if(req.session.usuario.Rol_id != 3){
            return res.redirect('/')
        };

        next();
    },
    public: (req,res,next) => {
        if(req.session.usuario.Rol_id !=4){
            return res.redirect('/')
        }

        next();
    }

}

module.exports = userTypeAuth
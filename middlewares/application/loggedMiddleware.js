let userLoginValidation = {
    defaultLocals: (req,res,next) =>{
        res.locals.isLogged = false;
        
        if(req.session.userLogged){
            res.locals.isLogged = true;
        }
        next()
    }, 

    loggedHome: (req,res,next) => {
        if(req.session.userLogged){
            res.locals.isLogged = req.session.userLogged
            res.redirect('/prestadores/home')
        }
        next()
        
    },
    needLogin: (req,res,next) =>{
        if(!req.session.userLogged){
            res.redirect('/prestadores/login')
        }
        next()       
    }
}

module.exports = userLoginValidation
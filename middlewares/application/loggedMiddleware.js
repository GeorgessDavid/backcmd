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
            return res.redirect('/prestadores/home')
        }else if(req.cookies.rememberMe){
            req.session.userLogged = req.cookies.rememberMe
            res.locals.isLogged = req.session.userLogged;
            return res.redirect('/prestadores/home')
        }
        next()
        
    },
    needLogin: (req,res,next) =>{
        if(!req.session.userLogged){
            return res.redirect('/prestadores/login')
        }
        next()       
    }
}

module.exports = userLoginValidation
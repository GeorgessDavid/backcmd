let userLoginValidation = {
    loggedHome: (req,res,next) => {
        if(req.session.userLogged){
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
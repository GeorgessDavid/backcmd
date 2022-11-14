const port = process.env.PORT || 3005
const index = require("./src/routes/index.routes")
const express = require('express');
const methodOverride =  require('method-override');
const app = express();
const path = require('path')
const multer = require('multer');
const session = require('express-session');

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(session({secret: "Somos nosotros", resave: false, saveUninitialized: false,}))
app.use(function(req, res, next) {
    res.locals.usuario = req.session.usuario;
    next();
});

//view engine
app.set('view engine', 'ejs')
app.set('views','./src/views')

//static files
app.use(express.static(__dirname+'/public'))

//view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'./src/views'));

//routes
app.use("/", index)



//server
app.listen(port, () => {console.log(`Servidor activo en el puerto ${port}`)}
);

//Comentarios

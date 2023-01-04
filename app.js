const port = process.env.PORT || 3005
const index = require("./src/routes/index.routes")
const express = require('express');
const methodOverride =  require('method-override');
const app = express();
const path = require('path')
const multer = require('multer');
const session = require('express-session');
const cookies = require('cookie-parser')



// middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(session({secret: "Somos nosotros", resave: false, saveUninitialized: false,}))
app.use(cookies());
app.use(function(req, res, next) {
    res.locals.usuario = req.session.usuario;
    res.locals.turno = req.session.turno;
    next();
});

//view engine
app.set('view engine', 'ejs')
app.set('views','./src/views')

//static files
app.use(express.static(__dirname+'/public'))

//routes
app.use("/", index)

//server
app.listen(port, () => {console.log(`Servidor activo en el puerto ${port}`)}
);



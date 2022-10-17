const port = process.env.PORT || 3005
const index = require("./src/routes/index.routes")
const express = require('express');
const app = express();
const path = require('path')
const multer = require('multer');

//static files
app.use(express.static(__dirname+'/public'))

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'./src/views'));

//routes
app.use("/", index)



//server
app.listen(port, () => {console.log(`Servidor activo en el puerto ${port}`)}
);

//Comentarios

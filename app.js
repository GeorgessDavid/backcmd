const port = process.env.PORT || 3005
const index = require("./src/routes/index.routes")
const express = require('express');
const methodOverride =  require('method-override');
const app = express();

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));


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
const turnosRoutes = require("./src/routes/turnosRoutes")
const indexRoutes = require("./src/routes/indexRoutes")
const userRoutes = require("./src/routes/indexRoutes")

const express = require('express');
const app = express();

const path = require('path');

app.use(express.static('public'));


app.listen(process.env.PORT || 3002, (req, res) => {
    console.log("Servidor activo")
}
);

app.set('view engine', 'ejs')
app.set('views','./src/views')

app.use("/", indexRoutes)
app.use("/turnos", turnosRoutes)
app.use("/users", userRoutes)




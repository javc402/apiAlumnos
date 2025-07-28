console.clear();

console.log("🖥️ Iniciando el api");

const PORT = 3000;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const { middlewareAuth, middleware404, middleware500 } = require("./Middlewares");
const routes = require('./routes');

const conectar = async () => {
    await mongoose.connect('mongodb://localhost:27017/escuela')
    .then ( () => console.log("🌿 Conectado a la MongoDB"))
    .catch(error => console.log(error.message))
}

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//se llaman los routes
app.use('/alumnos', routes);

//sección para aplicar Middlewares
app.use(middlewareAuth); 
app.use(middleware404);
app.use(middleware500);


app.listen(PORT, () => { 
    console.log("se inicio el api en el puerto 🖲️ " + PORT);
    conectar();
});
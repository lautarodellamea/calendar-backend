const express = require('express');
const { dbConnection } = require('./database/config');
require("dotenv").config()
const cors = require('cors')

// vemos todos los proceso que estan corriento en el environment
// console.log(process.env)

// crear el servidor de express
const app = express()

// base de datos
dbConnection()

// CORS:  para definir quienes pueden hacer peticiones a mi servidor
// podria habilitar el cors solo para ciertas rutas si quisiera
app.use(cors())

// directorio publico
// el use en express es conocido como un "middleware", funcion que se ejecuta en el momento en que alguien hace una petcion a mi servidor, es una simple funcion que se ejecute siempre que pase por un lugar 
app.use(express.static("public"))

// lectura y parseo del body, es decir las peticiones que vengan en formato json extraem,os su contenido en este middleware
app.use(express.json())



// rutas
app.use("/api/auth", require("./routes/auth"))
// TODO: CRUD // Eventos



// escuchar
app.listen(process.env.PORT, ()=> {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
const express = require('express')
require('dotenv').config();


//crear el serivor de express
const app = express();

//Directorio publico
app.use(express.static('public'));


//Rutas
app.use('/api/auth', require('./routes/auth'));
//todo: CRUD: enventos


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT } Ok!`)
});
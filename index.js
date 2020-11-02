const express = require('express')
require('dotenv').config();


//crear el serivor de express
const app = express();

//Directorio publico
app.use(express.static('public'));


//Rutas
// app.get('/', (req, res) => {
//     console.log('Se requiere el /');
//     res.json({
//         ok: true
//     })
// })


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT } Ok!`)
});
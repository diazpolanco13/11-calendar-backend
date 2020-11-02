const express = require('express')

//crear el serivor de express
const app = express();


//Rutas
app.get('/', (req, res) => {
    console.log('Se requiere el /');
    res.json({
        ok: true
    })
})


// Escuchar peticiones
app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 } Ok!`)
});
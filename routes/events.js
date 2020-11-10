/*
    Rutas de usuario / events
    host + /api/events
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require("../helpers/isDate");

const { obtenerEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Todas tienen que pasar por la lalidacion del JWT
router.use(validarJWT); //esta funcion propaga la validacion de los token a todas las rutas


/*----------------------------------------------------------
Obtener Eventos--------------
-----------------------------------------------------------*/
    router.get('/', obtenerEvento);


/*----------------------------------------------------------
Crear Eventos--------------
-----------------------------------------------------------*/
    router.post(
        '/',
        [
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('start', 'La fecha de inicio es obligatoria').custom(isDate),
            check('end', 'La fecha de finalización es obligatoria').custom(isDate),
            validarCampos
        ],
        crearEvento);
    

/*----------------------------------------------------------
Actualizar Eventos--------------
-----------------------------------------------------------*/
    router.put('/:id', actualizarEvento);


/*----------------------------------------------------------
Eliminar Eventos--------------
-----------------------------------------------------------*/
    router.delete('/:id', eliminarEvento);
 


module.exports = router;
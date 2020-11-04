/*
    Rutas de usuario / auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


//Crear Usuario
    router.post(
        '/new',
        [ //Middelwares
            check('name', "El nombre es obligatorio").not().isEmpty(),
            check('email', "El email no es correcto").isEmail(),
            check('password', "El password no es correcto").isLength({ min: 6 }),
            validarCampos
        ],
        crearUsuario
    );


//Login de Usuario
    router.post(
        '/',
        [ //Middelwares
            check('email', "El email no es correcto").isEmail(),
            check('password', "El password no es correcto").isLength({ min: 6 }),
            validarCampos
        ],
        loginUsuario
    );


//Revalidar Token
    router.get('/renew', validarJWT, revalidarToken);



module.exports = router;


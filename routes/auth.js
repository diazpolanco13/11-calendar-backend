/*
    Rutas de usuario / auth
    host + /api/auth
*/

const { Router } = require('express')
const { check } =  require('express-validator')
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

//Crear Usuario
    router.post(
        '/new',
        [ //Middelwares
            check('name', "El nombre es obligatorio").not().isEmpty(),
            check('email', "El email no es correcto").isEmail(),
            check('password', "El password no es correcto").isLength({min: 6})
        ],
        crearUsuario
    );


//Login de Usuario
    router.post(
        '/',
        [ //Middelwares
            check('email', "El email no es correcto").isEmail(),
            check('password', "El password no es correcto").isLength({min: 6})
        ],
        loginUsuario
    );


//Revalidar Token
    router.get('/renew', revalidarToken);



module.exports = router;


/*
    Rutas de usuario / auth
    host + /api/auth
*/
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

const { Router } = require('express')
const router = Router();



router.post('/new', crearUsuario);

router.post('/', loginUsuario);

router.get('/renew', revalidarToken);



module.exports = router;


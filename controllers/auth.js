const { response } = require('express')



const crearUsuario = (req, res = express.response) => {
    
    const { name, email, password } = req.body;
    
    if (name.length < 4) {
        return res.status(400).json({
            ok: false,
            msg: "el nombre debe ser mayor a 5 letras"
        });
    };

    res.json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password

    });
};

const loginUsuario = (req, res = express.response) => {
    
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
};

const revalidarToken = (req, res = express.response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};
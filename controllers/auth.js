const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs')

//Controlador de registro de usuario
const crearUsuario = async (req, res = express.response) => {
    
    const { email, password } = req.body;
    try {
    //Validar existencia de correo
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                of: false,
                msg: 'Ya existe un usuario con ese correo'
            })
        }
    
    //Cerear usuario
        usuario = new Usuario(req.body);

    
    //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
    //Guardar el usuario en la base de datos
        await usuario.save();
    
    //Retornar el registro de la base de datos
        res.status(201).json({
            ok: true,   
            uid: usuario.id,
            name: usuario.name
        });
        
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,   
            msg: 'Por favor hable con el admin',
        });
    }

   
};


//Controlador de inicio de sesion del usuario
const loginUsuario = (req, res = express.response) => {
    
    const { email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'login',
        email,
        password
    });
};


//Controlador para revalidar token
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
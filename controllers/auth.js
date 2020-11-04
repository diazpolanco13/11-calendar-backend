const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const { generarJWT }  = require('../helpers/jwt')


/*----------------------------------------------------------
----------Controlador de registro de usuario----------------
-----------------------------------------------------------*/
const crearUsuario = async (req, res = response) => {
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
    
    //Generar jwt
        const token = await generarJWT(usuario.id, usuario.name);


    //Retornar el registro de la base de datos
        res.status(201).json({
            ok: true,   
            uid: usuario.id,
            name: usuario.name,
            token
        });
    
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,   
            msg: 'Por favor hable con el admin',
        });
    }


};


/*----------------------------------------------------------
--------Controlador de inicio de sesion del usuario---------
-----------------------------------------------------------*/

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    
    try {

        //Validar existencia de correo
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usaurio no existe con ese email'
            })
        }

        //Confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }
        
        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        
        //Login del usuaurio
        res.status(201).json({
            ok: true,   
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,   
            msg: 'Por favor hable con el admin',
        });
    }
};



/*----------------------------------------------------------
--------------Controlador para revalidar token--------------
-----------------------------------------------------------*/

const revalidarToken = async (req, res = response) => {
    
    const { uid, name } = req;

     //Generar nuestro JWT
     const token = await generarJWT(uid, name);


    res.json({
        ok: true,
        token
    });
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};
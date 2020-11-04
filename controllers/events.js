const { response } = require('express');
const Evento = require('../models/Evento');

/*----------------------------------------------------------
--------------Controlador para Obtener Eventos--------------
-----------------------------------------------------------*/
    const obtenerEvento = async ( req, res = response ) => {

        const eventos = await Evento.find()
                                .populate('user', 'name')

        res.status(201).json({
            ok: true,
            eventos
        });

    };



/*----------------------------------------------------------
--------------Controlador para Crear Eventos--------------
-----------------------------------------------------------*/

    const crearEvento = async ( req, res = response ) => {
        
        const evento = new Evento(req.body)

        try {
            evento.user = req.uid;

            const eventoGuardado = await evento.save()

            res.status(201).json({
                ok: true,
                evento: eventoGuardado
            })

            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }


/*----------------------------------------------------------
--------------Controlador para Actualizar Eventos--------------
-----------------------------------------------------------*/
    const actualizarEvento = async ( req, res = response ) => {

        res.status(201).json({
            ok: true,
            msg: 'Actualizar Eventos'
        })
    }



/*----------------------------------------------------------
--------------Controlador para Eliminar Eventos--------------
-----------------------------------------------------------*/

    const eliminarEvento = async ( req, res = response ) => {


        res.status(201).json({
            ok: true,
            msg: 'Eliminar Eventos'
        })

    }


module.exports = {
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
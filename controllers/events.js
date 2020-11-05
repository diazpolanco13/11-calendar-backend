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
    const actualizarEvento = async (req, res = response) => {

        //traer el id del evento 
        const eventId = req.params.id;

        //traer el UID del usuario
        const uid = req.uid;

        try {
            const evento = await Evento.findById(eventId);
            
            //Verificar que el evento exista 
            if (!evento) {
                return res.status(404).json({
                    ok: false,
                    msg: "No existe un evento con ese ID"
                })
            }

            //Verificar que el usuario que consulta es el mismo usuario que creo el evento
            if (evento.user.toString() !== uid) {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene provilegios para editar este evento"
                })
            }
            const nuevoEvento = {
                ...req.body,
                user: uid
            }

            //actualizar evento
            const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, { new: true });

            res.json({
                ok: true,
                evento: eventoActualizado
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
--------------Controlador para Eliminar Eventos--------------
-----------------------------------------------------------*/

    const eliminarEvento = async ( req, res = response ) => {

        //traer el id del evento 
        const eventId = req.params.id;

        //traer el UID del usuario
        const uid = req.uid;

        try {
            const evento = await Evento.findById(eventId);
            
            //Verificar que el evento exista 
            if (!evento) {
                return res.status(404).json({
                    ok: false,
                    msg: "No existe un evento con ese ID"
                })
            }

            //Verificar que el usuario que consulta es el mismo usuario que creo el evento
            if (evento.user.toString() !== uid) {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene provilegios para eliminar este evento"
                })
            }

            //Eliminar evento
            await Evento.findByIdAndDelete(eventId);

            res.json({
                ok: true,
                msg: "Evento eliminado"
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
    }


module.exports = {
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
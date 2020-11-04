    const { response } =  require('express')


/*----------------------------------------------------------
--------------Controlador para Obtener Eventos--------------
-----------------------------------------------------------*/
    const obtenerEvento = async ( req, res = response ) => {

        res.status(201).json({
            ok: true,
            msg: 'Obtener eventos'
        })

    }



/*----------------------------------------------------------
--------------Controlador para Crear Eventos--------------
-----------------------------------------------------------*/

    const crearEvento = async ( req, res = response ) => {
        
        //Verificar que tenga el eventos
        console.log(req.body)

        res.status(201).json({
            ok: true,
            msg: 'Crear Eventos'
        })

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
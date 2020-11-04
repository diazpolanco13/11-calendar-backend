/* Los esquemas sirven para crear los campos y la estructura
que tendra una entiedad en la base de datos */

/* Esquema de los eventos */
const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        require: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        require: true,
    },
    end: {
        type: Date,
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = model('Evento', EventoSchema);
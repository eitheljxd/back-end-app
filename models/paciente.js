const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({

    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    sexo: {
        type: Number,
        required: true
    },
    fechaNacimiento: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
    },
    
    direccion: {
        type: String,
    },
    distrito: {
        type: String,
    },
    ciudad: {
        type: String,
    }
});




module.exports = model( 'Paciente', PacienteSchema );

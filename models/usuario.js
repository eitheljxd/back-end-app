var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
        

var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellidos : { type: String, required: [true, 'Los apellidos son necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    documento : { type: String, unique: true, required: [true, 'El documento de identidad es necesario'] },
    password: { type: String, required: [true, 'La contraseÃ±a es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser Ãºnico' });

module.exports = mongoose.model('Usuario', usuarioSchema);
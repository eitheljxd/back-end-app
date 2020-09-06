const { Schema, model } = require('mongoose');



const ItemsSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
    },
    precio: {
        type: Number,
    }
}, {  collection: 'items' });


ItemsSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Item', ItemsSchema );

var express = require('express');
var mongoose = require('mongoose');

const { request } = require('express');

var app = express();

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (error, response) =>{

    if(error) throw error;
    console.log("Base de datos en estado : \x1b[32m%s\x1b[0m","online")


})

app.get('/', (request, response, next) => {
    response.status(200).json({
       ok : true,
       mensaje: "peticion realizada"
    });
})

app.listen(3000, () => {
    console.log("Express corriendo en el puerto 3000 con estado: \x1b[32m%s\x1b[0m","online")
});

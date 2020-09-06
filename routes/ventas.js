/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    crearVenta,
    getVentas
} = require('../controllers/ventas')

const router = Router();


router.post( '/',
    [
        validarJWT,
        //busquedas.jscheck('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearVenta 
);


router.get( '/', validarJWT , getVentas );


module.exports = router;
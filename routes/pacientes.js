/*
    Pacientes
    ruta: '/api/paciente'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getPacientes, crearPaciente
} = require('../controllers/pacientes')


const router = Router();

router.get( '/', getPacientes );

router.post( '/',
    [
        validarCampos
    ], 
    crearPaciente 
);



module.exports = router;




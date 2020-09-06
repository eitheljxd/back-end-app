const { response } = require('express');

const Pacientes = require('../models/paciente');

const getPacientes = async(req, res) => {
    const desde = Number(req.query.desde) || 0;

    const [ pacientes, total ] = await Promise.all([
        Pacientes
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

        Pacientes.countDocuments()
    ]);


    res.json({
        ok: true,
        pacientes,
        total
    });

}
const crearPaciente = async (req, res = response) => {

    //const uid = req.uid;
    const paciente = new Pacientes({
        ...req.body
    });


    try {

        const pacienteDB = await paciente.save();

        
        res.json({
            ok: true,
            paciente: pacienteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema con la operación',
            detailException: error._message
        })
    }


}



module.exports = {
    getPacientes,
    crearPaciente,
}
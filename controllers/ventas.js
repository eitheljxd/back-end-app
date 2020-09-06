const { response } = require("express");

const Venta = require("../models/venta");
const { generarJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const venta = require("../models/venta");

//Metodo para crear una venta
const crearVenta = async (req, res = response) => {
  const uid = req.uid;

  const venta = new Venta({
    usuario: uid,
    ...req.body,
  });

  console.log(uid);

  try {
    const ventaBD = await venta.save();
    const token = await generarJWT(uid);

    res.json({
      ok: true,
      venta: ventaBD,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hubo un problema con la operación",
    });
  }
};

//Metodo para listar todas las ventas
const getVentas = async (req, res) => {
  const pagina = Number(req.query.page);
  const tamanoPagina = Number(req.query.pageSize);
  var busqueda = req.query.busqueda;
  var fecha = req.query.fecha;
  var searchQuery = {};
  fecha ? (searchQuery.fecha = { $regex: fecha }) : null;
  busqueda
    ? (searchQuery.$or = [
        {
          invoiceID: { $regex: new RegExp(busqueda, "i") },
        },
        {
          nameBill: { $regex: new RegExp(busqueda, "i") },
        },
      ])
    : null;

  var ventas = await Promise.all([
    Venta.paginate(searchQuery, {
      limit: tamanoPagina,
      page: pagina,
      options: {
        sort: {
          fecha: -1, // ascending order
        },
      },
    }), //.find({ nombre : (busqueda) ? regex : /.*/}, 'nombre email role google img')
  ]);

  var total = await Venta.find(searchQuery);
  var montotTotal = 0.0;
  total.forEach((item) => {
    montotTotal += item.total;
  });
  res.json({
    ok: true,
    ventas,
    montoTotal: montotTotal,
  });
};

module.exports = {
  crearVenta,
  getVentas,
};

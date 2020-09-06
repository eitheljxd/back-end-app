const { Schema, model } = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
const shortid = require("shortid");

const ItemSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});

const VentaSchema = Schema(
  {
    invoiceID: {
      type: String,
      default: shortid.generate,
    },
    total: {
      type: Number,
      required: true,
    },
    nameBill: {
      type: String,
    },
    subtotal: {
      type: Number,
    },
    taxes: {
      type: Number,
    },
    fecha: {
      type: String,
    },
    items: {
      type: [ItemSchema],
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "ventas" }
);

VentaSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

VentaSchema.plugin(mongoosePaginate);

module.exports = model("Venta", VentaSchema);

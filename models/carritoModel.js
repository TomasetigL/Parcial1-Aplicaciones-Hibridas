const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, default: 0 },
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;

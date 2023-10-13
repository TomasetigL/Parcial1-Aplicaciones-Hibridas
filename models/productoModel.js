const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const productoSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;

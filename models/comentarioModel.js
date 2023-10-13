const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  // Otros campos relevantes para el comentario
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;

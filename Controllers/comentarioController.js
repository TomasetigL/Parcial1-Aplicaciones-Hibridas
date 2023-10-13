const Comentario = require('../models/comentarioModel');


exports.createComentario = async (req, res) => {
  try {
    const comentario = new Comentario(req.body);
    const nuevoComentario = await comentario.save();
    res.status(201).json(nuevoComentario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getComentarioById = async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.comentarioId);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndUpdate(req.params.comentarioId, req.body, { new: true });
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndRemove(req.params.comentarioId);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

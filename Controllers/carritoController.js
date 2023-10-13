const Carrito = require('../models/carritoModel');
const Producto = require('../models/productoModel'); 


exports.createCarrito = async (req, res) => {
  try {
    const { usuario, productos } = req.body;
    
    

    const carrito = new Carrito({ usuario, productos });
    const nuevoCarrito = await carrito.save();
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getCarritoByUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;
    const carrito = await Carrito.findOne({ usuario: usuarioId }).populate('productos.producto');
    
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito de compras no encontrado' });
    }
    
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.addToCarrito = async (req, res) => {
    try {
      const { usuario, producto, cantidad } = req.body;
  
     
      let carrito = await Carrito.findOne({ usuario });
  
      if (!carrito) {
        carrito = new Carrito({ usuario, productos: [] });
      }
  
      
      const productoExistente = carrito.productos.find(item => item.producto == producto);
  
      if (productoExistente) {
        productoExistente.cantidad += cantidad;
      } else {
       
        const productoEnBaseDeDatos = await Producto.findById(producto);
        
        if (!productoEnBaseDeDatos) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
  
        carrito.productos.push({ producto, cantidad });
      }
  
      
      carrito.total = carrito.productos.reduce((total, item) => total + (item.cantidad * item.producto.precio), 0);
  
      const carritoActualizado = await carrito.save();
      res.status(200).json(carritoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  


exports.removeFromCarrito = async (req, res) => {
  try {
    const usuario = req.params.usuarioId;
    const productoId = req.params.productoId;
    
    const carrito = await Carrito.findOne({ usuario });
    
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito de compras no encontrado' });
    }

    const productoIndex = carrito.productos.findIndex(item => item.producto == productoId);
    
    if (productoIndex !== -1) {
      carrito.productos.splice(productoIndex, 1);

     
      carrito.total = carrito.productos.reduce((total, item) => total + (item.cantidad * item.producto.precio), 0);

      const carritoActualizado = await carrito.save();
      res.status(200).json(carritoActualizado);
    } else {
      res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

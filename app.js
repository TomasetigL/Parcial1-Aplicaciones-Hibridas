const express = require('express');
const bodyParser = require('body-parser');
const dataBase = require('./dataBase');


const userController = require('./Controllers/userController');
const productoController = require('./Controllers/productoController');
const comentarioController = require('./Controllers/comentarioController');
const carritoController = require('./Controllers/carritoController');


const app = express();

const port = 3000;

app.use(express.json());




dataBase.on( 'error', () => {
    console.error('Error de conexion con MongoDB')
});
dataBase.once('open', () => {
  console.log('Conectado a MongoDB 😁');
});

//Rutas

app.get('/', (req, res) => {
    res.send('<h1>API REST</h1>');
})


app.post('/auth', userController.auth);


app.post('/crear', userController.crear);


app.put('/actualizar/:id', userController.actualizar);


app.delete('/eliminar/:id', userController.eliminar);

// Rutas para el controlador de productos
app.get('/productos', productoController.getTodosLosProductos);

app.get('/productos/:id', productoController.getProductoPorId);

app.post('/productos', productoController.crearProducto);

app.put('/productos/:id', productoController.actualizarProducto);

app.delete('/productos/:id', productoController.eliminarProducto);

// Rutas para el controlador de comentarios
app.post('/comentarios', comentarioController.createComentario);

app.get('/comentarios', comentarioController.getComentarios);

app.get('/comentarios/:comentarioId', comentarioController.getComentarioById);

app.put('/comentarios/:comentarioId', comentarioController.updateComentario);

app.delete('/comentarios/:comentarioId', comentarioController.deleteComentario);

// Rutas para el controlador de carritos
app.post('/carritos', carritoController.createCarrito);

app.get('/carritos/:usuarioId', carritoController.getCarritoByUsuario);

app.post('/carritos/add', carritoController.addToCarrito);

app.delete('/carritos/:usuarioId/:productoId', carritoController.removeFromCarrito);


// Escucha en un puerto
app.listen( port, () => {
    console.log('Servidor en el puerto ', port);
})

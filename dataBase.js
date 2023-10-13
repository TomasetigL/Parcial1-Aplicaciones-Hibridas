const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tienda_pc', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })

 module.exports = mongoose.connection;
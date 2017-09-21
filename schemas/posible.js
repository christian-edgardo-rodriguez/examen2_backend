var mongoose = require('mongoose');

var PosibleSchema = new mongoose.Schema({
  nombre : String,
  dificultad : String,
  tiempoAprendizaje: Number
});

module.exports = mongoose.model('Posible', PosibleSchema);

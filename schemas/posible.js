var mongoose = require('mongoose');

var PosibleSchema = new mongoose.Schema({
  nombre : String,
  peso: Number,
  tipo: String,
  hastaDonde: Boolean,
  energia: Number,
  detonada: Boolean
});

module.exports = mongoose.model('Posible', PosibleSchema);

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UsuarioSchema = new mongoose.Schema({
  nombreUsuario : {type: String, unique: true, required: true},
  contraseña : {type: String, required: true},
  scope : [String], 
  nombre: String,
  ocupacionPrevia: String,
  fechaNacimiento: String,
  pais: String,
  creencias: String,
  amigos: [{nombreAmigo:String}]
});

UsuarioSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Usuario', UsuarioSchema);

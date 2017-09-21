var posible = require('../schemas/posible');

exports.buscarPosibles = {
  auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },
  handler: function(request, reply){
  var posibles = posible.find({});
    reply(posibles);
  }
}

exports.buscarPosiblesNombre = {
  auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },
  handler: function(request, reply){
  var posibles = posible.find({nombre:request.params.nombre});
    reply(posibles);
  }
}
exports.buscarPosiblesPeso = {
  auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },
  handler: function(request, reply){
  var posibles = posible.find({peso:request.params.peso});
    reply(posibles);
  }
}
exports.buscarPosiblesTipo = {
  auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },
  handler: function(request, reply){
  var posibles = posible.find({tipo:request.params.tipo});
    reply(posibles);
  }
}
exports.buscarPosiblesHastaDonde = {
  auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },
  handler: function(request, reply){
  var posibles = posible.find({hastaDonde:request.params.hastaDonde});
    reply(posibles);
  }
}
exports.buscarPosiblesEnergia = {
  auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },
  handler: function(request, reply){
  var posibles = posible.find({energia:request.params.energia});
    reply(posibles);
  }
}
exports.crearPosible = {
  auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },
  handler: function(request, reply){
    var nuevoPosible= new posible({
      nombre: request.payload.nombre,
      peso: request.payload.dificultad,
      tipo: request.payload.tipo,
      hastaDonde:request.payload.hastaDonde,
      energia: request.payload.tiempoAprendizaje,
      detonada: false
    });
    nuevoPosible.save();
    console.log('Bomba Creada');
    return reply('Creado');
  }
}

exports.modificarPosible = {
  auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },
  handler: function (request, reply) {
    if (request.query.nombre) {
      var posibles = posible.find({nombre: request.query.nombre});
      posibles.update({$set: request.payload}, function (err) {
        if (err) {
          reply('No se pudo modificar');
        } else {
          reply('Modificado');
        }
      });
    } else {
      return reply("Ingresar un nombre");
    }

  }
}

exports.borrarPosible = {
  auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },
  handler: function (request, reply) {
    if (request.query.nombre != undefined) {
      var posibles = posible.find({nombre: request.query.nombre});
      posibles.remove(function (err) {
        if (err) {
          reply('No se pudo borrar');
        } else {
          reply('Borrado');
        }
      });
    } else {
      return reply("Ingresar un nombre");
    }
  }
}

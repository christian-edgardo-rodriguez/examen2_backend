var posible = require('../schemas/posible');

exports.buscarPosibles = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin', 'regular']
   },*/
  handler: function(request, reply){
  var posibles = posible.find({});
    reply(posibles);
  }
}

exports.crearPosible = {
  /*auth: {
    mode:'required',
    strategy:'session',
    scope: ['admin']
  },*/
  handler: function(request, reply){
    var nuevoPosible= new posible({
      nombre: request.payload.nombre,
      dificultad: request.payload.dificultad,
      tiempoAprendizaje: request.payload.tiempoAprendizaje
    });
    nuevoPosible.save();
    console.log('student saved');
    return reply('ok');
  }
}

exports.modificarPosible = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },*/
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
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },*/
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

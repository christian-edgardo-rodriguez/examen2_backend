var usuario = require('../schemas/usuario');
var boom = require('boom');
var bcrypt = require('bcrypt');

exports.buscarUsuarios = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin', 'regular']
   },*/
  handler: function(request, reply){
  var usuarios = usuario.find({});
    reply(usuarios);
  }
}

exports.buscarUsuariosNombre = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin', 'regular']
   },*/
  handler: function(request, reply){
  var usuarios = usuario.find({nombreUsuario:request.params.nombreUsuario});
    reply(usuarios);
  }
}

exports.crearUsuario = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin', 'regular']
   },*/
    handler: function (request, reply) {
        bcrypt.hash(request.payload.contraseña, 10, function (err, hash) {
            if (err)
                return reply(boom.notAcceptable('Error al encriptar la contraseña'));
            var nuevoUsuario = new usuario({
                nombreUsuario: request.payload.nombreUsuario,
                contraseña: hash,
                scope: request.payload.scope,
                nombre: request.payload.nombre,
                ocupacionPrevia: request.payload.ocupacionPrevia,
                fechaNacimiento: request.payload.fechaNacimiento,
                pais: request.payload.pais,
                creencias: request.payload.creencias,
                amigos: []
            });
            nuevoUsuario.save(function (err) {
                if (err) {
                    return reply(boom.notAcceptable('El usuario de ser único: ' + err));
                } else {
                    return reply('Usuario creado exitosamente');
                };
            });
        })
    }
}

exports.modificarUsuario = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },*/
  handler: function (request, reply) {
    if (request.query.nombreUsuario) {
      var usuarios = usuario.find({nombreUsuario: request.query.nombreUsuario});
      usuarios.update({$set: request.payload}, function (err) {
        if (err) {
          reply('No se pudo modificar el usuario');
        } else {
          reply('Usuario Modificado');
        }
      });
    } else {
      return reply("Ingresar un nombre");
    }

  }
}

exports.borrarUsuario = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },*/
  handler: function (request, reply) {
    if (request.query.nombreUsuario != undefined) {
      var usuarios = usuario.find({nombreUsuario: request.query.nombreUsuario});
      usuarios.remove(function (err) {
        if (err) {
          reply('No se pudo borrar el usuario');
        } else {
          reply('Usuario Borrado');
        }
      });
    } else {
      return reply("Ingresar un nombre");
    }
  }
}

exports.agregarAmigo = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },*/
    handler: function (request, reply) {
        usuario.findOne({nombreUsuario:request.payload.nombreUsuario}, function (err, usuario1) {
            if (err) {
                return handleError(err);
            } else {
                usuario1.amigos.push({nombreUsuario:request.payload.amigo});
                usuario1.save();
            }
        });

        usuario.findOne({nombreUsuario:request.payload.amigo}, function (err, amigo) {
            if (err) {
                return handleError(err);
            } else {
                amigo.amigos.push({nombreUsuario:request.payload.nombreUsuario});
                amigo.save();
                return reply('Amigo Agregado');
            }
        });
    }
}

exports.borrarAmigo = {
  /*auth: {
     mode:'required',
     strategy:'session',
     scope: ['admin']
   },*/
    handler: function (request, reply) {
       usuario.findOne({nombreUsuario:request.payload.nombreUsuario}, function (err, usuario1) {
            if (err) {
                return handleError(err);
            } else {
                usuario1.amigos.pop({nombreUsuario:request.payload.amigo});
                usuario1.save();
            }
        });

        usuario.findOne({nombreUsuario:request.payload.amigo}, function (err, amigo) {
            if (err) {
                return handleError(err);
            } else {
                amigo.amigos.pop({nombreUsuario:request.payload.nombreUsuario});
                amigo.save();
                return reply('Amigo Eliminado');
            }
        });
    }
}
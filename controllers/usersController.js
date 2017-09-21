var user = require('../schemas/user');
var boom = require('boom');
var bcrypt = require('bcrypt');

exports.crearUsuario = {
     auth: false,
    handler: function(request, reply) {
       bcrypt.hash(request.payload.contraseña, 10, function(err, hash){
          if(err)
            return reply(boom.notAcceptable('Error al encriptar contraseña'));
          var newUser = new user({
            nombreUsuario : request.payload.nombreUsuario,
            contraseña : hash,
            scope : request.payload.scope
          });
          newUser.save(function (err) {
            if(err){
              return reply(boom.notAcceptable('Usuario debe ser unico: ' + err));
            }else{
              return reply('ok!');
            };
          });
        })
    }
  };

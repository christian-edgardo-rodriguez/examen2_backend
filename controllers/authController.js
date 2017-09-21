var joi = require('joi');
var boom = require('boom');
var usuario = require('../schemas/usuario');
var bcrypt = require('bcrypt');

exports.login = {
    auth: false,
    validate: {
      payload: {
        nombreUsuario: joi.string().required(),
        contraseña: joi.string().min(2).max(200).required()
      }
    },
    handler: function(request, reply) {
      usuario.find({nombreUsuario: request.payload.nombreUsuario}, function(err, user){
        console.log('usuario: ', request.payload.nombreUsuario, 'user', usuario)
        if(err)
          return reply(boom.notAcceptable('Error al ejecutar el Query'));
        if(user.length > 0){
          bcrypt.compare(request.payload.contraseña, user[0].contraseña, function(err, res){
            console.log('res',res);
            if(err)
                return reply(boom.unauthorized('Usuario incorrecto'));
            if(res){
              request.cookieAuth.set(user[0]);
              return reply({nombreUsuario: user[0].nombreUsuario, scope: user[0].scope});
            }else{
              return reply(boom.unauthorized('Contraseña incorrecta'))
            }
          });
        }
      });
    }
};
exports.logout = {
     auth: {
       mode:'required',
       strategy:'session'
     },
    handler: function(request, reply) {
      request.cookieAuth.clear();
      return reply('Se ha salido de la sesion.');
    }
  };

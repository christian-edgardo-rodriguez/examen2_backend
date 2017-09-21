var posibleController = require('./controllers/posibleController');
var usuarioController = require('./controllers/usersController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, Posible')}}},
	{method: 'GET', path: '/nombreUsuario/{nombreUsuario}', config: usuarioController.buscarUsuariosNombre},
  {method: 'POST', path: '/crearUsuario', config: usuarioController.crearUsuario},
    {method: 'GET', path: '/posibles', config: posibleController.buscarPosibles},
  {method: 'POST', path: '/crearPosible', config: posibleController.crearPosible},
  {method: 'PUT', path: '/modificarPosible', config: posibleController.modificarPosible}, 
  {method: 'DELETE', path: '/borrarPosible', config: posibleController.borrarPosible},
  {method: 'POST', path: '/login', config: authController.login},
	{method: 'GET', path: '/logout', config: authController.logout}
];

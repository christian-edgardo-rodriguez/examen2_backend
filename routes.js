var posibleController = require('./controllers/posibleController');
var usuarioController = require('./controllers/usuarioController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, Posible')}}},
	{method: 'GET', path: '/usuarios', config: usuarioController.buscarUsuarios},
	{method: 'GET', path: '/nombreUsuario/{nombreUsuario}', config: usuarioController.buscarUsuariosNombre},
  {method: 'POST', path: '/crearUsuario', config: usuarioController.crearUsuario},
  {method: 'PUT', path: '/modificarUsuario', config: usuarioController.modificarUsuario},
  {method: 'DELETE', path: '/borrarUsuario', config: usuarioController.borrarUsuario},
  {method: 'PUT', path: '/agregarAmigo', config: usuarioController.agregarAmigo},
    {method: 'PUT', path: '/borrarAmigo', config: usuarioController.borrarAmigo},
    {method: 'GET', path: '/posibles', config: posibleController.buscarPosibles},
  {method: 'POST', path: '/crearPosible', config: posibleController.crearPosible},
  {method: 'PUT', path: '/modificarPosible', config: posibleController.modificarPosible}, 
  {method: 'DELETE', path: '/borrarPosible', config: posibleController.borrarPosible},
  {method: 'POST', path: '/login', config: authController.login},
	{method: 'GET', path: '/logout', config: authController.logout}
];

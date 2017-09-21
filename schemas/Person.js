var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var personSchema = new mongoose.Schema({
	idPerson: Number,
	name: String, 
	age: Number, 
	email: String,
	address: String, 
	phone: Number, 
	image: String,
	username: String, 
	password: String,
	friends: [Number]
});
personSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Person', personSchema);
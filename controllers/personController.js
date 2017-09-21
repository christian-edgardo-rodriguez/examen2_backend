var person = require('../schemas/Person');
var boom = require('boom');
var bcrypt = require('bcrypt');

exports.createPerson = {
	handler: function(request, reply){
			console.log('Aqui');
			var verifyUsername = request.payload.username;
			var unique = true;
			person.find({}, 'idPerson username', function (err, IDP) {
				var ID = 0;
				for (var i = 0; i < IDP.length; i++) {
					if (verifyUsername === IDP[i].username) {
						unique = false;
					}
				}
				if (IDP[0] === undefined) {
					ID = 1;
				} else {
					ID = IDP[0].idPerson + 1;
				}
				var newPerson = new person({
					idPerson: ID,
					name: request.payload.name,
					age: request.payload.age,
					email: request.payload.email,
					address: request.payload.address,
					phone: request.payload.phone,
					image: request.payload.image,
					username: request.payload.username,
					password: request.payload.password,
					friends: request.payload.friends
				});

				console.log('new Person: ', newPerson);
				
				if (unique) {
					console.log('se creo');
					newPerson.save();
					//newPerson.save();
					reply('Person saved');
				} else {
					reply('Not unique');
				} 
			}).sort({ _id: -1 });
	}
};

exports.updatePerson = {
	handler: function(request,reply){
		var toBeUpdated = person.find({idPerson: request.params.id});
		toBeUpdated.update({$set: request.payload}, function(err){
			if(err){
				return reply(err);
			}else{
				return reply('Person updated');
			}
		});
	}
};

exports.deletePerson = {
	handler: function(request, reply){
		var toBeDeleted = person.find({idPerson: request.params.id});
		toBeDeleted.remove(function(err){
			if(err){
				return reply(err);
			}else{
				return reply('Person deleted');
			}
		});
	}
};

exports.getPeople = {
	handler: function(request,reply){
		var people = person.find({});
		return reply(people);
	}
};

exports.getPersonById = {
	handler: function(request, reply){
		var personById = person.find({idPerson: request.params.id});
		return reply(personById);
	}
};

exports.getPersonByName = {
	handler: function(request, reply){
		var personByName = person.find({name: request.params.name});
		return reply(personByName);
	}
};

exports.addFriend = {
	handler: function(request, reply){
		var addFriend = person.find({idPerson: request.params.id});
		addFriend.update({$push: {friends: request.payload.friend}}, function(err){
			if(err){
				reply(err);
			}else{
				reply('Friend added');
			}
		});
	}
};

exports.deleteFriend = {
	handler: function(request, reply){
		var deleteFriend = person.find({idPerson: request.params.id});
		deleteFriend.update({$pull: {friends: request.payload.friend}}, function(err){
			if(err){
				reply(err);
			}else{
				reply('Friend added');
			}
		});
	}
};
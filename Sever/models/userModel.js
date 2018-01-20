'use strict';

var mongoose = require('mongoose');

var userModel = function() {
	var userSchema = mongoose.Schema({
		firstname: String,
		lastname: String,
		username: {type: String, unique: true},
		password: String,
		shopcart: Array
	});

	return mongoose.model('User', userSchema);
}


module.exports = new userModel();
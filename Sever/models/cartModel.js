'use strict';

var mongoose = require('mongoose');

var cartModel = function() {
	var cartSchema = mongoose.Schema({
		item: String,
		quantity: Number,
		total: Number
	});

	return mongoose.model('Cart', cartSchema);
}


module.exports = new cartModel();
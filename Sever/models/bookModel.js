'use strict';

var mongoose = require('mongoose');

var bookModel = function() {
	var bookSchema = mongoose.Schema({
		title: String,
		description: String,
		author: String,
		publisher: String,
		category: String,
		price: Number,
		cover: String,
	});

	return mongoose.model('Book', bookSchema);
}


module.exports = new bookModel();
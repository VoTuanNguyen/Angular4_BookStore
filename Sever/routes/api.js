var app = require('express')();
var Book = require('../models/bookModel');
var Cart = require('../models/cartModel');
var User = require('../models/userModel');

app.get('/books', function(req, res) {

	Book.find({}, function(err, books) {
		if(err) throw err;

		res.send(books);
	});
});

app.get('/book', function(req, res) {
	var id = req.query.bookId;

	Book.find({ _id: id }, function(err, book) {
		if(err) throw err;
		
		res.send(book[0]);
	});
});

app.delete('/book', function(req, res) {
	var bookId = req.query.bookId;
	console.log(bookId)

	Book.findByIdAndRemove(bookId, function(err, book) {
		if(err) {
			console.log(err);
			res.send({
				success: false,
				message: "The request was not completed. Book with id " + book._id + " is not successfully deleted"
			});
		} else {
			res.send({
				success: true,
				message: "Book successfully deleted",
				id: book._id
			});
		}
	});
});

app.post('/book', function(req, res) {
	var bookData = req.body.bookData;
	var book = new Book(bookData);
	book.save(function(err, createdBookObject) {
		if(err) {
			res.send({
				success: false,
				message: "Book not added"
			});
		} else {
			res.send({
				success: true,
				message: "Book successfully added",
				book: createdBookObject
			});
		}
	});
});

app.put('/book', function(req, res) {
	var bookData = req.body.bookData;

	Book.findById(bookData.id, function(err, book) {
		if(err) {
			res.send(err);
		} else {
			book.title = bookData.title;
			book.author = bookData.author;
			book.publisher = bookData.publisher;
			book.price = bookData.price;
			book.description = bookData.description;
			book.category = bookData.category;
			book.cover = bookData.cover;

			book.save(function(err, book) {
				if(err) {
					res.send(err);
				} else {
					res.send({
						success: true,
						message: "Book successfully updated"
					});
				}
			});
		}
	});
});


//cart
app.get('/carts', function(req, res) {

	Cart.find({}, function(err, carts) {
		if(err) throw err;

		res.send(carts);
	});
});

app.delete('/cart', function(req, res) {
	var cartId = req.query.cartId;

	Cart.findByIdAndRemove(cartId, function(err, cart) {
		if(err) {
			console.log(err);
			res.send({
				success: false,
				message: "The request was not completed. Cart with id " + cart._id + " is not successfully deleted"
			});
		} else {
			res.send({
				success: true,
				message: "Cart successfully deleted",
				id: cart._id
			});
		}
	});
});

app.post('/cart', function(req, res) {
	var cartData = req.body.cartData;
	var cart = new Cart(cartData);
	cart.save(function(err, createdCartObject) {
		if(err) {
			res.send({
				success: false,
				message: "Cart not added"
			});
		} else {
			res.send({
				success: true,
				message: "Cart successfully added",
				cart: createdCartObject
			});
		}
	});
});

app.put('/cart', function(req, res) {
	var cartData = req.body.cartData;

	Cart.findById(cartData.id, function(err, cart) {
		if(err) {
			res.send(err);
		} else {
			cart.quantity = cartData.quantity;
			cart.total = cartData.total;

			cart.save(function(err, cart) {
				if(err) {
					res.send(err);
				} else {
					res.send({
						success: true,
						message: "Cart successfully updated"
					});
				}
			});
		}
	});
});



//with login

//login & register

//đăng ký
app.post('/register', function(req, res){
	var userData = req.body.userData;
	var user = new User(userData);
	console.log(user);
	user.save(function(err, createdUserObject) {
		if(err) {
			res.send({
				success: false,
				message: "User not added"
			});
		} else {
			res.send({
				success: true,
				message: "User successfully added",
				user: createdUserObject
			});
		}
	});
});
//đăng nhập
app.post('/login', function(req, res){
	var userData = req.body.userData;
	User.findOne({username: userData.username, password: userData.password}, function(err, user){
		if(err) {
			res.send({
				success: false,
				message: "User is not exist"
			});
		} else {
			if(user){
				res.send({
					success: true,
					message: "User is exist",
					user: user
				});
			}else{
				res.send({
					success: false,
					message: "User is not exist"
				});
			}
		}
	})
});
//lấy những thứ trong giỏ hàng lên
app.get('/usercarts', function(req, res) {

	var id = req.query.id;
	User.findById(id, function(err, users) {
		if(err) throw err;

		res.send(users.shopcart);
	});
});
//cập nhật giỏ hàng 
app.put('/usercart', function(req, res) {
	var userData = req.body.userData;

	User.findById(userData.id, function(err, userCart) {
		if(err) {
			res.send(err);
		} else {

			userCart.shopcart = userData.shopcart;

			userCart.save(function(err, updatecart) {
				if(err) {
					res.send(err);
				} else {
					res.send({
						success: true,
						message: "Shopcart successfully updated"
					});
				}
			});
		}
	});
});

//lấy thông tin khách hàng bằng id
app.get('/user', function(req, res) {
	var id = req.query.userId;

	User.find({ _id: id }, function(err, user) {
		if(err) throw err;
		
		res.send(user[0]);
	});
});

module.exports = app;
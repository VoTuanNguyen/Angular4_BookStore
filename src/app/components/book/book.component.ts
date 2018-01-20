import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { UsercartService } from '../../services/usercart.service';

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
	// khai báo và khởi tạo các biến
	route;
	book;
	bookId;
	bookService;
	router;
	usercartService;
	shoppingCart: any = [];
	id;
	tempCart: any = [];

	static get parameters() {
		return [ActivatedRoute, BookService, Router, UsercartService];
	}

	constructor(route, bookService, router, usercartService) {
		this.route = route;
		this.bookService = bookService;
		this.router = router;
		this.usercartService = usercartService;
	}

	ngOnInit() {
		this.id = localStorage.getItem('currentUser');// lấy dữ liệu của currentUser
		if (!this.id) {//nếu chưa đăng nhập
			console.log("Chưa đăng nhập");
		} else {//đã đăng nhập
			this.usercartService.getAllCarts(this.id).subscribe(cartList => {// lấy danh sách những món trong giỏ hàng
				this.shoppingCart = cartList;
			});
		}
		this.route.params.subscribe(params => {
			this.bookId = params["id"];// nhận id sách từ trang home chuyển qua
			this.bookService.getBookById(this.bookId).subscribe(book => {// lấy dữ liệu sách từ csdl
				this.book = book;
				console.log(book);
			});
		});
	}
	//kiểm tra tồn tại của sách trong giỏ hàng
	checkItemExists(item) {
		for (var a = 0; a < this.shoppingCart.length; a++) {
			if (this.shoppingCart[a].item == item.title) {
				return true;
			}
		}
		return false;
	}
	//tiến hành thêm sách vào giỏ
	addToCart() {
		//nếu khách chưa đăng nhập thì không được dùng chức năng thêm hàng vào giỏ
		if (!this.id) {
			alert("Please login!");
			this.router.navigate(['/login']);// chuyển quan trang login để khách hàng đăng nhập
			return false;
		}
		console.log(this.shoppingCart);
		if (!this.checkItemExists(this.book)) {// nếu món hàng không tồn tại trong giỏ trước đó
			if (this.shoppingCart.length !== 0) {//nếu giỏ có sách trước đó
				this.tempCart = this.shoppingCart;//lấy tất cả sách đã có ở trước đó
				//thêm sách chưa tồn tại vào những vẫn giữ sách đã có trước đó
				let newItem = {
					item: this.book.title,
					quantity: 1,
					total: this.book.price
				}
				this.tempCart.push(newItem);
				//tiến hành khởi tạo biến lưu giá trị đã cập nhật và cập nhật lại csdl
				let userData = {
					id: this.id,
					shopcart: this.tempCart
				}
				this.usercartService.updateCart(userData).subscribe(res => {//tiến hành cập nhật
					alert(res.message);
					if (res.success) {
						this.router.navigate(["/home"]);//nếu thành công thì quay lại home
					}
				});
			} else {//nếu giỏ trống thì món hàng này sẽ là món hàng đầu tiên và có số lượng là 1
				let userData = {
					id: this.id,
					shopcart: [{
						item: this.book.title,
						quantity: 1,
						total: this.book.price
					}]
				}
				this.usercartService.updateCart(userData).subscribe(res => {// tiến hành lưu xuống csld
					alert(res.message);
					if (res.success) {
						this.router.navigate(["/home"]);
					}
				});
			}
		} else {//nếu sách đã tồn tại trong giỏ hàng
			this.tempCart = this.shoppingCart;
			for (var a = 0; a < this.tempCart.length; a++) {
				if (this.tempCart[a].item == this.book.title) {
					//cập nhật lại mảng tempcart
					this.tempCart[a].quantity += 1;
					this.tempCart[a].total += this.book.price;
				}
			}
			//tiến hành cập nhật
			let userData = {
				id: this.id,
				shopcart: this.tempCart
			}
			//cập nhật
			this.usercartService.updateCart(userData).subscribe(res => {//cập nhật
				alert(res.message);
				if (res.success) {
					this.router.navigate(["/home"]);// nếu thành công thì quay lại home
				} else {
					alert('Error! Please try again!');
				}
			});
		}
	}
}

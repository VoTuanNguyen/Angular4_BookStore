import { Component, OnInit } from '@angular/core';
import { UsercartService } from '../../services/usercart.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //Khai báo và khởi tạo các biến
  shoppingCart: any = [];
  tempCart: any = [];
	usercartService;
  total: number = 0;
  id;
  router;

	static get parameters() {
		return [UsercartService, Router];
	}

  constructor(usercartService, router) {
    this.usercartService = usercartService;
    this.router = router;
  }

  ngOnInit() {
    this.id = localStorage.getItem('currentUser');// lấy thông tin user đang đăng nhập
    if(!this.id){
      alert('Please login!');
      this.router.navigate(['/login']);
      return false;//nếu chưa đăng nhập thì dừng lại và chuyển sang trong login
    }
    this.usercartService.getAllCarts(this.id).subscribe(cartList => {// lấy danh sách các sách mà khách hàng đã thêm vào giỏ trước đó
      this.shoppingCart = cartList;
      for(var a = 0; a < this.shoppingCart.length; a++) {
        this.total += this.shoppingCart[a].total;
      }
  	});
  }

  emptyCart() {// xóa toàn bộ giỏ hàng
    let empty = {
      id: this.id,
      shopcart: []
    };
    this.usercartService.updateCart(empty).subscribe(result => {
      if(!result.success){
        alert("Could not clear cart!");
        this.total = 0;
        return;
      }
    });
    alert('Clear cart is successfully!');
    this.shoppingCart = [];//xóa cart list
  }
  //xóa 1 phần tử trong giỏ hàng
  deleteCart(item){
    this.tempCart = this.shoppingCart;
    for(var index = 0; index < this.tempCart.length; index++) {
      if(this.tempCart[index].item === item) {
        this.tempCart.splice(index, 1);//loại bỏ phần tử có có id bị xóa khỏi list
      }
    }
    let temp = {
      id: this.id,
      shopcart: this.tempCart
    }
    this.usercartService.updateCart(temp).subscribe(result => {
  		if(result.success) {//sau khi xóa thành công thì cập nhật lại bookList trên browser
        this.shoppingCart = this.tempCart;
        this.total = 0;
		for(var a = 0; a < this.shoppingCart.length; a++) {
			this.total += this.shoppingCart[a].total;//cập nhật lại giá tổng
		}
      } else {
        alert("Cart not successfully deleted");
      }
  	});
  }
}

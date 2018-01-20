import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UsercartService {
  //khai báo và khởi tạo các biến
  http: any;
  
  static get parameters() {
    return [Http];
  }
  constructor(http) {
  	this.http = http;
  }
  // đăng nhập
  signIn(userData){
    let searchUrl = "http://localhost:5000/login";
  	let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post(searchUrl, JSON.stringify({ userData: userData }), options).map(res => res.json());
  }
  // đăng ký
  signUp(userData){
    let searchUrl = "http://localhost:5000/register";
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post(searchUrl, JSON.stringify({ userData: userData }), options).map(res => res.json());
  }
  // lấy danh sách hàng trong giỏ 
  getAllCarts(id) {
    let searchUrl = "http://localhost:5000/usercarts?id="+id;
  	return this.http.get(searchUrl).map(res => res.json());
  }
  // cập nhật giỏ hàng
  updateCart(userData) {
    let searchUrl = "http://localhost:5000/usercart";
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.put(searchUrl, JSON.stringify({ userData: userData }), options).map(res => res.json());
  }
  // lấy thông tin user
  getUserByID(id) {
    let searchUrl = "http://localhost:5000/user?userId=" + id;
    return this.http.get(searchUrl).map(res => res.json());
  }
}

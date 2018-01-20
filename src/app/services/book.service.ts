import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BookService {
  //khai báo và khởi tạo các biến
  http: any;

	static get parameters() {
		return [Http];
	}

  constructor(http) {
  	this.http = http;
  }
  // lấy tất cả các sách trong csdl
  getAllBooks() {
    let searchUrl = "http://localhost:5000/books";
  	return this.http.get(searchUrl).map(res => res.json());
  }
  // lấy tt sách theo id
  getBookById(id) {
    let searchUrl = "http://localhost:5000/book?bookId=" + id;
    return this.http.get(searchUrl).map(res => res.json());
  }
  //xóa sách
  deleteBookById(id) {
    let searchUrl = "http://localhost:5000/book?bookId=" + id;
    console.log(id);
    return this.http.delete(searchUrl).map(res => res.json());
  }
  // thêm sách
  addBook(bookData) {
    let searchUrl = "http://localhost:5000/book";
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({
      headers: headers
    });
    console.log(JSON.stringify({ bookData: bookData }));
    return this.http.post(searchUrl, JSON.stringify({ bookData: bookData }), options).map(res => res.json());
  }
  // cập nhật sách
  updateBook(bookData) {
    let searchUrl = "http://localhost:5000/book";
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({
      headers: headers
    });

    return this.http.put(searchUrl, JSON.stringify({ bookData: bookData }), options).map(res => res.json());
  }
}

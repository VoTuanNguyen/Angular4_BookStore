import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  //khai báo và khởi tạo các biến
	title: string;
	author: string;
	publisher: string;
	price: string;
	category: string;
	description: string;
	cover: string;
  id: string;

	bookService: any;
	router;
  route;

  editMode: boolean = false;

	static get parameters() {
		return [BookService, ActivatedRoute, Router];
	}

	constructor(bookService, route, router) {
		this.bookService = bookService;
    this.route = route;
	  this.router = router;
	}

  ngOnInit() {
    this.route.params.subscribe(params => {//khởi tạo dữ liệu nếu là cập nhật lại sách
      if(params["bookId"]) {
        let bookId = params["bookId"];
        this.editMode = true;//cập nhật lại trạng thái là cập nhật dữ liệu
        console.log(this.editMode);
        this.bookService.getBookById(bookId).subscribe(book => {// lấy dữ liệu có id từ csdl cập nhật vào form
          this.id = book._id;
          this.title = book.title;
          this.author = book.author;
          this.publisher = book.publisher;
          this.price = book.price;
          this.category = book.category;
          this.description = book.description;
          this.cover = book.cover;
        });
      }
    });
  }

  addBook() {
    if(this.editMode) {//nếu đang ở trạng thái cập nhật thì ...
      let bookData = {// khởi tạo biến tạm
        id: this.id,
        title: this.title,
        author: this.author,
        publisher: this.publisher,
        price: this.price,
        category: this.category,
        description: this.description,
        cover:this.cover
      }

      this.bookService.updateBook(bookData).subscribe(result => {//tiến hành cập nhật sách
        if(result.success) {
          this.router.navigate(["/manage"]);//di chuyển về màn hình quản lý
          alert(result.message);
        }
      });
    } else {// thêm sách mới
      let bookData = {// khởi tạo biến tạm
        title: this.title,
        author: this.author,
        publisher: this.publisher,
        price: this.price,
        category: this.category,
        description: this.description,
        cover:this.cover
      }

      this.bookService.addBook(bookData).subscribe(res => {//tiến hành thêm sách
        if(res.success) {
          this.router.navigate(["/manage"]);//di chuyển về màn hình quản lý
          alert(res.message);
        } else {
          alert(res.message);
        }
      });
    }
  }

}

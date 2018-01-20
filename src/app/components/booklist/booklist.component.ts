import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  //khai báo và khởi tạo các biến
  bookService: any;
  bookList;
  router;

  static get parameters() {
    return [BookService, Router];
  }

  constructor(bookService, router) {
    this.bookService = bookService;
    this.router = router;
  }

  ngOnInit() {
    // lấy danh sách tất cả sách lên và đổ vào bookList
    this.bookService.getAllBooks().subscribe(bookList => {
      this.bookList = bookList;
    });
  }
}

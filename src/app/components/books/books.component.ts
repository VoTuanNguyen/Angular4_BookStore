import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
	bookService: any;
	bookList;
  router;

	static get parameters() {
		return [BookService, Router];
	}
  //khởi tạo các biến và map chúng với các hàm đã viết
  constructor(bookService, router) {
  	this.bookService = bookService;
    this.router = router;
  }

  ngOnInit() {
    //Lấy dữ liệu từ csdl
    this.bookService.getAllBooks().subscribe(bookList => {
      this.bookList = bookList;//cập nhật dữ liệu mới vào bookList để hiển thị trên browser
      console.log(this.bookList);
    });
  }

  deleteBook(id) {
    //tiến hành xóa sách khỏi csdl
  	this.bookService.deleteBookById(id).subscribe(result => {
  		if(result.success) {//sau khi xóa thành công thì cập nhật lại bookList trên browser
        for(var index = 0; index < this.bookList.length; index++) {
          if(this.bookList[index]._id == result.id) {
            this.bookList.splice(index, 1);//loại bỏ phần tử có có id bị xóa khỏi list
          }
        }       
      } else {
        alert("Book not successfully deleted");
      }
  	});
  }

  // editBook(id) {
  //   this.router.navigate(["/manage/book/add"], {// di chuyển qua trang sửa thông tin sách
  //     queryParams: {
  //       bookId: id//truyền id sách muốn cập nhật
  //     }
  //   });
  // }
}
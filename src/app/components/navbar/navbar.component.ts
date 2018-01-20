import { Component, OnInit } from '@angular/core';
import { UsercartService } from '../../services/usercart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //khai báo và khởi tạo các biến
  router;
  usercartService;
  name;
  flag = true;

	static get parameters() {
		return [ Router, UsercartService ];
  }
  constructor(router, usercartService) { 
    this.router = router;
    this.usercartService = usercartService;
  }
  
  ngOnInit() {
    let userID = localStorage.getItem('currentUser');// lấy biến được lưu trong localStorage
    if(userID){
      this.flag = false;// chuyển qua trạng thái là đã đăng nhập
      this.usercartService.getUserByID(userID).subscribe(res => {// lây thông tin user đang đăng nhập
        console.log(res);
        this.name = res.firstname+" "+res.lastname; 
      });
    }else{
      // this.router.navigate(["/login"]);
      return false;
    }
  }
  //đăng xuất
  logout(){
    //xóa biến lưu trong localStorage
    localStorage.clear();
    //quay lại trang login
    this.router.navigate(["/login"]);
  }

}

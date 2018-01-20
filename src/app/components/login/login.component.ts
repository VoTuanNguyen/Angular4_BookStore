import { Component, OnInit } from '@angular/core';
import { UsercartService } from '../../services/usercart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // khai báo và khởi tạo các biến
  model: any = {};
  loading = false;
  usercartService;
  router;
  route;

  static get parameters() {
		return [UsercartService, Router, ActivatedRoute];
  }
  
  constructor(usercartService, router, route) { 
    this.usercartService = usercartService;
    this.router = router;
    this.route = route
  }

  ngOnInit() {
    let id = localStorage.getItem('currentUser');// lấy thông tin user đang đăng nhập
    if(id){
      this.router.navigate(['/home']);// nếu đã đăng nhập thì sẽ chuyển sang trang home
    }
  }
  //hàm login
  login() {
    this.loading = true;
    let userData = {
      username: this.model.username,
      password: this.model.password
    }
    this.usercartService.signIn(userData).subscribe(res => {
      if(res.success){
        // lưu lại id của user khi đã đăng nhập
        localStorage.setItem('currentUser', res.user._id);
        this.router.navigate(["/home"]);
      }else{
        alert('Please check again!');
      }
    });
  }

}

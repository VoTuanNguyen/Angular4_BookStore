import { Component, OnInit } from '@angular/core';
import { UsercartService } from '../../services/usercart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //khai báo và khởi tạo các biến
  model: any = {};
  shopcart: any = [];
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
  }
  //tiến hành đăng ký 1 tài khỏa mới
  register() {
    this.loading = true;
    let userData = {
      firstname: this.model.firstName,
      lastname: this.model.lastName,
      username: this.model.username,
      password: this.model.password,
      shopcart: this.shopcart
    }
    this.usercartService.signUp(userData).subscribe(res => {
       if(res.success){
         console.log(userData);
         alert('Register is successfully!');
         this.router.navigate(['/login']);
       }else{
         alert('Error! Please try again!');
       }
    });
  }
}

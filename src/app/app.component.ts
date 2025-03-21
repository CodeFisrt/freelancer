import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Constant } from './core/constant/Constant';
import { ConstReadPipe } from './shared/pipes/const-read.pipe';
import { OrderApprovalStage, OrderStatus } from './core/enum/Enum';
import { FormsModule } from '@angular/forms';
import { UserService } from './core/services/user/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   @ViewChild("loginModal") loginModal! : ElementRef;
  orderObj: any  = {
    status: ''
  }
  loginObj: any = {
    "userName": "",
    "password": ""
  }
  loggedUserData: any;
  userServioce  = inject(UserService)

  constructor() {
    const localData =  localStorage.getItem(Constant.lOCAL_STRORAGE_KEYS.LOGGED_USER);
    if(localData != null) {
      this.loggedUserData = JSON.parse(localData)
    }
      this.orderObj.status = OrderApprovalStage.New;
  }
  openModel() {
    if(this.loginModal) {
      this.loginModal.nativeElement.style.display= "block"
    }
  }
  closeModel() {
    if(this.loginModal) {
      this.loginModal.nativeElement.style.display= "none"
    }
  }

  onLogin() {
    this.userServioce.login(this.loginObj).subscribe((res:any)=>{
      if(res.result) {
        this.loggedUserData =  res.data;
        localStorage.setItem(Constant.lOCAL_STRORAGE_KEYS.LOGGED_USER,JSON.stringify(res.data));
        this.closeModel();
      } else {
        alert(res.message)
      }
    })
  }
  onLogooff() {
    localStorage.removeItem(Constant.lOCAL_STRORAGE_KEYS.LOGGED_USER);
    this.loggedUserData =  undefined;
  }
}

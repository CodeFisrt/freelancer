import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { UserRegister } from '../../core/models/class/User';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { IAPIResponce } from '../../core/models/interface/Master';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  name: string = '';
 

  registerObj: UserRegister =  new UserRegister();
  userService= inject(UserService);

  onRegisterUser(form:NgForm) {
    debugger;
    if(!form.invalid) {
      this.userService.registerUser(this.registerObj).subscribe((res:IAPIResponce)=>{
        if(res.result) {
          alert("User Created")
        } else {
          alert(res.message)
        }
      })
    } 
  }

 


}

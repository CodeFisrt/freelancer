import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { UserRegister } from '../../core/models/class/User';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { IAPIResponce } from '../../core/models/interface/Master';
import { JobService } from '../../core/services/job/job.service';
import { JsonPipe } from '@angular/common';
import { SanitizePipe } from '../../shared/pipes/sanitize.pipe';

@Component({
  selector: 'app-home',
  imports: [FormsModule,JsonPipe,SanitizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{

  name: string = '';
  data: any;

  registerObj: UserRegister =  new UserRegister();
  userService= inject(UserService);
  jpobService= inject(JobService);

  ngOnInit(): void {
    this.jpobService.getJobById().subscribe((res:any)=>{
      debugger;
      this.data =  res.data;
    })
  }

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

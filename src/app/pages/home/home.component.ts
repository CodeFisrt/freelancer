import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserRegister } from '../../core/models/class/User';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { IAPIResponce, IJobListAPIResponce, JobList } from '../../core/models/interface/Master';
import { JobService } from '../../core/services/job/job.service';
import { JsonPipe } from '@angular/common';
import { SanitizePipe } from '../../shared/pipes/sanitize.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [FormsModule,JsonPipe,SanitizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit,OnDestroy{

  name: string = '';
  jobList: JobList[] = [];
  registerObj: UserRegister =  new UserRegister();
  userService= inject(UserService);
  jobService= inject(JobService);
  subscriptions:Subscription[] = [];

  ngOnInit(): void {
    this.getAllJobs();
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

  getAllJobs(){
    this.subscriptions.push(
    this.jobService.getAllJobs().subscribe((res:JobList[])=>{
      debugger;
      this.jobList =  res;
    }));
  }

  ngOnDestroy():void{
    this.subscriptions.forEach(element =>{
      element.unsubscribe();
    })
  }


}

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
  imports: [FormsModule,JsonPipe,SanitizePipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit,OnDestroy{
  @ViewChild("bidModel") loginModal! : ElementRef;
  name: string = '';
  jobList: JobList[] = [];
  registerObj: UserRegister =  new UserRegister();
  userService= inject(UserService);
  jobService= inject(JobService);
  subscriptions:Subscription[] = [];
  currentSelectedJob:any;

  bidObj: any ={
    "bidId": 0,
    "projectId": 0,
    "userId": 0,
    "bidAmount": 1,
    "estimatedDays": 365,
    "proposalText": "string",
    "status": "New",
    "createdDate":  new Date()
  }

  ngOnInit(): void {
    
    this.getAllJobs();
  }
  onApplay(jobDetails: any) {
    this.currentSelectedJob =  jobDetails;
    this.bidObj.projectId =   this.currentSelectedJob.projectId;
    this.bidObj.userId = this.userService.loggedUserData.userId;
    if(this.userService.loggedUserData == undefined) {
      alert("Do Login First To BID")
    } else {
      this.openModel();
    }
  }

  onSaveBid() {
    debugger;
    this.jobService.applyBid(this.bidObj).subscribe((res:any)=>{
      alert("Bid Placed Success");
      this.bidObj = {
        "bidId": 0,
        "projectId": 0,
        "userId": 0,
        "bidAmount": 1,
        "estimatedDays": 365,
        "proposalText": "",
        "status": "New",
        "createdDate":  new Date()
      }
    })
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
  onRegisterUser(form:NgForm) {
    
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
      
      this.jobList =  res;
    }));
  }

  ngOnDestroy():void{
    this.subscriptions.forEach(element =>{
      element.unsubscribe();
    })
  }


}

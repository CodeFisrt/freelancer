import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Constant } from '../../core/constant/Constant';
import { UserService } from '../../core/services/user/user.service';
import { JobService } from '../../core/services/job/job.service';
import { EditorModule } from 'primeng/editor';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IJobListAPIResponce } from '../../core/models/interface/Master';
@Component({
  selector: 'app-new-job',
  imports: [ReactiveFormsModule,EditorModule,DatePickerModule,ToastModule],
  templateUrl: './new-job.component.html',
  styleUrl: './new-job.component.css',
  providers:[MessageService]
})
export class NewJobComponent {

  fromBuilder = inject(FormBuilder);
  newJobForm: FormGroup = new FormGroup({});
  userService = inject(UserService);
  jobService = inject(JobService)
  
constructor(private messageService: MessageService) {
  this.iniitalizeForm();
}

  iniitalizeForm() {
   this.newJobForm = this.fromBuilder.group({
      projectId :new FormControl(0),
      userId:new FormControl(this.userService.loggedUserData.userId),
      title:new FormControl(""),
      description:new FormControl(""),
      budget:new FormControl(""),
      deadline:new FormControl(""),
      skillsRequired:new FormControl(""),
      status:new FormControl("Live"),
      createdDate:new FormControl(new Date())
    })
    debugger;
  }

  onSave() {
    const formValue =  this.newJobForm.value;
    this.jobService.newJob(formValue).subscribe((res:IJobListAPIResponce)=>{
      if(res.success){
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'New Job Created', life: 3000 });
        this.iniitalizeForm();
      }else{
        alert("Something Went Wrong");
      }
    })
  }

}

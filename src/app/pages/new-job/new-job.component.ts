import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-job',
  imports: [ReactiveFormsModule],
  templateUrl: './new-job.component.html',
  styleUrl: './new-job.component.css'
})
export class NewJobComponent {

  fromBuilder = inject(FormBuilder);
  newJobForm: FormGroup = new FormGroup({});

constructor() {
  this.iniitalizeForm();
}

  iniitalizeForm() {
    this.fromBuilder.group({
      projectId :new FormControl(0),
      userId:new FormControl(""),
      title:new FormControl(""),
      description:new FormControl(""),
      budget:new FormControl(""),
      deadline:new FormControl(""),
      skillsRequired:new FormControl(""),
      status:new FormControl(""),
      createdDate:new FormControl(new Date())
    })
  }

}

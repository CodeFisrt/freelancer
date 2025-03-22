import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { JobService } from '../../core/services/job/job.service';
import { JobList } from '../../core/models/interface/Master';
import { UserService } from '../../core/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit, OnDestroy {

  jobService = inject(JobService);
  userService = inject(UserService);
  jobList: JobList[] = [];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getAllJobsUserId();
  }

  getAllJobsUserId() {
    const userId = this.userService.loggedUserData.userId;
    this.subscriptions.push(
      this.jobService.getAllJobsByUserId(userId).subscribe((res: JobList[]) => {
        this.jobList = res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    })
  }
}

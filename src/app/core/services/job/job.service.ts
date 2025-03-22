import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constant/Constant';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

 ///api/FreelancerJobs/CreateNewProjectJob

  newJob(obj:any):Observable<any> {
    return this.http.post<any>(environment.API_URL+ Constant.API_METHOD_NAME.JOB.CREATE_NEW_JOB,obj)
  }

  getJobById():Observable<any> {
    return this.http.get<any>(environment.API_URL+ Constant.API_METHOD_NAME.JOB.GET_JOB_BY_ID)
  }
}

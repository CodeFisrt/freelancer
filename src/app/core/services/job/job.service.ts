import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constant/Constant';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IJobListAPIResponce, JobList } from '../../models/interface/Master';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }


  
  newJob(obj:any):Observable<IJobListAPIResponce> {
    return this.http.post<IJobListAPIResponce>(environment.API_URL+ Constant.API_METHOD_NAME.JOB.CREATE_NEW_JOB,obj)
  }

  getJobById():Observable<JobList> {
    return this.http.get<JobList>(environment.API_URL+ Constant.API_METHOD_NAME.JOB.GET_JOB_BY_ID)
  }
  
  getAllJobs(): Observable<JobList[]> {
    debugger;
    return this.http.get<IJobListAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.JOB.GET_ALL_JOBS).pipe(
      map((response: any) => {
        debugger;
        return response.data;
      })
    );
  }

  getAllJobsByUserId(userId:number):Observable<JobList[]>{
    return this.http.get<IJobListAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.JOB.GET_ALL_JOBS_BY_USERID+userId).pipe(
      map((response:any) =>{
        return response.data;
      })
    )
  }

  
}

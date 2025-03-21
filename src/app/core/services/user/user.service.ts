import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponce, UserList } from '../../models/interface/Master';
import { environment } from '../../../../environments/environment';
import { Constant } from '../../constant/Constant';
import { UserRegister } from '../../models/class/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getOriginalData(): Observable<IAPIResponce> {
    debugger;
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS)
  }

  login(obj:any): Observable<IAPIResponce> {
    debugger;
    return this.http.post<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.LOGIN,obj)
  }

  getAllUsers(): Observable<UserList[]> {
    debugger;
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS).pipe(
      map((response:any)=>{
        debugger;
        return response.data;
      })
    );
  }

  getAllUsers2(): Observable<UserList[]> {
    debugger;
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS).pipe(
      map((response:any)=>{
        debugger;
        const array = response.data;
        return array.map((res:UserList)=>{
          return {
            userId:res.userId,
            userName: res.userName
          }
        }) 
      })
    );
  }

  getAllUsers3(): Observable<UserList[]> { 
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS).pipe(
      map(response => response.data.map(({ userId, userName }: UserList) => ({ userId, userName })))
    );
  }

  registerUser(obj: UserRegister) : Observable<IAPIResponce>{
    return this.http.post<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.CREATE_USER,obj)
  }
}

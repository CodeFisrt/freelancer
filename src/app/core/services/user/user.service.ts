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

  loggedUserData: any;
  constructor(private http: HttpClient) { 
    const localData = localStorage.getItem(Constant.lOCAL_STRORAGE_KEYS.LOGGED_USER);
    if (localData) {
      this.loggedUserData = JSON.parse(localData)
    }
  }

  getOriginalData(): Observable<IAPIResponce> {
    
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS)
  }

  login(obj: any): Observable<IAPIResponce> {
    
    return this.http.post<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.LOGIN, obj)
  }

  getAllUsers(): Observable<UserList[]> {
    
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS).pipe(
      map((response: any) => {
        
        return response.data;
      })
    );
  }

  getAllUsers2(): Observable<UserList[]> {
    
    return this.http.get<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.GET_ALL_USERS).pipe(
      map((response: any) => {
        
        const array = response.data;
        return array.map((res: UserList) => {
          return {
            userId: res.userId,
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

  registerUser(obj: UserRegister): Observable<IAPIResponce> {
    return this.http.post<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.CREATE_USER, obj)
  }

  updateUser(obj: UserRegister): Observable<IAPIResponce> {
    return this.http.post<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.UPDATE_USER, obj)
  }

  deleteUser(userId: number): Observable<IAPIResponce> {
    return this.http.delete<IAPIResponce>(environment.API_URL + Constant.API_METHOD_NAME.USER.DELETE_USER + userId)
  }
}

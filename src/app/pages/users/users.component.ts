import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { IAPIResponce, UserList } from '../../core/models/interface/Master';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { UserRegister } from '../../core/models/class/User';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, NgIf, JsonPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {
  date: any;
userService = inject(UserService);
userList: UserList[] = [];
subScriptions: Subscription[]= []; 

  userList$: Observable<UserList[]> = new Observable<UserList[]>();
  userListResposne$: Observable<IAPIResponce> = new Observable<IAPIResponce>();
  userDat: any;

  Updateform!: FormGroup | any;


  constructor() {
    this.userList$ = this.userService.getAllUsers();
    this.getTableData();
    this.initializeForm();
  }

  ngOnInit(): void {
    
    const data = this.userService.getAllUsers().subscribe((res: UserList[]) => {
      
      this.userList = res;
    })
    this.subScriptions.push(data);

    this.subScriptions.push(
      this.userService.getAllUsers2().subscribe((res: UserList[]) => {
        
        this.userList = res;
      })
    )
  }

  initializeForm(item?: UserList) {
    this.Updateform = new FormGroup({
      userId: new FormControl<number>(item ? item.userId : 0),
      userName: new FormControl<string>(item ? item.userName : '', [Validators.required, Validators.minLength(5)]),
      emailId: new FormControl<string>(item ? item.emailId : '', [Validators.required, Validators.email]),
      fullName: new FormControl<string>(item ? item.fullName : '', [Validators.required, Validators.minLength(5)]),
      role: new FormControl(item?.role),
      createdDate: new FormControl(item?.createdDate),
      password: new FormControl(item?.password),
      projectName: new FormControl(item?.projectName),
      refreshToken: new FormControl(item?.refreshToken),
      refreshTokenExpiryTime: new FormControl(item?.refreshTokenExpiryTime)
    });
  }

  getTableData() {
    this.userListResposne$ = this.userService.getOriginalData();
  }


  onEdit(user: UserList) {
    
    this.initializeForm(user);
  }

  onUpdate() {
    this.subScriptions.push(
    this.userService.updateUser(this.Updateform.value).subscribe((res: IAPIResponce) => {
      if (res.result) {
        alert(res.message)
        this.getTableData()
        this.initializeForm()
      } else {
        alert(res.message)
      }
    })
    )
  }

  onDelete(userId: number) {
    this.subScriptions.push(
    this.userService.deleteUser(userId).subscribe((res: IAPIResponce) => {
      if (res.result) {
        alert(res.message)
        this.getTableData();
      } else {
        alert(res.message)
      }
    })
   )
  }
  ngOnDestroy(): void {
    this.subScriptions.forEach(element => {
      element.unsubscribe()
    });
  }

}



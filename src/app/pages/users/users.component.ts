import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { IAPIResponce, UserList } from '../../core/models/interface/Master';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { AgGridAngular, AgGridModule } from '@ag-grid-community/angular'; 
import type { ColDef, ColGroupDef } from 'ag-grid-community'; // Column Definition Type Interface 


@Component({
  selector: 'app-users',
  imports: [AsyncPipe,NgIf,JsonPipe,DatePickerModule,FormsModule,AgGridModule],
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
minDate: Date | undefined;
maxDate: Date | undefined;
// columnDefs: (ColDef | ColGroupDef)[] = [
//   { field: "userName" },
//   { field: "fullName"},
//   { field: "emailId"} 
// ];
 
 

constructor() {
  this.minDate = new Date();
  let today = new Date();
  this.maxDate = new Date();
  let month = today.getMonth();
  this.maxDate = new Date();
  let nextMonth = (month === 11) ? 0 : month + 1;
  this.maxDate.setMonth(nextMonth); 
  this.userList$ =  this.userService.getAllUsers();
  this.userListResposne$ =  this.userService.getOriginalData();
}

ngOnInit(): void {
  debugger; 
  const data = this.userService.getAllUsers().subscribe((res:UserList[])=>{
    debugger;
    this.userList =  res;
  })
  this.subScriptions.push(data);

  this.subScriptions.push(
    this.userService.getAllUsers2().subscribe((res:UserList[])=>{
      debugger;
      this.userList =  res;
    })
  ) 
}
ngOnDestroy(): void {
  this.subScriptions.forEach(element => {
    element.unsubscribe()
  });
}

}



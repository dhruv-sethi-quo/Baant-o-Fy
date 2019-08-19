import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserGroups } from 'src/app/core/model/usergroups.model';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public userGroups: Array<UserGroups>;
  public currentGroup: UserGroups;
  public currentAmount = 0;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getAllGroups().pipe(
      catchError((err) => {
        if(err instanceof HttpErrorResponse){
          alert(err.error.msg);
        return throwError(err.error.msg);
      }
      })
    )    
    .subscribe((data)=>{
      if(data){
        this.userGroups = data.data;
        this.currentGroup = this.userGroups[0];
        this.currentAmount = this.calculateSum(this.currentGroup.billObjects);
        console.log(this.currentGroup);
        debugger;
      }
    });
  }

  calculateSum(bills: Array<any>){
    let sum = 0;
        bills.forEach(bill=>{
          sum+= bill.amount;
        });
    return sum;
  }

  loadGroup(groupId: string){
    this.userGroups.forEach(groupData=>{
      if(groupData._id==groupId){
        this.currentGroup = groupData;
        this.currentAmount = this.calculateSum(this.currentGroup.billObjects);
        console.log("data is",groupData);
      }
    });
  }
}
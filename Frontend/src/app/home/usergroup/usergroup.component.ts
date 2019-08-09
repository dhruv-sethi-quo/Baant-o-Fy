import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.scss']
})
export class UsergroupComponent implements OnInit {

  createGroupform: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createGroupform = new FormGroup({
      groupName: new FormControl(),
      participants: new FormControl()
    });
  }

  onSubmit(){
    let participants = this.createGroupform.value.participants.split(',');
    if(participants.length>0){
      this.userService.createGroup(this.createGroupform.value.groupName, participants )
      .pipe(
        catchError((err) => {
          if(err instanceof HttpErrorResponse){
            alert(err.error.msg);
          return throwError(err.error.msg);
        }
        })
      )
      .subscribe((success)=>{
        alert(success.msg);
        this.router.navigate(['/home']);      
      });
    }
    else
      alert("Participants cannot be empty");
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  @ViewChild('frame', {static:true}) passwordModal : ModalDirective;

  changePasswordForm: FormGroup;

  constructor(private user: UserService) { }

  currentUser: any;

  showModal(){
    this.passwordModal.show();
  }

  onSubmit(){
    this.passwordModal.hide();
    const info={
      "currentPassword" : this.changePasswordForm.value.currentPassword,
      "newPassword" : this.changePasswordForm.value.newPassword
    };
    debugger;
    if(this.changePasswordForm.value.newPassword===this.changePasswordForm.value.confirmPassword){
      this.user.changePassword(info).pipe(
        catchError((err) => {
          if(err instanceof HttpErrorResponse){
            alert(err.error.msg);
          return throwError(err.error.msg);
        }
        })
      )    
      .subscribe((data)=>{
        alert(data.msg);
      });
    }
  }

  ngOnInit() {

    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('',Validators.required),
      newPassword: new FormControl('',[Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('',Validators.required)
    });


    this.user.getUser().pipe(
      catchError((err) => {
        if(err instanceof HttpErrorResponse){
          alert(err.error.msg);
        return throwError(err.error.msg);
      }
      })
    )    
    .subscribe((data)=>{
      this.currentUser = data.data[0];
      debugger;
    });
  }

}

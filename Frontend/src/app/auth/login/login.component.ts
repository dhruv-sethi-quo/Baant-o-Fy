import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserManagementService } from 'src/app/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { LoginCheckService } from 'src/app/core/services/login-check.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private data: UserManagementService, private router: Router,
    private loginCheckService: LoginCheckService ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl(),
      loginPassword: new FormControl(),
    });
  }

  onSubmit() {
    this.data.loginUser(
      this.loginForm.value.loginEmail, this.loginForm.value.loginPassword
    ).pipe(
      catchError((err) => {
        if(err instanceof HttpErrorResponse){
          alert(err.error.msg);
        return throwError(err.error.msg);
      }
      })
    )
      .subscribe((success) => {
        alert(success.msg);
        localStorage.setItem('access-token',success.data);
        this.loginCheckService.loggedIn=true;
        this.router.navigate(['/home']);
      });
    }

}

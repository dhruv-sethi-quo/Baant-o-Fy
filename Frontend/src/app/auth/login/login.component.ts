import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserManagementService } from 'src/app/user-management.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private data: UserManagementService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl(),
      loginPassword: new FormControl(),
    });
  }

  onSubmit() {
    console.warn('licked')
    this.data.loginUser(
      this.loginForm.value.loginEmail, this.loginForm.value.loginPassword
    ).pipe(catchError(err => of(`Some error occured ${err}`)))
      .subscribe(success => this.router.navigate(['/home']));
  }

}

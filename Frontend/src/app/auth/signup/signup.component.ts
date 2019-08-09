import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserManagementService } from 'src/app/auth/auth.service';
import { User } from 'src/app/core/model/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  user: User = new User();

  constructor(private data: UserManagementService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    this.user.name = this.signupForm.value.first_name + " " + this.signupForm.value.last_name;
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.data.signup(this.user).pipe(
      catchError((err) => {
        console.log("error");
        return throwError(err.msg);
      })
    )
      .subscribe((success) => {
        console.log("success")
        alert(success.msg);
        this.router.navigate(['/auth/login']);
      });
  }

}

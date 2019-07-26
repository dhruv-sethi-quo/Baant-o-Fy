import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/user-management.service';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(private data: UserManagementService, private router: Router) { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      email : new FormControl()
    });
  }

  onSubmit(){
    this.data.forgotPassword(
      this.forgotForm.value.email).pipe(catchError(err => of(`Some error occured ${err}`)))
      .subscribe(success => {
        alert("An email as been sent with further instructions.");
        this.router.navigate(['/auth']);
      });      
  }

}

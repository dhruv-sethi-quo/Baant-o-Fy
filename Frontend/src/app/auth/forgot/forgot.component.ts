import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/user-management.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(private data: UserManagementService) { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      email : new FormControl()
    });
  }

  onSubmit(){
    this.data.forgotPassword(this.forgotForm.value.email);
  }

}

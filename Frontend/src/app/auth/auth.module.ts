import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from '../shared/shared.module';
import { ForgotComponent } from './forgot/forgot.component';
import { User } from '../core/model/user.model';

@NgModule({
  declarations: [ForgotComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }

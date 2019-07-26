import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import { ForgotComponent } from './forgot/forgot.component';

const authRoutes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'forgot', component: ForgotComponent },
            { path: '', redirectTo: 'login' }
        ]
    }
];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(authRoutes)],
    declarations: [LoginComponent, SignupComponent, AuthComponent],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
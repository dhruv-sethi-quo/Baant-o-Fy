import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { User } from './core/model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(username: string, password: string){
    return this.http.post('http://localhost:8090/login',JSON.stringify({user:username, pass: password}));
  
  }

  forgotPassword(email: string){
    console.log(email);
  }

  signup(user: User){
    this.http.post('http://localhost:8090/signup', user, {
      headers: new HttpHeaders().append( 'Content-Type', 'application/x-www-form-urlencoded')
    })
    .subscribe(data =>{
      window.alert('Registered user');
      this.router.navigate(['auth/login']);
    },(error)=> {
      console.log(error);
    });
  }
}

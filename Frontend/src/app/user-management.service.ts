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
    return this.http.post('http://localhost:8090/login',JSON.stringify({userName:username, userPassword: password}));
  
  }

  forgotPassword(email: string){
    return this.http.post('http://localhost:8090/forgot',JSON.stringify({userEmail: email}));
  }

  signup(user: User){
    return this.http.post('http://localhost:8090/signup', user, {
      headers: new HttpHeaders().append( 'Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}

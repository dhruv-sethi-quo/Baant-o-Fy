import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { User } from '../core/model/user.model';
import { Router } from '@angular/router';
import { ApiResponse } from '../core/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(username: string, password: string){
    const loginUser = {
      email:username,
      password: password
    };
    return this.http.post<ApiResponse<any>>('http://localhost:8090/auth/login',loginUser);
  
  }

  forgotPassword(email: string){
    return this.http.post('http://localhost:8090/auth/forgot',{userEmail: email});
  }

  signup(user: User){
    return this.http.post<ApiResponse<any>>('http://localhost:8090/auth/signup', user, {
      headers: new HttpHeaders().append( 'Content-Type', 'application/json')
    });
  }
}

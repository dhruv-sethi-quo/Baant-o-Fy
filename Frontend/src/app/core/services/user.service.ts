import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/response.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllGroups(){
    return this.http.get<ApiResponse<any>>('http://localhost:8090/api/getusergroups')
  }

  createGroup(name, participants){
    const obj = {
      name: name,
      participants: participants
    };
    return this.http.post<ApiResponse<any>>('http://localhost:8090/api/creategroup',obj);
  }
}

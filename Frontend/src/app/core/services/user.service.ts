import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/response.model';
import { GroupBills } from '../model/groupbills.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL='http://localhost:8090/api/';

  constructor(private http: HttpClient) {}

  getAllGroups(){
    return this.http.get<ApiResponse<any>>(this.apiURL+'getusergroups');
  }

  getDebts(){
    return this.http.get<ApiResponse<any>>(this.apiURL+'getdebts');
  }

  getUser(){
    return this.http.get<ApiResponse<any>>(this.apiURL+'getuser');
  }

  changePassword(info: any){
    return this.http.post<ApiResponse<any>>(this.apiURL+'changepassword',info);
  }

  createBill(bill: GroupBills){
    console.log("bill is",bill);
    return this.http.post<ApiResponse<any>>(this.apiURL+'createbill', bill);
  }

  deleteBill(billId: String){
    console.log("deleteBill called with: ",billId);
    return this.http.post<ApiResponse<any>>(this.apiURL+'deletebill',{id: billId});
  }

  createGroup(name, participants){
    const obj = {
      name: name,
      participants: participants
    };
    return this.http.post<ApiResponse<any>>(this.apiURL+'creategroup',obj);
  }
}

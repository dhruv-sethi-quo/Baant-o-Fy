import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/response.model';
import { GroupBills } from '../model/groupbills.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllGroups(){
    return this.http.get<ApiResponse<any>>('http://localhost:8090/api/getusergroups');
  }


  createBill(bill: GroupBills){
    console.log("bill is",bill);
    return this.http.post<ApiResponse<any>>('http://localhost:8090/api/createbill', bill);
  }

  deleteBill(billId: String){
    console.log("deleteBill called with: ",billId);
    return this.http.post<ApiResponse<any>>('http://localhost:8090/api/deletebill',{id: billId});
  }

  createGroup(name, participants){
    const obj = {
      name: name,
      participants: participants
    };
    return this.http.post<ApiResponse<any>>('http://localhost:8090/api/creategroup',obj);
  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { UserService } from 'src/app/core/services/user.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  @ViewChild('frame', {static:true}) billModal : ModalDirective;

  @Input() bills: Array<any>;

  public currentBill: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  deleteBill(bill: any){
    this.currentBill = bill;
    this.billModal.show();
  }

  onDelete(billId: string){
    this.billModal.hide();
    this.userService.deleteBill(billId).pipe(
      catchError((err) => {
        if(err instanceof HttpErrorResponse){
          alert(err.error.msg);
        return throwError(err.error.msg);
      }
      })
    )    
    .subscribe((data)=>{
      alert(data.msg);
      console.log(data.msg);
    });
  }


  getParticipants(participants: any, createdBy: String){
    return participants.filter(participant=>{
      return participant.name!=createdBy;
    });
  }

}

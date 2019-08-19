import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GroupBills } from 'src/app/core/model/groupbills.model';
import { UserService } from 'src/app/core/services/user.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-billmodal',
  templateUrl: './billmodal.component.html',
  styleUrls: ['./billmodal.component.scss']
})
export class BillmodalComponent implements OnInit {

  @ViewChild('frame', {static:true}) billModal : ModalDirective;

  @Input() currentGroup: any;

  createBillForm: FormGroup;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.createBillForm = new FormGroup({
      billName : new FormControl(),
      amount: new FormControl(),
      paidBy: new FormControl(),
      participants: new FormControl()
    });
  }

  showAndHideModal(){
    this.billModal.show();
  }

  onSubmit(){
    this.billModal.hide();
    const bill = new GroupBills();
    bill.participants = this.createBillForm.value.participants.split(",");
    bill.groupId = this.currentGroup._id;
    bill.name = this.createBillForm.value.billName;
    bill.paidBy = this.createBillForm.value.paidBy;
    bill.amount = this.createBillForm.value.amount;

    this.service.createBill(bill).pipe(
      catchError((err) => {
        if(err instanceof HttpErrorResponse){
          alert(err.error.msg);
        return throwError(err.error.msg);
      }
      })
    )
    .subscribe((success) => {
      this.router.navigate(['/home']);
    });
  }

}

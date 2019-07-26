import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from "angular-bootstrap-md";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MDBBootstrapModule
  ],
  exports: [
    MDBBootstrapModule
  ]
})
export class MaterialModule { }

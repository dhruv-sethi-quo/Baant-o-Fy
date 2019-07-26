import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    NavBarComponent, FooterComponent, MaterialModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }

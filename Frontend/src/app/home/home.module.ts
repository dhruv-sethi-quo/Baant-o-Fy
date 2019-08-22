import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { ProfileComponent } from './profile/profile.component';
import { ParticipantsComponent } from './homepage/participants/participants.component';
import { BillmodalComponent } from './homepage/billmodal/billmodal.component';
import { UsergroupsComponent } from './homepage/usergroups/usergroups.component';
import { BillsComponent } from './homepage/bills/bills.component';
import { DebtComponent } from './debt/debt.component';

@NgModule({
  declarations: [HomepageComponent, CreategroupComponent, ProfileComponent, ParticipantsComponent, BillmodalComponent, UsergroupsComponent, BillsComponent, DebtComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [HomepageComponent, UsergroupComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path:'', component: HomepageComponent },
  { path:'creategroup', component: UsergroupComponent },
  { path:'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

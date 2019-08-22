import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { ProfileComponent } from './profile/profile.component';
import { DebtComponent } from './debt/debt.component';


const routes: Routes = [
  { path:'', component: HomepageComponent },
  { path:'creategroup', component: CreategroupComponent },
  { path:'profile', component: ProfileComponent },
  { path:'settleup', component: DebtComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

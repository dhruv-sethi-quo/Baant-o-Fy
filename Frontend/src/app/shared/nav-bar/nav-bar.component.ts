import { Component, OnInit } from '@angular/core';
import { LoginCheckService } from 'src/app/core/services/login-check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private loginCheckService: LoginCheckService, private router: Router) { }
  
  checker:boolean;

  ngOnInit() {
    if(localStorage.getItem("access-token")){
      this.checker=true;
    }
    console.log(this.loginCheckService.loggedIn);
  }

  logout(){
    this.loginCheckService.loggedIn = false;
    localStorage.removeItem('access-token');
    this.router.navigate(['/']);
  }

}

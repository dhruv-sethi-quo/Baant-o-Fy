import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserGroups } from 'src/app/core/model/usergroups.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllGroups().subscribe((data)=>{
      if(data)
        alert("data exists!");
    });
  }

}

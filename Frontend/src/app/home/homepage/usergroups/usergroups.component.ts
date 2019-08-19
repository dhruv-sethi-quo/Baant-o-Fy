import { Component, OnInit, Input } from '@angular/core';
import { HomepageComponent } from '../homepage.component';

@Component({
  selector: 'app-usergroups',
  templateUrl: './usergroups.component.html',
  styleUrls: ['./usergroups.component.scss']
})
export class UsergroupsComponent implements OnInit {

  @Input() userGroups: Array<any>;

  constructor(private homepage: HomepageComponent) { }

  ngOnInit() {
  }

  getGroup(groupId: string){
    this.homepage.loadGroup(groupId);
  }

}

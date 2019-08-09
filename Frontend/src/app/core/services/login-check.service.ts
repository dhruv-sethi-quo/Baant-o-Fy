import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckService {

  loggedIn: boolean = false;

  constructor() { }
}

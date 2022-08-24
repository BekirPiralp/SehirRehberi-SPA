import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  drppp() {
    if (document.getElementById('drp')!.style.display !== 'block') {
      document.getElementById('drp')!.style.display = 'block';
      document.getElementById('drp')!.style.zIndex = '1';
      document.getElementById('drp')!.style.position = 'absolute';
      document.getElementById('drp')!.style.top = '100%';
      document.getElementById('drp')!.style.left = '100%';
    } else {
      document.getElementById('drp')!.style.display = 'none';
    }
  }

  loginUser: any = {};

  login() {
    this._authService.login(this.loginUser);
  }

  logOut() {
    this._authService.logOut();
  }

  get isAuthenticated() {
    return this._authService.loggedIn();
  }
}

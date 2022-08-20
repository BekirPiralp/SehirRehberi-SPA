import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';

const TOKEN_KEY: string = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _alertifyService: AlertifyService
  ) {}

  path: string = 'https://localhost:7084/api/';
  private _userToken: any;
  private set userToken(val: typeof this._userToken) {
    this._userToken = val;
    localStorage.setItem(TOKEN_KEY, val);
  }
  public get userToken() {
    this._userToken = localStorage.getItem(TOKEN_KEY)
    return this._userToken;
  }

  decodeToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http
      .post(this.path + 'Auth/login', loginUser, { headers: headers })
      .subscribe((data) => {
        this.userToken = data;
        this.decodeToken = this.jwtHelper.decodeToken(data.toString());
        this._alertifyService.basarili('Sisteme giriş yapıldı.');
        this._router.navigateByUrl('/city');
      });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http
      .post(this.path + 'Auth/register', registerUser, { headers: headers })
      .subscribe((data) => {
        this._alertifyService.basarili('Kullanıcı başarılı şekilde kaydedildi');
        this._router.navigateByUrl('/city');
      });
  }

  saveToken(token: typeof this._userToken) {
    this.userToken = token;
  }

  logOut(){
    localStorage.removeItem(TOKEN_KEY);
  }

  loggedIn(){
    return tokenNotExpired(TOKEN_KEY);
  }

  getCurrentUserId(){
    return this.jwtHelper.decodeToken(this.userToken).nameId;
  }
}

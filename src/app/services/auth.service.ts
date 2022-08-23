import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';
//import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { JwtHelper } from 'angular2-jwt';

const jwtHelper = new JwtHelperService();

const TOKEN_KEY: string = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _alertifyService: AlertifyService
  ) {
    this.userToken = undefined;
  }
  //private jwtHelper:JwtHelper = new JwtHelper();

  path: string = 'https://localhost:7084/api/';
  private _userToken: string | undefined;

  private set userToken(val: typeof this._userToken) {
    this._userToken = val;
    localStorage.setItem(TOKEN_KEY, val!);
  }
  public get userToken() {
    this._userToken = localStorage.getItem(TOKEN_KEY)?.toString();
    return this._userToken;
  }

  decodeToken: any;

  login(loginUser: LoginUser) {
    let headers : HttpHeaders = new HttpHeaders();
    headers=headers.append("Content-Type","application/json");
    
    this.http.post(this.path + 'Auth/login', loginUser,{
      headers:headers
    }
    ).subscribe((data) => {
      console.log("%cGiriş yapılıyor...","color:green;"); //%c ile yanında optionalparam olarak verilen style'lar işleniyor
      this.userToken = data.toString()
      this.decodeToken = jwtHelper.decodeToken(data.toString());
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

  logOut() {
    console.log('%cÇıkış yapılıyor...','color:red;')
    this._alertifyService.hata('Çıkış yapılıyor...');
    localStorage.removeItem(TOKEN_KEY);
  }

  loggedIn(): boolean {
    return this.userToken == null || this.userToken!.toString() =="undefined"  ? false : !jwtHelper.isTokenExpired(this.userToken);
  }

  getCurrentUserId() {
    return jwtHelper.decodeToken(this.userToken).nameId;
  }
}

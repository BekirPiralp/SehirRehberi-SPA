import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {City} from "../models/city";
import { Photo } from '../models/photo';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient,private _alertifyService:AlertifyService, private _router:Router) { }
  path:string ="https://localhost:7084/api/";

  getCities():Observable<City[]>{
    return this.http.get<City[]>(this.path+"Cities");
  }
  getCityById(cityId:number):Observable<City>{
    return this.http.get<City>(this.path+"Cities/"+cityId);
  }

  getPhotosByCity(cityId:number):Observable<Photo[]>{
    return this.http.get<Photo[]>(this.path+"Cities/Photos/"+cityId);
  }

  add(city:City){
    return this.http.post<City>(this.path+"Cities/Add",city).subscribe((data)=>{
      if(data){
        this._alertifyService.basarili(data.name+" başarı ile eklendi");
        this._router.navigateByUrl('/cityDetail/'+data.id);
      }
    });
  }
}

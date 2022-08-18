import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {City} from "../models/city";
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient) { }
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
}

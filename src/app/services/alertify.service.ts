import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  basarili(message:string){
    alertify.success(message);
  }

  uyari(message:string){
    alertify.warning(message);
  }

  hata(message:string){
    alertify.error(message);
  }
}

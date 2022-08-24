import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { City } from '../models/city';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService],
  
})
export class CityComponent implements OnInit {
  constructor(private _citiyService: CityService,
    private _sanitizer:DomSanitizer) {
    this.cities = [];
    
  }
  cities: City[];

  ngOnInit(): void {
    this._citiyService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  safeHtml(html:any){
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}

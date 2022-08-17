import { Component, OnInit } from '@angular/core';
import { City } from '../models/city';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService],
})
export class CityComponent implements OnInit {
  constructor(private _citiyService: CityService) {
    this.cities = [];
  }
  cities: City[];

  ngOnInit(): void {
    this._citiyService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }
}

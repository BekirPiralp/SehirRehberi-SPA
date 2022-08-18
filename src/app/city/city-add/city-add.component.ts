import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers: [CityService],
})
export class CityAddComponent implements OnInit {
  constructor(
    private _cityService: CityService,
    private _formBuilder: FormBuilder
  ) {}

  city: City = new City();
  cityAddForm!: FormGroup;

  createCityForm() {
    this.cityAddForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.createCityForm()
  }

  createCityInDb(){
    if(this.cityAddForm.valid){ //veriler hatasız girildi ise
      this.city = Object.assign({
        name:String,
        description:String
      },this.cityAddForm.value)

      this.city.userId=4; // login olunca alacağız

      this._cityService.add(this.city)
    }
  }
}

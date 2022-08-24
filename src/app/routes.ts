import { Routes } from '@angular/router';
import { CityAddComponent } from './city/city-add/city-add.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityComponent } from './city/city.component';
import { PhotoComponent } from './photo/photo.component';
import { RegisterComponent } from './register/register.component';
import { ValueComponent } from './value/value.component';

export const appRoutes: Routes = [
  { path: 'city', component: CityComponent },
  { path: 'add', component: CityAddComponent},
  { path: 'value', component: ValueComponent },
  { path: 'cityDetail/:cityId', component: CityDetailComponent,},
  { path: 'cityEdit/:cityId', component: PhotoComponent,},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'city', pathMatch: 'full' }, //bunların dışında biri gelise pathMatch ile yani tam olarak ilgili adrese git
];

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryImage,
  NgxGalleryOptions,
  NgxGalleryAnimation,
} from 'ngx-gallery-9';
import { City } from 'src/app/models/city';
import { Photo } from 'src/app/models/photo';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers: [CityService],
})
export class CityDetailComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cityService: CityService,
    private _sanitizer:DomSanitizer
  ) {}

  city!: City;
  photos: Photo[] = [];
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.getCityById(params['cityId']);
      this.getPhotosByCityId(params['cityId']);
    });
  }

  getCityById(cityId: number) {
    this._cityService.getCityById(cityId).subscribe((data) => {
      this.city = data;
    });
  }

  getPhotosByCityId(cityId: number) {
    this._cityService.getPhotosByCity(cityId).subscribe(this.setPhotos);
  }

  setPhotos = (data: Photo[]) => {
    this.photos = data;
    this.setGalery();
  };

  private getImageFormatNgxGalery() {
    const result: typeof this.galleryImages = [];
    this.photos.forEach((value) => {
      result.push({
        small: value.url,
        medium: value.url,
        big: value.url,
        description: value.description,
      });
    });
    return result;
  }

  setGalery() {
    this.galleryOptions = [
      {
        imageAutoPlay: true,
        imageAutoPlayPauseOnHover: true,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
      },
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '500px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = this.getImageFormatNgxGalery();
  }

  safeHtml(html:string){
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}

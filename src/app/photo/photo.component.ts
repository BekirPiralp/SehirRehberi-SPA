import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader,Headers } from 'ng2-file-upload';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  providers: [AlertifyService],
})
export class PhotoComponent implements OnInit {
  constructor(
    private _alertifyService: AlertifyService,
    private _authService: AuthService,
    private _activeRoute: ActivatedRoute
  ) {}

  photos: Photo[] = [];
  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = "https://localhost:7084/api/";
  currentMain?: Photo;
  currentCity: any;
  response!:string;
  //headers:Headers[] = [];

  ngOnInit(): void {
    //this.headers.push({name:"Access-Control-Allow-Origin",value:"*"})
    //this.headers.push({name:"Access-Control-Allow-Credentials",value:"true"})

    this._activeRoute.params.subscribe(params=>{
      this.currentCity = params['cityId']
    })
    this.initializeUploade();
  }

  initializeUploade() {
    this.uploader = new FileUploader({
      //method:'POST',
      //headers: this.headers,
      url: this.baseUrl + 'cities/' + this.currentCity + '/photos',
      authToken: 'Bearer ' + this._authService.userToken,
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onBeforeUploadItem=(item)=>{item.withCredentials = false;}
    console.log(this.baseUrl + 'cities/' + this.currentCity + '/photos')
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      this.response = response;
      console.log(response)
      if(response){
        const res : Photo = JSON.parse(response);
        const photo: Photo = {
          id : res.id,
          url: res.url,
          dateAdded : res.dateAdded,
          description: res.description,
          IsMain : res.IsMain,
          cityId : res.cityId
        }

        this.photos.push(photo)
      }
    };
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}

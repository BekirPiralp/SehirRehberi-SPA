import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { FileUploadModule} from 'ng2-file-upload'

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { CityAddComponent } from './city/city-add/city-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './register/register.component';
import { NgxEditorModule } from 'ngx-editor';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    CityComponent,
    CityDetailComponent,
    CityAddComponent,
    RegisterComponent,
    PhotoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    HammerModule,
    NgxGalleryModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    FileUploadModule
  ],
  providers: [AlertifyService,AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}

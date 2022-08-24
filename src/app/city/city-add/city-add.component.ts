import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { Editor, Toolbar} from 'ngx-editor';
import { schema } from 'ngx-editor/schema';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { City } from 'src/app/models/city';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers: [CityService,],
})
export class CityAddComponent implements OnInit, OnDestroy {
  constructor(
    private _cityService: CityService,
    private _formBuilder: FormBuilder,
    private _auth:AuthService
  ) {
  }

  city: City = new City();
  cityAddForm!: FormGroup;
  editor!: Editor;
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];

  createCityForm() {
    this.cityAddForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.createCityForm();
    this.editor = new Editor({
      content: '',
      plugins: [],
      schema,
      nodeViews: {},
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createCityInDb() {
    if (this.cityAddForm.valid) {
      //veriler hatasız girildi ise
      this.city = Object.assign(
        {
          name: String,
          description: String,
        },
        this.cityAddForm.value
      );
      this.city.userId = this._auth.getCurrentUserId(); // login olunca alacağız

      this._cityService.add(this.city);
    }
  }
}

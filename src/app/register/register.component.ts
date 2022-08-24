import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  registerForm!:FormGroup;
  registerUser:any;


  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this._formBuilder.group({
      userName:["",Validators.required],
      password:["",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:["",Validators.required]
    },{validator:this.passwordMatcValidator});
  }
  
  passwordMatcValidator(g:FormGroup){
    return g.get('password')?.value === g.get('userName')!.value?null:{misMatch:true}
  }

  register(){
    if(this.registerForm.valid){
      this.registerUser = Object.assign({},this.registerForm.value);
    }
  }
}

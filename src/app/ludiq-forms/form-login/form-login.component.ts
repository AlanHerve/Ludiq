import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  passwordControl: FormControl;
  authentificationControl: FormControl;

  loginForm: FormGroup;
  constructor(private builder: FormBuilder, private router: Router){
    this.authentificationControl =  new FormControl('', [Validators.required
      , Validators.minLength(4)
      , Validators.maxLength(20)
      , Validators.pattern(/^[a-zA-Z0-9]*$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ]);

    this.passwordControl =  new FormControl('', [Validators.required
      , Validators.minLength(4)
      , Validators.maxLength(50)]);


    this.loginForm = builder.group({
      password: this.passwordControl
      , authentification: this.authentificationControl
    })
  }

  onLogin():void{
    console.log("authent :"+this.authentificationControl.getRawValue()
               +"\npassword :"+this.passwordControl.getRawValue());
    this.router.navigateByUrl('home');
  }



}

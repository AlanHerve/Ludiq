import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.loginForm = this.formBuilder.group({
      authentification: [null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[a-zA-Z0-9]*$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]
      ],
      password:[null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)]
      ],
    })
  }

  login():void{
    console.log(this.loginForm.value)
  }

}

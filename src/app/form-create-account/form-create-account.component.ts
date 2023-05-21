import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {confirmEqualValidator, matchPassword} from "../custom-validators";

@Component({
  selector: 'app-form-create-account',
  templateUrl: './form-create-account.component.html',
  styleUrls: ['./form-create-account.component.css']
})
export class FormCreateAccountComponent {


  nameControl: FormControl;
  pseudoControl: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;
  confirmControl: FormControl;

  createForm: FormGroup;
  constructor(private builder: FormBuilder) {
    this.nameControl = new FormControl('', [Validators.required
      , Validators.minLength(4)
      , Validators.maxLength(20)
      , Validators.pattern(/^[a-zA-Z0-9]*$/)
    ]);

    this.pseudoControl = new FormControl('', [Validators.required
      , Validators.minLength(4)
      , Validators.maxLength(20)
      , Validators.pattern(/^[a-zA-Z0-9]*$/)
    ]);

    this.emailControl = new FormControl('', [Validators.required
      , Validators.minLength(4)
      , Validators.maxLength(20)
      , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ]);

    this.passwordControl = new FormControl('', [Validators.required
      , Validators.minLength(8)
      , Validators.maxLength(20)
      , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/)]);

    this.confirmControl = new FormControl('', [Validators.required
      ]);

    this.createForm = builder.group({
      name: this.nameControl
      , pseudo: this.pseudoControl
      , email: this.emailControl
      , password: this.passwordControl
      , confirm: this.confirmControl
    },{
        validators: [confirmEqualValidator('password', 'confirm')]
      }
      )
  }
  createAccount() {
    console.log("nom "+this.nameControl.getRawValue()
                +"\npseudo: "+this.pseudoControl.getRawValue()
                +"\nemail: "+this.emailControl.getRawValue()
                +"\npassword: "+this.passwordControl.getRawValue()
                );
  }

  getFormValidationErrors() {
    Object.keys(this.createForm.controls).forEach(key => {
      let controlErrors: ValidationErrors;
      // @ts-ignore
      controlErrors = this.createForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }


}

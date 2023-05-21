import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {confirmEqualValidator} from "../custom-validators";

@Component({
  selector: 'app-form-create-account',
  templateUrl: './form-create-account.component.html',
  styleUrls: ['./form-create-account.component.css']
})
export class FormCreateAccountComponent implements OnInit {
  createForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group( {
      name: [null, Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[a-zA-Z0-9]*$/)
      ],
      pseudo: [null, Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[a-zA-Z0-9]*$/)
      ],
      email: [null, Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ],
      password: [null, Validators.required
        , Validators.minLength(8)
        , Validators.maxLength(20)
        , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/)
      ],
      confirm: [null, Validators.required]
    },{
      validators: [confirmEqualValidator('password', 'confirm')]
    })
  }

  createAccount() {
    console.log("nom "+this.createForm.get('name')?.value
                +"\npseudo: "+this.createForm.get('pseudo')?.getRawValue()
                +"\nemail: "+this.createForm.get('email')?.getRawValue()
                +"\npassword: "+this.createForm.get('password')?.getRawValue()
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

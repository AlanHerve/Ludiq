import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {confirmEqualValidator} from "../custom-validators";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-form-create-account',
  templateUrl: './form-create-account.component.html',
  styleUrls: ['./form-create-account.component.css']
})
export class FormCreateAccountComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  createForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group( {
      name: [null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[a-zA-Z0-9]*$/)]
      ],
      pseudo: [null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[a-zA-Z0-9]*$/)]
      ],
      email: [null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]
      ],
      password: [null, [Validators.required
        , Validators.minLength(8)
        , Validators.maxLength(20)
        , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/)]
      ],
      confirm: [null, Validators.required]
    },{
      validators: [confirmEqualValidator('password', 'confirm')]
    })
  }

  createAccount() {
    console.log(this.createForm.value);
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

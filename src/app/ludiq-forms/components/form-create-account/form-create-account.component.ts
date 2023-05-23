import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserDTO} from "../../../models/user-dto";
import {UserService} from "../../../services/user.service";
import {CustomValidators} from "../../../custom-validators";

@Component({
  selector: 'app-form-create-account',
  templateUrl: './form-create-account.component.html',
  styleUrls: ['./form-create-account.component.css']
})
export class FormCreateAccountComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  createForm!: FormGroup;
  userDTO: UserDTO = {
    name: '',
    username: '',
    email: '',
    password: ''
  };
  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {}

  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group( {
      name: [null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      pseudo: [null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      email: [null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(50)
        , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
      password: [null, [Validators.required
        , Validators.minLength(8)
        , Validators.maxLength(20)
        , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/)
      ]],
      confirm: [null, [Validators.required]]
    },{
      validators: [CustomValidators.confirmEqualValidator('password', 'confirm')]
    })
  }

  onCreateAccount() {
    this.userService.registerUser(this.userDTO).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log('Utilisateur enregistré avec succès:', response);
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      }
    })
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

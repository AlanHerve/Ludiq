import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDTO} from "../../../models/user-dto";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  userDTO: UserDTO = {
    name: '',
    username: '',
    email: '',
    password: ''
  };

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,

              private userService: UserService,
              private router: Router){
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


  onLogin():void{
    this.router.navigateByUrl('home');
    console.log(this.loginForm.value);
    this.userService.loginUser(this.userDTO).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log('Utilisateur connecté avec succès:', response);
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur lors de la connexion de l\'utilisateur:', error);
      }
    })
  }

  onClose(): void {
    this.router.navigate(['/']);
  }
}

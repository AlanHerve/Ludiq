import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDTO} from "../../../models/user-dto";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {trigger,style,state,transition,animate,} from '@angular/animations';
import { FormService } from 'src/app/form.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  animations:[
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('200ms')),
    ]),
    trigger('fadeOut', [
      state('*', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => void', animate('200ms')),
    ])
  ]
})
export class FormLoginComponent implements OnInit  {

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  userDTO: UserDTO = {
    id: -1,
    name: '',
    username: '',
    email: '',
    password: ''
  };

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private formService: FormService){
    this.loginForm = this.formBuilder.group({
      authentification: [null, [Validators.required
        , Validators.minLength(4)
        , Validators.maxLength(20)
        , Validators.pattern(/^[a-zA-Z0-9]*$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]
      ],
      password:[null, [Validators.required
        , Validators.minLength(8)
        , Validators.maxLength(20)]
      ],
    })
    }

  ngOnInit(): void {
  }


  onLogin(): void {
    this.router.navigateByUrl('home');
    this.userService.loginUser(this.userDTO).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log('Status de connexion de l\'utilisateur :', response);
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur lors de la connexion de l\'utilisateur :', error);
      }
    })
  }

  onClose(): void {
    this.router.navigate(['/']);
  }

}

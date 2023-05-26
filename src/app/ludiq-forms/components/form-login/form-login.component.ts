import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
    trigger('openSleep',[
    state('sleep', style({
      opacity:0,
    })),
    state('open', style({
      opacity:1,
    })),
    transition('sleep => open', [
      animate('300ms ease-in')
    ]),
    transition('open => sleep', [
      animate('300ms ease-in')
    ])

  ])
]
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
              private router: Router,
              private formService: FormService){
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
  //formService est utilisé pour faire une transistion douce pour le form d'inscription et de register
  get isOpen() {
    return this.formService.isOpen;
  }

  toggleForm(){
    this.formService.isOpen=false;
    console.log("toggle de la croix",this.formService.isOpen)
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDTO} from "../../../models/user-dto";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {trigger,style,state,transition,animate,} from '@angular/animations';

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
export class FormLoginComponent implements OnInit {

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
              private router: Router){
    // Create the loginForm with form controls and validators
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

  // Handle login form submission
  onLogin(): void {
    this.userService.loginUser(this.userDTO).subscribe({
      next: (response) => {
        // Handle the response from the server on successful login
        console.log('User login status:', response);

        // Redirect to 'home' only if the login is successful
        this.router.navigateByUrl('home');
      },
      error: (error) => {
        // Handle errors on login failure
        console.error('Error while logging in:', error);
      }
    });
  }

  onClose(): void {
    this.router.navigate(['/']);
  }
}

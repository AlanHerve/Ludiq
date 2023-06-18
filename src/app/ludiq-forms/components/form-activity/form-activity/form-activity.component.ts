import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivityDTO} from "../../../../posts/models/activity-dto";
import {ActivityService} from "../../../../posts/services/activity.service";
import {HobbyService} from "../../../../services/hobby.service";
import {UserDTO} from "../../../../models/user-dto";
import {HobbyDTO} from "../../../../models/hobby-dto";
import {UserService} from "../../../../services/user.service";
import {Form} from "../../../models/form";
import {OrganizationDTO} from "../../../../models/organization-dto";


@Component({
  selector: 'app-form-activity',
  templateUrl: './form-activity.component.html',
  styleUrls: ['./form-activity.component.css', '../../../ludiq-forms.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 1})),
      transition('void => *', animate('200ms')),
    ]),
    trigger('fadeOut', [
      state('*', style({opacity: 1})),
      state('void', style({opacity: 0})),
      transition('* => void', animate('200ms')),
    ])
  ]
})


/**
 * form used to pusblish an activity
 * an activty can only be published be an activity director
 */
export class FormActivityComponent extends Form implements OnInit {
  index: number = 0;
  hobbies: HobbyDTO[] = [];

  //previousRoute: string = '';
  activityDTO: ActivityDTO = { //define a new ActivityDTO

    id: -1,
    userDTO: new UserDTO(-1, '', ''),
    hobbyDTO: new HobbyDTO(-1, '', ''),
    description: '',
    advancement: '',
    time: '',
    date_post: '',
    current_registered: 0,
    max_registrations: 0,
    images: [],
    title: '',
    id_organization: -1,
    organizationDTO: new OrganizationDTO(-1, '', '', '', [], [])
  }
  activityForm: FormGroup;

  constructor(private builder: FormBuilder,
              private formBuilder: FormBuilder,
              private activityService: ActivityService,
              private hobbyService: HobbyService,
              router: Router,
              location: Location,
              private userService: UserService) {

    super(router, location);

    this.activityForm = this.builder.group({
      hobby: [this.hobbies[0], [Validators.required]],
    })


    //form validators for the number of participants
    this.activityForm = this.formBuilder.group({
      activityControl: new FormControl(),
      number: [null, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(1)]],
    });

  }

  ngOnInit(): void {
    // We find the user that wants to post the activity :
    this.userService.findUserById(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (response) => {
        // We stock it into the activity
        this.activityDTO.userDTO = response;
        // We check if the user is activity director or not
        this.userService.isActivityDirector(this.activityDTO.userDTO.id).subscribe({
          next : (bool) => {
            // If he isn't, he isn't allow the post a new activity, we redirects him to home
            if(!bool) this.router.navigateByUrl('/home');
          },
          error: (error) => {
            console.error("Error while finding if activity director or not :" , error)
          }
        })
        // We collect all the hobbies of the user, in order to allows him to select a hobby for the new activity
        this.hobbyService.getAllHobbies().subscribe({
          next: (hobbies) => {
            for (let i = 0; i < hobbies.hobbies.length; i++) {
              this.hobbies.push(hobbies.hobbies[i]);
            }
          },
          error: (error) => {
            console.error("Error during the call of getAllHobbies() :", error);
          }
        });
      }
    });

  }

  newActivityPost() {
    //append content of the form to the form data
    const formData = new FormData();
    // @ts-ignore
    formData.append('id_user', this.activityDTO.userDTO.id);
    // @ts-ignore
    formData.append('id_hobby', this.activityDTO.hobbyDTO.id);
    // @ts-ignore
    formData.append('time', this.activityDTO.time.toString());
    formData.append('description', this.activityDTO.description);
    // @ts-ignore
    this.activityDTO.max_registrations = this.activityForm.value.number;
    formData.append('title', this.activityDTO.title);
    formData.append('max_registration', this.activityDTO.max_registrations.toString());
    formData.append('advancement', this.activityDTO.advancement);

    this.activityService.newActivity(formData).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès

        //close the form
        this.onClose();
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur post : ', error);
      }
    });
  }
}

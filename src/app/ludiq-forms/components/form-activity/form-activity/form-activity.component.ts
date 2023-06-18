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
import {FriendService} from "../../../../pages/messages/services/friend.service";
import {HobbyFlashcardDTO} from "../../../../models/hobby-flashcard-dto";
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

  hobbyPostDTO: HobbyFlashcardDTO = { //define a new hobbyFlashcardDTO
    id_hobby_post: 0,
    id_user: 0,
    id_hobby: 0,
    advancement: '',
    frequency: '',
    availability: 1
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
    console.log(JSON.parse(localStorage.getItem('currentUser')!).token);

    this.activityDTO.organizationDTO.name_organization = this.activityService.getOrganizationName(JSON.parse(localStorage.getItem('currentUser')!).token);
    //getting the name_organization using getOrganizationName
    console.log(this.activityDTO.organizationDTO.name_organization);

    this.activityDTO.id_organization = this.activityService.getOrganizationID(JSON.parse(localStorage.getItem('currentUser')!).token);
    //getting the id_organization using getOrganizationID

    this.userService.findUserById(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (response) => {
        this.activityDTO.userDTO = response;

        this.hobbyService.getAllHobbies().subscribe({
          next: (hobbies) => {
            console.log(hobbies);
            console.log(hobbies.hobbies.length)
            for (let i = 0; i < hobbies.hobbies.length; i++) {
              this.hobbies.push(hobbies.hobbies[i]);
            }
          },
          error: (error) => {
            console.log("Erreur lors de l'appel à getAllHobbies() :", error);
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

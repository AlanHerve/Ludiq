import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
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


@Component({
  selector: 'app-form-activity',
  templateUrl: './form-activity.component.html',
  styleUrls: ['./form-activity.component.css', '../../../ludiq-forms.css'],
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
export class FormActivityComponent extends Form implements OnInit {
  index: number = 0;
  hobbies : HobbyDTO[] = [];

  //previousRoute: string = '';
  activityDTO: ActivityDTO = {

    id: -1,
    userDTO: new UserDTO(-1, '', ''),

    hobbyDTO: new HobbyDTO(-1, '', ''),
    description:'',
    advancement: '',
    time: '',
    date_post: '',
    current_registered: 0,
    max_registrations: 0,
    images: [],
    title: '',
    id_organization: -1,
    name_organization: ''
  }

  hobbyPostDTO: HobbyFlashcardDTO = {
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
              private activityService:ActivityService,
              private hobbyService: HobbyService,
              //private router: Router,
              //private location: Location,
              router: Router,
              location: Location,
              private userService: UserService) {

    super(router, location);

    this.activityForm = this.builder.group({
      hobby: [this.hobbies[0], [Validators.required]],
    })

    this.activityForm = this.formBuilder.group({
      activityControl:new FormControl(),
      number: [null, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(1)]],
    });


  }
  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('currentUser')!).token);

    this.activityDTO.name_organization = this.activityService.getOrganizationName(JSON.parse(localStorage.getItem('currentUser')!).token);
    console.log(this.activityDTO.name_organization);

    this.activityDTO.id_organization = this.activityService.getOrganizationID(JSON.parse(localStorage.getItem('currentUser')!).token);

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


  /*

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.activityDTO.images[this.index] = file.name;
      if (this.index < this.activityDTO.images.length) {
        const labelElement = document.querySelectorAll('.file-input-label')[this.index];
        labelElement?.classList.add('selected');
        this.index++;
      }
    };

    reader.readAsDataURL(file);
  }*/

  getUserHobbies(){
    this.hobbyService.getHobbiesOfUser(this.activityDTO.hobbyDTO.id).subscribe({
      next: (response) => {
          this.hobbies= response
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get the activity hobby', error);
      }
    });
  }

  /*onRemoveImage(image: string) {
    const index = this.activityDTO.images.findIndex(img => img === image);
    if (index !== -1) {
      this.activityDTO.images[index] = null;
      this.index--;
    }*/
/*
    for (let i = index; i < this.activityDTO.images.length; i++) {
      if (i === this.activityDTO.images.length - 1) {
        this.activityDTO.images[3] = null;
      } else {
        this.activityDTO.images[i] = this.activityDTO.images[i + 1];
      }
    }
    console.log(this.activityDTO.images);
  }
*/
    /**
   * Method that returns the previous route of the current url
   * @private
   */
  /*private getPreviousRoute(): string {
    const currentUrl = this.location.path();

    return currentUrl.slice(0, currentUrl.lastIndexOf('/'));
  }*/

  newActivityPost() {
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

    console.log( formData.append('title', this.activityDTO.title));
    formData.append('max_registration',this.activityDTO.max_registrations.toString());
    formData.append('advancement',this.activityDTO.advancement);
    this.onClose()
    /*const fileName = this.activityDTO.images[0]; // Assuming it's a string representing the file name
    if (fileName != null) {
      formData.append('images[]', fileName);
    }*/

    this.activityService.newActivity(formData).subscribe({
       next: (response) => {
         // Traitement de la réponse du serveur en cas de succès
         console.log('Post avec succès', response);
         this.onClose();
       },
       error: (error) => {
         // Gestion des erreurs en cas d'échec
         console.error('Erreur post : ', error);
       }
     });
   }
}

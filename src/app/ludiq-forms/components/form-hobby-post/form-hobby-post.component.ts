
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HobbyDTO} from "../../../models/hobby-dto";
import {HobbyService} from "../../../services/hobby.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HobbyFlashcardDTO} from "../../../models/hobby-flashcard-dto";
import {Location} from "@angular/common";
import {Form} from "../../models/form";
import {Router} from "@angular/router";
import {PostService} from "../../../posts/services/post.service";

import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-form-hobby-posts',
  templateUrl: './form-hobby-post.component.html',
  styleUrls: ['./form-hobby-post.component.css',  '../../ludiq-forms.css'],
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

/**
 * component used to add a hobby to an user's bio
 */
export class FormHobbyPostComponent extends Form implements OnInit {

  //information of all hobbies user does not already have in their bio
  hobbies : HobbyDTO[] = [];

  //static options
  advancement_options: string[] = ["Beginner", "Intermediate", "Advanced", "Expert"];
  frequency_options: string[] = ["Daily", "3-4/week", "2-3/week", "Weekly", "Monthly", "Rarely"];

  //informations of the future hobby flashcard
  hobbyPostDTO: HobbyFlashcardDTO = {
    id_hobby_post: 0,
    id_user: 0,
    id_hobby: 0,
    advancement: '',
    frequency: '',
    availability: 1
  }

  hobbyForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private hobbyService: HobbyService,
    private postsService: PostService,
    router: Router,
    location: Location
  ) {
    super(router, location);

    this.hobbyForm = this.builder.group({
      hobby: [this.hobbies[0], [Validators.required]],
      advancement: [this.advancement_options[0], [Validators.required]],
      frequency: [this.frequency_options[0], [Validators.required]]
    })
    this.hobbyPostDTO.id_user = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    this.getAvailableHobbiesOfUser();
  }

  ngOnInit(){

  }



  submitted() {
    // Converting string into int
    this.hobbyPostDTO.id_hobby = +this.hobbyPostDTO.id_hobby;
    this.newHobbyPost();
    this.onClose();
  }

  newHobbyPost(){
    this.hobbyService.newHobbyPost(this.hobbyPostDTO).subscribe({
      next: (response) => {
        // in case of success
        this.hobbies.length = 0;
        this.getAvailableHobbiesOfUser();
      },
      error: (error) => {
        // in case of failure
        console.error('Could not post hobby', error);
      }
    });
  }

  getAvailableHobbiesOfUser(){
    this.hobbyService.getAvailableHobbiesOfUser(this.hobbyPostDTO.id_user).subscribe({
      next: (response) => {
        // in case of success
        for (let i = 0; i < response.length; i++) {
          this.hobbies.push(response[i]);
        }

        //if user already has all available hobbies in their bio
        if(this.hobbies.length == 0) {
          alert("You already have all possible hobbies in your bio");
          this.onClose();
        }
        //preselect options
        this.hobbyPostDTO.id_hobby = this.hobbies[0].id;
        this.hobbyPostDTO.advancement = this.advancement_options[0];
        this.hobbyPostDTO.frequency = this.frequency_options[0];
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get all hobbies', error);
      }
    });
  }


}

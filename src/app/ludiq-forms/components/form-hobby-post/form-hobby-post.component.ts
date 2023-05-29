import { Component } from '@angular/core';
import {PostsService} from "../../../../app/posts/posts.service";
import {RegularPostDTO} from "../../../models/regular-post-dto";
import {HobbyDTO} from "../../../models/hobby-dto";
import {RequestDTO} from "../../../models/request-dto";
import {HobbiesService} from "../../../services/hobbies.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HobbyPostDTO} from "../../../models/hobby-post-dto";

@Component({
  selector: 'app-form-hobby-posts',
  templateUrl: './form-hobby-post.component.html',
  styleUrls: ['./form-hobby-post.component.css',  '../../ludiq-forms.css']
})
export class FormHobbyPostComponent {

  hobbies : HobbyDTO[] = [];

  requestDTO: RequestDTO = {
    function_to_call: "fetchAllHobbies"
  };

  advancement_options: String[] = ["Beginner", "Intermediate", "Advanced", "Expert"];
  frequency_options: String[] = ["Daily", "3-4/week", "2-3/week", "Weekly", "Monthly", "Rarely"];

  hobbyPostDTO: HobbyPostDTO = {
    id_user: 2,
    id_hobby: 0,
    advancement: '',
    frequency: '',
    availability: 1
  }


  hobbyForm: FormGroup;
  constructor(private builder: FormBuilder, private hobbiesService: HobbiesService) {
    this.hobbyForm = this.builder.group({
      hobby: [this.hobbies[0], [Validators.required]],
      advancement: [this.advancement_options[0], [Validators.required]],
      frequency: [this.frequency_options[0], [Validators.required]]
    })
    this.fetchAvailableHobbiesOfUser();
  }

  ngOnInit(){

  }

  submitted() {
    console.log(this.hobbyPostDTO.id_hobby+" "+this.hobbyPostDTO.advancement+" "+this.hobbyPostDTO.frequency+" "+this.hobbyPostDTO.availability);
    this.newHobbyPost();
  }

  newHobbyPost(){
    this.hobbiesService.newHobbyPost(this.hobbyPostDTO).subscribe({
      next: (response) => {
        // in case of success
        console.log(response);
        this.hobbies.length = 0;
        this.fetchAvailableHobbiesOfUser();
      },
      error: (error) => {
        // in case of failure
        console.error('Could not post hobby', error);
      }
    });
  }

  fetchAvailableHobbiesOfUser(){
    this.hobbiesService.fetchAvailableHobbiesOfUser().subscribe({
      next: (response) => {
        // in case of success
        for (let i = 0; i < response.hobbies.length; i++) {
          this.hobbies.push(response.hobbies[i]);
        }
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get all hobbies', error);
      }
    });
  }

}

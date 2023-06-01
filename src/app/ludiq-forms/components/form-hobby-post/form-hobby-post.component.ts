import {Component, OnInit} from '@angular/core';
import {HobbyDTO} from "../../../models/hobby-dto";
import {RequestDTO} from "../../../models/request-dto";
import {HobbiesService} from "../../../services/hobbies.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HobbyPostDTO} from "../../../models/hobby-post-dto";
import {Location} from "@angular/common";
import {Form} from "../../models/form";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-hobby-posts',
  templateUrl: './form-hobby-post.component.html',
  styleUrls: ['./form-hobby-post.component.css',  '../../ludiq-forms.css']
})
export class FormHobbyPostComponent extends Form implements OnInit {

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
  constructor(
    private builder: FormBuilder,
    private hobbiesService: HobbiesService,
    router: Router,
    location: Location
  ) {
    super(router, location);

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
    // Converting string into int
    this.hobbyPostDTO.id_hobby = +this.hobbyPostDTO.id_hobby;
    this.newHobbyPost();
  }

  newHobbyPost(){
    this.hobbiesService.newHobbyPost(this.hobbyPostDTO).subscribe({
      next: (response) => {
        // in case of success
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
    console.log("start");
    this.hobbiesService.fetchAvailableHobbiesOfUser().subscribe({
      next: (response) => {
        // in case of success
        console.log(response);
        for (let i = 0; i < response.hobbies.length; i++) {
          this.hobbies.push(response.hobbies[i]);
          console.log(response.hobbies[i]);
        }
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get all hobbies', error);
      }
    });
  }


}

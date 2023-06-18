import { Component } from '@angular/core';
import {Form} from "../../models/form";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HobbyDTO} from "../../../models/hobby-dto";
import {UserService} from "../../../services/user.service";
import {HobbyService} from "../../../services/hobby.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-form-favorite-hobby',
  templateUrl: './form-favorite-hobby.component.html',
  styleUrls: ['./form-favorite-hobby.component.css', '../../ludiq-forms.css']
})
/**
 * allows user to set and change their favorite hobby
 */
export class FormFavoriteHobbyComponent extends Form {

  //information of all the available hobbies
  hobbyDTOs: HobbyDTO[] = [];

  //id of the selected hobby
  selectedHobbyDTO: number = 0;

  constructor(private hobbyService: HobbyService,
              router: Router,
              location: Location
  ) {
    super(router, location);


    //get all hobbies in the user's bio
    this.hobbyService.getHobbiesOfUser(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (response) => {

        this.hobbyDTOs = response;
        //preselects a value
        this.selectedHobbyDTO = this.hobbyDTOs[0].id;

      },
      error: (error) => {
        console.error("could not get hobbies of users ", error);
      }
    })

  }


  submitted() {
    console.log(this.selectedHobbyDTO);
    this.hobbyService.setFavoriteHobby(this.selectedHobbyDTO, parseInt(JSON.parse(localStorage.getItem('currentUser')!).id)).subscribe({
      next: (response) => {
        //success
      },
      error: (error) => {
        console.error("Could not set/change favorite hobby", error);
      }
    });
    //close the form
    this.onClose();
  }
}

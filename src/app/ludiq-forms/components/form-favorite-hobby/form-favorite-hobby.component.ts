import { Component } from '@angular/core';
import {Form} from "../../models/form";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {HobbyDTO} from "../../../models/hobby-dto";
import {HobbyService} from "../../../services/hobby.service";

@Component({
  selector: 'app-form-favorite-hobby',
  templateUrl: './form-favorite-hobby.component.html',
  styleUrls: ['./form-favorite-hobby.component.css', '../../ludiq-forms.css']
})
/**
 * Component for allowing the user to set and change their favorite hobby
 */
export class FormFavoriteHobbyComponent extends Form {

  // Array to store information about all available hobbies
  hobbyDTOs: HobbyDTO[] = [];

  // ID of the selected hobby
  selectedHobbyDTO: number = 0;

  constructor(private hobbyService: HobbyService,
              router: Router,
              location: Location
  ) {
    super(router, location);

    // Get all hobbies associated with the user's bio
    this.hobbyService.getHobbiesOfUser(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (response) => {
        this.hobbyDTOs = response;
        // Preselect a default value (the first hobby in the array)
        this.selectedHobbyDTO = this.hobbyDTOs[0].id;
      },
      error: (error) => {
        console.error("Could not get hobbies of users", error);
      }
    });
  }

  submitted() {
    this.hobbyService.setFavoriteHobby(this.selectedHobbyDTO, parseInt(JSON.parse(localStorage.getItem('currentUser')!).id)).subscribe({
      next: (response) => {
        // Success
      },
      error: (error) => {
        console.error("Could not set/change favorite hobby", error);
      }
    });

    // Close the form
    this.onClose();
  }
}

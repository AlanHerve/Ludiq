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
export class FormFavoriteHobbyComponent extends Form {

  hobbyDTOs: HobbyDTO[] = [];

  selectedHobbyDTO: number = 0;

  favoriteHobbyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private hobbyService: HobbyService,
              router: Router,
              location: Location
  ) {
    super(router, location);

    this.favoriteHobbyForm = this.formBuilder.group({
      hobby: [this.hobbyDTOs[0], [Validators.required]]
      }
    );

    this.hobbyService.getHobbiesOfUser(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (response) => {

        this.hobbyDTOs = response;
        this.selectedHobbyDTO = this.hobbyDTOs[1].id;

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

      },
      error: (error) => {
        console.error("Could not set/change favorite hobby", error);
      }
    });
    this.router.navigateByUrl(this.previousRoute);
  }
}

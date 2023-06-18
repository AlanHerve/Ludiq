import {Component, OnInit} from '@angular/core';
import {PostDTO} from "../../../posts/models/post-dto";
import {PostService} from "../../../posts/services/post.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {Form} from "../../models/form";
import { animate, state, style, transition, trigger } from '@angular/animations';
import {HobbyService} from "../../../services/hobby.service";
import {HobbyDTO} from "../../../models/hobby-dto";
import {UserService} from "../../../services/user.service";
import {UserDTO} from "../../../models/user-dto";


@Component({
  selector: 'app-form-favorite-hobby',
  templateUrl: './form-favorite-hobby.component.html',
  styleUrls: ['./form-favorite-hobby.component.css', '../../ludiq-forms.css'],
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
export class FormFavoriteHobbyComponent extends Form implements OnInit {

  postDTO: PostDTO = {
    id: -1,
    userDTO: new UserDTO(-1, '', ''),
    hobbyDTO: new HobbyDTO(-1, '', ''),
    likes: 0,
    comments: [],
    description: '',
    time: '',
    modified: 0,
    images: [null, null, null, null]
  };
  hobbies : HobbyDTO[] = [];

  constructor(private hobbyService: HobbyService, router: Router, location: Location,
              private userService: UserService,) {
    super(router, location);
  }

  ngOnInit() {
    this.userService.findUserById(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (response) => {
        this.postDTO.userDTO = response;
        this.getUserHobbies();
      }
    })
  }

  getUserHobbies(){
    this.hobbyService.getHobbiesOfUser(this.postDTO.userDTO.id).subscribe({
      next: (response) => {
        // in case of success
        for (let i = 0; i < response.length; i++) {
          this.hobbies.push(response[i]);
        }
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get all hobbies', error);
      }
    });
  }

  selectFavoriteHobby(): void {
    if (!this.postDTO.hobbyDTO.id) {
      console.error('No hobby selected');
      return;
    }

    this.hobbyService.updateFavoriteHobby(this.postDTO.userDTO.id, this.postDTO.hobbyDTO.id).subscribe({
      next: (response) => {
        // handle successful response here
        this.router.navigate(['/profile/', this.postDTO.userDTO.id]);
      },
      error: (error) => {
        // handle error response here
        console.error('Could not update hobby', error);
      }
    });
  }


}

import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserDTO} from "../../../models/user-dto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../pages.css']
})
export class ProfileComponent {

  private userDTO: UserDTO = {
    id: 0,
    name: '',
    username: '',
    email: ''
  };

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userDTO.id = parseInt(params['id']);

      if(parseInt(JSON.parse(localStorage.getItem('currentUser')!).id) == this.userDTO.id){
        this.userDTO.name = JSON.parse(localStorage.getItem('currentUser')!).name;
        this.userDTO.username = JSON.parse(localStorage.getItem('currentUser')!).username;
      }else{
        this.userService.findUserById(this.userDTO).subscribe({

          next: (response) => {
            // in case of success
            this.userDTO = response;
          },
          error: (error) => {
            // in case of failure
            console.error('Could not get user info', error);
          }
        });
      }


    })
  }

}

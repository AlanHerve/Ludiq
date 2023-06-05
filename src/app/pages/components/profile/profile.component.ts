import {Component} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDTO} from "../../../models/user-dto";
import {ProfileDTO} from "./models/profile-dto";
import {ProfileService} from "./services/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../pages.css']
})
export class ProfileComponent {

  protected userDTO: UserDTO = {
    id: 0,
    name: '',
    username: '',
    email: ''
  };

  protected profileDTO: ProfileDTO = {
    userDTO: this.userDTO,
    numPosts: 0,
    numHobbies: 0
  }

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userDTO.id = parseInt(params['id']);

      if (this.isConnectedUser()) {
        this.userDTO.name = JSON.parse(localStorage.getItem('currentUser')!).name;
        this.userDTO.username = JSON.parse(localStorage.getItem('currentUser')!).username;
      } else {
        this.userService.findUserById(this.userDTO.id).subscribe({

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

    this.getNumPosts();
  }

  getNumPosts(): void {
    this.profileService.getNumPosts(this.userDTO.id).subscribe({
      next: (response) => {
        this.profileDTO.numPosts = response;
      },
      error: (error) => {
        console.log('error while finding the number of posts of the user : ', error);
      }
    })
  }

  isConnectedUser(): boolean {
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id) == this.userDTO.id
  }

  onSendMessageClicked(): void {
    this.router.navigateByUrl(`messages/${this.userDTO.id}`)
  }

}

import {Component} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDTO} from "../../../models/user-dto";
import {ProfileDTO} from "./models/profile-dto";
import {ProfileService} from "./services/profile.service";
import {ActivityDTO} from "../../../posts/models/activity-dto";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../pages.css']
})
export class ProfileComponent {

  protected type: string = 'posts';
  protected profileDTO: ProfileDTO = {
    userDTO: new UserDTO(-1, '', ''),
    numPosts: 0,
    numHobbies: 0,
    numFriends: 0,
    postsDTO: []
  }

  activitiesDTO: ActivityDTO[] = [new ActivityDTO(1, 2, 2, 'coucou', [], 0, '', [])]

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.profileDTO.userDTO.id = parseInt(params['id']);
    });

    this.getProfileInformation();
  }

  getProfileInformation(): void {
    this.profileService.getProfileInformation(this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        this.profileDTO = response;
      },
      error: (error) => {
        console.log('error while accessing to profile informations : ', error);
      }
    })
  }

  isConnectedUser(): boolean {
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id) == this.profileDTO.userDTO.id
  }

  onSendMessageClicked(): void {
    this.router.navigateByUrl(`messages/${this.profileDTO.userDTO.id}`)
  }

  onSwitchTo(type: string): void {
    this.type = type;
  }

  getID(): number{
    return this.profileDTO.userDTO.id;
  }

}

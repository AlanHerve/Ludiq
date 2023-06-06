import {Component} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDTO} from "../../../models/user-dto";
import {ProfileDTO} from "./models/profile-dto";
import {ProfileService} from "./services/profile.service";
import {ActivityDTO} from "../../../posts/models/activity-dto";
import {FriendService} from "../messages/services/friend.service";
import {HobbyPostDTO} from "../../../models/hobby-post-dto";
import {HobbyDTO} from "../../../models/hobby-dto";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../pages.css']
})
export class ProfileComponent {

  activitiesDTO: ActivityDTO[] = [
    new ActivityDTO(1, 'Cooking session', 2, 2, 'It\'s fun', [], 0, '', []),
    new ActivityDTO(1, 'Biking with friends', 2, 2, 'We like sport, come with us!', [], 0, '', []),
    new ActivityDTO(1, 'Picnic', 2, 2, 'At the Forges Pond, don\'t miss it!!', [], 0, '', []),
    new ActivityDTO(1, 'Picnic', 2, 2, 'At the Forges Pond, don\'t miss it!!', [], 0, '', []),
    new ActivityDTO(1, 'Picnic', 2, 2, 'At the Forges Pond, don\'t miss it!!', [], 0, '', [])
  ]
  hobbiesDTO: HobbyPostDTO[] = [

  ]
  protected type: string = 'posts';
  protected profileDTO: ProfileDTO = {
    userDTO: new UserDTO(-1, '', ''),
    numPosts: 0,
    numHobbies: 0,
    numFriends: 0,
    postsDTO: []
  }
  private isFriendWith: boolean = false;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private friendService: FriendService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.profileDTO.userDTO.id = parseInt(params['id']);
    })
    this.friendService.isFriendWidth(parseInt(JSON.parse(localStorage.getItem('currentUser')!).id), this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        this.isFriendWith = response;
      },
      error: (error) => {
        console.log("Error while finding if the user is friend with another", error)
      }
    });

    /*this.hobbyService.getHobbiesFlashcardsOfUser(this.id_user).subscribe({

      next: (response) => {
        // in case of success
        for (let i = 0; i < response.length; i++) {
          this.hobby_flashcardsDTOs.push(response[i]);
        }
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get flashcards', error);
      }
    });*/

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

  isFriend(): boolean {
    return this.isFriendWith;
  }

  onSwitchTo(type: string): void {
    this.type = type;
  }


  getID(): number{
    return this.profileDTO.userDTO.id;
  }


  addFriend(): void {
    this.friendService.addFriend(this.profileDTO.userDTO.id);
  }

  removeFriend(): void {

  }

}

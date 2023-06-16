import {Component} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDTO} from "../../../models/user-dto";
import {ProfileDTO} from "../models/profile-dto";
import {ProfileService} from "../services/profile.service";
import {ActivityDTO} from "../../../posts/models/activity-dto";
import {FriendService} from "../../messages/services/friend.service";
import {HobbyFlashcardDTO} from "../../../models/hobby-flashcard-dto";
import {HobbyDTO} from "../../../models/hobby-dto";
import {HobbyService} from "../../../services/hobby.service";
import {CommunicationService} from "../../../services/communication.service";
import {ActivityService} from "../../../posts/services/activity.service";
import {TabService} from "../../../shared/service/tab.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../pages.css']
})
export class ProfileComponent {

  activitiesDTO: ActivityDTO[] = []

  protected reward: string = "bronze";
  hobbyFlashcardsDTOs: HobbyFlashcardDTO[] = []

  protected type: string = 'posts';
  protected profileDTO: ProfileDTO = {
    userDTO: new UserDTO(-1, '', ''),
    numPosts: 0,
    numHobbies: 0,
    numFriends: 0,
    activityDirector: false,
    numActivities: 0,
    postsDTO: [],
    activitiesDTO: [],
    favoriteHobby: new HobbyDTO(-1, '', '')
  }
  private friendship_status: string = "!friend";

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private hobbyService: HobbyService,
              private friendService: FriendService,
              private communicationService: CommunicationService,
              private activityService: ActivityService,
              private tabService: TabService,
              private router: Router) {
    this.tabService.tabChange$.subscribe(tab => {
      this.onTabChange(tab);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.profileDTO.userDTO.id = parseInt(params['id']);
    })
    this.friendService.isFriendWith(parseInt(JSON.parse(localStorage.getItem('currentUser')!).id), this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        console.log(response);
        this.friendship_status = response;
      },
      error: (error) => {
        console.log("Error while finding if the user is friend with another", error)
      }
    });

    this.getHobbiesFlashcardsOfUser();
    this.getProfileInformation();

    this.hobbyService.currentMessage.subscribe((data)=>{
      this.hobbyFlashcardsDTOs.push(this.hobbyService.getNewPost());
    });

    this.hobbyService.currentDeleteState.subscribe((data) => {
      console.log("returned Data :" + data);
      this.hobbyFlashcardsDTOs.splice(this.findHobbyDTOWithData(data), 1);
    });

  }

  private determineReward(): void {
    if(this.profileDTO.numActivities > 50) {
      this.reward = "gold"
    }
    else if(this.profileDTO.numActivities > 25) {
      this.reward = "iron"
    }
    else if(this.profileDTO.numActivities > 0){
      this.reward = "bronze"
    }
  }

  getUserType(): string {
    if(this.isActivityDirector()) return 'Activity Director';
    return 'Classical User';
  }

  findHobbyDTOWithData(id: number){
    const sizeOfArray: number = this.hobbyFlashcardsDTOs.length;

    for (let i = 0; i < sizeOfArray; i++) {
      if(this.hobbyFlashcardsDTOs[i].id_hobby_post == id) return i;
    }

    return -1;

  }

  getProfileInformation(): void {
    this.profileService.getProfileInformation(this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        this.profileDTO = response;
        this.determineReward();
      },
      error: (error) => {
        console.log('error while accessing to profile informations : ', error);
      }
    });
  }

  getHobbiesFlashcardsOfUser(){
    this.hobbyService.getHobbiesFlashcardsOfUser(this.profileDTO.userDTO.id).subscribe({

      next: (response) => {
        // in case of success
        console.log(response);
        if(response.hobbies){
          for (let i = 0; i < response.hobbies.length; i++) {
            this.hobbyFlashcardsDTOs.push(response.hobbies[i]);
          }
        }
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get flashcards', error);
      }
    });

  }

  isConnectedUser(): boolean {
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id) == this.profileDTO.userDTO.id
  }

  onSendMessageClicked(): void {
    this.router.navigateByUrl(`messages/${this.profileDTO.userDTO.id}`)
  }

  isFriend(): boolean {
    return this.friendship_status == "friend";
  }

  isWaitingAcceptation(): boolean {
    return this.friendship_status == "waiting"
  }

  onTabChange(tab: string): void {
    this.type = tab.toLowerCase();
    console.log(this.type);
  }


  getID(): number{
    return this.profileDTO.userDTO.id;
  }

  getActivitiesType(): string {
    if(this.isActivityDirector()) {
      return "organized";
    }
    return "participated";
  }

  isActivityDirector(): boolean {
    return this.profileDTO.activityDirector;
  }

  addFriend(): void {
    const id_user = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    this.friendService.addFriend(id_user, this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        if(response=="friend") this.friendship_status = response;
        else console.log("Could not add friend");
        console.log(response);
      },
      error: (error) => {
        console.log("Error adding friend", error)
      }
    });
  }

  removeFriend(): void {
    const id_user = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    this.friendService.removeFriend(id_user, this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        if(response=="success") this.friendship_status = "!friend";
        else console.log("Could not remove friendship");
        console.log(response);
      },
      error: (error) => {
        console.log("Error removing friend", error)
      }
    });
  }


}

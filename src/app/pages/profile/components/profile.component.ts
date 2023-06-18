import {Component} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDTO} from "../../../models/user-dto";
import {ProfileDTO} from "../models/profile-dto";
import {ProfileService} from "../services/profile.service";
import {FriendService} from "../../messages/services/friend.service";
import {HobbyFlashcardDTO} from "../../../models/hobby-flashcard-dto";
import {HobbyDTO} from "../../../models/hobby-dto";
import {HobbyService} from "../../../services/hobby.service";
import {CommunicationService} from "../../../services/communication.service";
import {ActivityService} from "../../../posts/services/activity.service";
import {TabService} from "../../../shared/service/tab.service";
import {Image} from "../../../models/image";
import {imagesUrl} from "../../../services/urls";
import {OrganizationService} from "../../../services/organization.services";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../pages.css']
})
export class ProfileComponent implements Image {

  hobbyFlashcardsDTO: HobbyFlashcardDTO[] = [];
  protected reward: string = "bronze";
  protected type: string = 'posts';
  protected isPartOfOrganization: boolean = false;
  protected isInvited: boolean = false;
  protected isConnectedUserPartOfOrganization: boolean = false;
  protected profileDTO: ProfileDTO = {
    userDTO: new UserDTO(-1, '', ''),
    numPosts: 0,
    numHobbies: 0,
    numFriends: 0,
    activityDirector: false,
    numActivities: 0,
    postsDTO: [],
    hobbiesPostDTO: [],
    activitiesDTO: [],
    favoriteHobby: new HobbyDTO(-1, '', ''),
    hobbiesDTO: []
  }
  private friendship_status: string = "!friend";


  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private hobbyService: HobbyService,
              private friendService: FriendService,
              private communicationService: CommunicationService,
              private organizationService: OrganizationService,
              private activityService: ActivityService,
              private tabService: TabService,
              private router: Router) {
    this.tabService.tabChange$.subscribe(tab => {
      this.onTabChange(tab);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

        this.userService.findUserById(parseInt(params['id'])).subscribe({
          next: (user) => {
            this.profileDTO.userDTO = user;
            if (!this.profileDTO.userDTO) {
              this.router.navigateByUrl('/home');
              return;
            }
            this.getProfileInformation();

            this.friendService.isFriendWith(parseInt(JSON.parse(localStorage.getItem('currentUser')!).id), this.profileDTO.userDTO.id).subscribe({
              next: (response) => {
                console.log(response);
                this.friendship_status = response;
              },
              error: (error) => {
                console.log("Error while finding if the user is friend with another", error)
              }
            });

            this.hobbyService.currentNeedChangeFavorite.subscribe({
              next: (response) => {
                this.profileDTO.favoriteHobby = response;
              }
            });


            this.hobbyService.currentNeedToAddHobby.subscribe({
              next: (response) => {
               this.profileDTO.numHobbies++;
              }
            });

            this.hobbyService.currentDeleteState.subscribe({
              next: (response) => {
                this.profileDTO.numHobbies--;
              }
            });

            this.hobbyService.currentDeleteState.subscribe((data) => {
              console.log("returned Data :" + data);
              this.hobbyFlashcardsDTO.splice(this.findHobbyDTOWithData(data), 1);
              this
            });
          },
          error: (error) => {
            console.log("Error while finding user : ", error)
          }});

      this.userService.findUserById(parseInt(params['id'])).subscribe({
        next: (user) => {
          this.profileDTO.userDTO = user;
          if (!this.profileDTO.userDTO) {
            this.router.navigateByUrl('/home');
            return;

          }
          this.getProfileInformation();

          this.friendService.isFriendWith(parseInt(JSON.parse(localStorage.getItem('currentUser')!).id), this.profileDTO.userDTO.id).subscribe({
            next: (response) => {
              console.log(response);
              this.friendship_status = response;
            },
            error: (error) => {
              console.log("Error while finding if the user is friend with another", error)
            }
          });


          /*this.hobbyService.currentMessage.subscribe((data) => {
            this.hobbyFlashcardsDTO.push(this.hobbyService.getNewPost());
          });*/

          this.hobbyService.currentDeleteState.subscribe((data) => {
            console.log("returned Data :" + data);
            this.hobbyFlashcardsDTO.splice(this.findHobbyDTOWithData(data), 1);
          });
        },
        error: (error) => {
          console.log("Error while finding user : ", error)
        }
      })
    });


  }

  getUserType(): string {
    if (this.isActivityDirector()) return 'Activity Director';
    return 'Classical User';
  }

  findHobbyDTOWithData(id: number) {
    const sizeOfArray: number = this.hobbyFlashcardsDTO.length;
    for (let i = 0; i < sizeOfArray; i++) {
      if (this.hobbyFlashcardsDTO[i].id_hobby_post == id) return i;
    }
    return -1;
  }

  protected onLogout(): void {
    this.userService.logoutUser();
    this.router.navigateByUrl('');
  }

  getProfileInformation(): void {
    this.profileService.getProfileInformation(this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        this.profileDTO = response;
        this.determineReward();
        this.isPartOfAnOrganization();
        this.isInvitedToOrganization();
      },
      error: (error) => {
        console.log('error while accessing to profile information : ', error);
      }
    });
  }

  isConnectedUser(): boolean {
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id) == this.profileDTO.userDTO.id
  }

  isInvitedToOrganization(): void {
    this.userService.findOrganization(this.userService.getCurrentId()).subscribe({
      next: (organization) => {
        this.organizationService.isUserAlreadyInvited(organization.id_organization, this.profileDTO.userDTO.id).subscribe({
          next: (boolean) => {
            this.isInvited = boolean;
          },
          error: (error) => {
            console.log("Can't determine if already invented on organization or not : ", error)
          }
        })
      },
      error: (error) => {
        console.log("Error while finding organization :", error)
      }
    })
  }

  onSendMessageClicked(): void {
    this.router.navigateByUrl(`messages/${this.profileDTO.userDTO.id}`)
  }

  isFriend(): boolean {
    return this.friendship_status == "friend";
  }

  onInviteOrganization(): void {
    this.userService.findOrganization(this.userService.getCurrentId()).subscribe({
      next: (organization) => {
        this.organizationService.addInvitation(organization.id_organization, this.profileDTO.userDTO.id).subscribe({
          next: (response) => {
            console.log("Status of sending of invitation :", response)
          },
          error: (error) => {
            console.log("Error while sending invitation : ", error)
          }
        })
      },
        error: (error) => {
          console.log("Error while finding organization :", error)
      }
    })

  }
  onRemoveInvitationOrganization(): void {
    this.userService.findOrganization(this.userService.getCurrentId()).subscribe({
      next: (organization) => {
        this.organizationService.removeInvitation(organization.id_organization, this.profileDTO.userDTO.id).subscribe({
          next: (response) => {
            console.log("Status of removing of invitation :", response)
          },
          error: (error) => {
            console.log("Error while removing invitation : ", error)
          }
        })
      },
      error: (error) => {
        console.log("Error while finding organization :", error)
      }
    })
  }

  isWaitingAcceptation(): boolean {
    return this.friendship_status == "waiting"
  }

  onTabChange(tab: string): void {
    this.type = tab.toLowerCase();
  }

  getActivitiesType(): string {
    if (this.isActivityDirector()) {
      return "organized";
    }
    return "participated";
  }

  isActivityDirector(): boolean {
    return this.profileDTO.activityDirector;
  }

  isPartOfAnOrganization(): void {
    this.userService.isPartOfAnOrganization(this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        this.isPartOfOrganization = response;
      },
      error: (error) => {
        console.log("Error while finding if part of a organization  : ", error)
      }
    })
  }

  isConnectedUserPartOfAnOrganization(): void {
    this.userService.isPartOfAnOrganization(this.userService.getCurrentId()).subscribe({
      next: (response) => {
        this.isConnectedUserPartOfOrganization = response;
      },
      error: (error) => {
        console.log("Error while finding if part of a organization  : ", error)
      }
    })
  }

  addFriend(): void {
    const id_user = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    this.friendService.addFriend(id_user, this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        if (response == "friend") this.friendship_status = response;
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
        if (response == "success") this.friendship_status = "!friend";
        else console.log("Could not remove friendship");
        console.log(response);
      },
      error: (error) => {
        console.log("Error removing friend", error)
      }
    });
  }

  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

  private determineReward(): void {
    if (this.profileDTO.numActivities > 50) {
      this.reward = "gold"
    } else if (this.profileDTO.numActivities > 25) {
      this.reward = "iron"
    } else if (this.profileDTO.numActivities > 0) {
      this.reward = "bronze"
    } else {
      this.reward = "nothing"
    }
  }


}

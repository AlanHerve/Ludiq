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
/**
 * Class that represents the component of a profile
 */
export class ProfileComponent implements Image {

  // A profile component has an array of hobby flashcards
  hobbyFlashcardsDTO: HobbyFlashcardDTO[] = [];
  protected reward: string = "bronze";
  protected type: string = 'posts';
  protected isPartOfOrganization: boolean = false;
  protected isInvited: boolean = false;
  protected isConnectedUserPartOfOrganization: boolean = false;
  // And a profile owns all these information :
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
  // boolean that checks the friendship status with the profile that we are currently seeing
  private friendship_status: string = "!friend";


  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private hobbyService: HobbyService,
              private friendService: FriendService,
              private organizationService: OrganizationService,
              private activityService: ActivityService,
              private tabService: TabService,
              private router: Router) {
    // Observable that is subscribing to the binder in order to check if the tab has been switch
    this.tabService.tabChange$.subscribe(tab => {
      // If this is the case, we switch to the new tab in order to display the new section
      this.onTabChange(tab);
    });
  }

  ngOnInit() {
    // This allows to subscribe to the current route the user is
    this.activatedRoute.params.subscribe(params => {
      // thanks to that, we can access to the user's profile that with the user id that is situated on the route of the page with params['id']
        this.userService.findUserById(parseInt(params['id'])).subscribe({
          // In case of success :
          next: (user) => {
            // We implement the information of the profile that are collected from the backend
            this.profileDTO.userDTO = user;
            // If the profile doesn't exist, we need to redirect the user to the section home
            if (!this.profileDTO.userDTO) {
              this.router.navigateByUrl('/home');
              return;
            }
            // Otherwise, we call the method to get the profile information :
            this.getProfileInformation();

            // Then, we check if the user is friend with the user of the profile
            this.friendService.isFriendWith(parseInt(JSON.parse(localStorage.getItem('currentUser')!).id), this.profileDTO.userDTO.id).subscribe({
              next: (response) => {
                // We collect this information on the friendship status
                this.friendship_status = response;
              },
              error: (error) => {
                // If there is an error, we display it
                console.error("Error while finding if the user is friend with another", error)
              }
            });

            // Observable that checks if the favorite hobby is modified to display it again dynamicly without refreshing the page
            this.hobbyService.currentNeedChangeFavorite.subscribe({
              next: (response) => {
                this.profileDTO.favoriteHobby = response;
              }
            });

            // We do the same for the number of hobbies increased when adding a new one
            this.hobbyService.currentNeedToAddHobby.subscribe({
              next: (response) => {
               this.profileDTO.numHobbies++;
              }
            });

            // And for deleting
            this.hobbyService.currentDeleteState.subscribe({
              next: (response) => {
                this.profileDTO.numHobbies--;
              }
            });

            this.hobbyService.currentDeleteState.subscribe((data) => {
              this.hobbyFlashcardsDTO.splice(this.findHobbyDTOWithData(data), 1);
            });
          },
          error: (error) => {
            console.log("Error while finding user : ", error)
          }});
    });


  }

  /**
   * Method that returns the type of user : activity director or classical user
   */
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

  /**
   * Method that disconnects the user when clicking on the disconnect button
   *
   * @protected
   */
  protected onLogout(): void {
    this.userService.logoutUser();
    this.router.navigateByUrl('');
  }

  /**
   * Method that get all the information of the user (number of hobbies, posts, activities, posts, hobbiesFlashcards...)
   */
  getProfileInformation(): void {
    this.profileService.getProfileInformation(this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        this.profileDTO = response;

        // After getting all information about the profile, we determine the type of reward of the user :
        this.determineReward();
        // Then, we determine if he is part of an organization
        this.isPartOfAnOrganization();
        // If he is invited to an organization
        this.isInvitedToOrganization();
        // And finally, if the user connected if part of an organization
        this.isConnectedUserPartOfAnOrganization();
      },
      error: (error) => {
        console.log('error while accessing to profile information : ', error);
      }
    });
  }

  /**
   * Method that determine if the user watching the profile is the connected user or not
   * @return boolean
   */
  isConnectedUser(): boolean {
    return parseInt(JSON.parse(localStorage.getItem('currentUser')!).id) == this.profileDTO.userDTO.id
  }

  /**
   * Method that determines if the profile user is invited to the organization
   */
  isInvitedToOrganization(): void {
    // We find the organization of the user that is navigating on the current profile
    this.userService.findOrganization(this.userService.getCurrentId()).subscribe({
      next: (organization) => {
        // Then, we check if the user is already invited to the organization or not
        this.organizationService.isUserAlreadyInvited(organization.id_organization, this.profileDTO.userDTO.id).subscribe({
          next: (boolean) => {
            // We stock the boolean returned by the backend
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

  /**
   * Method that redirects the user on the message conversation when clicking on the button
   */
  onSendMessageClicked(): void {
    this.router.navigateByUrl(`messages/${this.profileDTO.userDTO.id}`)
  }

  /**
   * Method that returns if the user is friend with the profile user
   * @return boolean
   */
  isFriend(): boolean {

    return this.friendship_status == "friend";
  }



  /**
   * Method that invite the profile user to the organization of the user who looks at the profile
   */
  onInviteOrganization(): void {
    this.userService.findOrganization(this.userService.getCurrentId()).subscribe({
      next: (organization) => {
        // We add the invitation with the id of the organization and the profile user id
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
          console.error("Error while finding organization :", error)
      }
    })

  }

  /**
   * Method that removes the invitation of the profile user to an organization
   */
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

  /**
   * Method that returns if the user didn't accept the invitation of being friend for the moment
   * @return boolean
   */
  isWaitingAcceptation(): boolean {
    return this.friendship_status == "waiting";
  }

  /**
   * Method that changes the section of the profile
   * @param tab
   */
  onTabChange(tab: string): void {
    this.type = tab.toLowerCase();
  }

  /**
   * Method that returns the type of activites of the user. If he is activity director, it will display the number of activities organized. Otherwise, it will display the number of activities participated
   */
  getActivitiesType(): string {
    if (this.isActivityDirector()) {
      return "organized";
    }
    return "participated";
  }

  /**
   * Method that returns if the profile user is activity director
   */
  isActivityDirector(): boolean {
    return this.profileDTO.activityDirector;
  }

  /**
   * Method that determines if the profile user is part of an organization
   */
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

  /**
   * Method that determines if the connected user is part of an organization
   */
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

  /**
   * Method that add a new friend
   */
  addFriend(): void {
    // We collect the user currently connected on the website
    const id_user = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    // We add a new friend request :
    this.friendService.addFriend(id_user, this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        if (response == "waiting") this.friendship_status = response;
        else console.error("Could not add friend " + response);

      },
      error: (error) => {
        console.log("Error adding friend", error)
      }
    });
  }

  /**
   * Method that removes a friend
   */
  removeFriend(): void {
    const id_user = parseInt(JSON.parse(localStorage.getItem('currentUser')!).id);
    // Same process as adding a friend, but with the remove method
    this.friendService.removeFriend(id_user, this.profileDTO.userDTO.id).subscribe({
      next: (response) => {
        if (response == "success") this.friendship_status = "!friend";
        else console.error("Could not remove friendship");

      },
      error: (error) => {
        console.error("Error removing friend", error)
      }
    });
  }

  /**
   * Method that load the image of the user profile
   * @param image
   */
  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

  /**
   * Method that determines the reward of the user
   * @private
   */
  private determineReward(): void {
    // If the user has organized/participated more than 50 activities, he has a gold reward displayed on profile
    if (this.profileDTO.numActivities > 50) {
      this.reward = "gold"
    }
    // Otherwise, if he has 25, we add a iron medal
    else if (this.profileDTO.numActivities > 25) {
      this.reward = "iron"
    }
    // And so on
    else if (this.profileDTO.numActivities > 0) {
      this.reward = "bronze"
    } else {
      this.reward = "nothing"
    }
  }


}

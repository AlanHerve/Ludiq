import {Component} from '@angular/core';
import {OrganizationDTO} from "../../../models/organization-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationService} from "../../../services/organization.services";
import {UserService} from "../../../services/user.service";
import {TabService} from "../../../shared/service/tab.service";
import {imagesUrl} from "../../../services/urls";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css', '../../pages.css']
})
export class OrganizationComponent {

  organizationDTO: OrganizationDTO = {
    id_organization: 0,
    postsDTO: [],
    name_organization: '',
    avatar: '',
    description: '',
    activitiesDTO: []

  }

  protected type: string = 'posts';

  private validAct: boolean = false;

  protected activityDirector: boolean = false;
  protected isInvited: boolean = false;
  protected isOnOrganization: boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
              private organisationService: OrganizationService,
              private userService: UserService,
              private tabService: TabService,
              private router: Router) {
    this.tabService.tabChange$.subscribe(tab => {
      this.onTabChange(tab);
    });
  }

  /**
   *  Method used to return an image with its url
   * @param image
   */
  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

  /**
   * Method used to change the tab between posts and activities
   * @param tab
   */
  onTabChange(tab: string): void {
    this.type = tab.toLowerCase();
    console.log(this.type);
  }


  ngOnInit() {
    // get the organization id from the url params
    this.activatedRoute.params.subscribe(params => {
      this.organizationDTO.id_organization = parseInt(params['id']);
      // get the organization information from its ID
      this.organisationService.getOrganizationById(this.organizationDTO.id_organization).subscribe({
        next: (response) => {
          // in case of success
          this.organizationDTO = response;
          // We redirect if the organization doesn't exist
          if(!this.organizationDTO || this.organizationDTO.id_organization == 1) this.router.navigateByUrl("/home");
        },
        error: (error) => {
          // in case of failure
          console.error('Could not get user info', error);
        }
      });
      // Used to fetch all the posts done by members of an organization
      this.organisationService.fetchOrganizationPosts(this.organizationDTO.id_organization).subscribe({
        next: (response) => {
          if(response[0].id != -1)
          this.organizationDTO.postsDTO = response;
        }
      });
      // Used to fetch all the activities done by members of an organizaton
      this.organisationService.fetchOrganizationActivities(this.organizationDTO.id_organization).subscribe({
        next: (response) => {
          if(response[0].id !=-1 ){
            this.organizationDTO.activitiesDTO = response;
            this.validAct = true;
          }

        }
      });
      // We do different checks about the user to see if he is an activity director, if he is in an organization or if he has been invited to one
      this.isActivityDirector();
      this.isUserInvited();
      this.isOnThisOrganization();
    });

  }

  /**
   * Method that
   */
  isPartOfOrganization(): boolean {
    return this.userService.isPartOfOrganization(this.organizationDTO.id_organization);
  }

  /**
   * Method that
   */
  isOnThisOrganization(): void {
    this.organisationService.isOnThisOrganization(this.organizationDTO.id_organization, this.userService.getCurrentId()).subscribe({
      next: (bool) => {
        this.isOnOrganization = bool;
      },
      error: (error) => {
        console.log("Error while finding if activity director is already on this organization ", error)
      }
    });
  }

  /**
   * Method that checks if an user is an activity director, which means he can create activities
   */
  isActivityDirector(): void {
    this.userService.isActivityDirector(this.userService.getCurrentId()).subscribe({
      next: (bool) => {
        this.activityDirector = bool;
        console.log("poney aaa", this.activityDirector);
      },
      error: (error) => {
        console.log("Error while finding if activity director or not ", error)
      }
    })
  }



  validActivities() {
    return this.validAct;
  }
  isUserInvited(): void {
    this.organisationService.isUserAlreadyInvited(this.organizationDTO.id_organization, this.userService.getCurrentId()).subscribe({
      next: (bool) => {
        this.isInvited = bool;
      },
      error: (error) => {
        console.log("Error while finding if activity director is invited ", error)
      }
    });
  }

  onAcceptInvitation() {
    this.organisationService.acceptInvitation(this.organizationDTO.id_organization, this.userService.getCurrentId()).subscribe({
      next: (bool) => {
        console.log("status : ", bool)
      },
      error: (error) => {
        console.log("Error while finding if activity director is invited ", error)
      }
    });

  }

  onQuitOrganization() {
    this.organisationService.quitOrganization(this.organizationDTO.id_organization, this.userService.getCurrentId()).subscribe({
      next: (bool) => {
        console.log("status : ", bool)
      },
      error: (error) => {
        console.log("Error while quitting organization ", error)
      }
    });
  }
}

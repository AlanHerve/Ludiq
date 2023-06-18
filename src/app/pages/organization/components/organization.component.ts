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

  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

  onTabChange(tab: string): void {
    this.type = tab.toLowerCase();
    console.log(this.type);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.organizationDTO.id_organization = parseInt(params['id']);
      this.organisationService.getOrganizationById(this.organizationDTO.id_organization).subscribe({
        next: (response) => {
          // in case of success
          this.organizationDTO = response;
          if(!this.organizationDTO || this.organizationDTO.id_organization == 1) this.router.navigateByUrl("/home");
        },
        error: (error) => {
          // in case of failure
          console.error('Could not get user info', error);
        }
      });
      this.organisationService.fetchOrganizationPosts(this.organizationDTO.id_organization).subscribe({
        next: (response) => {
          if(response[0].id != -1)
          this.organizationDTO.postsDTO = response;
        }
      });
      this.organisationService.fetchOrganizationActivities(this.organizationDTO.id_organization).subscribe({
        next: (response) => {
          console.log("zeng");
          if(response[0].id !=-1 ){
            this.organizationDTO.activitiesDTO = response;
            this.validAct = true;
          }



        }
      });

      this.isActivityDirector();
      this.isUserInvited();
      this.isOnThisOrganization();
    });

  }

  isPartOfOrganization(): boolean {
    return this.userService.isPartOfOrganization(this.organizationDTO.id_organization);
  }

  isOnThisOrganization(): void {
    this.organisationService.isOnThisOrganization(this.organizationDTO.id_organization, this.userService.getCurrentId()).subscribe({
      next: (bool) => {
        this.isOnOrganization = bool;
      },
      error: (error) => {
        console.log("Error while finding if activity director is alreay on this organization ", error)
      }
    });
  }

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

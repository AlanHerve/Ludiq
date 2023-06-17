import {Component} from '@angular/core';
import {OrganizationDTO} from "../../../models/organization-dto";
import {ActivatedRoute} from "@angular/router";
import {OrganizationService} from "../../../services/organization.services";
import {UserService} from "../../../services/user.service";
import {TabService} from "../../../shared/service/tab.service";

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

  constructor(private activatedRoute: ActivatedRoute,
              private organisationService: OrganizationService,
              private userService: UserService,
              private tabService: TabService) {
    this.tabService.tabChange$.subscribe(tab => {
      this.onTabChange(tab);
    });
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
          console.log(response)
          console.log(response.name_organization);
        },
        error: (error) => {
          // in case of failure
          console.error('Could not get user info', error);
        }
      });
      this.organisationService.fetchOrganizationPosts(this.organizationDTO.id_organization).subscribe({
        next: (response) => {
          this.organizationDTO.postsDTO = response;
        }
      });
      this.organisationService.fetchOrganizationActivities(this.organizationDTO.id_organization).subscribe({
        next: (response) => {
          this.organizationDTO.activitiesDTO = response;
        }
      });
    });

  }

  onSwitchTo(type: string): void {
    this.type = type;
  }

  isPartOfOrganization() {
    this.userService.isPartOfOrganization(this.organizationDTO.id_organization);
  }


}

import { Component } from '@angular/core';
import {OrganizationDTO} from "../../../models/organization-dto";
import {ActivatedRoute} from "@angular/router";
import {OrganizationService} from "../../../services/organization.services";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css',  '../../pages.css']
})
export class OrganizationComponent {

  organizationDTO: OrganizationDTO = {
    id_organization: 0,
    postsDTO: [],
    name_organization: '',
    avatar: '',
    description: ''
  }

  protected type: string = 'posts';
  constructor(private activatedRoute: ActivatedRoute,
              private organisationService: OrganizationService,
              private userService: UserService) {

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.organizationDTO.id_organization = parseInt(params['id']);

      this.organisationService.getOrganzationById(this.organizationDTO).subscribe({

        next: (response) => {
          // in case of success

          this.organizationDTO = response.organization;

          console.log(response.organization.name_organization);
        },
        error: (error) => {
          // in case of failure
          console.error('Could not get user info', error);
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

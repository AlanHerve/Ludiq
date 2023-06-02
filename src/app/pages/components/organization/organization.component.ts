import { Component } from '@angular/core';
import {OrganizationDTO} from "../../../models/organization-dto";

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {

  organizationDTO: OrganizationDTO = {
    id_organization: 0,
    name_organization: '',
    avatar: ''
  }
  constructor() {

  }


}

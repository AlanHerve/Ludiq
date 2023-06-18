import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrganizationDTO} from "../../../models/organization-dto";

@Component({
  selector: 'app-organization-button',
  templateUrl: './organization-button.component.html',
  styleUrls: ['./organization-button.component.css']
})
/**
 * Class that represent the component of a organization button
 * When clicking on it, it allows to navigate directly to the url of the organization
 */
export class OrganizationButtonComponent implements OnInit{

  // An input of a organization is stocked on this component
  @Input() organizationDTO! : OrganizationDTO

  constructor(private router: Router) {  }

  /**
   * Method that redirects the user to the page of the organization when clicking on the button
   */
  onClick(): void {
    this.router.navigateByUrl(`/organization/${this.organizationDTO.id_organization}`)
  }

  ngOnInit(): void {
  }


}

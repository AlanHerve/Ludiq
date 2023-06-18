import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserService} from "../../../services/user.service";
import {Form} from "../../models/form";
import {OrganizationDTO} from "../../../models/organization-dto";
import {OrganizationService} from "../../../services/organization.services";
@Component({
  selector: 'app-form-create-organization',
  templateUrl: './form-create-organization.component.html',
  styleUrls: ['./form-create-organization.component.css' , '../../../ludiq-forms/ludiq-forms.css']
})
export class FormCreateOrganizationComponent extends Form implements OnInit {
  organizationForm!: FormGroup;
  organizationDTO: OrganizationDTO = {
    id_organization: -1,
    name_organization: '',
    description: '',
    avatar: '',
    postsDTO: [],
    activitiesDTO: []
  };

  constructor(router: Router, location: Location,
              private organizationService: OrganizationService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    super(router, location);
  }

  ngOnInit(): void {
    // Create the organization form with validators
    this.organizationForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required]
      }
    );
  }

  onCreateOrganization(): void {
    // Update the organizationDTO object with form values
    this.organizationDTO.name_organization = this.organizationForm.value.name;
    this.organizationDTO.description = this.organizationForm.value.description;

    // Call the organization service to add the organization
    this.organizationService.addOrganization(this.organizationDTO, this.userService.getCurrentId()).subscribe({
      next: (response) => {
        // Log the successful creation of the organization
        console.log("Created a new organization : ", response);
      },
      error: (error) => {
        // Log any error that occurred during organization creation
        console.log("Error while creating a new organization : ", error);
      }
    })
  }
}

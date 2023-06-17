import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../custom-validators";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserService} from "../../../services/user.service";
import {Form} from "../../models/form";
import {OrganizationDTO} from "../../../models/organization-dto";

@Component({
  selector: 'app-form-create-organization',
  templateUrl: './form-create-organization.component.html',
  styleUrls: ['./form-create-organization.component.css' , '../../../ludiq-forms/ludiq-forms.css']
})
export class FormCreateOrganizationComponent extends Form implements OnInit {
  organizationForm!: FormGroup;
  organizationDTO!: OrganizationDTO;

  constructor(router: Router, location: Location,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    super(router, location);
  }

  ngOnInit(): void {
    this.organizationForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required]
      }
    );
  }

  onCreateOrganization(): void {

  }


}

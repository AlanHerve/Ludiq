import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrganizationDTO} from "../../../models/organization-dto";

@Component({
  selector: 'app-organization-button',
  templateUrl: './organization-button.component.html',
  styleUrls: ['./organization-button.component.css']
})
export class OrganizationButtonComponent implements OnInit{
  @Input() organizationDTO! : OrganizationDTO

  constructor(private router: Router) {  }

  onClick(): void {
    this.router.navigateByUrl(`home/hobby/${this.organizationDTO.id_organization}`)
  }

  ngOnInit(): void {
  }


}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HobbyService} from "../../../../services/hobby.service";
import {UserDTO} from "../../../../models/user-dto";
import {OrganizationService} from "../../../../services/organization.services";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  @Input() id_hobby!: number;
  @Input() id_organization!: number;

  protected usersDTO: UserDTO[] = [];
  protected text!: string;

  constructor(private hobbyService: HobbyService,
              private organizationService: OrganizationService) {
  }

  ngOnInit(): void {
    if(this.id_hobby) {
      this.displayHobbyUsers();
      this.text = "hobby"
    }
    else {
      this.displayOrganizationUsers();
      this.text = "organization"
    }
  }

  displayHobbyUsers() {
    if(!this.id_hobby) return;
    this.hobbyService.getHobbyUsers(this.id_hobby).subscribe({
      next: (response) => {
        this.usersDTO = response;
        console.log("Successfully accessed to users that are related to this hobby : ", this.id_hobby);
      },
      error: (error) => {
        console.log("Error while trying to finding users that are related to this hobby : ", this.id_hobby, " : ", error);
      }
    });
  }

  displayOrganizationUsers() {
    if(!this.id_organization) return;
    this.organizationService.getOrganizationUsers(this.id_organization).subscribe({
      next: (response) => {
        this.usersDTO = response;
        console.log("Successfully accessed to users of that organization : ", this.id_organization);
      },
      error: (error) => {
        console.log("Error while trying to find organization users : ", this.id_organization, " : ", error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id_hobby']) {
      this.displayHobbyUsers();
    }
    if (changes['id_organization']) {
      this.displayOrganizationUsers();
    }
  }
}

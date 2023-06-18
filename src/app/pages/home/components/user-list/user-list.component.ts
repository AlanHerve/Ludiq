import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HobbyService} from "../../../../services/hobby.service";
import {UserDTO} from "../../../../models/user-dto";
import {OrganizationService} from "../../../../services/organization.services";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
/**
 * Class that represents a list of user components
 */
export class UserListComponent implements OnInit, OnChanges {

  @Input() id_hobby!: number;
  @Input() id_organization!: number;

  protected usersDTO: UserDTO[] = [];
  protected text!: string;

  constructor(private hobbyService: HobbyService,
              private organizationService: OrganizationService) {
  }

  ngOnInit(): void {
    // Depending on the input that isn't null, we display the users
    // It allows to display users of a certain hobby, or users of a certain organization
    if(this.id_hobby) {
      this.displayHobbyUsers();
      this.text = "hobby"
    }
    else {
      this.displayOrganizationUsers();
      this.text = "organization"
    }
  }

  /**
   * Method that displays users of a certain hobby
   */
  displayHobbyUsers() {
    if(!this.id_hobby) return;
    // We get the hobby users
    this.hobbyService.getHobbyUsers(this.id_hobby).subscribe({
      next: (response) => {
        // We stock them into the usersDTO array
        this.usersDTO = response;
        console.log("Successfully accessed to users that are related to this hobby : ", this.id_hobby);
      },
      error: (error) => {
        console.log("Error while trying to finding users that are related to this hobby : ", this.id_hobby, " : ", error);
      }
    });
  }

  /**
   * Method that displays users of a certain organization
   */
  displayOrganizationUsers() {
    if(!this.id_organization) return;
    // We do the same as hobbyUsers
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

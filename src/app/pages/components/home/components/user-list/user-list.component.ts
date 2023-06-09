import {Component, Input, OnInit} from '@angular/core';
import {HobbyService} from "../../../../../services/hobby.service";
import {UserDTO} from "../../../../../models/user-dto";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() id_hobby!: number;

  protected usersDTO: UserDTO[] = [];

  constructor(private hobbyService: HobbyService) {
  }

  ngOnInit(): void {
    this.displayHobbyUsers();
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
}

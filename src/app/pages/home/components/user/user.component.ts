import {Component, Input} from '@angular/core';
import {UserDTO} from "../../../../models/user-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input() userDTO!: UserDTO;

  constructor(private router: Router) {
  }

  onUserClicked(): void {
    this.router.navigateByUrl(`/profile/${this.userDTO.id}`)
  }

}

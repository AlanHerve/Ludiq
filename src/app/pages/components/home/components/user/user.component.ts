import {Component, Input} from '@angular/core';
import {UserDTO} from "../../../../../models/user-dto";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input() userDTO!: UserDTO;

}

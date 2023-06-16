import {Component, Input} from '@angular/core';
import {UserDTO} from "../../../../models/user-dto";
import {Router} from "@angular/router";
import {Image} from "../../../../models/image";
import {imagesUrl} from "../../../../services/urls";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements Image {

  @Input() userDTO!: UserDTO;

  constructor(private router: Router) {
  }

  onUserClicked(): void {
    this.router.navigateByUrl(`/profile/${this.userDTO.id}`)
  }

  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

}

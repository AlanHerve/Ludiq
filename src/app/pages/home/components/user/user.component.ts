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
/**
 * Component that represents a user, implementing Image inteface in order to display user image
 */
export class UserComponent implements Image {

  @Input() userDTO!: UserDTO;

  constructor(private router: Router) {
  }

  /**
   * Method that redirects to user to the page of his profile
   */
  onUserClicked(): void {
    this.router.navigateByUrl(`/profile/${this.userDTO.id}`)
  }

  /**
   * Method that load the image of the user
   * @param image
   */
  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

}

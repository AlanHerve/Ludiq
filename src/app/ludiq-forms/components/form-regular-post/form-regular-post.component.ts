import {Component} from '@angular/core';
import {RegularPostDTO} from "../../../models/regular-post-dto";
import {RegularPostService} from "../../../services/regular-post.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-form-regular-post',
  templateUrl: './form-regular-post.component.html',
  styleUrls: ['./form-regular-post.component.css', '../../ludiq-forms.css']
})
export class FormRegularPostComponent {


  previousRoute: string = '';
  regularPostDTO: RegularPostDTO = {
    id_regular_post: null,
    id_user: 1,
    id_hobby: 1,
    images: [null, null, null, null],
    likes: 0,
    description: 'this is a test',
    time: '',
    modified: ''
  }

  constructor(private regularPostService: RegularPostService,
              private router: Router,
              private location: Location) {
    this.previousRoute = this.getPreviousRoute();
  }

  /**
   * Method that closes the pop-up by clicking on the cross
   */
  onClose(): void {
    // Coming back to the previous section
    if (this.previousRoute) {
      this.router.navigateByUrl(this.previousRoute);
    }
  }

  isFileSelected(index: number): boolean {
    console.log("hehe");
    return this.regularPostDTO.images[index] != null;
  }

  onFileSelected(event: any, index: number): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.regularPostDTO.images[index] = 'image';
    };

    reader.readAsDataURL(file);
  }

  newRegularPost() {
    this.regularPostService.newRegularPost(this.regularPostDTO).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log('Post avec succès', response);
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur post : ', error);
      }
    })

    this.regularPostDTO.description = '';
  }

  /**
   * Method that returns the previous route of the current url
   * @private
   */
  private getPreviousRoute(): string {
    const currentUrl = this.location.path();

    return currentUrl.slice(0, currentUrl.lastIndexOf('/'));
  }
}

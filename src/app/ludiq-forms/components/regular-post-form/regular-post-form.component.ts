import { Component } from '@angular/core';
import {RegularPostDto} from "../../../models/regular-post-dto";
import {RegularPostService} from "../../../services/regular-post.service";

@Component({
  selector: 'app-regular-post-form',
  templateUrl: './regular-post-form.component.html',
  styleUrls: ['./regular-post-form.component.css', '../../ludiq-forms.css']
})
export class RegularPostFormComponent {

  regularPostDTO: RegularPostDto = {
    id_user: '1',
    id_hobby: '1',
    id_regular_post: '',
    images: [null, null, null, null],
    likes: '',
    description: 'this is a test',
    time: '',
    modified: ''
  }

  constructor(private regularPostService: RegularPostService) {
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

    this.regularPostDTO.description ='';
  }

}

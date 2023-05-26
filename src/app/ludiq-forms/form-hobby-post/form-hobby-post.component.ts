import { Component } from '@angular/core';
import {RegularPostService} from "../../services/regular-post.service";
import {RegularPostDto} from "../../models/regular-post-dto";

@Component({
  selector: 'app-form-hobby-post',
  templateUrl: './form-hobby-post.component.html',
  styleUrls: ['./form-hobby-post.component.css']
})
export class FormHobbyPostComponent {

  hobbies : string[] = ["potterie", "dessin", "velo", "marche"];

  selection!: string;

  regularPostDTO: RegularPostDto = {
    id_user: '',
    id_hobby: '',
    id_regular_post: '',
    images: ['', '', '', ''],
    likes: '',
    description: 'this is a test',
    time: '',
    modified: ''
  }

  constructor(private regularPostService: RegularPostService) {
  }



  submitted() {
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
  }
}

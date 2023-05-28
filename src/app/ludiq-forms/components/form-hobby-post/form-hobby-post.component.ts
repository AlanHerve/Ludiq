import { Component } from '@angular/core';
import {PostsService} from "../../../../app/posts/posts.service";
import {RegularPostDTO} from "../../../models/regular-post-dto";

@Component({
  selector: 'app-form-hobby-posts',
  templateUrl: './form-hobby-post.component.html',
  styleUrls: ['./form-hobby-post.component.css',  '../../ludiq-forms.css']
})
export class FormHobbyPostComponent {

  hobbies : string[] = ["potterie", "dessin", "velo", "marche"];

  selection!: string;

  regularPostDTO: RegularPostDTO = {
    id_user: null,
    id_hobby: null,
    id_regular_post: null,
    images: [null, null, null, null],
    likes: 0,
    description: 'this is a test',
    time: '',
    modified: ''
  }

  constructor(private postsService: PostsService) {
  }

  submitted() {
    /*this.postsService.newRegularPost(this.regularPostDTO).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log('Post avec succès', response);
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur post : ', error);
      }
    })*/
  }
}

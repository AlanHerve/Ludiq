import { Component } from '@angular/core';
import {PostsService} from "../../../../app/posts/posts.service";
import {RegularPostDTO} from "../../../models/regular-post-dto";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-form-hobby-posts',
  templateUrl: './form-hobby-post.component.html',
  styleUrls: ['./form-hobby-post.component.css',  '../../ludiq-forms.css'],
  animations:[
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('200ms')),
    ]),
    trigger('fadeOut', [
      state('*', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => void', animate('200ms')),
    ])
  ]
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

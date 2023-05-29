import {Component} from '@angular/core';
import {RegularPostDTO} from "../../../models/regular-post-dto";
import {PostsService} from "../../../posts/posts.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-form-regular-post',
  templateUrl: './form-regular-post.component.html',
  styleUrls: ['./form-regular-post.component.css', '../../ludiq-forms.css'],
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
export class FormRegularPostComponent {
  index: number = 0;

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

  constructor(private postsService: PostsService,
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.regularPostDTO.images[this.index] = file;
      if (this.index < this.regularPostDTO.images.length) {
        const labelElement = document.querySelectorAll('.file-input-label')[this.index];
        labelElement?.classList.add('selected');
        this.index++;
      }
    };

    reader.readAsDataURL(file);
  }

  onRemoveImage(image: string) {
    const index = this.regularPostDTO.images.findIndex(img => img?.name === image);
    if (index !== -1) {
      this.regularPostDTO.images[index] = null;
      this.index--;
    }

    for (let i = index; i < this.regularPostDTO.images.length; i++) {
      if (i === this.regularPostDTO.images.length - 1) {
        this.regularPostDTO.images[3] = null;
      } else {
        this.regularPostDTO.images[i] = this.regularPostDTO.images[i + 1];
      }
    }
    console.log(this.regularPostDTO.images);
  }


  newRegularPost() {
    const formData = new FormData();

    formData.append('regularPostDTO', JSON.stringify(this.regularPostDTO));
    for (let i = 0; i < this.regularPostDTO.images.length; i++) {
      const file = this.regularPostDTO.images[i];
      // @ts-ignore
      if(file != null)  formData.append('images[]', file, file.name);
    }

    this.postsService.newRegularPost(formData).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log('Post avec succès', response);
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur post : ', error);
      }
    });
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

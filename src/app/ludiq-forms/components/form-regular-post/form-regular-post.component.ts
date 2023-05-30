import {Component, OnInit} from '@angular/core';
import {PostDTO} from "../../../posts/models/post-dto";
import {PostsService} from "../../../posts/services/posts.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {Form} from "../../models/form";

@Component({
  selector: 'app-form-regular-post',
  templateUrl: './form-regular-post.component.html',
  styleUrls: ['./form-regular-post.component.css', '../../ludiq-forms.css']
})
export class FormRegularPostComponent extends Form implements OnInit {
  index: number = 0;

  regularPostDTO: PostDTO = {
    id_regular_post: null,
    id_user: 1,
    id_hobby: 1,
    images: [null, null, null, null],
    likes: 0,
    description: 'this is a test',
    time: '',
    modified: 0,
    files: []
  }

  ngOnInit() {
  }

  constructor(private postsService: PostsService,
              router: Router,
              location: Location) {
    super(router, location);
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.regularPostDTO.images[this.index] = file.name;
      if (this.index < this.regularPostDTO.images.length) {
        const labelElement = document.querySelectorAll('.file-input-label')[this.index];
        labelElement?.classList.add('selected');
        this.index++;
      }
    };

    reader.readAsDataURL(file);
  }

  onRemoveImage(image: string) {
    const index = this.regularPostDTO.images.findIndex(img => img === image);
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


  newPost() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('id_user', this.regularPostDTO.id_user.toString());
    // @ts-ignore
    formData.append('id_hobby', this.regularPostDTO.id_hobby.toString());
    formData.append('description', this.regularPostDTO.description);
    for (let i = 0; i < this.regularPostDTO.images.length; i++) {
      const file = this.regularPostDTO.images[i];
      // @ts-ignore
      if(file != null)  formData.append('images[]', file, file.name);
    }

    this.postsService.newPost(formData).subscribe({
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

}

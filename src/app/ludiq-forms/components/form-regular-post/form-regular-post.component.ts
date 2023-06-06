import {Component, OnInit} from '@angular/core';
import {PostDTO} from "../../../posts/models/post-dto";
import {PostsService} from "../../../posts/services/posts.service";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {Form} from "../../models/form";
import { animate, state, style, transition, trigger } from '@angular/animations';
import {HobbyService} from "../../../services/hobby.service";
import {HobbyDTO} from "../../../models/hobby-dto";
import {UserService} from "../../../services/user.service";
import {UserDTO} from "../../../models/user-dto";


@Component({
  selector: 'app-form-regular-post',
  templateUrl: './form-regular-post.component.html',
  styleUrls: ['./form-regular-post.component.css', '../../ludiq-forms.css'],
  animations: [
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
export class FormRegularPostComponent extends Form implements OnInit {
  index: number = 0;

  hobbies : HobbyDTO[] = [];

  postDTO: PostDTO = {
    id: -1,
    userDTO: new UserDTO(-1, '', ''),
    hobbyDTO: new HobbyDTO(-1, '', ''),
    images: [null, null, null, null],
    likes: 0,
    description: '',
    time: '',
    modified: 0,
    files: []
  }

  ngOnInit() {
    this.userService.findUserById(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (response) => {
        this.postDTO.userDTO = response;
        this.getUserHobbies();
      }
    })
  }

  constructor(private postsService: PostsService,
              private hobbyService: HobbyService,
              private userService: UserService,
              router: Router,
              location: Location) {
    super(router, location);
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.postDTO.images[this.index] = file.name;
      if (this.index < this.postDTO.images.length) {
        const labelElement = document.querySelectorAll('.file-input-label')[this.index];
        labelElement?.classList.add('selected');
        this.index++;
      }
    };

    reader.readAsDataURL(file);
  }

  onRemoveImage(image: string) {
    const index = this.postDTO.images.findIndex(img => img === image);
    if (index !== -1) {
      this.postDTO.images[index] = null;
      this.index--;
    }

    for (let i = index; i < this.postDTO.images.length; i++) {
      if (i === this.postDTO.images.length - 1) {
        this.postDTO.images[3] = null;
      } else {
        this.postDTO.images[i] = this.postDTO.images[i + 1];
      }
    }
    console.log(this.postDTO.images);
  }

  getUserHobbies(){
    this.hobbyService.getHobbiesOfUser(this.postDTO.userDTO.id).subscribe({
      next: (response) => {
        // in case of success
        for (let i = 0; i < response.length; i++) {
          this.hobbies.push(response[i]);
        }
      },
      error: (error) => {
        // in case of failure
        console.error('Could not get all hobbies', error);
      }
    });
  }

  newRegularPost() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('id_hobby', this.postDTO.hobbyDTO.id);
    // @ts-ignore
    formData.append('id_user', this.postDTO.userDTO.id);
    formData.append('user_name', this.postDTO.userDTO.name);
    formData.append('user_username', this.postDTO.userDTO.username);
    formData.append('description', this.postDTO.description);
    for (let i = 0; i < this.postDTO.images.length; i++) {
      const file = this.postDTO.images[i];
      // @ts-ignore
      if(file != null)  formData.append('images[]', file, file.name);
    }

    this.postsService.newPost(formData).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log('Post avec succès', response);
        this.onClose();
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Erreur post : ', error);
      }
    });
  }

}

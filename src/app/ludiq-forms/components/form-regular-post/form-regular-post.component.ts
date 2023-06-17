import {Component, OnInit} from '@angular/core';
import {PostDTO} from "../../../posts/models/post-dto";
import {PostService} from "../../../posts/services/post.service";
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

  imagesData: (File|null)[] = [];

  postDTO: PostDTO = {
    id: -1,
    userDTO: new UserDTO(-1, '', ''),
    hobbyDTO: new HobbyDTO(-1, '', ''),
    likes: 0,
    description: '',
    time: '',
    modified: 0,
    images: [null, null, null, null]
  }

  ngOnInit() {
    this.userService.findUserById(JSON.parse(localStorage.getItem('currentUser')!).id).subscribe({
      next: (response) => {
        this.postDTO.userDTO = response;
        this.getUserHobbies();
      }
    })
  }

  constructor(private postsService: PostService,
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
      if (this.index < 4) {
        this.postDTO.images[this.index] = file.name;
        this.imagesData[this.index] = file;
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
      this.postDTO.images.splice(index, 1);
      this.imagesData.splice(index, 1);
      this.index--;
    }

    // Réinitialiser les valeurs vides à la fin de la liste
    if (this.postDTO.images.length < 4) {
      this.postDTO.images.push(null);
      this.imagesData.push(null);
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
    formData.append('new_post','1');
    // @ts-ignore
    formData.append('id_hobby', this.postDTO.hobbyDTO.id);
    // @ts-ignore
    formData.append('id_user', this.postDTO.userDTO.id);
    formData.append('user_name', this.postDTO.userDTO.name);
    formData.append('user_username', this.postDTO.userDTO.username);
    formData.append('description', this.postDTO.description);

    for (let i = 0; i < this.imagesData.length; i++) {
      const file = this.imagesData[i];
      // @ts-ignore
      if(file != null) formData.append('images[]', file);
    }

    this.postsService.newPost(formData).subscribe({
      next: (response) => {
        // Traitement de la réponse du serveur en cas de succès
        console.log('Posted with success! ', response);
        this.onClose();
      },
      error: (error) => {
        // Gestion des erreurs en cas d'échec
        console.error('Error while posting post : ', error);
      }
    });
  }

}

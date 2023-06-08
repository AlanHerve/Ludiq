import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivityDTO} from "../../../../posts/models/activity-dto";

@Component({
  selector: 'app-form-activity',
  templateUrl: './form-activity.component.html',
  styleUrls: ['./form-activity.component.css', '../../../ludiq-forms.css'],
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
export class FormActivityComponent implements OnInit {
  index: number = 0;

  previousRoute: string = '';

  activityDTO: ActivityDTO = {
    id_activity: -1,
    title: '',
    id_user: 1,
    id_hobby: 1,
    description:'',
    images: [null],
    time: '',
    modified: 0,
    files: []
  }
  activityForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location) {
    this.activityForm = this.formBuilder.group({
      activityControl:new FormControl(),
      number: [null, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(1)]],
    });


  }
  ngOnInit(): void {
    this.previousRoute = this.getPreviousRoute(); //to get the previous route
  }

  onClose(): void { //closing the form with the cross
    if (this.previousRoute) {
      this.router.navigateByUrl(this.previousRoute);
    }
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.activityDTO.images[this.index] = file.name;
      if (this.index < this.activityDTO.images.length) {
        const labelElement = document.querySelectorAll('.file-input-label')[this.index];
        labelElement?.classList.add('selected');
        this.index++;
      }
    };

    reader.readAsDataURL(file);
  }


  onRemoveImage(image: string) {
    const index = this.activityDTO.images.findIndex(img => img === image);
    if (index !== -1) {
      this.activityDTO.images[index] = null;
      this.index--;
    }

    for (let i = index; i < this.activityDTO.images.length; i++) {
      if (i === this.activityDTO.images.length - 1) {
        this.activityDTO.images[3] = null;
      } else {
        this.activityDTO.images[i] = this.activityDTO.images[i + 1];
      }
    }
    console.log(this.activityDTO.images);
  }

    /**
   * Method that returns the previous route of the current url
   * @private
   */
  private getPreviousRoute(): string {
    const currentUrl = this.location.path();

    return currentUrl.slice(0, currentUrl.lastIndexOf('/'));
  }

  newActivityPost() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('id_user', this.activityDTO.id_user.toString());
    // @ts-ignore
    formData.append('id_hobby', this.activityDTO.id_hobby.toString());
    // @ts-ignore
    formData.append('id_activity', this.activityDTO.id_activity.toString());
    formData.append('time', this.activityDTO.time.toString());
    formData.append('description', this.activityDTO.description);

    const fileName = this.activityDTO.images[0]; // Assuming it's a string representing the file name
    if (fileName != null) {
      formData.append('images[]', fileName);
    }

    /* this.postsService.newPost(formData).subscribe({
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
   }*/
}}

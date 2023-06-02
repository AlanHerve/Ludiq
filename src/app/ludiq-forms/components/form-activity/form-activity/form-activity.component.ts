import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivityDTO } from 'src/app/models/activity-dto';

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
    id_activity: null,
    id_user: 1,
    id_hobby: 1,
    images: [null],
    time: '',
    modified: ''
  }
  constructor(private router: Router, private location: Location) {}

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
      this.activityDTO.images[this.index] = file;
      if (this.index < this.activityDTO.images.length) {
        const labelElement = document.querySelectorAll('.file-input-label')[this.index];
        labelElement?.classList.add('selected');
        this.index++;
      }
    };

    reader.readAsDataURL(file);
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

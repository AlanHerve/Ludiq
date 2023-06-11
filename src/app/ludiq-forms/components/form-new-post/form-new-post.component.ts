import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {Form} from "../../models/form";

import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-form-new-post',
  templateUrl: './form-new-post.component.html',
  styleUrls: ['./form-new-post.component.css', '../../ludiq-forms.css'],
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
export class FormNewPostComponent extends Form implements OnInit {

  constructor(router: Router, location: Location) {
    super(router, location);
  }

  ngOnInit(): void {
  }
}

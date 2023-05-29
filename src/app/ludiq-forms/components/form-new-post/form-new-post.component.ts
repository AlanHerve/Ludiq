import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {Form} from "../../models/form";

@Component({
  selector: 'app-form-new-post',
  templateUrl: './form-new-post.component.html',
  styleUrls: ['./form-new-post.component.css', '../../ludiq-forms.css']
})
export class FormNewPostComponent extends Form implements OnInit {

  constructor(router: Router, location: Location) {
    super(router, location);
  }

  ngOnInit(): void {
  }
}

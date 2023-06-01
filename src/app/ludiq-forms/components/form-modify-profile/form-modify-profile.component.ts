import {Component, OnInit} from '@angular/core';
import {Form} from "../../models/form";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-form-modify-profile',
  templateUrl: './form-modify-profile.component.html',
  styleUrls: ['./form-modify-profile.component.css', '../../../ludiq-forms/ludiq-forms.css']
})
export class FormModifyProfileComponent extends Form implements OnInit {
  constructor(router: Router, location: Location) {
    super(router, location);
  }
  ngOnInit(): void {
  }

}

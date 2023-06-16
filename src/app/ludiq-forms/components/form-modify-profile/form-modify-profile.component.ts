import {Component, OnInit} from '@angular/core';
import {Form} from "../../models/form";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserDTO} from "../../../models/user-dto";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-modify-profile',
  templateUrl: './form-modify-profile.component.html',
  styleUrls: ['./form-modify-profile.component.css', '../../../ludiq-forms/ludiq-forms.css']
})
export class FormModifyProfileComponent extends Form implements OnInit {
  protected userDTO!: UserDTO;
  profileForm!: FormGroup;
  constructor(router: Router, location: Location,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    super(router, location);
  }
  ngOnInit(): void {

    this.userService.findUserById(this.userService.getCurrentId()).subscribe({
      next: (user) => {
        this.userDTO = user;
      },
      error: (error) =>
        console.log("Error while finding user in modification profile : ", error)
    })

    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: [''],
      confirm_password: [''],
    });
  }

  protected modifyProfile(): void {
    const name = this.profileForm.value.name;
    const username = this.profileForm.value.username;
    const password = this.profileForm.value.password;
    const confirm = this.profileForm.value.confirm_password;
    console.log(name, username, password, confirm);
  }

}

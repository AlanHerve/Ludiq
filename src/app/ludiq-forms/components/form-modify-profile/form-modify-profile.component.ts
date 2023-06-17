import { Component, OnInit } from '@angular/core';
import { Form } from "../../models/form";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { UserDTO } from "../../../models/user-dto";
import { UserService } from "../../../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../../../custom-validators";
import {Image} from "../../../models/image";
import {imagesUrl} from "../../../services/urls";


@Component({
  selector: 'app-form-modify-profile',
  templateUrl: './form-modify-profile.component.html',
  styleUrls: ['./form-modify-profile.component.css', '../../../ludiq-forms/ludiq-forms.css']
})
export class FormModifyProfileComponent extends Form implements OnInit, Image {
  protected userDTO: UserDTO = { id: 0, name: '', username: '', email: '', password: '', avatar: '', token: '' };
  profileForm!: FormGroup;
  isProfileModified: boolean = false;
  selectedFile: File | null = null;

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
      error: (error) => {
        console.log("Error while finding user in modification profile: ", error);
      }
    });

    this.profileForm = this.formBuilder.group(
      {
        name: [null, [Validators.required
          , Validators.minLength(4)
          , Validators.maxLength(20)
          , Validators.pattern(/^[a-zA-Z0-9]*$/)
        ]],
        pseudo: [null, [Validators.required
          , Validators.minLength(4)
          , Validators.maxLength(20)
          , Validators.pattern(/^[a-zA-Z0-9]*$/)
        ]],
        password: [null, [Validators.required
          , Validators.minLength(8)
          , Validators.maxLength(20)
          , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/)
        ]],
        confirm: [null, [Validators.required]],
        avatar: [],
      },{
        validators: [CustomValidators.confirmEqualValidator('password', 'confirm')],
      },
    );
  }

  modifyProfile(): void {
    const name = this.profileForm.value.name;
    const username = this.profileForm.value.pseudo;
    const password = this.profileForm.value.password;
    const confirm = this.profileForm.value.confirm;
    const avatar = this.selectedFile;

    if (password !== confirm) {
      console.error('Password and confirmation password do not match.');
      return;
    }

    const updatedUser: UserDTO = { ...this.userDTO };

    if (this.profileForm.controls['name'].dirty) {
      updatedUser.name = name;
    }
    if (this.profileForm.controls['pseudo'].dirty) {
      updatedUser.username = username;
    }
    if (this.profileForm.controls['password'].dirty) {
      updatedUser.password = password;
    }

    this.userService.updateUserProfile(updatedUser, avatar)
      .subscribe({
        next: (user) => {
          console.log('Profile updated successfully!', user);
          this.isProfileModified = true;
          setTimeout(() => {
            this.isProfileModified = false;
            this.onClose();
          }, 2000);
        },
        error: (error) => {
          console.log('Error while updating profile: ', error);
        }
      });
  }

  onAvatarChange(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
  }

  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

}

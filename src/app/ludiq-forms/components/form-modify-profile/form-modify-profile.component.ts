// Import the required Angular modules and classes
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

// Component decorator configuration
@Component({
  selector: 'app-form-modify-profile',
  templateUrl: './form-modify-profile.component.html',
  styleUrls: ['./form-modify-profile.component.css', '../../../ludiq-forms/ludiq-forms.css']
})
// Component class
export class FormModifyProfileComponent extends Form implements OnInit, Image {

  // Variable declarations
  protected userDTO: UserDTO = { id: 0, name: '', username: '', email: '', password: '', avatar: '', token: '' };
  profileForm!: FormGroup;
  isProfileModified: boolean = false;
  selectedFile: File | null = null;

  // Inject required services into the constructor
  constructor(router: Router, location: Location,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    super(router, location);
  }

  // OnInit lifecycle hook
  ngOnInit(): void {
    // Fetch the current user details
    this.userService.findUserById(this.userService.getCurrentId()).subscribe({
      next: (user) => {
        this.userDTO = user;
      },
      error: (error) => {
        console.log("Error while finding user in modification profile: ", error);
      }
    });

    // Initialize the form
    this.profileForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        username: ["", Validators.required],
        password: [""],
        confirm_password: [""],
        avatar: [],
      },
      {
        validator: CustomValidators.confirmEqualValidator("password", "confirm_password"),
      }
    );
  }

  // Method to modify profile
  modifyProfile(): void {
    // Assigning form input to variables
    const name = this.profileForm.value.name;
    const username = this.profileForm.value.username;
    const password = this.profileForm.value.password;
    const confirm = this.profileForm.value.confirm_password;
    const avatar = this.selectedFile;

    // Check if the password matches the confirmation
    if (password !== confirm) {
      console.error('Password and confirmation password do not match.');
      return;
    }

    // Update the userDTO object
    const updatedUser: UserDTO = { ...this.userDTO };

    // Check if each form control has been changed and assign the new value
    if (this.profileForm.controls['name'].dirty) {
      updatedUser.name = name;
    }
    if (this.profileForm.controls['username'].dirty) {
      updatedUser.username = username;
    }
    if (this.profileForm.controls['password'].dirty) {
      updatedUser.password = password;
    }
    else {
      updatedUser.password = '';
    }

    // Update user profile
    this.userService.updateUserProfile(updatedUser, avatar)
      .subscribe({
        next: (user) => {
          console.log('Profile updated successfully!', user);
          this.isProfileModified = true;
          // Reset modification flag after a delay
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

  // Method to handle avatar change
  onAvatarChange(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
  }

  // Method to load image
  loadImage(image: string): string {
    return imagesUrl + "/" + image;
  }

}

// Import the required Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

/**
 * The AuthModule is a feature module that organizes the code related
 * to the authentication features of your application.
 */
@NgModule({
  declarations: [
  ],
  imports: [
    // Import required modules for this module
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class AuthModule { }

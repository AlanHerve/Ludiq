import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormFavoriteHobbyComponent } from './form-favorite-hobby.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [FormFavoriteHobbyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: FormFavoriteHobbyComponent}
    ]),
    FormsModule
  ]
})
export class FormFavoriteHobbyModule { }


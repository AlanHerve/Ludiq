import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormRegularPostComponent} from "./form-regular-post.component";

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FormRegularPostComponent }
    ])
  ]
})
export class FormRegularPostModule { }

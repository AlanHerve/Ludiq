import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormNewPostComponent } from './form-new-post.component';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FormNewPostComponent }
    ])
  ]
})
export class FormNewPostModule { }

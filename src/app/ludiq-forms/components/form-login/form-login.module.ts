import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormLoginComponent } from './form-login.component';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FormLoginComponent }
    ])
  ]
})
export class FormLoginModule {
}

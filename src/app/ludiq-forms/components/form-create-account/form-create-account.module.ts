import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormCreateAccountComponent } from './form-create-account.component';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FormCreateAccountComponent }
    ])
  ]
})
export class FormCreateAccountModule {
}

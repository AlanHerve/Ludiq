import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormCreateAccountComponent} from "../ludiq-forms/components/form-create-account/form-create-account.component";
import {FormHobbyPostComponent} from "../ludiq-forms/components/form-hobby-post/form-hobby-post.component";




const routes: Routes = [
  {
    path: 'home',
    component: FormHobbyPostComponent
  },
  {
    path: 'test',
    component: FormCreateAccountComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}


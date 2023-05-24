import {FormNewPostComponent} from "../../../ludiq-forms/components/form-new-post/form-new-post.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile.component";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'popup', loadChildren: () => import('../../../ludiq-forms/components/form-new-post/form-new-post.module').then(m => m.FormNewPostModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile.component";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'regular_post', loadChildren: () => import('../../ludiq-forms/components/form-regular-post/form-regular-post.module').then(m => m.FormRegularPostModule) },
      { path: 'add_hobby', loadChildren: () => import('../../ludiq-forms/components/form-hobby-post/form-hobby-post.module').then(m => m.FormHobbyPostModule) },
      { path: 'modify_profile', loadChildren: () => import('../../ludiq-forms/components/form-modify-profile/form-modify-profile.module').then(m => m.FormModifyProfileModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

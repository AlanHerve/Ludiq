import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'hobby_post', loadChildren: () => import('../../../ludiq-forms/components/form-new-post/form-new-post.module').then(m => m.FormNewPostModule) },
      { path: 'regular_post', loadChildren: () => import('../../../ludiq-forms/components/form-regular-post/form-regular-post.module').then(m => m.FormRegularPostModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {FormNewPostComponent} from "../../../ludiq-forms/components/form-new-post/form-new-post.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'popup', loadChildren: () => import('../../../ludiq-forms/components/form-new-post/form-new-post.module').then(m => m.FormNewPostModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
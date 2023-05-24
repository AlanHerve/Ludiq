import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormNewPostComponent} from "../../../ludiq-forms/components/form-new-post/form-new-post.component";
import {HubComponent} from "./hub.component";

const routes: Routes = [
  {
    path: '', component: HubComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubRoutingModule { }

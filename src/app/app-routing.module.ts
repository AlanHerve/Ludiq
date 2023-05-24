import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/components/home/home.component";
import {FormNewPostComponent} from "./ludiq-forms/components/form-new-post/form-new-post.component";
import {HubComponent} from "./pages/components/hub/hub.component";

const routes: Routes = [
  {
    path: 'hub', component: HubComponent
  },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'popup', component: FormNewPostComponent }
    ]
  },
  {
    path: '**', redirectTo: 'hub', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/components/home/home.component";
import {FormNewPostComponent} from "./ludiq-forms/components/form-new-post/form-new-post.component";
import {HubComponent} from "./pages/components/hub/hub.component";
import {ProfileComponent} from "./pages/components/profile/profile.component";
import {FormCreateAccountComponent} from "./ludiq-forms/components/form-create-account/form-create-account.component";
import {FormLoginComponent} from "./ludiq-forms/components/form-login/form-login.component";

const routes: Routes = [
  {
    path: 'hub', component: HubComponent, children: [
      { path: 'register', component: FormCreateAccountComponent },
      { path: 'login', component: FormLoginComponent }
    ]
  },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'popup', component: FormNewPostComponent }
    ]
  },
  {
    path: 'profile', component: ProfileComponent, children: [
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HubComponent} from "./pages/components/hub/hub.component";

const routes: Routes = [
  {
    path: 'hub', component: HubComponent,
    children: [
      { path: 'register', loadChildren: () => import('./ludiq-forms/components/form-create-account/form-create-account.module').then(m => m.FormCreateAccountModule) },
      { path: 'login', loadChildren: () => import('./ludiq-forms/components/form-login/form-login.module').then(m => m.FormLoginModule) }
    ]
  },
  {
    path: 'home', loadChildren: () => import('./pages/components/home/home.module').then(m=>m.HomeModule)
  },
  {
    path: 'profile', loadChildren: () => import('./pages/components/profile/profile.module').then(m=>m.ProfileModule)
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

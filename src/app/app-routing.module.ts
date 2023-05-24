import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HubComponent} from "./pages/components/hub/hub.component";

/*
Defining the routes of the project
 */
const routes: Routes = [
  {
    path: 'hub', loadChildren: () => import('./pages/components/hub/hub.module').then(m=>m.HubModule)
  },
  {
    path: 'home', loadChildren: () => import('./pages/components/home/home.module').then(m=>m.HomeModule)
  },
  {
    path: 'profile', loadChildren: () => import('./pages/components/profile/profile.module').then(m=>m.ProfileModule)
  },
  /*
  If the path is empty, we redirect automatically the user in the hub section
   */
  {
    path: '**', redirectTo: 'hub', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { inject } from '@angular/core';

const routes: Routes = [
  {
    path: 'hub', loadChildren: () => import('./pages/hub/hub.module').then(m=>m.HubModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m=>m.HomeModule),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then(m=>m.ProfileModule),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {path: 'messages', loadChildren: () => import('./pages/messages/messages.module')
      .then(m => m.MessagesModule),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {path: 'activity', loadChildren: () => import('./pages/activity/activity.module')
      .then(m => m.ActivityModule),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'organization/:id', loadChildren: () => import('./pages/organization/organization.module')
      .then(m => m.OrganizationModule)
  },
  /*{
    path: 'organization'
    loadChildren: ('./pages/components') => import().then(m=>m.),
    canActivate: [() => inject(AuthGuard).canActivateOrganization()]
  },*/

  {
    path: '**', redirectTo: 'hub', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

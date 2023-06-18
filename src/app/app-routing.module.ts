import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { inject } from '@angular/core';

// We define the routes of the project :
const routes: Routes = [
  // We can navigate through the urls below.
  // In order not to load all pages when we don't want to navigate on all of them. We need to save memory thanks to lazy loading :
  {
    // We load the children of the route hub thanks to the hub module
    path: 'hub', loadChildren: () => import('./pages/hub/hub.module').then(m=>m.HubModule)
  },
  {
    // We do the same for all other routes
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m=>m.HomeModule),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'profile',
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
  {path: 'post', loadChildren: () => import('./pages/post/detailed-post.module')
      .then(m => m.DetailedPostModule),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'organization', loadChildren: () => import('./pages/organization/organization.module')
      .then(m => m.OrganizationModule),
    canActivate: [() => inject(AuthGuard).canActivate()]
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

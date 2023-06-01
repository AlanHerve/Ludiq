import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { inject } from '@angular/core';

const routes: Routes = [
  {
    path: 'hub', loadChildren: () => import('./pages/components/hub/hub.module').then(m=>m.HubModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/components/home/home.module').then(m=>m.HomeModule),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/components/profile/profile.module').then(m=>m.ProfileModule),
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

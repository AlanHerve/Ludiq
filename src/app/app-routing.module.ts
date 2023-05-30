import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Assurez-vous que le chemin est correct

const routes: Routes = [
  {
    path: 'hub',
    loadChildren: () => import('./pages/components/hub/hub.module').then(m=>m.HubModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/components/home/home.module').then(m=>m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/components/profile/profile.module').then(m=>m.ProfileModule),
    canActivate: [AuthGuard]
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

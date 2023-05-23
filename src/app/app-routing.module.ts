import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HubComponent} from "./pages/components/hub/hub.component";
import {BlankComponent} from "./pages/components/blank/blank.component";

const routes: Routes = [
  {
    path: 'hub', component: HubComponent
  },
  {
    path: 'blank', component: BlankComponent
  },
  {
    path: '', redirectTo: 'hub', pathMatch: 'full'
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

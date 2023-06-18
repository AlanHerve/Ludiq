import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizationComponent} from "./components/organization.component";
import {AuthGuard} from "../../auth/auth.guard";

const routes: Routes = [
   {
    path: ':id',
    component: OrganizationComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }

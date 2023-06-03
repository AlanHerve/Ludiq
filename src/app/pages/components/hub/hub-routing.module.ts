import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HubComponent} from "./hub.component";

const routes: Routes = [
  {
    path: '',
    component: HubComponent,
    children : [
      {path: 'register', loadChildren: () => import('./../../../ludiq-forms/components/form-create-account/form-create-account.module')
          .then(m => m.FormCreateAccountModule)
      },
      {path: 'login', loadChildren: () => import('./../../../ludiq-forms/components/form-login/form-login.module')
          .then(m => m.FormLoginModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HubRoutingModule { }

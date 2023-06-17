import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormCreateOrganizationComponent} from "./form-create-organization.component";

@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    RouterModule.forChild([{
      path: '', component: FormCreateOrganizationComponent
    }])
  ],
  exports:[]
})
export class FormCreateOrganizationModule {}

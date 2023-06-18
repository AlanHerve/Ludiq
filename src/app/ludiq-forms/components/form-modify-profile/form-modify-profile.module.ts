// Import necessary modules
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormModifyProfileComponent} from "./form-modify-profile.component";

/**
 * The FormModifyProfileModule is a feature module that organizes
 * the code related to the form modification feature of your application.
 */
@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    RouterModule.forChild([{
      path: '', component: FormModifyProfileComponent
    }])
  ],
  exports:[]
})
export class FormModifyProfileModule {}

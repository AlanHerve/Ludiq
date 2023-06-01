import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormHobbyPostComponent} from "./form-hobby-post.component";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '', component: FormHobbyPostComponent
      }
    ])
  ],
  exports: []
})
export class FormHobbyPostModule {

}

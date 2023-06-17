import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormFavoriteHobbyComponent} from "./form-favorite-hobby.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '', component: FormFavoriteHobbyComponent
      }
    ])
  ],
  exports: []
})
export class FormFavoriteHobbyModule {

}

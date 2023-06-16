import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DetailedPostComponent} from "./components/detailed-post/detailed-post.component";

const routes: Routes = [
  {
    path: ':id',
    component: DetailedPostComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailedPostRoutingModule {

}

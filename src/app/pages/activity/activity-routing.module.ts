import {RouterModule, Routes} from "@angular/router";
import {ActivityComponent} from "./components/activity.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: ':id',
    component: ActivityComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {

}

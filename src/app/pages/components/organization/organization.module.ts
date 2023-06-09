import {NgModule} from "@angular/core";
import  {CommonModule} from "@angular/common";
import {OrganizationComponent} from "./organization.component";
import {OrganizationRoutingModule} from "./organization-routing.module";
import {CoreModule} from "../../../core/core.module";
import {PostsModule} from "../../../posts/posts.module";

@NgModule({
  declarations: [
    OrganizationComponent
  ],
  imports: [
    OrganizationRoutingModule,
    CommonModule,
    CoreModule,
    PostsModule,
  ],
  exports: [
    OrganizationComponent,
    OrganizationRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class OrganizationModule {}

import {NgModule} from "@angular/core";
import  {CommonModule} from "@angular/common";
import {OrganizationComponent} from "./organization.component";
import {OrganizationRoutingModule} from "./organization-routing.module";
import {CoreModule} from "../../../core/core.module";
import {PostsModule} from "../../../posts/posts.module";
import {PagesModule} from "../../pages.module";

@NgModule({
  declarations: [
    OrganizationComponent
  ],
  imports: [
    OrganizationRoutingModule,
    CommonModule,
    PostsModule,
    PagesModule,
  ],
  exports: [
    OrganizationComponent,
    OrganizationRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class OrganizationModule {}

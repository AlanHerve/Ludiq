import {NgModule} from "@angular/core";
import  {CommonModule} from "@angular/common";
import {OrganizationComponent} from "./components/organization.component";
import {OrganizationRoutingModule} from "./organization-routing.module";
import {PostsModule} from "../../posts/posts.module";
import {PagesModule} from "../pages.module";
import {HomeModule} from "../home/home.module";

@NgModule({
  declarations: [
    OrganizationComponent
  ],
    imports: [
        OrganizationRoutingModule,
        CommonModule,
        PostsModule,
        PagesModule,
        HomeModule,
    ],
  exports: [
    OrganizationComponent,
    OrganizationRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class OrganizationModule {}

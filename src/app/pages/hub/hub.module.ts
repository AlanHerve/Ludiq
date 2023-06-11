import {NgModule} from "@angular/core";
import {HubComponent} from "./hub.component";
import {HubRoutingModule} from "./hub-routing.module";
import {LudiqFormsModule} from "../../ludiq-forms/ludiq-forms.module";
import  {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HubComponent
  ],
    imports: [
        HubRoutingModule,
        CommonModule
    ],
  exports: [
    HubComponent,
    HubRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class HubModule {}

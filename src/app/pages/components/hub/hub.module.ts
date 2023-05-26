import {NgModule} from "@angular/core";
import {HubComponent} from "./hub.component";
import {HubRoutingModule} from "./hub-routing.module";
import {LudiqFormsModule} from "../../../ludiq-forms/ludiq-forms.module";

@NgModule({
  declarations: [
    HubComponent
  ],
    imports: [
        HubRoutingModule,
    ],
  exports: [
    HubComponent,
    HubRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class HubModule {}

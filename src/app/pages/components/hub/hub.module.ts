import {NgModule} from "@angular/core";
import {HubComponent} from "./hub.component";
import {LudiqFormsModule} from "../../../ludiq-forms/ludiq-forms.module";
import {HubRoutingModule} from "./hub-routing.module";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [HubComponent],
  imports: [
    LudiqFormsModule,
    HubRoutingModule,
    NgIf
  ],
  exports: []
})
export class HubModule {}

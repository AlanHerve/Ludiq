import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LudiqFormsModule} from "../ludiq-forms/ludiq-forms.module";
import {RouterOutlet} from "@angular/router";
import {HubComponent} from "./components/hub/hub.component";
import { BlankComponent } from './components/blank/blank.component';
import {CoreModule} from "../core/core.module";
import {PostsModule} from "../posts/posts.module";


@NgModule({
  declarations: [
    HubComponent,
    BlankComponent
  ],
  exports: [
    HubComponent

  ],
  imports: [
    CommonModule,
    LudiqFormsModule,
    RouterOutlet,
    CoreModule,
    PostsModule
  ]
})
export class PagesModule { }

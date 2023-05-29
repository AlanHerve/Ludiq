import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormCreateAccountComponent} from "./components/form-create-account/form-create-account.component";
import {FormHobbyPostComponent} from "./components/form-hobby-post/form-hobby-post.component";
import {FormLoginComponent} from "./components/form-login/form-login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import { FormNewPostComponent } from './components/form-new-post/form-new-post.component';
import {FormCreateAccountModule} from "./components/form-create-account/form-create-account.module";
import { FormRegularPostComponent } from './components/form-regular-post/form-regular-post.component';
import {FormRegularPostModule} from "./components/form-regular-post/form-regular-post.module";
import { FormActivityComponent } from './components/form-activity/form-activity/form-activity.component';
import { FormActivityModule } from './components/form-activity/form-activity/form-activity.module';


@NgModule({
  declarations: [
    FormCreateAccountComponent,
    FormHobbyPostComponent,
    FormLoginComponent,
    FormNewPostComponent,
    FormRegularPostComponent,
    FormActivityComponent
  ],
    exports: [
      FormCreateAccountComponent,
      FormLoginComponent,
      FormNewPostComponent,
      FormCreateAccountModule,
      FormRegularPostComponent,
      FormRegularPostModule,
      FormActivityComponent,
      FormActivityModule
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterOutlet,
      RouterLink
    ]
})
export class LudiqFormsModule { }

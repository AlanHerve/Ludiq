import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {FormsModule} from "@angular/forms";
import { MightLikeHobbiesDisplayComponent } from './components/might-like-hobbies-display/might-like-hobbies-display.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    SearchBarComponent,
    MightLikeHobbiesDisplayComponent,
  ],
  exports: [
    NavigationBarComponent,
    SearchBarComponent,
    MightLikeHobbiesDisplayComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ]
})
export class CoreModule { }

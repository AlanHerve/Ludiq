import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {FormsModule} from "@angular/forms";
import { MightLikeHobbiesDisplayComponent } from './components/might-like-hobbies-display/might-like-hobbies-display.component';
import { UserHobbiesListComponent } from './components/user-hobbies-list/user-hobbies-list.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    SearchBarComponent,
    MightLikeHobbiesDisplayComponent,
    UserHobbiesListComponent,
  ],
  exports: [
    NavigationBarComponent,
    SearchBarComponent,
    MightLikeHobbiesDisplayComponent,
    UserHobbiesListComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ]
})
export class CoreModule { }

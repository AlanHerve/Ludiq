import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import {NavigationBarComponent} from './components/navigation-bar/navigation-bar.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {FormsModule} from "@angular/forms";
import {
  MightLikeHobbiesDisplayComponent
} from './components/might-like-hobbies-display/might-like-hobbies-display.component';
import {UserHobbiesListComponent} from './components/user-hobbies-list/user-hobbies-list.component';
import {UserComponent} from "../pages/home/components/user/user.component";
import {UserSearchComponent} from './components/search-bar/components/user-search/user-search.component';
import {HobbySearchComponent} from './components/search-bar/components/hobby-search/hobby-search.component';
import {PostSearchComponent} from './components/search-bar/components/post-search/post-search.component';
import {ActivitySearchComponent} from './components/search-bar/components/activity-search/activity-search.component';
import {HobbyButtonComponent} from "../shared/components/hobby-button/hobby-button.component";
import {HobbyCountButtonComponent} from "../shared/components/hobby-count-button/hobby-count-button.component";


@NgModule({
  declarations: [
    NavigationBarComponent,
    SearchBarComponent,
    MightLikeHobbiesDisplayComponent,
    UserHobbiesListComponent,
    UserComponent,
    UserSearchComponent,
    HobbySearchComponent,
    PostSearchComponent,
    ActivitySearchComponent,
    HobbyButtonComponent,
    HobbyCountButtonComponent
  ],
  exports: [
    NavigationBarComponent,
    SearchBarComponent,
    MightLikeHobbiesDisplayComponent,
    UserHobbiesListComponent,
    UserComponent,
    CommonModule,
    RouterOutlet,
    UserSearchComponent,
    HobbyButtonComponent,
    HobbyCountButtonComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
  ]
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}

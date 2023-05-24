import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NavigationBarComponent,
    SearchBarComponent,
  ],
    exports: [
        NavigationBarComponent,
        SearchBarComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ]
})
export class CoreModule { }

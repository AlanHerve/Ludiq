import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {RouterLink} from "@angular/router";
import { SearchBarComponent } from './components/search-bar/search-bar.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    SearchBarComponent
  ],
    exports: [
        NavigationBarComponent,
        SearchBarComponent
    ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class CoreModule { }

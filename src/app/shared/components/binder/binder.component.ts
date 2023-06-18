import {Component, Input, OnInit} from '@angular/core';
import {TabService} from "../../service/tab.service";

@Component({
  selector: 'app-binder',
  templateUrl: './binder.component.html',
  styleUrls: ['./binder.component.css']
})
/**
 * Class that represents the component of a binder.
 * A binder is used in order to create different sections on a same page.
 * A binder is composed of different tabs, that redirects the user to a certain section when clicking on it
 */
export class BinderComponent implements OnInit {

  // Table of buttons in order to create a binder that owns a different number of tabs possible.
  // For example, a binder can have 2 tabs : ['Hobbies', 'Activities']. Or 3 : ['Posts', 'Hobbies', 'Activities']
  @Input() buttons!: string[];

  // We instantiate the TabService in order to observe the modification on switching tabs
  constructor(private tabService: TabService) {
  }

  /**
   * Method that is called when the user is changing tab
   *
   * @param tab
   */
  onSwitchTo(tab: string): void {
    // We emit the changes of the tab when the tab is clicked
    this.tabService.emitTabChange(tab);
    // If the tab clicked is different from the activated tab, we declare it as activated
    if(tab != this.activeTab) this.activeTab = tab;
  }

  // At the beginning, the activeTab is Posts.
  activeTab: string = 'Posts';
  ngOnInit(): void {
  }



}

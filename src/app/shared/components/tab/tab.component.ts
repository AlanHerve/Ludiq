import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TabService} from "../../service/tab.service";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  // Text of the tab that we want to display
  @Input() tab!: string;
  // Boolean that checks if the tab is currently active
  @Input() isActive: boolean = false;

  // We instanciate an object of TabService in order to handle the changing of the tab on the binder component
  constructor(public tabService: TabService) {}

  /**
   * Method that switch the tab of the binder when clicking on it
   *
   * @param tab
   */
  onSwitchTo(tab: string): void {
    if (tab !== this.tab && this.isActive) {
      this.tabService.emitTabChange(tab);
    }
  }

  ngOnInit() {
  }

}

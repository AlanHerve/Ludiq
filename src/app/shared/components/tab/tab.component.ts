import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TabService} from "../../service/tab.service";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() tab!: string;
  @Input() isActive: boolean = false;

  constructor(public tabService: TabService) {}

  onSwitchTo(tab: string): void {
    if (tab !== this.tab && this.isActive) {
      this.tabService.emitTabChange(tab);
    }
  }

  ngOnInit() {
  }

}

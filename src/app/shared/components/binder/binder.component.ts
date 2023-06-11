import {Component, Input, OnInit} from '@angular/core';
import {TabService} from "../../service/tab.service";

@Component({
  selector: 'app-binder',
  templateUrl: './binder.component.html',
  styleUrls: ['./binder.component.css']
})
export class BinderComponent implements OnInit {

  @Input() buttons!: string[];

  constructor(private tabService: TabService) {

  }

  onSwitchTo(tab: string): void {
    this.tabService.emitTabChange(tab);
    if(tab != this.activeTab) this.activeTab = tab;
  }

  activeTab: string = 'Posts';
  ngOnInit(): void {
  }



}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  // Content displayed on the top bar of the page. It is a table of strings in order to display as much as content that we want
  @Input() content!: string[];
  ngOnInit(): void {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {CommentDTO} from "../../models/comment-dto";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() commentsDTO!: CommentDTO[];

  ngOnInit(): void {
  }
}

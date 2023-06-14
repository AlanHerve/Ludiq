import {Component, Input, OnInit} from '@angular/core';
import {CommentDTO} from "../../models/comment-dto";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() commentDTO!: CommentDTO

  ngOnInit(): void {
  }
}
